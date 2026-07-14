const tg = window.Telegram.WebApp;
tg.expand(); tg.ready();

const API_BASE = "https://self-production-6223.up.railway.app"; // ← اینجا عوض کن

let userId = tg.initDataUnsafe?.user?.id;
let userData = {};

// بارگذاری اطلاعات
async function loadData() {
  try {
    const res = await fetch(`${API_BASE}/api/user?user_id=${userId}`);
    userData = await res.json();

    updateStatus();
    renderMain();
  } catch (e) {
    showOfflineMode();
  }
}

function updateStatus() {
  const isActive = userData.status || false;
  document.getElementById('status-text').textContent = isActive ? "فعال" : "خاموش";
  document.getElementById('status-sub').textContent = isActive ? "سلف در حال اجراست" : "سلف متوقف است";
  document.getElementById('status-dot').style.background = isActive ? "#00ff88" : "#ff4757";

  const btn = document.getElementById('toggle-btn');
  btn.innerHTML = `<i class="fas fa-power-off"></i> <span>${isActive ? 'خاموش کردن' : 'روشن کردن سلف'}</span>`;
}

function showOfflineMode() {
  document.getElementById('status-text').textContent = "نامشخص";
  document.getElementById('status-sub').textContent = "اتصال برقرار نشد";
}

// رندر صفحه اصلی
function renderMain() {
  document.getElementById('main').innerHTML = `
    <div class="card glass">
      <h3>💎 موجودی الماس</h3>
      <h2>${userData.diamonds || 0} الماس</h2>
    </div>
    <div class="card glass">
      <h3>👥 رفرال</h3>
      <p>${userData.referral_count || 0} نفر</p>
    </div>
  `;
}

// تب‌ها
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// دکمه سوییچ
document.getElementById('toggle-btn').addEventListener('click', () => {
  tg.sendData(JSON.stringify({ action: "toggle_status" }));
  setTimeout(loadData, 1000);
});

// شروع
document.getElementById('greeting').textContent = `سلام ${tg.initDataUnsafe.user?.first_name || 'دوست عزیز'} ✦`;
loadData();
