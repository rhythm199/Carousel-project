document.addEventListener('DOMContentLoaded', function () {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const totalItems = items.length;
    let currentIndex = 1;

    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    carouselWrapper.appendChild(firstClone);
    carouselWrapper.insertBefore(lastClone, carouselWrapper.firstChild);

    carouselWrapper.style.transition = 'none';
    carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;


    function updateCarousel() {
        carouselWrapper.style.transition = 'transform 0.3s ease';
        carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function checkIndex() {
        carouselWrapper.addEventListener('transitionend', () => {
            if (currentIndex <= 0) {
                currentIndex = totalItems;
                carouselWrapper.style.transition = 'none';
                carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                void carouselWrapper.offsetWidth; // Trigger reflow
                carouselWrapper.style.transition = 'transform 0.5s ease';
            }
            else if (currentIndex >= totalItems + 1) {
                currentIndex = 1;
                carouselWrapper.style.transition = 'none';
                carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                void carouselWrapper.offsetWidth; // Trigger reflow
                carouselWrapper.style.transition = 'transform 0.5s ease';
            }
        });
    }

    function prevSlide() {
        currentIndex--;
        updateCarousel();
        checkIndex();
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();
        checkIndex();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    const lazyImages = document.querySelectorAll('.lazy-image');
    const lazyLoad = (target) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        observer.observe(target);
    };

    lazyImages.forEach(img => {
        lazyLoad(img);
    });

});

