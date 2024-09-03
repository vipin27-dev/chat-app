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

  // Function to fetch messages
  async function fetchMessages() {
    try {
      const response = await axios.get("/api/messages");
      const messages = response.data.messages;

      // Clear the messages div before appending new messages
      messagesDiv.innerHTML = '';

      // Render all messages
      messages.forEach((msg) => {
        const userName = msg.user ? msg.user.name : "Unknown User";
        const newMessageElement = document.createElement("p");
        newMessageElement.textContent = `${userName}: ${msg.message}`;
        messagesDiv.appendChild(newMessageElement);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // Send message event listener
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = messageInput.value;
    
    // Get userId from localStorage
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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Start polling every second to fetch new messages
  setInterval(fetchMessages, 1000);

  // Initial fetch
  fetchUsers();
  fetchMessages();
});
