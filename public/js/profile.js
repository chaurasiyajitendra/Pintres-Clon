const toast = document.getElementById('toast');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');
var cards = document.querySelectorAll('.card');
let selectedPostId = null;

cards.forEach(card => {
    card.addEventListener('dblclick', () => {
        selectedPostId = card.getAttribute('data-post-id'); // Assuming each card has a data-post-id attribute
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 10000); // Hide the toast after 10 seconds
    });
});

cancelBtn.addEventListener('click', () => {
    toast.classList.remove('visible');
});

deleteBtn.addEventListener('click', () => {
    if (selectedPostId) {
        location.href = `/Deletepost/${selectedPostId}`;
    }
});


