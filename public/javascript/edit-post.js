async function editFormHandler(event) {
    event.preventDefault();

    // get post id from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // retrieve input from form
    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-content').value.trim();

    // make api put request
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // verify response status
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

async function deleteFormHandler(event) {
    event.preventDefault();
    
    // get post id from window
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(id);
    
    // make api delete request
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    
    // verify response status
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-post').addEventListener('click', deleteFormHandler);