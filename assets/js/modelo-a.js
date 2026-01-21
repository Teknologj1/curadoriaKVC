// ============================================
// MODELO A: CURADORIA EDITORIAL PREMIUM
// ============================================

// Filtro de Trilhas
document.addEventListener('DOMContentLoaded', function() {
    const trilhaChips = document.querySelectorAll('.trilha-chip');
    const escolhasCards = document.querySelectorAll('.escolha-card');
    
    trilhaChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active de todos
            trilhaChips.forEach(c => c.classList.remove('active'));
            // Adiciona active no clicado
            this.classList.add('active');
            
            const trilha = this.getAttribute('data-trilha');
            
            // Filtra os cards (exemplo básico - você pode expandir com lógica mais complexa)
            escolhasCards.forEach(card => {
                // Aqui você pode adicionar lógica de filtro baseada em data attributes
                // Por enquanto, apenas mostra todos
                card.style.display = 'block';
            });
            
            // Scroll suave para as escolhas
            const escolhasSection = document.getElementById('escolhas');
            if (escolhasSection) {
                escolhasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Carrossel de Prova Social (mobile swipe)
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.prova-social-carousel');
    if (!carousel) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Desktop: scroll horizontal suave
    if (window.innerWidth >= 768) {
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});

// Lazy loading de imagens (melhora performance)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

