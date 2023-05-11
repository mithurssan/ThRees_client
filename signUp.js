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

  if (response.ok) {
    const user = await response.json();
    console.log(user);
    setTimeout(() => {
      window.location.assign("login.html")
    }, 500);
    showSignupAlert("Signing Up...", "Success");
    // Do something with the created user
  } else {
    const error = await response.text();
    console.error(error);
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

