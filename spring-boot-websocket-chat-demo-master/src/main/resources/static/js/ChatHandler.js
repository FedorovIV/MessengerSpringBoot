'use strict';

let messageInput = document.getElementById("textareaMessege");

var stompClient = null;
var username = "Ilya Fedorov";

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {

    if(username) {

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

}


function onError(error) {
    console.log("Can not connect to server")
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    if(message.type === 'JOIN') {
        
    } else if (message.type === 'LEAVE') {
       
    } else {
        // messageElement.classList.add('chat-message');

        // var avatarElement = document.createElement('i');
        // var avatarText = document.createTextNode(message.sender[0]);
        // avatarElement.appendChild(avatarText);
        // avatarElement.style['background-color'] = getAvatarColor(message.sender);

        // messageElement.appendChild(avatarElement);

        // var usernameElement = document.createElement('span');
        // var usernameText = document.createTextNode(message.sender);
        // usernameElement.appendChild(usernameText);
        // messageElement.appendChild(usernameElement);
        let element = document.getElementById("example-messege")
        let new_element = element.cloneNode(true);
        new_element.children[1].innerHTML = message.content;

        document.getElementsByClassName("messages")[0].appendChild(new_element);
        console.log("Messege recieved!");
    }


}

connect();

let buttonSend = document.getElementById("send-button")

buttonSend.addEventListener('click', sendMessage, true)
