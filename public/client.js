const socket = io();
let name;
var x = document.getElementById("audio");
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
var currentDate = new Date();
do{
  name = prompt("Enter your name to join the chat =>> ");
  socket.emit('joins',name)
} while (!name);

socket.on('left',(name)=>{
  const para = document.createElement("h3");
  para.innerText = name+" left the chat.. ";
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
function color(){
  if( document.getElementById('main').style.backgroundColor=="black")
  {
    document.getElementById('main').style.backgroundColor="#172634";
    document.getElementById('option').style.backgroundColor ="#172634";
    document.getElementById('users').style.backgroundColor ="#172634";    
    document.getElementById('usr').style.backgroundColor="#172634";
  }
  else{
    document.getElementById('main').style.backgroundColor="black";
    document.getElementById('option').style.backgroundColor ="black";
    document.getElementById('users').style.backgroundColor ="black";    
    document.getElementById('usr').style.backgroundColor="black";
  }
  
}
function theam(){
  document.getElementById('set_color').style.display="flex";
  1
    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('input', function() {
    document.getElementById('main').style.backgroundColor=colorPicker.value;
    document.getElementById('option').style.backgroundColor =colorPicker.value;
    document.getElementById('users').style.backgroundColor =colorPicker.value;    
    document.getElementById('usr').style.backgroundColor=colorPicker.value;
    });
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
function color_back(){
  document.getElementById('set_color').style.display="none";
}
