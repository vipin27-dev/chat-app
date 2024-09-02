// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await axios.post("/api/login", {  // Ensure correct path
          email,
          password,
        });

        alert(response.data.message);

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred during login. Please try again.");
        }
        console.error("Error during login:", error);
      }
    });
  }
});
