const localURL = "http://localhost:3000/waste"

const form = document.getElementById('postcode-form');
const title = document.getElementById('postcode-title');
const ul = document.getElementById('waste-data');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    title.innerHTML = ""
    let postcode = document.getElementById('postcode-search').value;
    title.innerHTML = postcode.toUpperCase();
    const url = `http://localhost:3000/waste/${postcode}`;
    clearInput('postcode-search')
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            ul.innerHTML = '';
            for (const key in data) {

                const wasteType = capitalise(key.split('_')[0])

                if (data[key] !== null && data[key] !== undefined && key.includes('_next_collection')) {
                    const date = new Date(data[key]);
                    const li = document.createElement('li');
                    li.textContent = `${(wasteType)} next collection: ${date.toDateString()}`;
                    ul.appendChild(li);

                } 
                else if (data[key] !== null && data[key] !== undefined && key.includes('_last_collection')) {
                    const date = new Date(data[key]);
                    const li = document.createElement('li');
                    li.textContent = `${(wasteType)} last collection: ${date.toDateString()}`;
                    ul.appendChild(li);

                } 
                else if (data[key] === null || data[key] === undefined) {
                    const li = document.createElement('li');
                    li.textContent = `${(wasteType)} collection: Not available`;
                    ul.appendChild(li);
                }
            }

        })
        .catch((error) => {
            console.error(error)
        });
});

function clearInput(formId) {
    var getValue = document.getElementById(formId);
    if (getValue.value != "") {
        getValue.value = "";
    }
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
