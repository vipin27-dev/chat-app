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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("Sending message with userId:", userId); // Debugging log

    try {
      if (!userId) {
        console.error("User ID is not set");
        return;
      }

      await axios.post("/api/send-message", {
        userId,
        message,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

      messagesDiv.innerHTML = messages
        .map((msg) => {
          const userName = msg.user ? msg.user.name : "Unknown User";
          return `<p>${userName}: ${msg.message}</p>`;
        })
        .join("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  fetchUsers();
  fetchMessages();
});
