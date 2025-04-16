'use strict'

document.addEventListener("DOMContentLoaded", () => {
    // *  1. Начало.
    // *  2. Получаем все элементы изображения с описанием.
    // *  3. Для каждого изображения (проверяем есть ли таоке изображение):
    // *     3.1. Добавляем обработчик наведения курсора на изображение:
    // *         3.1.1. Да:
    // *             3.1.1.1. показываем текст при наведении.
    // *         3.1.2. Нет: продолжаем.
    // *     3.2. Добавляем обработчик курсор уходит с изображения:
    // *         3.2.1. Да:
    // *             3.2.1.1. Скрывем элементы с описанием.
    // *         3.2.2. Нет: продолжаем.
    // *  4. Конец  
    
    const bestseller = document.querySelectorAll(".best-seller__item") // querySelectorAll
    
    bestseller.forEach((item, index) => {
        const bestsellerText = document.querySelectorAll('.best-seller__hover')
        
        item.addEventListener('mouseenter', () => {
            item.style.opacity = 0.5;
            bestsellerText[index].removeAttribute('hidden');
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.opacity = 1
        bestsellerText[index].setAttribute('hidden', true);
    });
});
});

/* 2. Создание слайдера */
let currentIndex = 0; //индекс карточек
const slider = document.querySelectorAll(".discounts__item");
const prevButton = document.querySelector(".discounts__left-swiper");
const nextButton = document.querySelector(".discounts__right-swiper");
const visibleCards = 3;
updateSlider();
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    }
    else {
        currentIndex = slider.length - visibleCards;
    }
    updateSlider();
});
nextButton.addEventListener("click", () => {
    if (currentIndex < slider.length - visibleCards) {
        currentIndex++;
    }
    else {
        currentIndex = 0; // Переход к началу карточек
    }
    updateSlider();
});
function updateSlider() {
    slider.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + visibleCards) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    });
}