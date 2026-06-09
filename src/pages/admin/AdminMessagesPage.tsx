import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Loader2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Message } from "@/lib/types";

interface ClientConversation {
  client_id: string;
  company: string;
  email: string;
  unread_count: number;
  last_message: string;
  last_message_time: string;
  last_message_from_admin: boolean;
}

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

const AdminMessagesPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ClientConversation[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  useEffect(() => {
    const loadConversations = async () => {
      const { data: msgs } = await supabase
        .from("messages")
        .select("*,clients(id,company,email)")
        .order("created_at", { ascending: false });

      if (msgs) {
        const grouped = new Map<string, ClientConversation>();
        msgs.forEach((m: any) => {
          const clientId = m.client_id;
          if (!grouped.has(clientId)) {
            grouped.set(clientId, {
              client_id: clientId,
              company: m.clients.company,
              email: m.clients.email,
              unread_count: 0,
              last_message: m.content,
              last_message_time: m.created_at,
              last_message_from_admin: m.is_admin,
            });
          }
          if (!m.read_at && m.is_admin) {
            grouped.get(clientId)!.unread_count++;
          }
        });
        setConversations(Array.from(grouped.values()));
      }
      setLoading(false);
    };
    loadConversations();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedClientId) return;
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("client_id", selectedClientId)
        .order("created_at");

      setMessages(data ?? []);
      scrollDown();

      // Mark admin messages as read
      await supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() })
        .eq("client_id", selectedClientId)
        .eq("is_admin", false)
        .is("read_at", null);
    };
    loadMessages();
  }, [selectedClientId]);

  // Real-time subscription
  useEffect(() => {
    if (!selectedClientId) return;
    const channel = supabase
      .channel(`admin-messages:${selectedClientId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `client_id=eq.${selectedClientId}`,
        },
        (payload) => {
          setMessages((p) => [...p, payload.new as Message]);
          scrollDown();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedClientId]);

  const send = async () => {
    if (!text.trim() || !selectedClientId || !user) return;
    setSending(true);
    const { data } = await supabase
      .from("messages")
      .insert({
        client_id: selectedClientId,
        sender_id: user.id,
        content: text.trim(),
        is_admin: true,
      })
      .select("*")
      .single();

    if (data) setMessages((p) => [...p, data]);
    setText("");
    setSending(false);
    scrollDown();
  };

  const groupedMessages: { date: string; msgs: Message[] }[] = [];
  messages.forEach((m) => {
    const d = fmtDate(m.created_at);
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && last.date === d) last.msgs.push(m);
    else groupedMessages.push({ date: d, msgs: [m] });
  });

  const filteredConversations = conversations.filter(
    (c) =>
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Client Messages</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage all client communications in one place.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <div className="lg:w-80 flex flex-col card-dreamy">
          <div className="p-4 border-b border-border/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or email…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <MessageCircle className="w-8 h-8 text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground">No conversations</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <motion.button
                  key={conv.client_id}
                  onClick={() => setSelectedClientId(conv.client_id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedClientId === conv.client_id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/50 border border-transparent"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {conv.company}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{conv.email}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1 truncate line-clamp-2">
                        {conv.last_message}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {conv.unread_count}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground/50 mt-2">
                    {fmtTime(conv.last_message_time)}
                  </p>
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedClientId ? (
          <div className="flex-1 flex flex-col card-dreamy overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border/30">
              {conversations.find((c) => c.client_id === selectedClientId) && (
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {conversations.find((c) => c.client_id === selectedClientId)?.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversations.find((c) => c.client_id === selectedClientId)?.email}
                  </p>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-1 scroll-smooth">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/20 mb-3" />
                  <p className="text-muted-foreground font-medium">No messages yet</p>
                </div>
              ) : (
                <>
                  {groupedMessages.map(({ date, msgs }) => (
                    <div key={date}>
                      <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-border/40" />
                        <span className="text-xs text-muted-foreground font-medium px-2">{date}</span>
                        <div className="flex-1 h-px bg-border/40" />
                      </div>

                      {msgs.map((m) => {
                        const isAdmin = m.is_admin;
                        return (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`flex mb-3 ${isAdmin ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-end gap-2.5 max-w-[75%] ${
                                isAdmin ? "flex-row-reverse" : "flex-row"
                              }`}
                            >
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                                  isAdmin ? "opacity-100" : "opacity-0"
                                }`}
                                style={{
                                  background: isAdmin
                                    ? "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))"
                                    : "transparent",
                                }}
                              >
                                {isAdmin ? "K" : ""}
                              </div>

                              <div>
                                {isAdmin && (
                                  <p className="text-[10px] text-muted-foreground font-semibold mb-1 ml-1 uppercase tracking-wide">
                                    You
                                  </p>
                                )}
                                <div
                                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-full ${
                                    isAdmin
                                      ? "text-white rounded-br-sm"
                                      : "bg-muted/70 text-foreground rounded-bl-sm"
                                  }`}
                                  style={
                                    isAdmin
                                      ? {
                                          background:
                                            "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))",
                                        }
                                      : {}
                                  }
                                >
                                  {m.content}
                                </div>
                                <p
                                  className={`text-[10px] text-muted-foreground mt-1 ${
                                    isAdmin ? "text-right mr-1" : "ml-1"
                                  }`}
                                >
                                  {fmtTime(m.created_at)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border/30 p-4 shrink-0">
              <div className="flex gap-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Type your response… (Enter to send, Shift+Enter for new line)"
                  rows={2}
                  className="flex-1 px-4 py-3 rounded-2xl border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm resize-none bg-background"
                />
                <button
                  onClick={send}
                  disabled={!text.trim() || sending}
                  className="w-12 h-12 self-end rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-40 hover:-translate-y-0.5 shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))",
                  }}
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 card-dreamy flex items-center justify-center text-center">
            <div>
              <MessageCircle className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessagesPage;
