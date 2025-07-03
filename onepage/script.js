// Navegación con desplazamiento suave
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animación de revelado al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-700');
  observer.observe(el);
});

// Filtrado de portafolio
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Datos de las cuentas bancarias
const cuentas = {
  Bancolombia: '0000000000',
  Daviplata: '1111111111',
  Davivienda: '2222222222',
  Nequi: '3333333333',
  Rappi: '4444444444',
  BBVA: '5555555555'
};

// Mostrar número de cuenta según banco seleccionado
const bancoSelect = document.getElementById('banco');
if (bancoSelect) {
  const datosBanco = document.getElementById('datos-banco');
  const nombreBanco = document.getElementById('nombre-banco');
  const numeroCuenta = document.getElementById('numero-cuenta');

  bancoSelect.addEventListener('change', () => {
    const banco = bancoSelect.value;
    if (cuentas[banco]) {
      datosBanco.classList.remove('hidden');
      nombreBanco.textContent = banco;
      numeroCuenta.textContent = cuentas[banco];
    } else {
      datosBanco.classList.add('hidden');
    }
  });
}

// Animación de barras de habilidad
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const pct = bar.getAttribute('data-percentage');
      bar.style.width = pct + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-percentage]').forEach(bar => {
  bar.style.width = '0';
  bar.classList.add('transition-all', 'duration-700');
  skillObserver.observe(bar);
});
