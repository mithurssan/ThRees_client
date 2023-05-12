const localURL = "http://localhost:3000/waste"


const postcodeForm = document.getElementById('postcode-form');
const addForm = document.getElementById('create-form');
const updateForm = document.getElementById('patch-form');
const addSubmitForm = document.getElementById('add-submit-new')


const postcodeTitle = document.getElementById('postcode-title');
const showList = document.getElementById('waste-data');

postcodeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    postcodeTitle.innerHTML = ""
    let postcode = document.getElementById('postcode-search').value;
    const url = `https://threes-86h8.onrender.com/waste/${postcode}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('house-img').style.display = 'none'
            postcodeTitle.innerHTML = postcode.toUpperCase();
            showList.innerHTML = '';
            for (const key in data) {

                const wasteType = capitalise(key.split('_')[0])

                if (data[key] !== null && data[key] !== undefined && key.includes('_next_collection')) {
                    const date = new Date(data[key]);
                    const li = document.createElement('li');
                    li.textContent = `${(wasteType)} next collection: ${date.toDateString()}`;
                    showList.appendChild(li);

                }
                else if (data[key] !== null && data[key] !== undefined && key.includes('_last_collection')) {
                    const date = new Date(data[key]);
                    const li = document.createElement('li');
                    li.textContent = `${(wasteType)} last collection: ${date.toDateString()}`;
                    showList.appendChild(li);

                }
                else if ((data[key] === null || data[key] === undefined) && (key.includes('_next_collection') || key.includes('_last_collection'))) {
                    const li = document.createElement('li');
                    li.textContent = `${wasteType} collection: Not available`;
                    showList.appendChild(li);

                }
            }

            postcodeForm.reset();
        })
        .catch((error) => {
            console.error(error)
            postcodeForm.reset();

        });

});

addSubmitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const filteredData = Object.fromEntries(
        Object.entries(addData)
            .filter(([key, value]) => value !== "" && value !== null && value !== undefined)

    );
    console.log(filteredData);

    // Check if at least one _days and _last_collection pair exists
    const hasWasteData = (
        (filteredData.recycling_days && filteredData.recycling_last_collection) ||
        (filteredData.general_days && filteredData.general_last_collection) ||
        (filteredData.compost_days && filteredData.compost_last_collection)

    );

    if (hasWasteData) {
        fetch("https://threes-86h8.onrender.com/waste", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(filteredData)
        })
            .then(response => {
                if (response.ok) {
                    showAlert("Added!", "success");
                    setTimeout(() => {
                        console.log("Success:", response);
                        addRecyclingForm.reset();
                        addGeneralForm.reset();
                        addCompostForm.reset();

                        clearAddForm();
                    }, 700);

                } else {
                    response.text().then(error => {
                        const parseError = JSON.parse(error);
                        showAlert(parseError.error, "danger");
                    }).catch(error => {
                        console.error(error);
                    });
                    // alert("Error:", err.message);
                }
            })
            .catch(error => {
                alert("Error:", error.message);
            });

    } else {
        showAlert("Error: At least day between and collection date pair must be provided.", "danger");
        // alert("Error: At least day between and collection date pair must be provided.");
    }

});


updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // const postcode = e.target.postcode.value;

    const postcode = document.getElementById("postcode-patch").value;
    const wasteType = document.getElementById("waste-type").value;
    const wasteDays = document.getElementById("update-days").value;
    const wasteDate = document.getElementById("update-date").value;

    const data = {
        [`${wasteType}_days`]: wasteDays,
        [`${wasteType}_last_collection`]: wasteDate,
        waste_postcode: postcode
    }

    try {
        const response = await fetch(`https://threes-86h8.onrender.com/waste/${postcode}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        });

        const dataField = await response.json();

        if (response.ok) {
            showUpdateAlert("Updated!", "success");
            setTimeout(() => {
                console.log("Success:", response);
                updateForm.reset();
            }, 700);
        } else {
            showUpdateAlert(dataField.error, "danger");

            // console.error("Error:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
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

const showAlert = (message, type) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("errorHandlerAdd");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.textContent = message;

    addSubmitForm.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1500);
}

const showUpdateAlert = (message, type) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("errorHandler");
    alertElement.classList.add("alert", `alert-${type}`);
    alertElement.setAttribute("role", "alert");
    alertElement.textContent = message;

    updateForm.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1500);
}

