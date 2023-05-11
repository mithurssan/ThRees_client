const addRecyclingForm = document.getElementById('add-recycling-form')
const addGeneralForm = document.getElementById('add-general-form')
const addCompostForm = document.getElementById('add-compost-form')

const addNewPostcode = document.getElementById('add-new-postcode')
const backButton = document.querySelectorAll('.add-back-btn')
const addRestartBtn = document.getElementById('add-restart-button');
const addList = document.getElementById('listAdd')


let addData = {
    waste_postcode: null,
    recycling_days: null,
    recycling_last_collection: null,
    general_days: null,
    general_last_collection: null,
    compost_days: null,
    compost_last_collection: null
};

addRecyclingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    addData = { recycling_days: e.target.days.value, recycling_last_collection: e.target.date.value, waste_postcode: e.target.postcode.value }

    addRecyclingForm.style.display = 'none';
    addGeneralForm.style.display = 'flex'
})

addGeneralForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    addData = { ...addData, general_days: e.target.days.value, general_last_collection: e.target.date.value }

    addGeneralForm.style.display = 'none'
    addCompostForm.style.display = 'flex'
})

addCompostForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    addData = { ...addData, compost_days: e.target.days.value, compost_last_collection: e.target.date.value }

    addCompostForm.style.display = 'none'
    addSubmitForm.style.display = 'flex'
    for (const key in addData) {
        if (key !== 'postcode') {
            const listItem = document.createElement('li');
            listItem.textContent = `${key}: ${addData[key]}`;
            addList.appendChild(listItem);
        }
    }

    addNewPostcode.innerHTML = addData.waste_postcode
})


backButton.forEach((button) =>{
    button.addEventListener('click', ()=>{
        if (addCompostForm.style.display === 'flex') {
            addCompostForm.style.display = 'none';
            addGeneralForm.style.display = 'flex';
            addData.compost_days = null;
            addData.compost_last_collection = null;
            addList.innerHTML = '';
            addNewPostcode.innerHTML = '';
        } else if (addGeneralForm.style.display === 'flex') {
            addGeneralForm.style.display = 'none';
            addRecyclingForm.style.display = 'flex';
            addData.general_days = null;
            addData.general_last_collection = null;
            addList.innerHTML = '';
            addNewPostcode.innerHTML = '';
        }
    })
})


addRestartBtn.addEventListener('click', () => {
    clearAddForm();
});

function clearAddForm(){
    addRecyclingForm.style.display = 'flex';
    addGeneralForm.style.display = 'none';
    addCompostForm.style.display = 'none';
    addSubmitForm.style.display = 'none';
    addList.innerHTML = '';
    addNewPostcode.innerHTML = '';
    addData = {
        waste_postcode: null,
        recycling_days: null,
        recycling_last_collection: null,
        general_days: null,
        general_last_collection: null,
        compost_days: null,
        compost_last_collection: null
    };

};
