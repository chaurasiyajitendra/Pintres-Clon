document.querySelector('#show').addEventListener('click', () => {
    const selectedUserId = document.querySelector('#main').getAttribute('data-user-id');
    if (selectedUserId) {
        location.href = `/user/${selectedUserId}`;
    }
});

document.querySelector('#ushow').addEventListener('click', () => {
    const selectedUserId = document.querySelector('#main').getAttribute('data-user-id');
    if (selectedUserId) {
        location.href = `/user/${selectedUserId}`;
    }
});