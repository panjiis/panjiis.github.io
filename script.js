document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const animatedCards = document.querySelectorAll('.animated-card');
    if (animatedCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 });
        animatedCards.forEach(card => observer.observe(card));
    }

    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const extraPadding = 15;
                const offset = headerHeight + extraPadding;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const initializeCarousel = (carouselSelector) => {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const cards = Array.from(track.querySelectorAll('.project-card:not(.is-spacer)'));
        const nextButton = carousel.querySelector('.carousel-nav.next');
        const prevButton = carousel.querySelector('.carousel-nav.prev');
        
        if (cards.length === 0) return;

        let currentIndex = 0;

        const moveToCard = (targetIndex) => {
            if (targetIndex < 0 || targetIndex >= cards.length) return;

            const currentCard = track.querySelector('.is-active');
            const targetCard = cards[targetIndex];
            
            const carouselWidth = carousel.getBoundingClientRect().width;
            const targetCardWidth = targetCard.getBoundingClientRect().width;
            const targetCardLeft = targetCard.offsetLeft;
            
            const amountToMove = targetCardLeft - (carouselWidth / 2) + (targetCardWidth / 2);
            
            track.style.transform = `translateY(-50%) translateX(-${amountToMove}px)`;

            if (currentCard) {
                currentCard.classList.remove('is-active');
            }
            targetCard.classList.add('is-active');
            
            currentIndex = targetIndex;
            updateNavButtons();
        };

        const updateNavButtons = () => {
            prevButton.classList.toggle('is-hidden', currentIndex === 0);
            nextButton.classList.toggle('is-hidden', currentIndex === cards.length - 1);
        };

        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== currentIndex) {
                    moveToCard(index);
                }
            });
        });

        nextButton.addEventListener('click', () => {
            moveToCard(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToCard(currentIndex - 1);
        });
        
        moveToCard(0);

        window.addEventListener('resize', () => {
            setTimeout(() => {
                moveToCard(currentIndex);
            }, 200);
        });
    };

    initializeCarousel('.project-carousel');
    initializeCarousel('.skills-carousel');


});
