const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let userId = tg.initDataUnsafe.user?.id;
let currentUser = {};

// ارسال داده به ربات
function sendToBot(data) {
  tg.sendData(JSON.stringify(data));
}

// دریافت داده از ربات (وقتی ربات پیام بفرسته)
tg.onEvent('viewportChanged', () => {});
tg.onEvent('mainButtonClicked', () => {});

// لود اطلاعات اولیه
async function loadUser() {
  // اینجا می‌تونی از API رباتت اطلاعات بگیری (با fetch به webhook)
  document.getElementById('user-info').innerHTML = `
    سلام <b>${tg.initDataUnsafe.user?.first_name || 'کاربر'}</b>
  `;
}

// مثال: تغییر وضعیت
document.getElementById('toggle-btn').addEventListener('click', () => {
  sendToBot({ action: 'toggle_status' });
});

// تب‌ها
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// راه‌اندازی اولیه
loadUser();
