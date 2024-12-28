const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const user_name = prompt("Enter your name to join");

var audio = new Audio('./short-woosh-109592.mp3'); 

const append = (message,position)=>{
   
 const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left' || position  == 'center');
    audio.play();
};
socket.emit('new-user-joined', user_name);

socket.on('user-joined',name =>{
append(`${name} joined the chat` , 'right');
})

socket.on('receive', data =>{
    
    append(`${data.name} : ${data.message}  ` , 'left');
    })
    
form.addEventListener('submit' , (e)=>
{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message);
    messageInput.value = '';
})
socket.on('left', name =>{
        
    append(`${name} has left the chat `,'center');
    })