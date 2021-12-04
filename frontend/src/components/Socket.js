import io from 'socket.io-client'

const socket = io("https://chira-project.herokuapp.com/");

export default socket