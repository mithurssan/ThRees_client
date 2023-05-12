const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("post-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    postForm(title, content, category, file);
})

const postForm = async (post_title, post_content, post_category, post_image) => {
    const formData = new FormData();
    formData.append("post_title", post_title);
    formData.append("post_content", post_content);
    formData.append("post_category", post_category);
    formData.append("post_image", post_image);

    const response = await fetch("https://threes-86h8.onrender.com/posts", {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("token")
        },
        body: formData
    });

    console.log(formData);
    const data = await response.json();
    console.log(data);
    if (data.error) {
        showAlert(data.error, "danger");
    } else {
        showAlert("Post submitted!", "success");
        form.reset();
    }
}


const showAlert = (message, type) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.textContent = message;

    form.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1500);
}



// const viewBtn = document.getElementById("viewBtn");

// viewBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     viewPosts();
// })

// const viewPosts = async () => {
//     const response = await fetch("http://localhost:3000/posts");
//     const data = await response.json();
//     if (data.error) {
//         alert(data.error);
//     }
//     const container = document.getElementById("postDataContainer");
//     while (container.firstChild) {
//         container.removeChild(container.firstChild);
//     }

//     data.forEach(post => {
//         let id = post.id;
//         const postDataElement = document.createElement("div");

//         const titleElement = document.createElement("h2");
//         const dateElement = document.createElement("p");
//         const timeElement = document.createElement("p");
//         const categoryElement = document.createElement("p");
//         const imageElement = document.createElement("img");
//         const contentElement = document.createElement("p");

//         console.log(post);

//         postDataElement.classList.add("postDataContainer");
//         postDataElement.id = id;
//         titleElement.classList.add("title");
//         contentElement.classList.add("content");
//         categoryElement.classList.add("category");
//         dateElement.classList.add("category");
//         timeElement.classList.add("category");
//         imageElement.classList.add("image");

//         titleElement.textContent = post.title;
//         dateElement.textContent = post.date;
//         timeElement.textContent = post.time;
//         contentElement.textContent = post.content;
//         categoryElement.textContent = post.category;

//         const buffer = new Uint8Array(post.image.data);
//         let binary = "";
//         for (let i = 0; i < buffer.length; i++) {
//             binary += String.fromCharCode(buffer[i]);
//         }
//         const base64 = btoa(binary);
//         const imageUrl = `data:image;base64,${base64}`;
//         imageElement.src = imageUrl;

//         postDataElement.appendChild(titleElement);
//         postDataElement.appendChild(dateElement);
//         postDataElement.appendChild(timeElement);
//         postDataElement.appendChild(categoryElement);
//         postDataElement.appendChild(imageElement);
//         postDataElement.appendChild(contentElement);
//         container.appendChild(postDataElement);

//         const postBoxes = document.getElementById(id);

//         postBoxes.addEventListener("click", () => {
//             deletePost(id);
//         })
//     })
// }


// const deletePost = async (id) => {
//     const response = await fetch(`http://localhost:3000/posts/${id}`, {
//         method: "DELETE"
//     });
//     if (response.status === 204) {
//         alert("Deleted.")
//     }
//     console.log(response);
// }



