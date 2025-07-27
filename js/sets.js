/**
 * СТРАНИЦА НАБОРОВ - ИНТЕРАКТИВНОСТЬ
 * Обработка покупок наборов, расчет выгоды, анимации
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ЭЛЕМЕНТЫ СТРАНИЦЫ
    const setBuyButtons = document.querySelectorAll('.set-buy-btn');
    const customizeLinks = document.querySelectorAll('.set-customize-link');
    const cartCountElement = document.querySelector('.cart-count');
    
    // ДАННЫЕ О НАБОРАХ
    const setsData = {
        'master-trial': {
            name: 'Набор "Проба Мастера"',
            price: 490,
            oldPrice: 585,
            items: 3,
            discount: 15
        },
        'craftsman-stock': {
            name: 'Набор "Запас Ремесленника"',
            price: 920,
            oldPrice: 1160,
            items: 6,
            discount: 20
        },
        'master-box': {
            name: 'Набор "Ящик Мастера"',
            price: 1290,
            oldPrice: 1740,
            items: 9,
            discount: 25
        }
    };
    
    // ОБРАБОТКА КНОПОК ПОКУПКИ
    setBuyButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const setItem = this.closest('.set-item');
            const setName = setItem.querySelector('.set-name').textContent;
            const priceElement = setItem.querySelector('.price-current');
            const price = priceElement.textContent;
            
            // Определяем тип набора по индексу
            const setTypes = ['master-trial', 'craftsman-stock', 'master-box'];
            const setType = setTypes[index];
            
            // Добавляем в корзину
            addSetToCart(setType, setName, price, this);
        });
    });
    
    // ФУНКЦИЯ ДОБАВЛЕНИЯ НАБОРА В КОРЗИНУ
    function addSetToCart(setType, setName, price, button) {
        const setInfo = setsData[setType];
        
        // Обновляем счетчик корзины
        let currentCount = parseInt(cartCountElement.textContent) || 0;
        cartCountElement.textContent = currentCount + setInfo.items;
        
        // Анимация кнопки
        const originalText = button.textContent;
        const originalStyle = button.style.cssText;
        
        button.style.background = 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)';
        button.textContent = 'Набор добавлен!';
        button.style.transform = 'scale(0.98)';
        
        // Анимация счетчика корзины
        animateCartCounter(setInfo.items);
        
        // Показываем уведомление о выгоде
        showSavingsNotification(setInfo);
        
        // Возвращаем кнопку в исходное состояние
        setTimeout(() => {
            button.textContent = originalText;
            button.style.cssText = originalStyle;
            button.style.transform = 'scale(1)';
        }, 2000);
        
        // Логируем покупку
        console.log(`Добавлен набор: ${setName}`);
        console.log(`Выгода: ${setInfo.discount}% (экономия ${setInfo.oldPrice - setInfo.price} ₽)`);
    }
    
    // АНИМАЦИЯ СЧЕТЧИКА КОРЗИНЫ
    function animateCartCounter(itemsAdded) {
        let currentScale = 1;
        let pulses = 0;
        const maxPulses = itemsAdded;
        
        const pulseInterval = setInterval(() => {
            if (pulses >= maxPulses) {
                clearInterval(pulseInterval);
                cartCountElement.style.transform = 'scale(1)';
                cartCountElement.style.backgroundColor = 'var(--color-wine-red)';
                return;
            }
            
            cartCountElement.style.transform = `scale(${currentScale === 1 ? 1.4 : 1})`;
            cartCountElement.style.backgroundColor = currentScale === 1 ? '#2E7D32' : 'var(--color-wine-red)';
            currentScale = currentScale === 1 ? 1.4 : 1;
            pulses++;
        }, 200);
    }
    
    // УВЕДОМЛЕНИЕ О ВЫГОДЕ
    function showSavingsNotification(setInfo) {
        const savings = setInfo.oldPrice - setInfo.price;
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 2rem;">💰</div>
                <div>
                    <div style="font-weight: 700; margin-bottom: 5px;">Отличный выбор!</div>
                    <div style="font-size: 14px;">Вы экономите ${savings} ₽ (${setInfo.discount}%)</div>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            font-family: var(--font-headings);
            font-size: 14px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.4s ease;
            box-shadow: 0 10px 30px rgba(46, 125, 50, 0.3);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Скрываем через 4 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }
    
    // ОБРАБОТКА ССЫЛОК КАСТОМИЗАЦИИ
    customizeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const setItem = this.closest('.set-item');
            const setName = setItem.querySelector('.set-name').textContent;
            
            // Показываем модальное окно или ведем на страницу кастомизации
            showCustomizationModal(setName, this);
        });
    });
    
    // МОДАЛЬНОЕ ОКНО КАСТОМИЗАЦИИ (ПРОСТОЕ)
    function showCustomizationModal(setName, triggerElement) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(31, 31, 31, 0.8);
                z-index: 20000;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(5px);
            ">
                <div class="modal-content" style="
                    background: var(--color-white);
                    padding: 40px;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    font-family: var(--font-body);
                ">
                    <h3 style="
                        font-family: var(--font-headings);
                        font-size: 1.5rem;
                        color: var(--color-iron-black);
                        margin-bottom: 20px;
                        text-transform: uppercase;
                    ">Кастомизация набора</h3>
                    <p style="
                        margin-bottom: 30px;
                        color: var(--color-text-light);
                        line-height: 1.6;
                    ">
                        Функция выбора состава ${setName} будет доступна в ближайшее время. 
                        Сейчас вы можете заказать набор в стандартной комплектации.
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button class="modal-close" style="
                            padding: 12px 24px;
                            background: var(--color-stone-gray);
                            border: none;
                            border-radius: 4px;
                            font-family: var(--font-headings);
                            font-weight: 600;
                            cursor: pointer;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        ">Понятно</button>
                        <button class="modal-order" style="
                            padding: 12px 24px;
                            background: var(--color-wine-red);
                            color: white;
                            border: none;
                            border-radius: 4px;
                            font-family: var(--font-headings);
                            font-weight: 600;
                            cursor: pointer;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        ">Заказать стандартный</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Обработчики кнопок
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.modal-order').addEventListener('click', () => {
            document.body.removeChild(modal);
            // Имитируем клик по кнопке покупки
            const buyButton = triggerElement.closest('.set-item').querySelector('.set-buy-btn');
            buyButton.click();
        });
        
        // Закрытие по клику на оверлей
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // АНИМАЦИИ ПОЯВЛЕНИЯ ПРИ ЗАГРУЗКЕ
    function initAnimations() {
        const setItems = document.querySelectorAll('.set-item');
        
        setItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // ОТСЛЕЖИВАНИЕ СКРОЛЛИНГА ДЛЯ АНИМАЦИЙ
    function initScrollAnimations() {
        const recommendations = document.querySelectorAll('.recommendation');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        recommendations.forEach(rec => {
            rec.style.opacity = '0';
            rec.style.transform = 'translateY(30px)';
            rec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(rec);
        });
    }
    
    // РАСЧЕТ И ОТОБРАЖЕНИЕ ЭКОНОМИИ В РЕАЛЬНОМ ВРЕМЕНИ
    function highlightSavings() {
        const priceElements = document.querySelectorAll('.set-pricing');
        
        priceElements.forEach(pricing => {
            const currentPrice = parseInt(pricing.querySelector('.price-current').textContent);
            const oldPrice = parseInt(pricing.querySelector('.price-old').textContent);
            const savings = oldPrice - currentPrice;
            const percentage = Math.round((savings / oldPrice) * 100);
            
            // Добавляем дополнительную информацию о выгоде
            if (!pricing.querySelector('.savings-highlight')) {
                const savingsElement = document.createElement('div');
                savingsElement.className = 'savings-highlight';
                savingsElement.innerHTML = `💰 Экономия: ${savings} ₽`;
                savingsElement.style.cssText = `
                    background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
                    color: white;
                    padding: 8px 16px;
                    margin-top: 10px;
                    border-radius: 20px;
                    font-family: var(--font-headings);
                    font-weight: 600;
                    font-size: 14px;
                    display: inline-block;
                `;
                pricing.appendChild(savingsElement);
            }
        });
    }
    
    // ИНИЦИАЛИЗАЦИЯ
    initAnimations();
    initScrollAnimations();
    highlightSavings();
    
    console.log('🎁 Страница наборов загружена! Готовы к продажам с выгодой.');
}); 