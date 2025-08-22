import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Card, 
  TextField, 
  IconButton, 
  Avatar,
  Chip,
  CircularProgress,
  Fade,
  Collapse
} from '@mui/material';
import { Send, Brain, Minimize2, Maximize2, X } from 'lucide-react';
import { aiChatService } from '../../services/aiChatService';

export const AIChat = ({ userId, userName, financialData, isMinimized, onToggleMinimize, onClose }) => {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (!isInitialized && userName) {
      const initialMessage = aiChatService.getInitialMessage(userName);
      setMessages([{
        id: Date.now(),
        type: 'ai',
        content: initialMessage,
        timestamp: new Date()
      }]);
      setIsInitialized(true);
    }
  }, [userName, isInitialized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const userContext = {
        userName: userName || 'User',
        companyName: 'HitFluence Media & Technology Group'
      };

      const aiResponse = await aiChatService.sendMessage(
        userMessage.content,
        userContext,
        financialData
      );

      aiChatService.addToHistory(userMessage.content, aiResponse);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Sorry ${userName}, I'm experiencing some technical difficulties. Please try again in a moment.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (isMinimized) {
    return (
      <Card
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: '280px',
          height: '60px',
          background: 'linear-gradient(135deg, rgba(61,122,229,0.95) 0%, rgba(1,184,227,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '15px',
          cursor: 'pointer',
          zIndex: 1000,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(61,122,229,0.3)'
          },
          transition: 'all 0.3s ease'
        }}
        onClick={onToggleMinimize}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, height: '100%' }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'linear-gradient(45deg, #9513fb, #d22cd6)',
            }}
          >
            <Brain size={18} color="white" />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '12px' }}>
              HitFinance MoneyIQ
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>
              Click to chat with your AI advisor
            </Typography>
          </Box>
          <Chip
            label="AI"
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '8px',
              height: '16px'
            }}
          />
        </Stack>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: '400px',
        height: '600px',
        background: 'rgba(5, 6, 36, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)',
          borderRadius: '20px 20px 0 0'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(45deg, #9513fb, #d22cd6)',
            }}
          >
            <Brain size={20} color="white" />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
              HitFinance MoneyIQ
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  animation: 'pulse 2s infinite'
                }}
              />
              <Typography sx={{ color: '#4ade80', fontSize: '10px', fontWeight: 500 }}>
                AI Financial Advisor Online
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={onToggleMinimize}
              sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              size="small"
            >
              <Minimize2 size={16} />
            </IconButton>
            <IconButton
              onClick={onClose}
              sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              size="small"
            >
              <X size={16} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
          },
        }}
      >
        <Stack spacing={2}>
          {messages.map((message) => (
            <Fade key={message.id} in={true} timeout={500}>
              <Box>
                {message.type === 'ai' ? (
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        background: 'linear-gradient(45deg, #9513fb, #d22cd6)',
                      }}
                    >
                      <Brain size={14} color="white" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Card
                        sx={{
                          p: 2,
                          background: 'linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)',
                          border: '1px solid rgba(61,122,229,0.2)',
                          borderRadius: '12px 12px 12px 4px',
                        }}
                      >
                        <Typography sx={{ color: 'white', fontSize: '12px', lineHeight: 1.5 }}>
                          {message.content}
                        </Typography>
                      </Card>
                      <Typography sx={{ color: '#a4b4cb', fontSize: '8px', mt: 0.5, ml: 1 }}>
                        MoneyIQ • {formatTime(message.timestamp)}
                      </Typography>
                    </Box>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="flex-end">
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Box sx={{ maxWidth: '80%' }}>
                        <Card
                          sx={{
                            p: 2,
                            background: 'linear-gradient(135deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)',
                            borderRadius: '12px 12px 4px 12px',
                          }}
                        >
                          <Typography sx={{ color: 'white', fontSize: '12px', lineHeight: 1.5 }}>
                            {message.content}
                          </Typography>
                        </Card>
                        <Typography sx={{ color: '#a4b4cb', fontSize: '8px', mt: 0.5, textAlign: 'right', mr: 1 }}>
                          You • {formatTime(message.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                )}
              </Box>
            </Fade>
          ))}
          
          {isLoading && (
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  background: 'linear-gradient(45deg, #9513fb, #d22cd6)',
                }}
              >
                <Brain size={14} color="white" />
              </Avatar>
              <Card
                sx={{
                  p: 2,
                  background: 'linear-gradient(135deg, rgba(61,122,229,0.1) 0%, rgba(1,184,227,0.1) 100%)',
                  border: '1px solid rgba(61,122,229,0.2)',
                  borderRadius: '12px 12px 12px 4px',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={12} sx={{ color: '#3d7ae5' }} />
                  <Typography sx={{ color: '#a4b4cb', fontSize: '10px' }}>
                    MoneyIQ is thinking...
                  </Typography>
                </Stack>
              </Card>
            </Stack>
          )}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.02)'
        }}
      >
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <TextField
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask MoneyIQ about your finances, ${userName}...`}
            multiline
            maxRows={3}
            disabled={isLoading}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '12px',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: '1px solid #3d7ae5' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#a4b4cb',
                opacity: 1,
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            sx={{
              width: 40,
              height: 40,
              background: inputMessage.trim() && !isLoading 
                ? 'linear-gradient(135deg, rgba(62,121,229,1) 0%, rgba(1,184,227,1) 100%)'
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              '&:hover': {
                background: inputMessage.trim() && !isLoading 
                  ? 'linear-gradient(135deg, rgba(62,121,229,0.8) 0%, rgba(1,184,227,0.8) 100%)'
                  : 'rgba(255,255,255,0.15)',
              },
              '&:disabled': {
                color: 'rgba(255,255,255,0.3)',
              }
            }}
          >
            <Send size={16} />
          </IconButton>
        </Stack>
        
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {['Profit tips', 'Expense analysis', 'Revenue growth', 'Cash flow'].map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              size="small"
              onClick={() => setInputMessage(suggestion)}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#d2e0f5',
                fontSize: '8px',
                height: '20px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Card>
  );
};
