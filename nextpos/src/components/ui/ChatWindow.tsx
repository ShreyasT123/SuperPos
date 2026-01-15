'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { MessageCircle, X, Terminal, Cpu, Zap } from 'lucide-react'

interface Message {
  content: string
  isUser: boolean
}

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { content: "SYSTEM_INITIALIZED: Awaiting quantum inquiry.", isUser: false }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { content: input, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/superpos/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')
      const data = await response.json()

      if (data?.response) {
        setMessages(prev => [...prev, { content: data.response, isUser: false }])
      }
    } catch {
      setMessages(prev => [...prev, { content: "SIGNAL_ERROR: Connection to Lab_Kernel lost.", isUser: false }])
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/20 backdrop-blur-2xl text-white hover:bg-white hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
      >
        <MessageCircle className="h-6 w-6 opacity-40 group-hover:opacity-100" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-8 right-8 w-[400px] rounded-[40px] border border-white/20 bg-zinc-950/90 backdrop-blur-3xl text-white overflow-hidden shadow-2xl flex flex-col z-[200] dusty-visual animate-in fade-in zoom-in-95 duration-500">

      {/* HEADER: Technical HUD Style */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-4">
          <Cpu size={16} className="text-zinc-500 animate-pulse" />
          <div className="flex flex-col">
            <h2 className="text-xs font-didone tracking-[0.3em] uppercase text-quantum">
              Superpos <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Assistant</span>
            </h2>
            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">0x992_VIRTUAL_AID</span>
          </div>
        </div>
        <button onClick={toggleChat} className="opacity-30 hover:opacity-100 transition-opacity p-2">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* MESSAGE FEED */}
      <div className="h-[450px] overflow-y-auto p-8 space-y-8 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`px-5 py-4 rounded-3xl text-[11px] font-mono leading-relaxed tracking-tight max-w-[90%] shadow-lg ${message.isUser
                ? 'bg-white text-black font-bold'
                : 'bg-white/[0.05] border border-white/10 text-zinc-300'
                }`}
            >
              <p>{message.content}</p>
            </div>
            <span className="text-[7px] font-mono opacity-20 mt-2 tracking-[0.4em] uppercase">
              {message.isUser ? 'LOCAL_INPUT' : 'SYSTEM_LOG'}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA: Minimalist Lab Control */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="INQUIRE_SYSTEM..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-6 pr-14 text-[10px] font-mono text-white placeholder:text-zinc-700 focus:border-white/40 focus:bg-white/[0.05] outline-none transition-all uppercase tracking-widest"
          />
          <button
            type="submit"
            className="absolute right-2 p-3 text-zinc-500 hover:text-white transition-all hover:scale-110"
          >
            <Zap size={14} />
          </button>
        </form>
        <div className="mt-4 flex justify-center opacity-10">
          <Terminal size={10} />
        </div>
      </div>
    </div>
  );
}