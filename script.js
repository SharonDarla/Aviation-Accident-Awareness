
function toggleChatbot() {
    var chatContainer = document.getElementById('chat-container');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
}

function sendMessage() {
    var input = document.getElementById('chat-input');
    var message = input.value.trim();  // Trim whitespace from input
    if (message) {
        addMessage('user', message);
        getResponse(message);
        input.value = '';
    }
}

function addMessage(sender, message) {
    var chatBody = document.getElementById('chat-body');
    var messageElement = document.createElement('div');
    messageElement.className = 'chat-message ' + sender;
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getResponse(message) {
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        addMessage('bot', data.response);
    })
    .catch(error => {
        console.error('Error fetching response:', error);
    });
}
