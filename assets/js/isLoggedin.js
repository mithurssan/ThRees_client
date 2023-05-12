const token = localStorage.getItem("token");
const createPostLink = document.getElementById("createPost");
const userStatus = document.getElementById("status");

console.log(token);
if (token) {
    userStatus.textContent = "Log out";
} else {
    createPostLink.style.display = "none";
}

userStatus.addEventListener("click", async (event) => {
    event.preventDefault();
    
    if (userStatus.textContent === "Log out") {
        const response = await fetch(`https://threes-86h8.onrender.com/users/token/${token}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            localStorage.removeItem("token");
            userStatus.textContent === "Log In";
            setTimeout(() => {
                window.location.assign("../index.html");
            }, 500);
            showLogoutAlert("Logging Out...", "danger");
        }
    } else {
        userStatus.textContent === "Log In";
        window.location.assign("/pages/login.html");
    }
});

const navbar = document.querySelector(".navbar");

const showLogoutAlert = (message, type) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.textContent = message;

    navbar.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1500);
}

