# AI Real Estate Agent - Design Document

## Overview

The AI Real Estate Agent page will be a modern, interactive chat interface featuring a two-column layout with an agent profile section and chat interface. The design emphasizes premium real estate branding with glassmorphic elements and smooth animations.

## Architecture

### Component Structure
```
AIRealEstateAgent (Main Page Component)
├── AgentProfile (Left Section)
│   ├── ProfileCard
│   ├── PhoneNumberForm
│   └── SubmissionStatus
└── ChatInterface (Right Section)
    ├── ChatHeader
    ├── MessageList
    │   ├── WelcomeMessage
    │   ├── UserMessage
    │   ├── AIMessage
    │   └── TypingIndicator
    └── MessageInput
```

### Route Integration
- Route: `/ai-agent`
- Navigation menu item: "Your AI Real Estate Agent"
- Component: `AIRealEstateAgent.jsx`

## Components and Interfaces

### 1. AIRealEstateAgent (Main Component)

**Props:** None

**State:**
```javascript
{
  messages: Array<{id: string, type: 'user'|'ai', content: string, timestamp: Date}>,
  phoneNumber: string,
  phoneSubmitted: boolean,
  isTyping: boolean,
  error: string | null,
  currentMessage: string
}
```

**Key Methods:**
- `handlePhoneSubmit(phoneNumber: string)` - Submits phone to webhook
- `handleMessageSend(message: string)` - Sends chat message to webhook
- `addMessage(type: 'user'|'ai', content: string)` - Adds message to chat
- `callWebhook(data: object)` - Makes API call to webhook

### 2. AgentProfile Component

**Props:**
```javascript
{
  onPhoneSubmit: (phone: string) => void,
  isSubmitted: boolean,
  error: string | null
}
```

**Features:**
- Agent profile image (placeholder)
- Agent name and bio
- Phone number input with validation
- Submit button with loading states
- Success/error feedback

### 3. ChatInterface Component

**Props:**
```javascript
{
  messages: Array<Message>,
  onMessageSend: (message: string) => void,
  isTyping: boolean,
  error: string | null
}
```

**Features:**
- Chat header with title and description
- Scrollable message area
- Message bubbles with alternating alignment
- Typing indicator
- Fixed input field at bottom
- Send button with icon

### 4. Message Components

**UserMessage Props:**
```javascript
{
  content: string,
  timestamp: Date
}
```

**AIMessage Props:**
```javascript
{
  content: string,
  timestamp: Date
}
```

## Data Models

### Message Model
```javascript
interface Message {
  id: string;
  type: 'user' | 'ai' | 'welcome';
  content: string;
  timestamp: Date;
}
```

### Webhook Request Model
```javascript
// Phone submission
interface PhoneSubmission {
  type: 'phone';
  phoneNumber: string;
  timestamp: string;
}

// Chat message
interface ChatMessage {
  type: 'message';
  message: string;
  timestamp: string;
  sessionId?: string;
}
```

### Webhook Response Model
```javascript
interface WebhookResponse {
  success: boolean;
  response?: string;
  error?: string;
}
```

## Error Handling

### Error Types
1. **Network Errors** - Webhook unavailable
2. **Validation Errors** - Invalid phone number format
3. **API Errors** - Webhook returns error response
4. **Timeout Errors** - Request takes too long

### Error Display Strategy
- **Phone Submission Errors**: Show below phone input field
- **Chat Errors**: Show as system message in chat
- **Network Errors**: Show retry button with error message
- **Validation Errors**: Real-time validation feedback

### Retry Logic
- Automatic retry for network timeouts (max 3 attempts)
- Manual retry button for failed messages
- Exponential backoff for repeated failures

## Testing Strategy

### Unit Tests
- Component rendering tests
- State management tests
- Webhook integration tests
- Form validation tests
- Message formatting tests

### Integration Tests
- End-to-end chat flow
- Phone number submission flow
- Error handling scenarios
- Responsive design tests

### Manual Testing Scenarios
1. **Happy Path**: Submit phone → Send messages → Receive responses
2. **Error Scenarios**: Network failures, invalid inputs, webhook errors
3. **Responsive Testing**: Desktop, tablet, mobile layouts
4. **Accessibility**: Keyboard navigation, screen reader compatibility

