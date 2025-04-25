document.querySelector('#logout').addEventListener('mouseover', () => {
    document.querySelector('#logout').innerHTML = 'Log out';
});
document.querySelector('#logout').addEventListener('mouseout', () => {
    document.querySelector('#logout').innerHTML = '<i class="ri-logout-circle-r-line"></i>';
});