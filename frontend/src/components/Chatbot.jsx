import React, { useState, useRef, useEffect } from "react";
import { BotMessageSquare, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I assist you on **SafeLoop** today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Reference for auto-scrolling to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://safeloop-o0pc.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botResponse = data.reply || data.response;

      if (botResponse) {
        setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, I couldn't process that. Please try again.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to SafeLoop assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  <style>
    {`
    @keyframes glow {
      from {
        box-shadow:
          0 0 6px rgba(211, 119, 242, 0.3),
          0 0 12px rgba(211, 119, 242, 0.1);
      }
      to {
        box-shadow:
          0 0 12px rgba(211, 119, 242, 0.5),
          0 0 28px rgba(211, 119, 242, 0.3),
          0 0 40px rgba(99, 102, 241, 0.15);
      }
    }
  `}
  </style>;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        right: "16px",
        zIndex: 1000,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Floating Toggle Button */}
      {!isOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "2px",
          }}
        >
          {/* Wanna Talk Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff, #fdf4ff)",
              color: "#7c3aed",
              padding: "9px 16px",
              borderRadius: "14px",
              fontSize: "13px",
              fontWeight: 700,
              boxShadow:
                "0 0 8px rgba(211, 119, 242, 0.7), 0 0 18px rgba(211, 119, 242, 0.5), 0 4px 15px rgba(79, 70, 229, 0.2)",
              position: "relative",
              animation: "glow 1.4s ease-in-out infinite alternate",
              border: "1px solid rgba(211, 119, 242, 0.35)",
            }}
          >
            Wanna talk?
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                right: "25px",
                width: "8px",
                height: "8px",
                backgroundColor: "#fdf4ff",
                transform: "rotate(45deg)",
                boxShadow: "3px 3px 8px rgba(211, 119, 242, 0.25)",
              }}
            />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: "#d377f2",
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow:
                "0 10px 25px -5px rgba(79, 70, 229, 0.6), 0 8px 10px -6px rgba(79, 70, 229, 0.5)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <BotMessageSquare size={30} />
          </button>
        </div>
      )}

      {/* Chatbot Popup Window */}
      {isOpen && (
        <div
          style={{
            width: "min(400px, calc(100vw - 24px))",
            height: "min(580px, calc(100vh - 100px))",
            minHeight: "400px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* SafeLoop Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #d377f2 0%, #3730a3 100%)",
              color: "#ffffff",
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  padding: "6px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BotMessageSquare size={22} color="#ffffff" />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  SafeLoop AI <Sparkles size={14} color="#fcd34d" />
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#c7d2fe",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#34d399",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                  Online Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#ffffff",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#f8fafc",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#4f46e5" : "#ffffff",
                  color: msg.sender === "user" ? "#ffffff" : "#1e293b",
                  padding: "10px 14px",
                  borderRadius:
                    msg.sender === "user"
                      ? "16px 16px 2px 16px"
                      : "16px 16px 16px 2px",
                  maxWidth: "82%",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  boxShadow:
                    msg.sender === "user"
                      ? "0 2px 4px rgba(79, 70, 229, 0.2)"
                      : "0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p style={{ margin: 0, padding: 0 }} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          style={{ margin: "4px 0", paddingLeft: "18px" }}
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          style={{ margin: "4px 0", paddingLeft: "18px" }}
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li style={{ marginBottom: "2px" }} {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#ffffff",
                  color: "#64748b",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <Sparkles size={14} className="animate-spin" color="#6366f1" />
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Bar */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #e2e8f0",
              padding: "10px 12px",
              backgroundColor: "#ffffff",
            }}
          >
            <input
              type="text"
              placeholder="Ask SafeLoop AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "8px 10px",
                fontSize: "14px",
                color: "#0f172a",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                backgroundColor:
                  loading || !input.trim() ? "#c7d2fe" : "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
