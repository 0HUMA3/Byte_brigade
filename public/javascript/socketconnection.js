const socket = io();

        const onlineInfo = document.getElementById("online-info");
        const messageContainer = document.getElementById("message-container");
        const messageForm = document.getElementById("input-section");
        const messageInput = document.getElementById("message-input");

socket.on("online",(data)=>{
    onlineInfo.innerText=`Online: ${data}`;
});

messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(messageInput.value==="")return;
    const data ={
        message : messageInput.value,
        name: `<%= name %>`,
        dateTime : new Date()
    }
    socket.emit('message',data);
    addMessage(true,data);
    messageInput.value="";
})

socket.on('chat-msg',(data)=>{
    addMessage(false,data);
});

function addMessage(isownmessage,data){
    clearfeedback();
    const element =`
    <li class=${isownmessage ? "message-right" : "message-left"}>
        <p class="message">${data.message}
            <span>${data.name} ● ${data.dateTime}</span>
        </p>
    </li>
    `
    messageContainer.innerHTML += element;  
    scrollToBottom();
}

function scrollToBottom (){
    messageContainer.scrollTo(0,messageContainer.scrollHeight);
}

messageInput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{
        feedback : `<%= name %> is typing`
    })
});

messageInput.addEventListener('keypress',(e)=>{
    socket.emit('feedback',{
        feedback : `<%= name %> is typing`
    })
});

messageInput.addEventListener('blur',(e)=>{
    socket.emit('feedback',{
        feedback : ''
    })
});

socket.on('feedback',(data)=>{
    clearfeedback();
    const element = `
        <li class='message-feedback'>
        <p class='feedback'>${data.feedback}</p>
        </li>
    `
    messageContainer.innerHTML+=element;
});

function clearfeedback (){
    document.querySelectorAll('li.message-feedback').forEach(element=>{
        element.parentNode.removeChild(element);
    })
}