const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete');
    }
  }
};

// Update button event listener
const updateButtons = document.querySelectorAll('.update-btn');
updateButtons.forEach(button => {
    button.addEventListener('click', async function() {
        const postId = button.getAttribute('data-post-id');
        
        // Fetch blog post data based on postId
        const response = await fetch(`/api/blogs/${postId}`);
        const postData = await response.json();

        // Populate form fields with blog post data
        document.querySelector('#blog-title').value = postData.title;
        document.querySelector('#blog-content').value = postData.content;

        // Update blog post on form submission
        document.querySelector('.new-blog-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedTitle = document.querySelector('#blog-title').value.trim();
            const updatedContent = document.querySelector('#blog-content').value.trim();

            const updateResponse = await fetch(`/api/blogs/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (updateResponse.ok) {
                // Provide feedback to user or refresh the page
                alert('Blog post updated successfully');
                document.location.reload();
            } else {
                alert('Failed to update blog post');
            }
        });
    });
});


document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

// document
//   .querySelector('.new-update-form')
//   .addEventListener('submit', newFormHandler);