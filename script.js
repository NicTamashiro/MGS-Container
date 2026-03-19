// ══════════════ NAV SCROLL ══════════════
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ══════════════ REVEAL ON SCROLL ══════════════
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ══════════════ FAQ ACCORDION ══════════════
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// ══════════════ MOBILE MENU ══════════════
function openMobileMenu() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// close mobile menu on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

document.getElementById('mobileMenu').addEventListener('click', function (e) {
  if (e.target === this) closeMobileMenu();
});

// ══════════════ FORM SUBMIT ══════════════
function submitForm() {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = '#e05a5a';
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
  });

  if (!valid) {
    alert('Por favor, preencha todos os campos antes de enviar.');
    return;
  }

  alert('✅ Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
  inputs.forEach(input => input.value = '');
}

// ══════════════ FORM VALIDATION – BOTÃO DESABILITADO ATÉ PREENCHER TUDO ══════════════
(function () {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

  function checkForm() {
    const allFilled = [...fields].every(f => f.value.trim() !== '');
    submitBtn.disabled = !allFilled;
  }

  // Estado inicial: desabilitado
  checkForm();

  // Reavalia a cada digitação/seleção
  fields.forEach(f => f.addEventListener('input', checkForm));
  fields.forEach(f => f.addEventListener('change', checkForm));
})();