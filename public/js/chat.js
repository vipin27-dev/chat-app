document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message");
  const messagesDiv = document.getElementById("messages");
  const userListDiv = document.getElementById("user-list");

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

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = messageInput.value;

    try {
      await axios.post("/api/send-message", {
        userId: localStorage.getItem("userId"),
        message,
      });
      messageInput.value = "";
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  async function fetchMessages() {
    try {
      const response = await axios.get("/api/messages");
      const messages = response.data.messages;
      
      console.log('Fetched messages:', messages); // Debugging log
  
      messagesDiv.innerHTML = messages
        .map((msg) => {
          const userName = msg.user ? msg.user.name : 'Unknown User';
          return `<p>${userName}: ${msg.message}</p>`;
        })
        .join("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  
  fetchUsers();
  fetchMessages();
}
);
