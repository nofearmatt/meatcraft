/**
 * КАТАЛОГ ТОВАРОВ - ИНТЕРАКТИВНОСТЬ
 * Фильтрация, сортировка, добавление в корзину
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ЭЛЕМЕНТЫ ФИЛЬТРАЦИИ
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogItems = document.querySelectorAll('.catalog-item');
    const cartCountElement = document.querySelector('.cart-count');
    
    // ФИЛЬТРАЦИЯ ТОВАРОВ
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем товары
            catalogItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    showItem(item);
                } else {
                    hideItem(item);
                }
            });
            
            // Обновляем счетчик видимых товаров
            updateItemsCount();
        });
    });
    
    // ФУНКЦИИ ПОКАЗА/СКРЫТИЯ ТОВАРОВ
    function showItem(item) {
        item.classList.remove('hidden');
        item.classList.add('visible');
        item.style.display = 'flex';
        
        // Плавное появление
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, 50);
    }
    
    function hideItem(item) {
        item.classList.remove('visible');
        item.classList.add('hidden');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) translateY(20px)';
        
        // Полностью скрываем после анимации
        setTimeout(() => {
            if (item.classList.contains('hidden')) {
                item.style.display = 'none';
            }
        }, 300);
    }
    
    // СЧЕТЧИК ТОВАРОВ
    function updateItemsCount() {
        const visibleItems = document.querySelectorAll('.catalog-item.visible, .catalog-item:not(.hidden)');
        const activeFilter = document.querySelector('.filter-btn.active');
        
        console.log(`Показано товаров: ${visibleItems.length} в категории "${activeFilter.textContent}"`);
    }
    
    // ДОБАВЛЕНИЕ В КОРЗИНУ
    const itemButtons = document.querySelectorAll('.item-btn');
    
    itemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.catalog-item');
            const itemName = item.querySelector('.item-name').textContent;
            const itemPrice = item.querySelector('.item-price').textContent;
            
            // Анимация добавления в корзину
            if (this.textContent.includes('Купить')) {
                addToCart(this, itemName, itemPrice);
            } else if (this.textContent.includes('Попробовать') || this.textContent.includes('Подробнее')) {
                // Для наборов - переход на детальную страницу
                window.location.href = 'sets.html';
            } else if (this.textContent.includes('мой выбор')) {
                addToCart(this, itemName, itemPrice);
            }
        });
    });
    
    // ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ
    function addToCart(button, itemName, itemPrice) {
        // Обновляем счетчик в корзине
        let currentCount = parseInt(cartCountElement.textContent) || 0;
        cartCountElement.textContent = currentCount + 1;
        
        // Анимация кнопки
        const originalText = button.textContent;
        const originalBackground = button.style.backgroundColor;
        
        button.style.backgroundColor = 'var(--color-wine-red)';
        button.textContent = 'Добавлено!';
        button.style.transform = 'scale(0.95)';
        
        // Анимация счетчика корзины
        cartCountElement.style.transform = 'scale(1.3)';
        cartCountElement.style.backgroundColor = '#5a1a14';
        
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
            cartCountElement.style.backgroundColor = 'var(--color-wine-red)';
        }, 200);
        
        // Возвращаем кнопку в исходное состояние
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBackground;
            button.style.transform = 'scale(1)';
        }, 1500);
        
        // Логируем добавление
        console.log(`Добавлен в корзину: ${itemName} за ${itemPrice}`);
        
        // Показываем уведомление (простое)
        showNotification(`${itemName} добавлен в корзину`);
    }
    
    // ПРОСТОЕ УВЕДОМЛЕНИЕ
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--color-wine-red);
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            font-family: var(--font-headings);
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 20px rgba(123, 36, 28, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Скрываем через 3 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ
    function initItemAnimations() {
        catalogItems.forEach((item, index) => {
            // Задержка появления для красивого эффекта
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.offsetHeight; // Принудительный reflow
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // ПОИСК ПО ТОВАРАМ (ПРОСТАЯ ВЕРСИЯ)
    function initSearch() {
        const searchInput = document.getElementById('catalog-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                catalogItems.forEach(item => {
                    const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                    const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
                    
                    if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                        showItem(item);
                    } else {
                        hideItem(item);
                    }
                });
            });
        }
    }
    
    // ОБРАБОТКА ХЭШЕЙ URL (для прямых ссылок на категории)
    function handleUrlHash() {
        const hash = window.location.hash.substring(1); // Убираем #
        if (hash) {
            const targetButton = document.querySelector(`[data-filter="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }
    }
    
    // АДАПТИВНАЯ СЕТКА (динамическое изменение колонок)
    function updateGridColumns() {
        const catalogGrid = document.querySelector('.catalog-grid');
        const containerWidth = catalogGrid.offsetWidth;
        const itemWidth = 320; // Минимальная ширина карточки
        const gap = 30;
        
        const columns = Math.floor((containerWidth + gap) / (itemWidth + gap));
        catalogGrid.style.gridTemplateColumns = `repeat(${Math.max(1, columns)}, 1fr)`;
    }
    
    // ИНИЦИАЛИЗАЦИЯ
    initItemAnimations();
    initSearch();
    handleUrlHash();
    updateItemsCount();
    
    // Обновляем сетку при изменении размера окна
    window.addEventListener('resize', updateGridColumns);
    updateGridColumns();
    
    console.log('🛒 Каталог загружен! Товаров в базе:', catalogItems.length);
}); 