const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  const userId = form.getAttribute('data-user-id');
  
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user.');
    }
    
    alert('User updated successfully.');
  } catch (error) {
    console.error(error);
    alert('An error occurred while updating the user.');
  }
});
