"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext'; // Adjust path if needed
import { db } from '@/lib/firebase'; // Adjust path if needed
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'; // Import addDoc, serverTimestamp
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"; // Import Input
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Import Description
  DialogFooter, // Import Footer
  DialogTrigger,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog"; // Import Dialog components
import { MessageSquare, Hash, LogIn, LogOut, Loader2, Plus } from 'lucide-react'; // Added Plus
import ForumChatInterface from '@/components/ui/ForumChatInterface'; // Fixed import path
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { useToast } from '@/hooks/use-toast'; // Import useToast

// Define structure for a Topic
interface Topic {
    id: string;
    name: string;
    description?: string;
    // Add other fields like createdAt if needed from Firestore
}

export default function ForumPage() {
    // Auth state
    const { user, loading: authLoading, signInWithGoogle, logout } = useAuth();
    // Forum state
    const [topics, setTopics] = useState<Topic[]>([]);
    const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Create Topic Dialog state
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newTopicName, setNewTopicName] = useState("");
    const [newTopicDescription, setNewTopicDescription] = useState("");
    const [isCreatingTopic, setIsCreatingTopic] = useState(false); // Loading state for creation
    const { toast } = useToast();

    // --- Fetch Topics Effect ---
    useEffect(() => {
        if (!authLoading && user) {
            setLoadingTopics(true);
            setError(null);
            const fetchTopics = async () => {
                try {
                    const q = query(collection(db, "forumtopics"), orderBy("name", "asc"));
                    const querySnapshot = await getDocs(q);
                    const topicsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Topic));
                    setTopics(topicsData);
                } catch (err) {
                    console.error("Error fetching forum topics:", err);
                    setError("Could not load forum topics.");
                } finally {
                    setLoadingTopics(false);
                }
            };
            fetchTopics();
        } else if (!authLoading && !user) {
            setTopics([]);
            setActiveTopic(null);
            setLoadingTopics(false);
            setError(null);
        }
    }, [user, authLoading]);

    // --- Create Topic Handler ---
    const handleCreateTopic = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedName = newTopicName.trim();
        if (!trimmedName || !user) return; // Need name and logged-in user

        setIsCreatingTopic(true); // Start loading
        try {
            // Add topic to Firestore
            const docRef = await addDoc(collection(db, "forumtopics"), {
                name: trimmedName,
                description: newTopicDescription.trim() || "", // Add description, default empty
                createdBy: user.uid, // Store creator ID
                creatorName: user.displayName || 'Anonymous', // Store creator name
                createdAt: serverTimestamp(), // Add creation timestamp
            });

            // Add the new topic locally to avoid immediate re-fetch lag (optional but good UX)
            const newTopic: Topic = {
                id: docRef.id,
                name: trimmedName,
                description: newTopicDescription.trim() || ""
                // Add other fields if needed locally
            };
            setTopics(prevTopics => [...prevTopics, newTopic].sort((a, b) => a.name.localeCompare(b.name)));

            // Optionally select the new topic immediately
            setActiveTopic(newTopic);

            toast({
                title: "Success!",
                description: `Topic "${trimmedName}" created.`,
            });

            // Reset form and close dialog
            setNewTopicName("");
            setNewTopicDescription("");
            setIsCreateDialogOpen(false); // Close the dialog

        } catch (error) {
            console.error("Error creating topic:", error);
            toast({
                title: "Error",
                description: "Failed to create topic. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsCreatingTopic(false); // Stop loading
        }
    };


    // --- Render Logic ---

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
                <Head><title>Loading Forum...</title></Head>
                <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                 <p className="ml-3 text-lg">Loading authentication...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 p-6">
                <Head>
                    <title>Login Required | Superpos Forum</title>
                </Head>
                <MessageSquare className="w-16 h-16 text-violet-400 mb-6" />
                <h1 className="text-2xl font-semibold mb-4 text-gray-100">Welcome to the Superpos Forum</h1>
                <p className="text-center mb-6 text-gray-400">Please log in with Google to access the discussion topics.</p>
                <Button
                    onClick={signInWithGoogle}
                    className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg inline-flex items-center"
                >
                    <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
                </Button>
                <Toaster />
            </div>
        );
    }

    // Main Forum Layout
    return (
        <div className="flex h-screen max-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
            <Head>
                <title>Forum | Superpos</title>
            </Head>

            {/* Sidebar for Topics */}
            <Card className="w-64 md:w-72 lg:w-80 bg-gray-900/60 backdrop-blur-lg border-r border-gray-700 rounded-none flex flex-col flex-shrink-0">
                <CardHeader className="p-3 sm:p-4 border-b border-gray-700 flex-shrink-0 flex items-center justify-between"> {/* Flex for title + button */}
                    <CardTitle className="text-gray-100 text-lg font-semibold flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-violet-400"/> Forum Topics
                    </CardTitle>
                    {/* Create Topic Button using DialogTrigger */}
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-700/50">
                                <Plus className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">Create New Topic</span>
                            </Button>
                        </DialogTrigger>
                        {/* Dialog Content */}
                        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-gray-200">
                            <form onSubmit={handleCreateTopic}>
                                <DialogHeader>
                                    <DialogTitle>Create New Forum Topic</DialogTitle>
                                    <DialogDescription>
                                        Start a new discussion by giving your topic a name and optional description.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="topic-name" className="text-right text-sm text-gray-400">
                                            Name
                                        </label>
                                        <Input
                                            id="topic-name"
                                            value={newTopicName}
                                            onChange={(e) => setNewTopicName(e.target.value)}
                                            placeholder="e.g., Quantum Algorithms Help"
                                            className="col-span-3 bg-gray-800 border-gray-600 focus:ring-violet-500 focus:border-violet-500"
                                            required
                                            maxLength={50} // Add length limit
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor="topic-description" className="text-right text-sm text-gray-400">
                                            Description <span className='text-xs'>(Optional)</span>
                                        </label>
                                        <Textarea
                                            id="topic-description"
                                            value={newTopicDescription}
                                            onChange={(e) => setNewTopicDescription(e.target.value)}
                                            placeholder="Briefly describe the topic..."
                                            className="col-span-3 bg-gray-800 border-gray-600 focus:ring-violet-500 focus:border-violet-500 min-h-[60px]"
                                            maxLength={150} // Add length limit
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                         <Button type="button" variant="outline" className='border-gray-600 hover:bg-gray-700'>
                                            Cancel
                                         </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        disabled={isCreatingTopic || !newTopicName.trim()}
                                        className="bg-violet-600 hover:bg-violet-700"
                                    >
                                        {isCreatingTopic ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : null}
                                        Create Topic
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                </CardHeader>
                {/* Scrollable area for topics */}
                <ScrollArea className="flex-grow">
                    <CardContent className="p-2 sm:p-3">
                        {loadingTopics ? (
                            <div className="flex justify-center items-center py-4">
                                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                                <span className="ml-2 text-gray-500 text-sm">Loading...</span>
                            </div>
                        ) : error ? (
                             <p className="text-red-500 text-sm text-center py-4 px-2">{error}</p>
                        ) : topics.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4 px-2">No topics yet. Create one!</p>
                        ) : (
                            <nav className="space-y-1">
                                {topics.map((topic) => (
                                    <button
                                        key={topic.id}
                                        onClick={() => setActiveTopic(topic)}
                                        className={`w-full flex items-center p-2.5 rounded-md text-left transition-colors duration-150 ${
                                            activeTopic?.id === topic.id
                                            ? 'bg-violet-600/40 border border-violet-500/30 text-violet-100 font-medium shadow-inner'
                                            : 'text-gray-300 hover:bg-gray-700/50 border border-transparent'
                                        }`}
                                        aria-current={activeTopic?.id === topic.id ? 'page' : undefined}
                                    >
                                        <Hash className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-500" />
                                        <span className="truncate text-sm">{topic.name}</span>
                                    </button>
                                ))}
                            </nav>
                        )}
                    </CardContent>
                </ScrollArea>
                 {/* Logout Area */}
                <div className="p-3 border-t border-gray-700 mt-auto flex-shrink-0">
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="w-full justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300 text-sm px-2.5 py-2"
                        >
                         <LogOut className="w-4 h-4 mr-2.5"/> Log Out
                    </Button>
                </div>
            </Card>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden bg-gray-800/30">
                {activeTopic ? (
                    <ForumChatInterface
                        key={activeTopic.id}
                        activeTopic={activeTopic}
                        userName={user.displayName || 'Anonymous'}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-3 text-center p-6">
                        <MessageSquare className="w-12 h-12 text-gray-600" />
                        <p className="text-lg font-medium text-gray-400">Select or Create a Topic</p>
                        <p className="text-sm">Choose a discussion topic from the sidebar, or use the '+' icon to create a new one.</p>
                    </div>
                )}
            </main>
            <Toaster />
        </div>
    );
}