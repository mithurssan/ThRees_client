const all = document.querySelector(".category-all");

all.addEventListener("click", () => {
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
    const categoryNameElement = document.createElement("h1");
    document.querySelector(".category-title").appendChild(categoryNameElement);

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
        categoryNameElement.classList.add("category-title")
        titleElement.classList.add("title");
        contentElement.classList.add("content");
        categoryElement.classList.add("category-name");
        dateElement.classList.add("category-name");
        timeElement.classList.add("category-name");
        imageElement.classList.add("image");

        categoryNameElement.textContent = "All";
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
    })
}

viewPosts();
