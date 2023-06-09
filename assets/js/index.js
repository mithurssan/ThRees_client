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
    const response = await fetch("https://threes-86h8.onrender.com/posts");
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    }

    const categoryNameElement = document.createElement("h1");
    category_title.appendChild(categoryNameElement);

    data.forEach(post => {

        let id = post.id;
        const postDataElement = document.createElement("div");
        const heading = document.createElement("div");
        const main = document.createElement("div");
        const title_date = document.createElement("div");

        const titleElement = document.createElement("h2");
        const dateElement = document.createElement("p");
        const timeElement = document.createElement("p");

        const categoryElement = document.createElement("p");
        const imageElement = document.createElement("img");
        const contentElement = document.createElement("p");

        postDataElement.classList.add("postDataContainer");
        heading.classList.add("post-header");
        title_date.classList.add("post-header");
        main.classList.add("post-main");

        postDataElement.id = id;
        categoryNameElement.classList.add("category-title")
        titleElement.classList.add("title");
        contentElement.classList.add("content");
        categoryElement.classList.add("category-name");
        dateElement.classList.add("date-time");
        timeElement.classList.add("date-time");
        imageElement.classList.add("image");

        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        const time = post.time;
        const [hour, minute, second] = time.split(':');
        const updatedHour = Number(hour) + 1;
        const onlySeconds = second.slice(0, 2);
        const timeString = `${updatedHour}:${minute}:${onlySeconds}`;

        categoryNameElement.textContent = "All";
        titleElement.textContent = post.title;
        dateElement.textContent = `Date: ${dateString}`;
        timeElement.textContent = `Time: ${timeString}`;
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

        postDataElement.appendChild(heading);

        heading.appendChild(title_date);
        title_date.appendChild(titleElement);
        title_date.appendChild(dateElement);
        title_date.appendChild(timeElement);

        heading.appendChild(categoryElement);

        postDataElement.appendChild(main);
        main.appendChild(imageElement);
        main.appendChild(contentElement);

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
    
    const response = await fetch(`https://threes-86h8.onrender.com/posts/search/${category}`);
    const data = await response.json();
    if (data.error) {
        alert(data.error);
    }

    const categoryNameElement = document.createElement("h1");
    category_title.appendChild(categoryNameElement);

    data.forEach(post => {

        let id = post.id;
        const postDataElement = document.createElement("div");
        const heading = document.createElement("div");
        const main = document.createElement("div");
        const title_date = document.createElement("div");

        const titleElement = document.createElement("h2");
        const dateElement = document.createElement("p");
        const timeElement = document.createElement("p");

        const categoryElement = document.createElement("p");
        const imageElement = document.createElement("img");
        const contentElement = document.createElement("p");

        console.log(post);

        postDataElement.classList.add("postDataContainer");
        heading.classList.add("post-header");
        title_date.classList.add("post-header");
        main.classList.add("post-main");

        postDataElement.id = id;
        categoryNameElement.classList.add("category-title")
        titleElement.classList.add("title");
        contentElement.classList.add("content");
        categoryElement.classList.add("category-name");
        dateElement.classList.add("date-time");
        timeElement.classList.add("date-time");
        imageElement.classList.add("image");

        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

        const time = post.time;
        const [hour, minute, second] = time.split(':');
        const updatedHour = Number(hour) + 1;
        const onlySeconds = second.slice(0, 2);
        const timeString = `${updatedHour}:${minute}:${onlySeconds}`;

        categoryNameElement.textContent = category;
        titleElement.textContent = post.title;
        dateElement.textContent = `Date: ${dateString}`;
        timeElement.textContent = `Time: ${timeString}`;
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

        postDataElement.appendChild(heading);

        heading.appendChild(title_date);
        title_date.appendChild(titleElement);
        title_date.appendChild(dateElement);
        title_date.appendChild(timeElement);

        heading.appendChild(categoryElement);

        postDataElement.appendChild(main);
        main.appendChild(imageElement);
        main.appendChild(contentElement);

        container.appendChild(postDataElement);
    })
}
viewPosts();
