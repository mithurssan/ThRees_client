const createUserForm = document.querySelector('#createUserForm');

createUserForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(createUserForm);

  fetch('/api/users', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    alert('User created successfully!');
    createUserForm.reset();
  })
  .catch(error => {
    console.error(error);
  });
});
