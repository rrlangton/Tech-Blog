async function updateBlogPost(event) {
  const title = document.getElementById("updated-title").value;
  const content = document.getElementById("updated-content").value;
  const id = event.target.getAttribute("data-id");
 
  event.preventDefault();

  const updateResponse = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (updateResponse.ok) {
    // Provide feedback to user or refresh the page
    alert("Blog post updated successfully");
    document.location.replace('/profile');
  } else {
    alert("Failed to update blog post");
  }
}

document
  .querySelector(".update-blog")
  .addEventListener("submit", updateBlogPost);