## Visual Design Specifications

### Layout Structure

#### Desktop Layout (≥1024px)
```
┌─────────────────────────────────────────────────────────────┐
│                        Navigation                            │
├──────────────────┬──────────────────────────────────────────┤
│                  │  Chat Header                             │
│  Agent Profile   │  ┌─────────────────────────────────────┐ │
│  ┌─────────────┐ │  │                                     │ │
│  │   Avatar    │ │  │        Message Area                 │ │
│  │             │ │  │        (Scrollable)                 │ │
│  │   Name      │ │  │                                     │ │
│  │   Bio       │ │  │                                     │ │
│  │             │ │  └─────────────────────────────────────┘ │
│  │ Phone Input │ │  ┌─────────────────────────────────────┐ │
│  │   Submit    │ │  │        Message Input                │ │
│  └─────────────┘ │  └─────────────────────────────────────┘ │
└──────────────────┴──────────────────────────────────────────┘
```

#### Mobile Layout (<768px)
```
┌─────────────────────────────────────┐
│            Navigation               │
├─────────────────────────────────────┤
│         Agent Profile               │
│  ┌─────────────────────────────────┐│
│  │   Avatar    Name    Bio         ││
│  │   Phone Input    Submit         ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│           Chat Interface            │
│  ┌─────────────────────────────────┐│
│  │        Message Area             ││
│  │        (Scrollable)             ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │        Message Input            ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Color Scheme
- **Background**: Dark gradient (`from-gray-900 via-gray-800 to-gray-900`)
- **Cards**: Glassmorphic (`bg-white/10 backdrop-blur-lg`)
- **Primary**: Emerald gradient (`from-emerald-500 to-teal-500`)
- **Text Primary**: `text-white`
- **Text Secondary**: `text-gray-300`
- **Borders**: `border-white/20`

### Typography
- **Headers**: `text-2xl font-bold`
- **Subheaders**: `text-lg font-semibold`
- **Body**: `text-base font-normal`
- **Captions**: `text-sm text-gray-400`

### Spacing & Sizing
- **Container**: `max-w-7xl mx-auto px-4`
- **Card Padding**: `p-6 lg:p-8`
- **Gap Between Sections**: `gap-8`
- **Border Radius**: `rounded-2xl`
- **Avatar Size**: `w-20 h-20`

### Animation Specifications
- **Message Appear**: Slide up with fade-in (300ms ease-out)
- **Typing Indicator**: Pulsing dots animation
- **Button Hover**: Scale 1.02 with shadow increase
- **Card Hover**: Subtle glow effect
- **Transitions**: All transitions 300ms ease-in-out

## Implementation Notes

### Webhook Integration Details

#### Endpoint
`https://vaglee.app.n8n.cloud/webhook/8a2de851-78db-46b7-a0f7-c2fefdc27577`

#### Request Format
```javascript
// Phone submission
{
  "type": "phone",
  "phoneNumber": "+1234567890",
  "timestamp": "2024-01-01T12:00:00Z"
}

// Chat message
{
  "type": "message", 
  "message": "I'm looking for a 2BHK apartment in Mumbai",
  "timestamp": "2024-01-01T12:00:00Z",
  "sessionId": "unique-session-id"
}
```

#### Response Handling
- Success: Display response text as AI message
- Error: Show error message and retry option
- Timeout: Show "AI is thinking..." then retry

### State Management
- Use React useState for local component state
- Session storage for temporary conversation persistence
- No persistent storage required (as per requirements)

### Performance Considerations
- Lazy load chat messages for long conversations
- Debounce typing indicators
- Optimize re-renders with React.memo where appropriate
- Implement virtual scrolling for very long chat histories

### Accessibility Features
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader announcements for new messages
- High contrast mode compatibility
- Focus management for modal states

### Security Considerations
- Input sanitization for all user inputs
- Phone number format validation
- Rate limiting for webhook calls
- HTTPS enforcement for all requests
- No sensitive data storage in localStorage