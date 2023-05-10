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
    postcodeTitle.innerHTML = postcode.toUpperCase();
    const url = `http://localhost:3000/waste/${postcode}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
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
        fetch("http://localhost:3000/waste", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filteredData)
        })
        .then(response => {
            if (response.ok) {
                console.log("Success:", response);

                addRecyclingForm.reset();
                addGeneralForm.reset();
                addCompostForm.reset();
                clearAddForm()

            } else {
                alert("Error:", err.message);
            }
        })
        .catch(error => {
            alert("Error:", error.message);
        });

    } else {
        alert("Error: At least day between and collection date pair must be provided.");
    }

});


// addForm.addEventListener('submit', async (e) => {
//     e.preventDefault();


//     const data = {
//         waste_postcode: e.target.postcode.value,
//         recycling_days: e.target.recyclingDays.value,
//         recycling_last_collection: e.target.recyclingDate.value,
//         general_days: e.target.generalDays.value,
//         general_last_collection: e.target.generalDate.value,
//         compost_days: e.target.compostDays.value,
//         compost_last_collection: e.target.compostDate.value
//     };

// const filteredData = Object.fromEntries(
//     Object.entries(data)
//         .filter(([key, value]) => value !== "" && value !== null && value !== undefined)
// );

    // fetch("http://localhost:3000/waste", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(filteredData)
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             console.log("Success:", response);
    //             addForm.reset();
    //         } else {
    //             console.error("Error:", response.status);
    //             addForm.reset();
    //         }
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });

// });

// updateForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const postcode = e.target.postcode.value;

//     const data = {
//         recycling_days: e.target.recyclingDays.value,
//         recycling_last_collection: e.target.recyclingDate.value,
//         general_days: e.target.generalDays.value,
//         general_last_collection: e.target.generalDate.value,
//         compost_days: e.target.compostDays.value,
//         compost_last_collection: e.target.compostDate.value
//     };

//     const filteredData = Object.fromEntries(
//         Object.entries(data)
//             .filter(([key, value]) => value !== "" && value !== null && value !== undefined)
//     );

//     fetch(`http://localhost:3000/waste/${postcode}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(filteredData)
//     })
//         .then(response => {
//             if (response.ok) {
//                 console.log("Success:", response);
//                 updateForm.reset();
//             } else {
//                 console.error("Error:", response.status);
//             }
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             updateForm.reset();
//         });

// });



function clearInput(formId) {
    var getValue = document.getElementById(formId);
    if (getValue.value != "") {
        getValue.value = "";
    }
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
