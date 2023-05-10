const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('Username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const user = await response.json();
    console.log(user);
    window.location.assign("login.html")
    // Do something with the created user
  } else {
    const error = await response.text();
    console.error(error);
    // Handle the error
  }
});
