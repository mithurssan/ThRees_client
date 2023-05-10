const body = document.body;
const input = document.getElementById('name');

input.addEventListener('input', () => {
  if (input.value.toLowerCase() === 'green') {
    body.style.backgroundColor = '#8FBF69';
  } else {
    body.style.backgroundColor = '';
  }
});

const createUserForm = document.getElementById('createUserForm');

createUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const postcode = document.getElementById('postcode').value;
  const password = document.getElementById('password').value;
  const profilePic = document.getElementById('profilePic').files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('postcode', postcode);
  formData.append('password', password);
  formData.append('profilePic', profilePic);

  const response = await fetch('/api/users', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const user = await response.json();
    console.log(user);
    // Do something with the created user
  } else {
    const error = await response.text();
    console.error(error);
    // Handle the error
  }
});


//j