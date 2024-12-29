let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let dots = document.querySelectorAll('.dots li');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let lastPosition = list.length - 1;
let active = 0;
let zIndex = 2;

// Variables para el carrusel interno (dentro del tercer slide)
let internalCarousel = document.querySelector('.item:nth-child(3) .carousel-inner1'); // Asegúrate de seleccionar el carrusel interno del tercer slide
let internalSlides = internalCarousel ? internalCarousel.querySelectorAll('.carousel-item1') : [];
let internalActive = 0; // Iniciar en la posición 0 (primer slide)
let internalAutoRun;

// Variables para el carrusel interno (dentro del 8 slide)
let internalCarousel2 = document.querySelector('.item:nth-child(9) .carousel-inner2'); // Asegúrate de seleccionar el carrusel interno del tercer slide
let internalSlides2 = internalCarousel2 ? internalCarousel2.querySelectorAll('.carousel-item2') : [];
let internalActive2 = 0; // Iniciar en la posición 0 (primer slide)
let internalAutoRun2;

nextBtn.onclick = () => {
    let newValue = active + 1 > lastPosition ? 0 : active + 1;
    setItemActive(newValue, 'next');
}

prevBtn.onclick = () => {
    let newValue = active - 1 < 0 ? lastPosition : active - 1;
    setItemActive(newValue, 'prev');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        setItemActive(index, index > active ? 'next' : 'prev');
    })
})

const setItemActive = (newValue, direction) => {
    if (newValue === active) return;

    let type = direction;
    active = newValue;
    showSlider(type);

    // Si estamos en el tercer slide (index 2), iniciar el carrusel interno
    if (active === 2) {
        startInternalCarousel(); // Iniciar el carrusel interno cuando el carrusel principal llegue a index 2
    }if (active === 8) {
        startInternalCarousel(); // Iniciar el carrusel interno cuando el carrusel principal llegue a index 2
    } else {
        stopInternalCarousel(); // Detener el carrusel interno si no estamos en el tercer slide
    }
}

let removeEffect;
let autoRun = setTimeout(() => {
    nextBtn.click();
}, 7000); // Cambiar el tiempo de avance del carrusel principal a 10 segundos

const showSlider = (type) => {
    carousel.style.pointerEvents = 'none';
    
    // find Item Active Old
    let itemActiveOld = document.querySelector('.carousel .list .item.active');
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    zIndex++;
    list[active].style.zIndex = zIndex;
    list[active].classList.add('active');

    if (type === 'next') {
        carousel.style.setProperty('--transform', '300px');
        carousel.classList.add('effect');  // Activar la animación de transición
    } else {
        carousel.style.setProperty('--transform', '-300px');
        carousel.classList.add('effect');
    }

    // dots
    let dotActiveOld = document.querySelector('.dots li.active');
    if (dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    // Remover la animación después de 1 segundo
    clearTimeout(removeEffect);
    removeEffect = setTimeout(() => {
        carousel.classList.remove('effect');
        carousel.style.pointerEvents = 'auto';
    }, 1500);

    // Reiniciar el auto avance para el carrusel principal
    clearTimeout(autoRun);
    if (active === 2) {
        autoRun = setTimeout(() => {
            setItemActive(3, 'next'); // Regresar a index 0 después de 40 segundos cuando llegue a index 2
        }, 22000);
        
    // Tiempo de espera de 40 segundos para volver al carrusel principal en el index 0
    }else if (active === 8) {
        autoRun = setTimeout(() => {
            setItemActive(9, 'next'); // Regresar a index 0 después de 40 segundos cuando llegue a index 2
        }, 22000);
        
    // Tiempo de espera de 40 segundos para volver al carrusel principal en el index 0
    } else {
        autoRun = setTimeout(() => {
            nextBtn.click();
        }, 7000); // Cambiar el tiempo de avance del carrusel principal a 10 segundos
    }
}

// Funciones para controlar el carrusel interno (dentro del tercer slider)
const startInternalCarousel = () => {
    if (internalSlides.length === 0) return;
    if (internalSlides2.length === 0) return;

    // Re-iniciar el carrusel interno desde el primer slide (índice 0)
    internalActive = 0;
    showInternalSlide(internalActive);

    // Avanzar automáticamente cada 10 segundos
    clearTimeout(internalAutoRun);
    internalAutoRun = setInterval(() => {
        // internalActive++;
        // if (internalActive >= internalSlides.length) {
        //     internalActive = 0; // Volver al primer slide cuando llegamos al final del carrusel interno
        // }
        // showInternalSlide(internalActive);
    }, 7000); // Cambiar el tiempo del carrusel interno a 10 segundos
}

const stopInternalCarousel = () => {
    clearInterval(internalAutoRun); // Detener el carrusel interno
}

const showInternalSlide = (index) => {
    // Cambiar a la diapositiva correspondiente en el carrusel interno
    internalSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });

    internalSlides2.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}
