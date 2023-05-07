const button = document.querySelector("button");

button.addEventListener("click", (event) => {
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const category = document.getElementById("category");
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    event.preventDefault();
    postForm(title.value, content.value, category.value, file)
})

const postForm = async (post_title, post_content, post_category, post_image) => {
    const formData = new FormData();
    formData.append("post_title", post_title);
    formData.append("post_content", post_content);
    formData.append("post_category", post_category);
    formData.append("image", post_image);

    const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData
    });

    console.log(formData);
    const data = await response.json();
    console.log(data);
    if (data.error) {
        alert(data.error);
    } else {
        alert("Success.")
    }
}

const viewBtn = document.getElementById("viewBtn");

viewBtn.addEventListener("click", (event) => {
    event.preventDefault();
    viewPosts();
})

const viewPosts = async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    }
    const container = document.getElementById("postDataContainer");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    data.forEach(post => {
        let id = post.id;
        const postDataElement = document.createElement("div");

        const titleElement = document.createElement("h2");
        const dateElement = document.createElement("p");
        const timeElement = document.createElement("p");
        const categoryElement = document.createElement("p");
        const imageElement = document.createElement("img");
        const contentElement = document.createElement("p");

        console.log(post);

        postDataElement.classList.add("postDataContainer");
        postDataElement.id = id;
        titleElement.classList.add("title");
        contentElement.classList.add("content");
        categoryElement.classList.add("category");
        dateElement.classList.add("category");
        timeElement.classList.add("category");
        imageElement.classList.add("image");

        titleElement.textContent = post.title;
        dateElement.textContent = post.date;
        timeElement.textContent = post.time;
        contentElement.textContent = post.content;
        categoryElement.textContent = post.category;

        const buffer = new Uint8Array(post.image.data);
        let binary = "";
        for (let i = 0; i < buffer.length; i++) {
            binary += String.fromCharCode(buffer[i]);
        }
        const base64 = btoa(binary);
        const imageUrl = `data:image;base64,${base64}`;
        imageElement.src = imageUrl;

        postDataElement.appendChild(titleElement);
        postDataElement.appendChild(dateElement);
        postDataElement.appendChild(timeElement);
        postDataElement.appendChild(categoryElement);
        postDataElement.appendChild(imageElement);
        postDataElement.appendChild(contentElement);
        container.appendChild(postDataElement);

        const postBoxes = document.getElementById(id);

        postBoxes.addEventListener("click", () => {
            deletePost(id);
        })
    })
}


const deletePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
    });
    if (response.status === 204) {
        alert("Deleted.")
    }
    console.log(response);
}



