document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message");
  const messagesDiv = document.getElementById("messages");
  const userListDiv = document.getElementById("user-list");

  // Initialize Socket.io
  const socket = io();

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
      const userName = msg.user && msg.user.name ? msg.user.name : "Unknown User";
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

  // Handle incoming messages from the server
  socket.on('chatMessage', (msg) => {
    console.log('Message received from server:', msg);

    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const updatedMessages = [...storedMessages, msg];
    const recentMessages = updatedMessages.slice(-10); // Keep only the last 10 messages

    saveMessagesToLocalStorage(recentMessages);
    renderMessages(recentMessages);
  });

  // Send message event listener
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (!userId) {
      console.error("User ID not found in local storage.");
      return;
    }

    try {
      const response = await axios.post("/api/send-message", { userId, message, userName });

      // Emitting the message with user information to the server
      const sentMessage = response.data.data; // Assuming the server response contains the message with user info
      socket.emit('chatMessage', sentMessage); // Emit the message with user info to the server

      messageInput.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Initialize the chat
  fetchUsers();
  fetchMessagesFromLocalStorage(); // Load messages from local storage on initial load
});
