document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message");
  const messagesDiv = document.getElementById("messages");
  const userListDiv = document.getElementById("user-list");

  // Function to fetch users
  async function fetchUsers() {
    try {
      const response = await axios.get("/api/users");
      const users = response.data.users;
      userListDiv.innerHTML = users
        .map((user) => `<p>${user.name}</p>`)
        .join("");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Function to render messages to the DOM
  function renderMessages(messages) {
    messagesDiv.innerHTML = ''; // Clear previous messages
    messages.forEach((msg) => {
      const userName = msg.user ? msg.user.name : "Unknown User";
      const newMessageElement = document.createElement("p");
      newMessageElement.textContent = `${userName}: ${msg.message}`;
      messagesDiv.appendChild(newMessageElement);
    });
  }

  // Function to fetch all messages from local storage
  function fetchMessagesFromLocalStorage() {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    renderMessages(storedMessages);
  }

  // Function to save messages to local storage
  function saveMessagesToLocalStorage(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  // Function to fetch new messages from the backend
  async function fetchNewMessages() {
    try {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const lastMessage = storedMessages[storedMessages.length - 1];
      const lastMessageId = lastMessage ? lastMessage.id : 0;

      const response = await axios.get(`/api/messages?lastMessageId=${lastMessageId}`);
      const newMessages = response.data.messages;

      if (newMessages.length > 0) {
        const updatedMessages = [...storedMessages, ...newMessages];
        const recentMessages = updatedMessages.slice(-10); // Keep only the last 10 messages

        saveMessagesToLocalStorage(recentMessages);
        renderMessages(recentMessages);
      }
    } catch (error) {
      console.error("Error fetching new messages:", error);
    }
  }

  // Send message event listener
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = messageInput.value;

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in local storage.");
      return;
    }

    try {
      await axios.post("/api/send-message", {
        userId,
        message,
      });
      messageInput.value = "";

      fetchNewMessages(); // Fetch new messages after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Initialize the chat
  fetchUsers();
  fetchMessagesFromLocalStorage(); // Load messages from local storage on initial load
  setInterval(fetchNewMessages, 1000); // Poll for new messages every second
});
