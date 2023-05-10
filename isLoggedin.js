const isLoggedIn = localStorage.getItem("token");
const createPostLink = document.getElementById("createPost");
const userStatus = document.getElementById("status");

if (isLoggedIn) {
    userStatus.textContent = "Log out";
} else {
    createPostLink.style.display = "none";
}

userStatus.addEventListener("click", () => {
    if (userStatus.textContent === "Log out") {
        localStorage.removeItem("token");
    }
})











