async function loginFormHandler(event) {
    event.preventDefault();

    // get data from form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // verify email, password exist
    if (email && password) {
        // make POST request at /api/users/ to verify user from db
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

async function signupFormHandler(event) {
    event.preventDefault();

    // get data from form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // verify username, email, password exist
    if (username && email && password) {
        // make POST request at /api/users/ to add user to db
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check response status
        if (response.ok) {
            console.log('success');
            // automatically log in
            const loginResponse = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (loginResponse.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);