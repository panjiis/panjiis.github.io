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

// script.js (Versi Baru dengan Animasi Berulang)

// GANTI SELURUH ISI file script.js ANDA DENGAN KODE INI

// GANTI SELURUH ISI file script.js ANDA DENGAN KODE INI

document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA ANIMASI SCROLL (dari sebelumnya) ---
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

    // --- LOGIKA CAROUSEL PROYEK BARU ---
    const track = document.querySelector('.carousel-track');
    
    // Jika tidak ada carousel di halaman, hentikan eksekusi
    if (!track) return;

    // === PERUBAHAN 1: Pilih kartu yang BUKAN spacer ===
    const cards = Array.from(track.querySelectorAll('.project-card:not(.is-spacer)'));
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');

    let currentIndex = 0;

    // Fungsi utama untuk menggeser carousel ke kartu target
    const moveToCard = (targetIndex) => {
        if (targetIndex < 0 || targetIndex >= cards.length) return;

        const currentCard = track.querySelector('.is-active');
        const targetCard = cards[targetIndex]; // Menggunakan array 'cards' yang sudah difilter
        const carousel = document.querySelector('.project-carousel');

        // Perhitungan tetap sama, karena spacer memperbaiki sistem koordinat
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
            // Cek apakah yang diklik bukan kartu yang sudah aktif
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

    // === PERUBAHAN 2: Atur posisi awal ke kartu pertama (indeks 0) ===
    const initialIndex = 0;
    moveToCard(initialIndex);

    window.addEventListener('resize', () => {
        // Tambahkan sedikit delay agar browser selesai resize sebelum kalkulasi ulang
        setTimeout(() => {
            moveToCard(currentIndex);
        }, 200);
    });

    
});