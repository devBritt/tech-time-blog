async function newFormHandler(event) {
    event.preventDefault();

    // retrieve input from form
    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-content').value.trim();

    // make api request
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            post_text,
            title
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // verify response
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
