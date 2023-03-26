const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do{
  name = prompt("Enter your name to join the chat =>> ");
} while (!name);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
  }
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

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});


function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
/*function up()
{
  document.getElementById('textarea').style.top= "26rem";
  document.getElementById('textarea').style.height= "8vh";
  document.getElementById('textarea').style.paddingBottom= "0%";
  document.getElementById('textarea').style.marginBottom= "0%";
  messageArea.style.height="22rem";
   
}*/
