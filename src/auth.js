const validPassword = '****';
const sessionDuration = 5 * 60 * 1000; // 5 минут

function checkAuth() {
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const currentTime = Date.now();

    if (lastLoginTime && (currentTime - lastLoginTime) > sessionDuration) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('lastLoginTime');
        alert('Ваша сессия истекла. Пожалуйста, войдите снова.');
        window.location.href = '/'; // Перенаправление на страницу логина
    } else if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log('Вы уже авторизованы!');
    }
}

window.onload = checkAuth;
