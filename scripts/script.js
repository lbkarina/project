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
    const bestsellerContainer = document.querySelector(".best-seller__list");
    if (bestsellerContainer) {
        const dataTitlebestseller = [
            "Куртка горнолыжная",
            "Брюки общеспортивные эластичные",
            "Брюки горнолыжные",
        ];
        const titlebestseller =
            bestsellerContainer.querySelectorAll(".item-best-seller__tittle")
        titlebestseller.forEach((item, index) => {
            item.textContent = dataTitlebestseller[index];
        });
    }
    // Scroll up
    // Обратите внимание, что в коде выше уже есть слушатель скролла (на следующей практике уберем повторение)

    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {
        const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера

        // Показать кнопку при прокрутке вниз на высоту экрана
        document.addEventListener('scroll', () => {
            let scrollPageY = this.scrollY;

            if (scrollPageY >= windowHeight) {
                scrollUpButton.classList.add('scroll-up--show');
            } else {
                scrollUpButton.classList.remove('scroll-up--show');
            }
        });

        // Плавная прокрутка наверх при нажатии на кнопку
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    }
    const headerMenu = document.querySelector('.header__menu');
    if (headerMenu){
        const headerList = headerMenu.querySelector('.menu');
        const menuData = {
            link1: {
                link: '#',
                title: 'Женщинам',
                order: 1
            },
            link2: {
                link: '#',
                title: 'Мужчинам',
                order: 1
            },
            
            link3: {
                link: '#',
                title: '<img src="images/images-l.svg" width="20" height="20" alt="Поиск">',
                order: 3
            },
            link4: {
                link: '#',
                title: '<img src="images/images-love.png" width="20" height="20" alt="Избранное">',
                order: 3
            },
            link5: {
                link:'#',
                title: '<img src="images/images-s.png" width="20" height="20" alt="Корзина">',
                order: 3
            }
        }
        const createLink = (UrlLink, title, order) =>{
            const link = `
            <li class="menu__item" style="order: ${order}"><a href="${UrlLink}" class="menu__link">${title}</a></li>`;
            return link;
        }
        for (const linkItem in menuData) {
            const link = menuData[linkItem];
            const linkIndex  = createLink(link.UrlLink, link.title, link.order);
            headerList.insertAdjacentHTML('beforeend', linkIndex);
        }
        const linkIndex  = `<li class="menu__item title" style="order: 2"><h1>SportEra</h1></li>`;
            headerList.insertAdjacentHTML('beforeend', linkIndex);
    };
console.log('Навигационное меню создано с помощью javascript');

const cardsImages = document.querySelector(".images");

    if (cardsImages) {
        const cardListImages =cardsImages.querySelector(".images__list");
        // Пример URL для получения данных с сервера
        const apiUrl = "images.json";
        // Функция для создания карточки
        const createCard = (imageUrl, imageAlt, imageWidth) => {
            // Шаблонные строки и подстановки
            const image = `
<li class="images__item">
<img class="images__picture" src="${imageUrl[0]}" alt="${imageAlt}" width="$
{imageWidth}">
<img class="images__picture" src="${imageUrl[1]}" alt="${imageAlt}" width="$
{imageWidth}" style="display: none;">
</li>
`;
            return image;
        };
        // Загрузка данных с сервера
        fetch(apiUrl)
            .then((response) =>response.json())
            .then((images) => {
                console.log(images); // Данные
                console.log(typeof images); // Тип полученных данных
                images.forEach((item) => {
                    const cardElement = createCard(
                        item.imageUrl,
                        item.imageAlt,
                        item.imageWidth
                    );
                    cardListImages.insertAdjacentHTML("beforeend", cardElement);
                });
                //Объявляем переменную pictures и сохраняем в нее все изображения с классом images__picture;
                const pictures = document.querySelectorAll(".images__picture");
                if (pictures) {
                    // Пройдемся по каждому элементу массива pictures, с помощью цикла
                    pictures.forEach((picture) => {
                        //добавляем обработчик события клика по изображению:
                        picture.addEventListener("click", () => {
                            // получаем родительский элемент текущего изображения
                            const parentItem =picture.parentElement;
                            // Получаем все изображения в родительском элементе, для того чтобы работать только с изображениями, которые находятся в одной карточке
                            const parentPictures =
                                parentItem.querySelectorAll(".images__picture");
                            // проходимся по всем изображениям, найденным в карточке
                            parentPictures.forEach((parentPictures) => {
                                //проверка условия если на текущее изображение не кликали, то оставляем это изображение видимым, иначе скрываем
                                if (parentPictures !== picture) {
                                    parentPictures.style.display = "block"; // Показываем другое изображение
                                } else {
                                    parentPictures.style.display = "none"; // Скрываем текущее изображение
                                }
                            });
                        });
                    });
                }
            });
    }

//Объявляем переменную preloader и сохраняем в нее блок с классом .preloader
const preloader = document.querySelector(".preloader");
//Объявляем переменную content и сохраняем в нее блок с классом .content
const content = document.querySelector(".content");

//проверяем существуют ли эти блоки
if (preloader && content) {
    // функция, которая позволяет выполнять код через определенный промежуток времени.
    setTimeout(() => {
       // Скрываем предзагрузчик
       preloader.style.opacity = "0";
       preloader.style.visibility = "hidden";

       // и показываем контент
       content.style.display = "block";

       // Удаляем элемент предзагрузчика со страницы
       preloader.remove();
    }, 3000); // Задержка 3 секунды
};
});