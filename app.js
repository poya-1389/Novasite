const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

const API_BASE = "https://your-bot-domain.onrender.com"; // یا آدرس Railway

let userId = tg.initDataUnsafe.user?.id;

async function fetchUserData() {
  try {
    const res = await fetch(`${API_BASE}/api/user?user_id=${userId}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    // بروزرسانی وضعیت
    document.getElementById('status-text').textContent = data.status ? 'فعال' : 'خاموش';
    document.getElementById('status-sub').textContent = data.status ? 'سلف در حال اجراست' : 'سلف خاموش است';

    // دکمه
    const btn = document.getElementById('toggle-btn');
    btn.textContent = data.status ? 'خاموش کردن سلف' : 'روشن کردن سلف';
    btn.style.background = data.status ? 
      'linear-gradient(90deg, #ff3b5c, #ff6b6b)' : 
      'linear-gradient(90deg, #00ff9d, #00cc77)';

  } catch (e) {
    console.error(e);
  }
}

// ارسال دستور به ربات
function sendAction(action) {
  tg.sendData(JSON.stringify({ action: action }));
}

// لود اولیه
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('greeting').textContent = `سلام ${tg.initDataUnsafe.user?.first_name || ''} 👋`;
  fetchUserData();
});
