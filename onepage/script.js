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
function setupReveal(selector, hiddenClass) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
        entry.target.classList.remove(hiddenClass);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('opacity-0', hiddenClass, 'transition', 'duration-700');
    obs.observe(el);
  });
}

setupReveal('.reveal', 'translate-y-4');
setupReveal('.reveal-left', '-translate-x-4');
setupReveal('.reveal-right', 'translate-x-4');

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

// Modal de inscripción
const modal = document.getElementById('modal-inscripcion');
const cerrarModal = document.getElementById('cerrar-inscripcion');
const formInscripcion = document.getElementById('form-inscripcion');
const nombreCurso = document.getElementById('nombre-curso');

if (modal && cerrarModal && formInscripcion) {
  document.querySelectorAll('.btn-inscripcion').forEach(btn => {
    btn.addEventListener('click', () => {
      const curso = btn.getAttribute('data-curso');
      if (nombreCurso) nombreCurso.textContent = curso;
      modal.classList.remove('hidden');
    });
  });

  cerrarModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  formInscripcion.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.add('hidden');
    alert('Datos enviados');
  });
}

// Modal CV
const modalCv = document.getElementById('modal-cv');
const btnCv = document.getElementById('btn-cv');
const cerrarCv = document.getElementById('cerrar-cv');

if (modalCv && btnCv && cerrarCv) {
  btnCv.addEventListener('click', () => {
    modalCv.classList.remove('hidden');
  });

  cerrarCv.addEventListener('click', () => {
    modalCv.classList.add('hidden');
  });
}

// Modal para servicios
const modalService = document.getElementById('modal-service');
const closeService = document.getElementById('close-service');
const serviceTitle = document.getElementById('service-title');
const serviceText = document.getElementById('service-text');

if (modalService && closeService && serviceTitle && serviceText) {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      serviceTitle.textContent = card.dataset.title;
      serviceText.textContent = card.dataset.text;
      modalService.classList.remove('hidden');
    });
  });

  closeService.addEventListener('click', () => {
    modalService.classList.add('hidden');
  });
}

// Animación de barras de progreso en servicios
const serviceObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const pct = bar.getAttribute('data-progress');
      bar.style.width = pct + '%';
      serviceObserver.unobserve(bar);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.progress-bar').forEach(bar => {
  bar.style.width = '0';
  bar.classList.add('transition-all', 'duration-700');
  serviceObserver.observe(bar);
});

// Inicializar AOS para animaciones de entrada
if (window.AOS) {
  AOS.init({ once: true });
}

// Modal de detalles de curso
const modalCurso = document.getElementById('modal-curso');
const cerrarCurso = document.getElementById('cerrar-curso');
const tituloCurso = document.getElementById('modal-curso-titulo');
const descCurso = document.getElementById('modal-curso-descripcion');
const costoCurso = document.getElementById('modal-curso-costo');

if (modalCurso && cerrarCurso) {
  document.querySelectorAll('.btn-vermas').forEach(btn => {
    btn.addEventListener('click', () => {
      tituloCurso.textContent = btn.dataset.title;
      descCurso.textContent = btn.dataset.desc;
      costoCurso.textContent = `Costo: ${btn.dataset.costo}`;
      modalCurso.classList.remove('hidden');
    });
  });

  cerrarCurso.addEventListener('click', () => {
    modalCurso.classList.add('hidden');
  });
}

// Acordeón de inscripción dentro de las tarjetas
document.querySelectorAll('.btn-acordeon').forEach(btn => {
  btn.addEventListener('click', () => {
    const form = btn.closest('.curso-card').querySelector('.form-inscripcion');
    form.classList.toggle('hidden');
  });
});

// Animar círculos de progreso en cursos
const circleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const svg = entry.target;
      const pct = parseInt(svg.dataset.progress, 10);
      const circle = svg.querySelector('circle.progress');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1s ease';
        circle.style.strokeDashoffset = circumference - pct / 100 * circumference;
      }, 100);
      circleObserver.unobserve(svg);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-circle').forEach(svg => {
  circleObserver.observe(svg);
});
