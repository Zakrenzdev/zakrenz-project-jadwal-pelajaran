// Create By Zakrenz Modder [ Leader Team C - 99 ]
// ===========================
// Smooth scroll untuk anchor link internal
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// Real-time Clock + Show Jadwal Hari Ini
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const now = new Date();
  const hariIni = days[now.getDay()];
  const btn = document.getElementById("lihat-jadwal-btn");
  const jamEl = document.getElementById("jam");
  const tanggalEl = document.getElementById("tanggal");

  function updateClock() {
    const date = new Date();
    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");
    const detik = String(date.getSeconds()).padStart(2, "0");

    const tanggal = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    jamEl.textContent = `${jam}:${menit}:${detik}`;
    tanggalEl.textContent = tanggal;
  }

  setInterval(updateClock, 1000);
  updateClock();

  btn.addEventListener("click", () => {
    const semuaCard = document.querySelectorAll(".jadwal-card");
    semuaCard.forEach(card => {
      const hariCard = card.getAttribute("data-hari");
      card.classList.add("hidden");
      if (hariCard === hariIni) {
        card.classList.remove("hidden");
      }
    });
    document.getElementById("jadwal").scrollIntoView({ behavior: "smooth" });
  });
});

// ===========================
// Login Logic with animation & toggle edit icon
// ===========================
const masukBtn = document.getElementById("masukBtn");
const loginPage = document.getElementById("loginPage");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const backBtn = document.getElementById("backBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

masukBtn.addEventListener("click", () => {
  loginPage.classList.remove("hidden", "close-anim");
  loginPage.classList.add("open-anim");
});

backBtn.addEventListener("click", () => {
  loginPage.classList.remove("open-anim");
  loginPage.classList.add("close-anim");
  setTimeout(() => {
    loginPage.classList.add("hidden");
  }, 300);
});

usernameInput.addEventListener("input", () => {
  usernameInput.value = usernameInput.value.replace(/\s/g, "");
});

passwordInput.addEventListener("input", () => {
  passwordInput.value = passwordInput.value.replace(/\s/g, "");
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = usernameInput.value.trim();
  const pass = passwordInput.value.trim();

  if (user === "ZakrenzModderZapX" && pass === "Found2010") {
    loginError.style.color = "lightgreen";
    loginError.textContent = "Berhasil login...";

    setTimeout(() => {
      loginPage.classList.remove("open-anim");
      loginPage.classList.add("close-anim");
      setTimeout(() => loginPage.classList.add("hidden"), 300);

      masukBtn.textContent = "Your Admin";
      document.querySelectorAll(".admin-edit-tools").forEach(el => el.classList.remove("hidden"));
      document.querySelectorAll(".edit-btn").forEach(el => el.classList.remove("hidden"));

      showEditButtons();
    }, 1000);
  } else {
    loginError.style.color = "#f66";
    loginError.textContent = "Username atau password salah.";
  }
});

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword
    ? '<i class="fas fa-eye"></i>'
    : '<i class="fas fa-eye-slash"></i>';
});

// ===========================
// Theme toggle
// ===========================
const themeBtn = document.querySelector('.theme-btn');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    // Ganti icon
    if (body.classList.contains('light-mode')) {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});
// ===========================
// Edit Button Logic
// ===========================
function showEditButtons() {
  document.querySelectorAll('.jadwal-card').forEach((card) => {
    if (card.querySelector('.edit-btn')) return;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.style.position = 'absolute';
    editBtn.style.top = '10px';
    editBtn.style.right = '10px';
    editBtn.style.background = 'transparent';
    editBtn.style.border = 'none';
    editBtn.style.cursor = 'pointer';
    editBtn.style.color = 'white';

    editBtn.addEventListener('click', () => toggleEditMode(card, editBtn));
    card.style.position = 'relative';
    card.appendChild(editBtn);
  });
}

function toggleEditMode(card, btn) {
  const listItems = card.querySelectorAll('.mapel-list li');
  const isEditing = card.classList.contains('editing');

  if (!isEditing) {
    card.classList.add('editing');
    btn.innerHTML = '<i class="fas fa-save"></i>';
    listItems.forEach((li) => {
      const icon = li.querySelector('i');
      const text = li.textContent.trim();
      const input = document.createElement('input');
      input.type = 'text';
      input.value = text.replace(icon.textContent, '').trim();
      li.innerHTML = '';
      li.appendChild(icon);
      li.appendChild(input);
    });
  } else {
    card.classList.remove('editing');
    btn.innerHTML = '<i class="fas fa-pen"></i>';
    listItems.forEach((li) => {
      const icon = li.querySelector('i');
      const input = li.querySelector('input');
      const newText = input.value;
      li.innerHTML = '';
      li.appendChild(icon);
      li.append(' ' + newText);
    });
  }
}
