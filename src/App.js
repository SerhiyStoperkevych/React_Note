import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const socket = io('http://localhost:4000');

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.on('load', (data) => {
      setContent(data);
    });

    socket.on('update', (data) => {
      setContent(data);
    });

    return () => {
      socket.off('load');
      socket.off('update');
    };
  }, []);

  const handleChange = (value) => {
    setContent(value);
    socket.emit('edit', value);
  };

  return (
    <div className="App">
      <h1>Collaborative Story Writing</h1>
      <ReactQuill value={content} onChange={handleChange} />
    </div>
  );
}

export default App;
