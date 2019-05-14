const counter = document.getElementById('counter');
const addButton = document.getElementById('+');
const subtractButton = document.getElementById('-');
const likeButton = document.getElementById('<3');
const likesList = document.querySelector('ul.likes');
const pauseButton = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('list');
let paused = false;

const increment = () => counter.innerHTML = parseInt(counter.innerHTML) + 1;

const decrement = () => counter.innerHTML = parseInt(counter.innerHTML) - 1;

const addLike = () => {
    const currentCount = counter.innerHTML;
    const likeId = 'like-for-' + currentCount;

    if (!!document.getElementById(likeId)) {
        const like = document.getElementById(likeId)
        const newLikeAmount = parseInt(like.getAttribute('data-like-amount')) + 1;
        like.setAttribute('data-like-amount', newLikeAmount)
        like.innerHTML = `${currentCount} has been liked ${newLikeAmount} times.`
    } else {
        const like = document.createElement(`li`);
        like.id = likeId;
        like.setAttribute('data-like-amount', 1);
        likesList.appendChild(like);
        like.innerHTML = `${counter.innerHTML} has been liked 1 time.`
    }
};

const pause = () => {
    if (paused) {
        paused = false;
        interval = setInterval(increment, 1000);
        addButton.addEventListener('click', increment);
        subtractButton.addEventListener('click', decrement);
        likeButton.addEventListener('click', addLike);
        pauseButton.innerHTML = 'pause'
    } else {
        paused = true;
        addButton.removeEventListener('click', increment);
        subtractButton.removeEventListener('click', decrement);
        likeButton.removeEventListener('click', addLike);
        interval = clearInterval(interval)
        pauseButton.innerHTML = 'resume';
    }
};

const submitComment = () => {
    const comment = document.querySelector('input').value;
    if (!!comment) {
        const newComment = document.createElement('p')
        newComment.innerHTML = comment;
        commentList.appendChild(newComment);
    };
};

let interval = setInterval(increment, 1000);
addButton.addEventListener('click', increment);
subtractButton.addEventListener('click', decrement);
likeButton.addEventListener('click', addLike);
pauseButton.addEventListener('click', pause);
commentForm.onsubmit = (e) => {
    submitComment();
    e.preventDefault()
};