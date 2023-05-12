const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        setTimeout(() => {
            window.location.assign("../index.html");
        }, 500);
        showLoginAlert("Logging In...", "success");
    } else {
        showLoginAlert(data.error, "danger");
        // alert(data.error)
        console.error(data.error);
    }
});


const showLoginAlert = (message, type) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.textContent = message;

    loginForm.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1500);
}
