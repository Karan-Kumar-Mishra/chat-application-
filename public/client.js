const socket = io();
let name;
var x = document.getElementById("audio");
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do{
  name = prompt("Enter your name to join the chat =>> ");
  socket.emit('joins',name)
} while (!name);

socket.on('left',(name)=>{
  const para = document.createElement("h3");
  para.innerText = name+" left the chat..";
  usr.appendChild(para);
})
socket.on('come',(name)=>{
  const para = document.createElement("h3");
  para.innerText = name+" join the chat..";
  usr.appendChild(para);
  x.play();
 
})

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
  scrollToBottom();
});
function sendMessage(message) {
  let msg = {
    user: name,
    message: message
  };
  appendMessage(msg, 'outgoing');
  textarea.value = '';
  socket.emit('message', msg);
  scrollToBottom();
}
function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');
  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  x.play();
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
  scrollToBottom();
}
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
function dark(){
  if(document.getElementById('main').style.background=="black")
  {
    document.getElementById('main').style.backgroundImage ="linear-gradient(to right, red,blue)";
    document.getElementById('option').style.backgroundImage ="linear-gradient(to right, red,blue)";
    document.getElementById('users').style.backgroundImage="linear-gradient(to right, red,blue)";
    document.getElementById('usr').style.backgroundImage="linear-gradient(to right, red,blue)";
  }
  else{
    document.getElementById('main').style.background="black";
    document.getElementById('option').style.background ="black";
    document.getElementById('users').style.background ="black";    
    document.getElementById('usr').style.background="black";
  }
  
}
function option(){
  if(document.getElementById('option').style.display=="flex")
  {
    document.getElementById('option').style.display="none";
  }
  else{
    document.getElementById('option').style.display="flex";
  }
  
}
function back(){
  document.getElementById('option').style.display="none";
}
function back_to_users()
{
  document.getElementById('users').style.display="none";
}

function about()
{
    document.getElementById('users').style.display="flex";
}
 
