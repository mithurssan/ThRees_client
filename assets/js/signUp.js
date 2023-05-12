const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data);
    setTimeout(() => {
      window.location.assign("login.html")
    }, 500);
    showSignupAlert("Signing Up...", "success");
    // Do something with the created user
  } else {
    showSignupAlert(data.error, "danger");
    console.error(data.error);
    // Handle the error
  }
});


const showSignupAlert = (message, type) => {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", `alert-${type}`);
  alertElement.setAttribute("role", "alert");
  alertElement.textContent = message;

  signupForm.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 1500);
}

