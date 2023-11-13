const socket = io();

const clientstotal = document.getElementById('client-total');
const msgInput = document.getElementById('message-input');
const msgContainer = document.getElementById('container');
const msgForm = document.getElementById('message');
const nameInput = document.getElementById('input-name');

msgForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendMessage();
})

socket.on('client-total', (data) =>{
    clientstotal.innerText = `Total Clients ${data}`;
});

function sendMessage(){
    if(msgInput.value === '') return
 //console.log(msgInput.value);
 const data = {
    name: nameInput.value,
    message: msgInput.value,
    dateTime: new Date(),
 }
 
 socket.emit('message', data);
 addMessageUI(true, data);
 msgInput.value = '';
}

socket.on('chat-message', (data) =>{
 addMessageUI(false, data);
})
 
function addMessageUI(isownmessage, data){
 clearMessages()
    const element = `
         <li class="${isownmessage ? 'left' : 'right'}">
            <p class="message">
             ${data.message}
            <span>${data.name} • ${moment(data.dateTime).fromNow()} </span>
             </p>
        </li>
        `   
        msgContainer.innerHTML += element ;
    ScrolltoBottom();
}
function ScrolltoBottom(){
    msgContainer.scrollTo(0, msgContainer.scrollHeight);
}

    msgInput.addEventListener('focus',(e) =>{
        socket.emit('feedback',{
          feedback:`✏ ${nameInput.value} is typing a message`      
        })

    })
    msgInput.addEventListener('keypress',(e) =>{
        socket.emit('feedback',{
            feedback:`✏ ${nameInput.value} is typing a message`      
          })
    })
    msgInput.addEventListener('blur',(e) =>{
        socket.emit('feedback',{
            feedback:''     
          })
    })

    socket.on('feedback', (data) =>{
        clearMessages()
        const element = ` 
          </li>
         <li class="message-feedback">
         <p class="feedback" id="feedback"> ${data.feedback}</p>
        </li>
        `
        msgContainer.innerHTML += element
    })

    function clearMessages(){
        document.querySelectorAll('li.message-feedback').forEach(element => {
            element.parentNode.removeChild(element)
        });

    }