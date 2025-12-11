import { useState, useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'

// ChatBot Component
const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [typingMessage, setTypingMessage] = useState("")
  const [isShowingTypingEffect, setIsShowingTypingEffect] = useState(false)
  const chatEndRef = useRef(null)
  const typingIntervalRef = useRef(null)

  // Initialize with empty messages
  useEffect(() => {
    setMessages([])
    setTimeout(() => setIsInitialized(true), 100)
  }, [])

  // Auto-scroll ONLY within chat container (not the whole page)
  useEffect(() => {
    if (isInitialized && (messages.length > 1 || isTyping || isShowingTypingEffect)) {
      const currentScrollY = window.scrollY
      setTimeout(() => {
        const chatContainer = chatEndRef.current?.parentElement
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight
        }
        window.scrollTo(0, currentScrollY)
      }, 0)
      setTimeout(() => {
        window.scrollTo(0, currentScrollY)
      }, 100)
    }
  }, [messages, isTyping, isInitialized, typingMessage, isShowingTypingEffect])

  // Fixed typing effect function
  const typeMessage = (fullMessage) => {
    setIsShowingTypingEffect(true)
    setTypingMessage("")
    let currentIndex = 0
    let displayedText = ""
    const typingSpeed = 30
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        displayedText += fullMessage[currentIndex]
        setTypingMessage(displayedText)
        currentIndex++
      } else {
        clearInterval(typingIntervalRef.current)
        setIsShowingTypingEffect(false)
        setTypingMessage("")
        setMessages((prev) => [...prev, { from: "bot", text: fullMessage }])
      }
    }, typingSpeed)
  }

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isTyping || isShowingTypingEffect) return
    const userMsg = { from: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)
    try {
      const res = await fetch("https://n8n.srv967587.hstgr.cloud/webhook/9fcbabb7-1153-42be-9bdb-80b80a8d282d", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          message: trimmed,
          query: trimmed,
          input: trimmed,
          text: trimmed
        }),
      })
      let botReply = "No response"
      const contentType = res.headers.get("content-type") || ""
      
      if (contentType.includes("application/json")) {
        const data = await res.json()
        console.log("Webhook response:", data) // Debug log
        
        // Try multiple possible response fields
        botReply = data.response || 
                  data.reply || 
                  data.message || 
                  data.text || 
                  data.output || 
                  data.result || 
                  data.answer ||
                  (data.data && data.data.response) ||
                  (data.data && data.data.reply) ||
                  (data.data && data.data.message) ||
                  JSON.stringify(data) // Fallback to show full response
      } else {
        const textResponse = await res.text()
        console.log("Webhook text response:", textResponse) // Debug log
        botReply = textResponse || "No response received"
      }
      setIsTyping(false)
      typeMessage(botReply)
    } catch (e) {
      setIsTyping(false)
      typeMessage("⚠️ Failed to reach the server.")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const currentScrollY = window.scrollY
      handleSend()
      setTimeout(() => {
        window.scrollTo(0, currentScrollY)
      }, 0)
      setTimeout(() => {
        window.scrollTo(0, currentScrollY)
      }, 50)
    }
  }

  const styles = {
    chatSection: {
      background: "#111",
      padding: 12,
      borderRadius: 12,
      width: "100%",
      height: "100%",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxSizing: "border-box",
      margin: 0,
    },
    heading: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      color: "#fff",
      margin: 0,
    },
    subHeading: {
      fontSize: "0.9rem",
      color: "#bbb",
      marginBottom: 6,
      margin: 0,
    },
    divider: {
      borderBottom: "1px solid #333",
      marginBottom: 4,
    },
    chatBox: {
      background: "#1a1a1a",
      borderRadius: 12,
      padding: 8,
      height: "350px", // Increased height for mobile
      minHeight: "350px",
      maxHeight: "500px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      "@media (min-width: 1024px)": {
        height: 500
      }
    },
    startMessageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    startMessage: {
      color: "#888",
      fontSize: "0.95rem",
      textAlign: "center",
    },
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      flex: 1,
    },
    bubble: {
      padding: "10px 14px",
      borderRadius: 16,
      maxWidth: "75%",
      fontSize: "0.95rem",
      lineHeight: 1.4,
    },
    bot: {
      background: "#2a2a2a",
      color: "#fff",
    },
    user: {
      background: "#c0c5ce",
      color: "#000",
    },
    inputBar: {
      display: "flex",
      marginTop: 6,
      gap: 8,
    },
    input: {
      flex: 1,
      padding: "12px 16px", // Increased padding for mobile touch
      borderRadius: 20,
      border: "none",
      outline: "none",
      background: "#222",
      color: "#fff",
      fontSize: "16px", // Prevent zoom on iOS
      minHeight: "44px", // iOS touch target minimum
    },
    sendBtn: {
      background: "#c0c5ce",
      border: "none",
      borderRadius: "50%",
      width: 44, // Increased for better mobile touch
      height: 44,
      minWidth: 44,
      minHeight: 44,
      color: "#000",
      cursor: "pointer",
      fontSize: "1.1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#ccc",
      animation: "blink 1.2s infinite",
    },
    cursor: {
      animation: "cursor-blink 1s infinite",
      marginLeft: 2,
      color: "#c0c5ce",
      fontWeight: "bold",
    },
  }

  return (
    <div style={styles.chatSection}>
      <style>{`
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* Mobile-specific styles */
        @media (max-width: 1023px) {
          .chat-container {
            height: 350px !important;
          }
          .chat-input {
            font-size: 16px !important; /* Prevent zoom on iOS */
            -webkit-appearance: none;
          }
          .chat-button {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
          .chat-container {
            height: 500px !important;
          }
        }
      `}</style>
      {/* Title */}
      <div style={styles.heading}>Real Estate & Property Investment</div>
      <div style={styles.subHeading}>🏠 What's on your mind regarding Real Estate & Property Investment?</div>
      <div style={styles.divider} />
      {/* Chat Area */}
      <div style={styles.chatBox} className="chat-container">
        {messages.length === 0 ? (
          <div style={styles.startMessageContainer}>
            <div style={styles.startMessage}>Start the conversation with our Sara</div>
          </div>
        ) : (
          <div style={styles.messagesContainer}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.bubble,
                  ...(m.from === "user" ? styles.user : styles.bot),
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  ...styles.bubble,
                  ...styles.bot,
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  gap: 6,
                }}
              >
                <span style={{ ...styles.dot, animationDelay: "0s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.15s" }} />
                <span style={{ ...styles.dot, animationDelay: "0.3s" }} />
              </div>
            )}
            {isShowingTypingEffect && (
              <div
                style={{
                  ...styles.bubble,
                  ...styles.bot,
                  alignSelf: "flex-start",
                }}
              >
                {typingMessage}
                <span style={styles.cursor}>|</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>
      {/* Input */}
      <div style={styles.inputBar}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Real Estate & Property Investment..."
          style={{ ...styles.input, outline: "none" }}
          className="chat-input"
          onKeyDown={handleKeyDown}
          disabled={isTyping || isShowingTypingEffect}
        />
        <button
          onClick={handleSend}
          onMouseDown={(e) => e.preventDefault()}
          style={styles.sendBtn}
          className="chat-button"
          disabled={isTyping || isShowingTypingEffect}
        >
          ➤
        </button>
      </div>
    </div>
  )
}

