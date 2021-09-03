import io from 'socket.io-client'

const socket = io("http://localhost:3001");

socket.on('connected', (err) => {
    console.log(`cagastelight`);
  });

export default socket