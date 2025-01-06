import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Typography,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import apiClient from "../../api/apiClient";



function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { sender: 'user', text: input }]);
    const userMessage = input;
    setInput('');

    try {
      // Create FormData and add the input
      const formData = new FormData();
      formData.append('query', userMessage);

      // Make the POST request with query parameters and formData
      const response = await apiClient.post(`/ai/rag-search/`, formData);

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.response || 'Sorry, I could not understand.' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'There was an error processing your message. Please try again.' },
      ]);
    }
  };

  return (
    <Box
      sx={{
        width: "65rem",
        marginLeft:'20px',
        marginRight:'20px',
        height: '600px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      {/* Chat Messages */}
      <Stack
  spacing={3} // Daha fazla boşluk için
  sx={{
    flex: 1,
    overflowY: 'auto',
    padding: 2,
    mb: 2,
    backgroundColor: '#f0f4f8', // Chat alanı için hoş bir arka plan
    borderRadius: '8px', // Chat alanı köşe yumuşatma
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Chat alanına hafif bir gölge
  }}
>
  {messages.map((msg, index) => (
    <Paper
      key={index}
      sx={{
        p: 2,
        maxWidth: '70%',
        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: msg.sender === 'user' ? '#1976d2' : '#ffffff',
        color: msg.sender === 'user' ? '#fff' : '#000',
        borderRadius: msg.sender === 'user' ? '16px 16px 0px 16px' : '16px 16px 16px 0px', // Kullanıcı ve bot için farklı köşe stilleri
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Mesaj balonuna hafif gölge
        position: 'relative',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {msg.sender === 'bot' && <Avatar sx={{ bgcolor: '#1976d2', color: '#fff' }}>AI</Avatar>}
        <Typography sx={{ wordWrap: 'break-word' }}>{msg.text}</Typography>
      </Stack>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: '-20px',
          right: msg.sender === 'user' ? '10px' : 'auto',
          left: msg.sender === 'bot' ? '10px' : 'auto',
          color: '#a0a0a0',
        }}
      >
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Typography>
    </Paper>
  ))}
</Stack>


      {/* Input Field */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Chatbot;
