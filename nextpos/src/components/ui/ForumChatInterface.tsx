"use client";
import React, { useState, useEffect, useRef } from "react";
// Added Image, X icons
import { Send,  Hash, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  orderBy
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
// Removed Input import as Textarea is primary
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast"; // Assuming toast is from ui
// --- Supabase Client Setup ---
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
} else {
    console.warn("Supabase URL or Key is missing. Image upload will be disabled.");
}
// ----------------------------

// Define structure for a message document
interface ForumMessage {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    senderPhotoURL?: string | null;
    timestamp: any; // Firestore Timestamp object or null
    topicId: string;
    isSent: boolean; // Added client-side
    messageType: 'text' | 'image' | 'text+image';
    imageUrl?: string | null; // Can be null or string
}

interface ForumChatInterfaceProps {
  activeTopic: {
    description: React.JSX.Element; id: string; name: string; 
};
  userName: string;
  userPhotoURL?: string | null;
}

const ForumChatInterface: React.FC<ForumChatInterfaceProps> = ({ activeTopic, userName, userPhotoURL }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // --- Image Upload State ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // --------------------------

  // Fetch messages effect
  useEffect(() => {
    if (!activeTopic?.id) {
      setMessages([]);
      setLoadingMessages(false);
      return;
    };

    setLoadingMessages(true);
    const q = query(
      collection(db, "forumMessages"),
      where("topicId", "==", activeTopic.id),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const messagesData: ForumMessage[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          messagesData.push({
            id: doc.id,
            content: data.content || '',
            senderId: data.senderId,
            senderName: data.senderName || 'Anonymous',
            senderPhotoURL: data.senderPhotoURL,
            timestamp: data.timestamp,
            topicId: data.topicId,
            isSent: data.senderId === auth.currentUser?.uid,
            messageType: data.messageType || 'text',
            imageUrl: data.imageUrl
          });
        });
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to fetch messages for this topic.",
          variant: "destructive",
        });
      } finally {
          setLoadingMessages(false);
      }
    }, (error) => {
        console.error("Message listener error:", error);
        toast({
            title: "Listener Error",
            description: "Could not listen for new messages.",
            variant: "destructive",
        });
        setLoadingMessages(false);
    });

    return () => unsubscribe();
  }, [activeTopic, toast]);

  // Scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Image Handling Functions ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid File", description: "Please select an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({ title: "File Too Large", description: "Image size should be less than 5MB.", variant: "destructive" });
      return;
    }

    setSelectedImage(file);

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
     // Check if Supabase client is available
     if (!supabase) {
        toast({ title: "Upload Error", description: "Image storage is not configured.", variant: "destructive" });
        return null;
     }
     // Check if user is logged in
     if (!auth.currentUser?.uid) {
         toast({ title: "Auth Error", description: "You must be logged in to upload images.", variant: "destructive" });
         return null;
     }

    setIsUploading(true);
    try {
      // Create a unique path, e.g., uploads/user_id/timestamp_filename
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${auth.currentUser.uid}/${uniqueFileName}`; // Store under user's folder

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("media") // Your bucket name
        .upload(filePath, file, {
          cacheControl: '3600', // Cache for 1 hour
          upsert: false, // Don't overwrite existing files with the same name
        });

      if (uploadError) {
        throw uploadError; // Throw error to be caught below
      }

      // Get the public URL of the uploaded file
      const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
          throw new Error("Could not get public URL after upload.");
      }
      console.log("Upload successful, URL:", urlData.publicUrl); // For debugging
      return urlData.publicUrl;

    } catch (error: any) {
      console.error("Error uploading image to Supabase:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Could not upload the image.",
        variant: "destructive",
      });
      return null; // Indicate failure
    } finally {
      setIsUploading(false); // Ensure loading state is reset
    }
  };
  // ------------------------------

  // Send message handler (updated for images)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentMessage = message.trim();
    // Must have text OR an image selected, and an active topic/user
    if ((!currentMessage && !selectedImage) || !activeTopic?.id || !auth.currentUser?.uid) return;

    setIsUploading(true); // Set loading state generally for sending
    let imageUrl: string | null = null;
    let uploadFailed = false;

    // 1. Upload image if selected
    if (selectedImage) {
        imageUrl = await uploadImageToSupabase(selectedImage);
        if (!imageUrl) {
            uploadFailed = true; // Mark upload as failed
        }
    }

    // 2. Check if we should proceed
    // Don't send if ONLY an image was selected AND its upload failed.
    if (uploadFailed && !currentMessage) {
        setIsUploading(false); // Reset general loading state
        return; // Abort sending
    }

    // 3. Determine message type
    let messageType: ForumMessage['messageType'] = 'text';
    if (imageUrl && currentMessage) {
        messageType = 'text+image';
    } else if (imageUrl) {
        messageType = 'image';
    }

    // 4. Add message document to Firestore
    try {
      await addDoc(collection(db, "forumMessages"), {
        content: currentMessage, // Empty string if only image
        topicId: activeTopic.id,
        senderId: auth.currentUser.uid,
        senderName: userName || 'Anonymous',
        senderPhotoURL: auth.currentUser.photoURL || null,
        timestamp: serverTimestamp(),
        messageType: messageType,
        imageUrl: imageUrl, // Store the URL (will be null if upload failed or no image)
      });

      // 5. Reset state on success
      setMessage("");
      clearSelectedImage(); // Clear image selection

    } catch (error) {
      console.error("Error sending message to Firestore:", error);
      toast({
        title: "Error",
        description: "Failed to save message.",
        variant: "destructive",
      });
      // Note: If image upload succeeded but Firestore write failed, the image remains in storage.
      // Consider adding logic to delete the uploaded image in this specific failure case if needed.
    } finally {
        setIsUploading(false); // Reset general loading state AFTER Firestore write attempt
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: any): string => {
    // ... (keep existing timestamp formatting logic) ...
     if (!timestamp?.toDate) {
        return 'Sending...';
    }
    try {
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    } catch (e) {
        console.error("Error formatting timestamp:", timestamp, e);
        return "Invalid date";
    }
  };

  // **MODIFIED Message Renderer for Forum Look + Image**
  const renderMessage = (msg: ForumMessage) => {
    const senderInitials = msg.senderName?.substring(0, 2).toUpperCase() || '??';
    return (
      <div key={msg.id} className="flex items-start space-x-3 py-4 border-b border-gray-800 last:border-b-0">
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-gray-700 mt-1 flex-shrink-0">
          <AvatarImage src={msg.senderPhotoURL ?? undefined} alt={msg.senderName} />
          <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-xs font-semibold">
            {senderInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0"> {/* Added min-w-0 for flexbox wrapping */}
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-semibold truncate ${msg.isSent ? 'text-violet-300' : 'text-gray-200'}`}>
              {msg.senderName || 'Anonymous'} {msg.isSent ? '(You)' : ''}
            </span>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2"> {/* Prevent timestamp wrapping */}
              {formatTimestamp(msg.timestamp)}
            </span>
          </div>

          {/* Display Image if present */}
           {msg.imageUrl && (
             <div className="my-2"> {/* Margin top/bottom for image */}
               <a href={msg.imageUrl} target="_blank" rel="noopener noreferrer" title="View full image">
                 <img
                   src={msg.imageUrl}
                   width={300} // Adjust width as needed
                    height={200} // Adjust height as needed

                   alt={`Image posted by ${msg.senderName}`}
                   className="rounded-lg max-h-60 sm:max-h-72 object-contain bg-black/20 border border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
                   loading="lazy" // Lazy load images
                 />
               </a>
             </div>
           )}

          {/* Display Text Content if present */}
          {msg.content && (
            <p className="text-sm text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
              {msg.content}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Handle Enter key press in Textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (

      <div className="flex-1 flex flex-col bg-gray-900/80 backdrop-blur-md h-full max-h-screen">
          {/* Chat Header **MODIFIED** */}
          <Card className="border-b border-gray-700 rounded-none bg-gray-800/50 shadow-sm sticky top-0 z-10 flex-shrink-0">
              <CardHeader className="p-3 sm:p-4">
                  <div className="flex items-start space-x-3 sm:space-x-4"> {/* Use items-start */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-inner flex-shrink-0 mt-0.5"> {/* Add margin-top */}
                          <Hash className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      {/* Name and Description Block */}
                      <div className="flex-1 min-w-0"> {/* Allow wrapping */}
                          <h2 className="text-md sm:text-lg font-semibold text-gray-100 truncate leading-tight"> {/* Adjust leading */}
                              {activeTopic.name}
                          </h2>
                          {/* Display Description if it exists */}
                          {activeTopic.description && (
                               <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-snug"> {/* Adjust spacing/leading */}
                                  {activeTopic.description}
                              </p>
                          )}
                      </div>
                  </div>
              </CardHeader>
          </Card>
  

        {/* Message Area */}
        <div className="flex-grow overflow-hidden">
             <ScrollArea className="h-full px-4 sm:px-6 pt-4">
               {/* ... Loading/Empty/Messages map ... */}
                <div className="space-y-0">
                    {loadingMessages ? (
                        <div className="text-center text-gray-500 py-10">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            No posts yet in <strong className="text-gray-400">{activeTopic.name}</strong>. Be the first to post!
                        </div>
                    ) : (
                        messages.map(renderMessage)
                    )}
                    <div ref={messagesEndRef} style={{ height: '1px' }} />
                </div>
             </ScrollArea>
        </div>

        {/* Image Preview Area */}
        {imagePreview && (
          <div className="px-3 sm:px-4 py-2 border-t border-gray-700 bg-gray-800/60 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2 overflow-hidden"> {/* Prevent text overflow */}
              <img
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-md border border-gray-600 flex-shrink-0"
              />
              <span className="text-gray-300 text-xs sm:text-sm truncate">
                {selectedImage?.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-gray-700/50 flex-shrink-0"
              onClick={clearSelectedImage}
              disabled={isUploading} // Disable clear while uploading
              aria-label="Clear selected image"
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        )}

        {/* Message Input Form **MODIFIED** */}
        <Card className={`border-t border-gray-700 rounded-none bg-gray-800/50 sticky bottom-0 flex-shrink-0 ${isUploading ? 'opacity-70' : ''}`}> {/* Dim if uploading */}
            <CardContent className="p-3 sm:p-4">
            <form
                onSubmit={handleSendMessage}
                className="flex items-start space-x-2 sm:space-x-3"
            >
                 <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-gray-700 mt-1 flex-shrink-0">
                    <AvatarImage src={userPhotoURL ?? undefined} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-xs font-semibold">
                        {userName?.substring(0, 2).toUpperCase() || '??'}
                    </AvatarFallback>
                </Avatar>

                 {/* Hidden file input */}
                 <input
                     type="file"
                     accept="image/*"
                     className="hidden"
                     onChange={handleFileChange}
                     ref={fileInputRef}
                     disabled={isUploading} // Disable file input while uploading
                 />

                {/* Image Select Button */}
                 <Button
                     type="button"
                     size="icon"
                     variant="ghost"
                     className="h-9 w-9 sm:h-10 sm:w-10 rounded-md hover:bg-gray-700/50 mt-1 flex-shrink-0" // Align with textarea
                     onClick={() => fileInputRef.current?.click()} // Trigger file input
                     disabled={isUploading || !supabase} // Disable if uploading or supabase not configured
                     aria-label="Attach image"
                 >
                     <ImageIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${supabase ? 'text-gray-400' : 'text-gray-600'}`} />
                 </Button>

                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Post in #${activeTopic.name}... (Shift+Enter for newline)`}
                    className={`flex-1 bg-gray-700/60 border-gray-600 text-gray-100 placeholder:text-gray-500 rounded-md py-2 px-3 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm resize-none min-h-[40px] max-h-[150px] ${isUploading ? 'cursor-not-allowed' : ''}`}
                    rows={1}
                    autoComplete="off"
                    disabled={isUploading} // Disable textarea while uploading
                />
                <Button
                    type="submit"
                    size="icon"
                    className="w-9 h-9 sm:w-10 sm:w-10 rounded-md bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg flex-shrink-0 transition-transform duration-150 ease-in-out active:scale-95 mt-1 disabled:opacity-50"
                    disabled={isUploading || (!message.trim() && !selectedImage)} // Disable if uploading or nothing to send
                    aria-label="Post message"
                >
                     {/* Show loader when uploading, otherwise Send icon */}
                     {isUploading ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white"/> : <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />}
                </Button>
            </form>
            </CardContent>
        </Card>
    </div>
  );
};

export default ForumChatInterface;

