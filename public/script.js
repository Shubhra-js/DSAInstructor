const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) {
        return;
    }

    // Show user message
    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input immediately
    userInput.value = "";

    // Show typing indicator
    chatBox.innerHTML += `
        <p id="typing">
            DSA Bro is typing...
        </p>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove typing indicator
        const typingIndicator = document.getElementById("typing");

        if (typingIndicator) {
            typingIndicator.remove();
        }

        // Show bot reply
        chatBox.innerHTML += `
            <div class="bot-message">
                ${marked.parse(data.reply)}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        const typingIndicator = document.getElementById("typing");

        if (typingIndicator) {
            typingIndicator.remove();
        }

        chatBox.innerHTML += `
            <p><b>DSA Bro:</b> Something went wrong. Please try again.</p>
        `;

        console.error(error);
    }
}

// Send button click
sendBtn.addEventListener("click", sendMessage);

// Press Enter to send
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
document.querySelectorAll(".suggestion-btn").forEach(button => {

    button.addEventListener("click", () => {

        userInput.value = button.innerText;

        sendMessage();

    });

});
chatBox.innerHTML = `
<div class="bot-message">
    <h3>👋 Welcome to DSA Bro</h3>

    <p>I can help you with:</p>

    <ul>
        <li>Arrays</li>
        <li>Linked Lists</li>
        <li>Trees</li>
        <li>Graphs</li>
        <li>Dynamic Programming</li>
        <li>Competitive Programming</li>
    </ul>
</div>
`;