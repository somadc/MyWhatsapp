import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/syn").then((response) => {
      setMessages(response.data);
    });
  }, [] );

  useEffect(() => {
    const pusher = new Pusher('dc42d0d8f18ca63682ac', {
      cluster: 'ap2'
    });
  
  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage) => {
    // alert(JSON.stringify(newMessage));
    setMessages([...messages, newMessage]);
  });

  return() => {
    channel.unbind_all();
    channel.unsubscribe();
  };
  }, [messages]);
  console.log(messages);


  return (
    <div className="app">
      {/* <h1>Let"s build a mern whatsapp clone</h1> */}
      <div className="app_body">
      {/* Sidebar */}
      <Sidebar />

      {/* chat */}
      <Chat messages={messages} />
</div>
      
    </div>
  );
}

export default App;
