/**
 * МЯСНОЕ РЕМЕСЛО - ОСНОВНАЯ ИНТЕРАКТИВНОСТЬ
 * Честное программирование в духе бренда: простота, надежность, функциональность
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ПЛАВНАЯ ПРОКРУТКА ДЛЯ ИНДИКАТОРА НА ГЛАВНОЙ
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const valuesSection = document.querySelector('.values');
            if (valuesSection) {
                valuesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ИНТЕРАКТИВНОСТЬ КАРТОЧЕК ТОВАРОВ
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const btn = card.querySelector('.product-btn');
        const cartBtn = document.querySelector('.cart-btn .cart-count');
        
        if (btn && btn.textContent.includes('Купить')) {
            btn.addEventListener('click', function() {
                // Симуляция добавления в корзину
                if (cartBtn) {
                    let currentCount = parseInt(cartBtn.textContent) || 0;
                    cartBtn.textContent = currentCount + 1;
                    
                    // Анимация кнопки
                    btn.style.background = 'var(--color-wine-red)';
                    btn.textContent = 'Добавлено!';
                    
                    setTimeout(() => {
                        btn.style.background = '';
                        btn.textContent = 'Купить';
                    }, 1500);
                }
            });
        }
    });

    // АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Анимируем карточки ценностей
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Анимируем карточки товаров
    const productItems = document.querySelectorAll('.product-card');
    productItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(item);
    });

    // АДАПТИВНОЕ МЕНЮ (простая версия)
    const navMenu = document.querySelector('.nav-menu');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && navMenu) {
        // На мобильных скрываем сложное меню
        navMenu.style.display = 'none';
        
        // Можно добавить простую мобильную навигацию
        const mobileNavBtn = document.createElement('button');
        mobileNavBtn.innerHTML = '☰';
        mobileNavBtn.className = 'mobile-nav-btn';
        mobileNavBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-iron-black);
        `;
        
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.insertBefore(mobileNavBtn, navActions.firstChild);
        }
    }

    // УЛУЧШЕННАЯ НАВИГАЦИЯ ПО АНКОРАМ
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ ГЕРОИЧЕСКОГО БЛОКА (легкий)
    const hero = document.querySelector('.hero');
    const heroTexture = document.querySelector('.hero-texture');
    
    if (hero && heroTexture) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const scrollPercentage = scrolled / heroHeight;
            
            if (scrollPercentage <= 1) {
                heroTexture.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroTexture.style.opacity = 1 - scrollPercentage * 0.5;
            }
        });
    }

    // ФИКСИРОВАННАЯ НАВИГАЦИЯ С ЭФФЕКТОМ
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (navigation) {
            if (currentScrollY > 100) {
                navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navigation.style.boxShadow = '0 2px 20px rgba(31, 31, 31, 0.1)';
            } else {
                navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navigation.style.boxShadow = 'none';
            }
            
            // Скрытие навигации при прокрутке вниз (для мобильных)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navigation.style.transform = 'translateY(-100%)';
                } else {
                    navigation.style.transform = 'translateY(0)';
                }
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // Mobile menu functionality - улучшенная версия
    const mobileMenuBtn = document.querySelector('.nav-actions .mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-section a');

    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Предотвращаем скроллинг фона
    }

    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скроллинг
    }

    // Открытие меню по клику на гамбургер - с дополнительной защитой
    if (mobileMenuBtn) {
        // Убираем старые обработчики если есть
        mobileMenuBtn.removeEventListener('click', openMobileMenu);
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
    }

    // Закрытие меню по клику на крестик
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Закрытие меню по клику на оверлей
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Закрытие меню при клике на ссылку
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Закрытие меню по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Подсветка активной страницы в мобильном меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    mobileMenuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Отладочная информация
    console.log('🥩 Мясное ремесло загружено! Мобильное меню готово к работе!');
    console.log('🔍 Debug: Найдена кнопка мобильного меню:', !!mobileMenuBtn);
    console.log('🔍 Debug: Найден оверлей мобильного меню:', !!mobileMenuOverlay);
    console.log('🔍 Debug: Найдена кнопка закрытия:', !!mobileMenuClose);
    
    // Проверяем на дублирующиеся элементы
    const allMobileButtons = document.querySelectorAll('.mobile-menu-btn');
    if (allMobileButtons.length > 1) {
        console.warn('⚠️ Найдено несколько кнопок мобильного меню:', allMobileButtons.length);
        // Скрываем дублирующиеся кнопки
        allMobileButtons.forEach((btn, index) => {
            if (index > 0) {
                btn.style.display = 'none';
            }
        });
    }
}); 