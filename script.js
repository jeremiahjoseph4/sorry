// script.js
// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

// Send message functionality
document.querySelector('.mobile-send').addEventListener('click', sendMessage);

// Allow sending message with Enter key
document.querySelector('.mobile-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.querySelector('.mobile-input');
    const message = input.value.trim();
    
    if (message) {
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        
        // Get current time
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Set message content
        messageElement.innerHTML = `
            ${message}
            <div class="message-time">${timeString}</div>
        `;
        
        // Add message to chat at the bottom (visually appears at top due to flex-direction: column-reverse)
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.insertBefore(messageElement, chatMessages.firstChild);
        
        // Clear input
        input.value = '';
        
        // Keep scroll at bottom to see newest messages
        chatMessages.scrollTop = 0;
    }
}

// Auto-scroll to show newest messages (at the bottom visually)
window.onload = function() {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = 0;
};
