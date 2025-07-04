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

// botón activo por defecto
if (filterButtons.length) {
  filterButtons[0].classList.add('bg-accentyellow');
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('bg-accentyellow'));
    btn.classList.add('bg-accentyellow');
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
const campoCurso = document.getElementById('campo-curso');

function initInscripcion(scope = document) {
  if (!modal || !cerrarModal || !formInscripcion) return;
  scope.querySelectorAll('.btn-inscripcion').forEach(btn => {
    btn.addEventListener('click', () => {
      const curso = btn.getAttribute('data-curso');
      if (nombreCurso) nombreCurso.textContent = curso;
      if (campoCurso) campoCurso.value = curso;
      modal.classList.remove('hidden');
    });
  });
}

if (modal && cerrarModal && formInscripcion) {
  initInscripcion();
  cerrarModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  formInscripcion.addEventListener('submit', e => {
    e.preventDefault();
    fetch('guardar_inscripcion.php', {
      method: 'POST',
      body: new FormData(formInscripcion)
    })
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(() => {
        formInscripcion.reset();
        modal.classList.add('hidden');
        alert('Datos enviados');
      })
      .catch(() => alert('Error al guardar'));
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

function initVerMas(scope=document){
  if(!modalCurso||!cerrarCurso)return;
  scope.querySelectorAll('.btn-vermas').forEach(btn=>{
    btn.addEventListener("click",()=>{
      tituloCurso.textContent=btn.dataset.title;
      descCurso.textContent=btn.dataset.desc;
      costoCurso.textContent=`Costo: ${btn.dataset.costo}`;
      modalCurso.classList.remove("hidden");
    });
  });
}

if(modalCurso&&cerrarCurso){
  initVerMas();
  cerrarCurso.addEventListener("click",()=>{
    modalCurso.classList.add("hidden");
  });
}

// Acordeón de inscripción dentro de las tarjetas


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

// Galería de portafolio
const modalGaleria = document.getElementById('modal-galeria');
const cerrarGaleria = document.getElementById('cerrar-galeria');
const imgGaleria = document.getElementById('galeria-imagen');
const descGaleria = document.getElementById('galeria-desc');
const prevGaleria = document.getElementById('prev-galeria');
const nextGaleria = document.getElementById('next-galeria');
let galeriaImgs = [];
let galeriaIndex = 0;

if (modalGaleria) {
  document.querySelectorAll('.open-gallery').forEach(btn => {
    btn.addEventListener('click', () => {
      galeriaImgs = btn.dataset.images.split(',');
      galeriaIndex = 0;
      imgGaleria.src = galeriaImgs[galeriaIndex];
      descGaleria.textContent = btn.dataset.desc || '';
      modalGaleria.classList.remove('hidden');
    });
  });

  function mostrarImagen(delta) {
    galeriaIndex = (galeriaIndex + delta + galeriaImgs.length) % galeriaImgs.length;
    imgGaleria.src = galeriaImgs[galeriaIndex];
  }

  prevGaleria.addEventListener('click', () => mostrarImagen(-1));
  nextGaleria.addEventListener('click', () => mostrarImagen(1));
  cerrarGaleria.addEventListener('click', () => modalGaleria.classList.add('hidden'));
}

// Validación y envío del formulario de contacto
const formContacto = document.getElementById('contact-form');
const inputName = document.getElementById('contact-name');
const inputEmail = document.getElementById('contact-email');
const inputMessage = document.getElementById('contact-message');
const btnSend = document.getElementById('btn-send');
const toast = document.getElementById('toast');

function mostrarError(input, idMsg, show) {
  const msg = document.getElementById(idMsg);
  if (show) {
    input.classList.add('border-red-500');
    msg.classList.remove('hidden');
  } else {
    input.classList.remove('border-red-500');
    msg.classList.add('hidden');
  }
}

function validarCampos() {
  let valido = true;
  if (!inputName.value.trim()) {
    mostrarError(inputName, 'error-name', true);
    valido = false;
  } else {
    mostrarError(inputName, 'error-name', false);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputEmail.value.trim())) {
    mostrarError(inputEmail, 'error-email', true);
    valido = false;
  } else {
    mostrarError(inputEmail, 'error-email', false);
  }
  if (inputMessage.value.trim().length < 20) {
    mostrarError(inputMessage, 'error-message', true);
    valido = false;
  } else {
    mostrarError(inputMessage, 'error-message', false);
  }
  if (btnSend) btnSend.disabled = !valido;
  return valido;
}

function lanzarToast(texto, ok) {
  if (!toast) return;
  toast.textContent = texto;
  toast.className = `fixed bottom-6 right-6 px-4 py-3 rounded text-white ${ok ? 'bg-green-600' : 'bg-red-600'}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 5000);
}

if (formContacto) {
  [inputName, inputEmail, inputMessage].forEach(inp => inp.addEventListener('input', validarCampos));
  validarCampos();
  formContacto.addEventListener('submit', e => {
    e.preventDefault();
    if (!validarCampos()) {
      lanzarToast('Error al enviar. Intenta de nuevo.', false);
      return;
    }
    fetch('guardar_contacto.php', {
      method: 'POST',
      body: new FormData(formContacto)
    })
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(() => {
        formContacto.reset();
        validarCampos();
        lanzarToast('Mensaje enviado con éxito', true);
      })
      .catch(() => lanzarToast('Error al enviar. Intenta de nuevo.', false));
  });
}

// ---- Cargar cursos dinámicamente ----
function setupCursoHandlers(scope) {
  initVerMas(scope);
  initInscripcion(scope);
  observeCircles(scope);
}

function cargarCursos() {
  const cont = document.getElementById('cursos-container');
  if (!cont) return;
  fetch('get_cursos.php')
    .then(r => r.json())
    .then(data => {
      cont.innerHTML = '';
      data.forEach(c => {
        const div = document.createElement('div');
        div.className = 'curso-card group relative bg-[#111827] text-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:-translate-y-2 hover:rotate-1';
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = `
          <div class="relative">
            <img src="${c.imagen}" alt="${c.titulo}" class="w-full h-40 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-accentyellow/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            <div class="absolute bottom-0 left-0 right-0 bg-white/30 text-black p-2">
              <h3 class="text-lg font-semibold font-poppins">${c.titulo}</h3>
              <p class="text-sm text-gray-800">${c.descripcion}</p>
            </div>
            <svg class="progress-circle w-10 h-10 absolute top-2 left-2" data-progress="${c.progreso}" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" stroke="#333" stroke-width="3" fill="none" />
              <circle class="progress" cx="18" cy="18" r="16" stroke="#FFC107" stroke-width="3" fill="none" stroke-linecap="round" />
              <text x="18" y="22" text-anchor="middle" font-size="8" fill="white">${c.progreso}%</text>
            </svg>
          </div>
          <div class="p-4 space-y-2">
            <div class="flex space-x-2">
              <button class="btn-vermas flex items-center bg-electric px-3 py-2 rounded text-white hover:animate-pulse" data-title="${c.titulo}" data-desc="${c.descripcion_larga}" data-costo="$${c.costo}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                <span class="ml-1">Ver más</span>
              </button>
              <a href="pago.html" class="flex items-center bg-magenta px-3 py-2 rounded text-white hover:animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h4v8h-4z"/></svg>
                <span class="ml-1">Comprar</span>
              </a>
              <button class="btn-inscripcion flex items-center bg-accentyellow px-3 py-2 rounded text-black hover:animate-pulse" data-curso="${c.titulo}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span class="ml-1">Inscribirse</span>
              </button>
            </div>
          </div>`;
        cont.appendChild(div);
      });
      if (window.AOS) AOS.refresh();
      setupCursoHandlers(cont);
    })
    .catch(() => {
      cont.innerHTML = '<p class="text-red-500">Error al cargar cursos</p>';
    });
}

document.addEventListener('DOMContentLoaded', cargarCursos);

