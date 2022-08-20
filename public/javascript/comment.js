async function commentFormHandler(event) {
    event.preventDefault();

    // get comment text from form
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    // get post id from page url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    // verify comment text exists
    if (comment_text) {
        // make POST request at /api/comments
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check response status
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);