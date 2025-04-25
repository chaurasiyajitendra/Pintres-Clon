const cards = document.querySelectorAll('.feedcard');
let selectedPostId = null;
cards.forEach(card =>{
    card.addEventListener('click',()=>{
        selectedPostId = card.getAttribute('data-post-id');
        if(selectedPostId)
        {
            location.href = `/show/${selectedPostId}`;
        }
    });
});