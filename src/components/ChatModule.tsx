import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Paperclip, 
  Hash, 
  Users, 
  MapPin, 
  MoreVertical,
  Search,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ChatMessage, Channel } from "../types";

const CHANNELS: Channel[] = [
  { id: "general", name: "General", description: "Avisos oficiales y bienvenida", type: "general" },
  { id: "legales", name: "Legales", description: "Mesa técnica de derecho", type: "technical" },
  { id: "economia", name: "Economía", description: "Mesa técnica de finanzas", type: "technical" },
  { id: "educacion", name: "Educación", description: "Mesa técnica de formación", type: "technical" },
  { id: "caracas", name: "Caracas", description: "Coordinación regional", type: "regional" },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    channelId: "general",
    senderId: "system",
    senderName: "Coordinación",
    content: "¡Bienvenido a la Red de Acción Ciudadana! Aquí tu talento es el motor del cambio.",
    timestamp: Date.now() - 1000000,
  },
  {
    id: "2",
    channelId: "general",
    senderId: "user-1",
    senderName: "Luis Méndez",
    content: "Hola a todos, listo para aportar en la mesa técnica de legales.",
    timestamp: Date.now() - 500000,
  }
];

export function ChatModule() {
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeChannel]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      channelId: activeChannel.id,
      senderId: "me",
      senderName: "Tú",
      content: newMessage,
      timestamp: Date.now(),
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const filteredMessages = messages.filter(m => m.channelId === activeChannel.id);

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-[2.5rem] border border-brand-gold/10 bg-white shadow-xl">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex flex-col border-r border-brand-gold/10 bg-brand-bone/30"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-blue">Canales</h3>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                <input
                  type="text"
                  placeholder="Buscar canal..."
                  className="w-full rounded-xl border border-brand-gold/10 bg-white py-2 pl-10 pr-4 text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              {["general", "technical", "regional"].map((type) => (
                <div key={type} className="py-2">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-brand-slate/40 mb-2">
                    {type === "general" ? "Principal" : type === "technical" ? "Mesas Técnicas" : "Regiones"}
                  </p>
                  {CHANNELS.filter(c => c.type === type).map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-all",
                        activeChannel.id === channel.id
                          ? "bg-brand-blue text-white shadow-md"
                          : "text-brand-slate hover:bg-brand-gold/10"
                      )}
                    >
                      {type === "general" ? <Users className="h-4 w-4" /> : type === "technical" ? <Hash className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      {channel.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-brand-gold/10 px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="rounded-full p-2 hover:bg-brand-bone lg:hidden"
            >
              <ChevronLeft className={cn("h-5 w-5 transition-transform", !showSidebar && "rotate-180")} />
            </button>
            <div>
              <h4 className="font-bold text-brand-blue">#{activeChannel.name}</h4>
              <p className="text-[10px] font-medium text-brand-slate">{activeChannel.description}</p>
            </div>
          </div>
          <button className="rounded-full p-2 hover:bg-brand-bone">
            <MoreVertical className="h-5 w-5 text-brand-slate" />
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bone/10"
        >
          {filteredMessages.map((msg) => {
            const isMe = msg.senderId === "me";
            const isSystem = msg.senderId === "system";

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col",
                  isMe ? "items-end" : "items-start"
                )}
              >
                {!isMe && (
                  <span className="mb-1 ml-2 text-[10px] font-bold text-brand-slate/60">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    isMe 
                      ? "bg-brand-blue text-white rounded-tr-none" 
                      : isSystem
                        ? "bg-brand-gold/10 text-brand-blue border border-brand-gold/20 rounded-tl-none italic"
                        : "bg-white text-brand-blue border border-brand-gold/10 rounded-tl-none"
                  )}
                >
                  {msg.content}
                  <div className={cn(
                    "mt-1 text-[8px] opacity-50",
                    isMe ? "text-right" : "text-left"
                  )}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSendMessage}
          className="border-t border-brand-gold/10 p-6"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-brand-gold/20 bg-brand-bone/50 p-2 focus-within:border-brand-gold transition-all">
            <button type="button" className="rounded-xl p-2 text-brand-slate hover:bg-brand-gold/10">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Enviar mensaje a #${activeChannel.name}...`}
              className="flex-1 bg-transparent px-2 py-2 text-sm font-medium text-brand-blue placeholder:text-brand-slate/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="rounded-xl bg-brand-red p-3 text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
