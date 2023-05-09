const all = document.querySelector(".category-all");
const container = document.getElementById("postDataContainer");
const category_title = document.querySelector(".category-title");

const clearPage = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    while (category_title.firstChild) {
        category_title.removeChild(category_title.firstChild)
    }
}

all.addEventListener("click", () => {
    clearPage();
    viewPosts();
})

const viewPosts = async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    }

    const categoryNameElement = document.createElement("h1");
    category_title.appendChild(categoryNameElement);

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

const environment = document.querySelector(".category-environment");
const gardening = document.querySelector(".category-gardening");
const wood = document.querySelector(".category-wood");
const paper = document.querySelector(".category-paper");
const plastic = document.querySelector(".category-plastic");

environment.addEventListener("click", () => {
    clearPage();
    viewByCategory("Environment");
})

gardening.addEventListener("click", () => {
    clearPage();
    viewByCategory("Gardening");
})

wood.addEventListener("click", () => {
    clearPage();
    viewByCategory("Wood");
})

paper.addEventListener("click", () => {
    clearPage();
    viewByCategory("Paper");
})

plastic.addEventListener("click", () => {
    clearPage();
    viewByCategory("Plastic");
})

const viewByCategory = async (category) => {

    const response = await fetch(`http://localhost:3000/posts/search/${category}`);
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    }

    const categoryNameElement = document.createElement("h1");
    category_title.appendChild(categoryNameElement);

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

        categoryNameElement.textContent = category;
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