const AIRealEstateAgent = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneSubmitted, setPhoneSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [particles, setParticles] = useState([])

  // Initialize particles with dynamic positions
  useEffect(() => {
    const initializeParticles = () => {
      const newParticles = []
      
      // Small floating particles
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: `small-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.3,
          glowIntensity: Math.random() * 20 + 10,
          type: 'small'
        })
      }
      
      // Large glowing orbs
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: `large-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 15,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          glowIntensity: Math.random() * 40 + 30,
          type: 'large'
        })
      }
      
      // Medium floating particles
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: `medium-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 3,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.25,
          glowIntensity: Math.random() * 15 + 10,
          type: 'medium'
        })
      }
      
      setParticles(newParticles)
    }

    initializeParticles()
  }, [])

  // Animate particles continuously
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Wrap around screen edges
          if (newX > 100) newX = -5
          if (newX < -5) newX = 100
          if (newY > 100) newY = -5
          if (newY < -5) newY = 100

          return {
            ...particle,
            x: newX,
            y: newY
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50) // Update every 50ms for smooth animation
    return () => clearInterval(interval)
  }, [particles.length])

  const PHONE_WEBHOOK_URL = 'https://n8n.srv967587.hstgr.cloud/webhook/08a7035b-899f-47d9-b70e-88d39a020393'

  const callWebhook = async (data) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Webhook error:', error)
      throw error
    }
  }

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    try {
      setError(null)
      
      // Send phone number to your webhook
      const response = await fetch(PHONE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          timestamp: new Date().toISOString(),
          source: 'AI Real Estate Agent',
          type: 'phone_submission'
        })
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      setPhoneSubmitted(true)
      setError(null)
    } catch (error) {
      console.error('Phone webhook error:', error)
      setError('Failed to submit phone number. Please try again.')
    }
  }



  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2 lg:p-8 pt-24 lg:pt-32 relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/images/Section%202.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dynamic Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full transition-all duration-75 ease-linear"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.type === 'large' 
                ? 'radial-gradient(circle, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.6), rgba(255, 140, 0, 0.3), transparent)'
                : particle.type === 'medium'
                ? 'radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.5), transparent)'
                : 'radial-gradient(circle, #FFD700, #FFA500)',
              boxShadow: particle.type === 'large'
                ? `
                    0 0 ${particle.glowIntensity}px rgba(255, 215, 0, 0.9),
                    0 0 ${particle.glowIntensity * 2}px rgba(255, 165, 0, 0.7),
                    0 0 ${particle.glowIntensity * 3}px rgba(255, 140, 0, 0.5)
                  `
                : `
                    0 0 ${particle.glowIntensity}px #FFD700,
                    0 0 ${particle.glowIntensity * 2}px #FFA500,
                    0 0 ${particle.glowIntensity * 3}px #FF8C00
                  `,
              animation: `pulse 2s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Simple CSS Animations for Dynamic Particles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
      {/* Main Container Box - Mobile Responsive */}
      <div className="w-full max-w-7xl min-h-[600px] lg:h-[800px] bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/10">
        {/* Left Section - Agent Profile - Mobile Responsive */}
        <div className="w-full lg:w-96 bg-black/30 backdrop-blur-sm flex flex-col p-4 lg:p-8">
          {/* Agent Image - Mobile Responsive */}
          <div className="relative mb-4 lg:mb-6 flex justify-center">
            <div className="w-32 h-32 lg:w-64 lg:h-64 relative">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl shadow-cyan-400/30">
                <img 
                  src="/images/Saraa.png" 
                  alt="Sara - AI Real Estate Agent"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-300/50 animate-pulse"></div>
            </div>
          </div>

          {/* Agent Info */}
          <div className="text-white mb-8">
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed text-center px-4">
                Your dedicated AI Real Estate Assistant, powered by advanced technology to help you discover the perfect property and lucrative investment opportunities.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold text-lg">500+</div>
                  <div className="text-gray-400 text-xs">Properties Matched</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold text-lg">98%</div>
                  <div className="text-gray-400 text-xs">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number Form */}
          <div className="space-y-6 mt-auto">
            <div className="text-center mb-6">
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Get Personalized Assistance</h3>
              <p className="text-gray-300 text-sm leading-relaxed px-2">Share your number for exclusive property updates</p>
            </div>
            
            {!phoneSubmitted ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/25 focus:border-cyan-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-700"
                >
                  Call Me
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-green-400 font-medium">Thank you!</p>
                <p className="text-gray-400 text-sm mt-1">We'll send you exclusive property updates</p>
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Chat Interface - Mobile Responsive */}
        <div className="flex-1 bg-black/30 backdrop-blur-sm p-3 lg:p-6 min-h-[450px] lg:min-h-0">
          <ChatBot />
        </div>
      </div>
    </div>
  )
}

export default AIRealEstateAgent
