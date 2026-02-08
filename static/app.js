const tg = window.Telegram.WebApp;
tg.expand();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user || { first_name: "Гость" };
// используем username, если есть, иначе first_name
const username = user.username ? "@" + user.username : user.first_name;

const feed = document.getElementById("feed");
const sendBtn = document.getElementById("sendBtn");
const newPost = document.getElementById("newPost");

async function loadPosts() {
    const res = await fetch('/get_posts');
    const posts = await res.json();
    feed.innerHTML = posts.map(p => `<div><b>${p.user}</b>: ${p.text}</div>`).join('');
}

sendBtn.onclick = async () => {
    const text = newPost.value.trim();
    if (!text) return;
    await fetch('/add_post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text, user: username })
    });
    newPost.value = '';
    loadPosts();
}

// Загружаем посты при старте
loadPosts();
