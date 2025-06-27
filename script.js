// script.js

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    // Jika user scroll lebih dari 50px ke bawah, tambahkan class 'scrolled' ke header
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        // Jika kembali ke atas, hapus class 'scrolled'
        header.classList.remove('scrolled');
    }
});

// script.js

// GANTI SELURUH ISI FILE script.js ANDA DENGAN KODE INI

document.addEventListener('DOMContentLoaded', () => {

    // --- Fitur 1: EFEK 'SCROLLED' PADA HEADER ---
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

    // --- Fitur 2: ANIMASI MUNCUL SAAT SCROLL UNTUK SEMUA BAGIAN ---
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

    // --- Fitur 3: NAVIGASI HALUS (SMOOTH SCROLL) DARI HEADER ---
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


    // === FUNGSI CAROUSEL YANG BISA DIGUNAKAN KEMBALI ===
    const initializeCarousel = (carouselSelector) => {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return; // Hentikan jika carousel tidak ditemukan

        const track = carousel.querySelector('.carousel-track');
        const cards = Array.from(track.querySelectorAll('.project-card:not(.is-spacer)'));
        const nextButton = carousel.querySelector('.carousel-nav.next');
        const prevButton = carousel.querySelector('.carousel-nav.prev');
        
        if (cards.length === 0) return; // Hentikan jika tidak ada kartu

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
        
        // Atur posisi awal ke item pertama untuk konsistensi
        moveToCard(0);

        window.addEventListener('resize', () => {
            setTimeout(() => {
                moveToCard(currentIndex);
            }, 200);
        });
    };

    // === INISIALISASI KEDUA CAROUSEL SECARA TERPISAH ===
    initializeCarousel('.project-carousel'); // Inisialisasi Carousel Proyek
    initializeCarousel('.skills-carousel'); // Inisialisasi Carousel Keterampilan

    const jobSlider = document.querySelector('.job-slider');

    // Hanya jalankan kode ini jika elemen .job-slider ada di halaman
    if (jobSlider) {
        const track = jobSlider.querySelector('.job-slider-track');
        const slides = Array.from(track.children);
        const nextButton = jobSlider.querySelector('.job-next');
        const prevButton = jobSlider.querySelector('.job-prev');
        
        // Hentikan jika tidak ada slide
        if (slides.length === 0) return;

        let currentIndex = 0;

        // Fungsi utama untuk pindah ke slide tertentu
        const moveToSlide = (targetIndex) => {
            // Menggunakan persentase untuk pergeseran yang lebih responsif
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            currentIndex = targetIndex;
            updateButtons();
        };
        
        // Fungsi untuk mengaktifkan/menonaktifkan tombol panah
        const updateButtons = () => {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;
        };

        // Tambahkan event listener untuk tombol "next"
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                moveToSlide(currentIndex + 1);
            }
        });

        // Tambahkan event listener untuk tombol "previous"
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        });
        
        // Atur status tombol saat pertama kali dimuat
        updateButtons();
    }

});

   