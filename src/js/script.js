
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "/src/sass/style.scss";

const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});

try {
    new Swiper('.works__swiper', {
        loop: true,
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".icon-right-open",
            prevEl: ".icon-left-open",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
        },
        modules: [Navigation, Pagination],
    });
} catch (e) {

}

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));

            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "block";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "block" : "none"));
} catch (e) { }

try {
    const validator = new JustValidate(".touch__form");
    validator.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Please fill the name'
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Min 2 char!'
        },
    ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Please fill the email'
            },
            {
                rule: 'email',
            },
        ])
        .addField('#question', [
            {
                rule: 'required',
                errorMessage: 'Please fill the question'
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Min 5 char!'
            },
        ], {
            errorsContainer: document.querySelector('#question').parentElement.querySelector(".error-message"),
        })
        .addField('#checkbox', [
            {
                rule: 'required',
                errorMessage: 'Please click the check mark'
            },
        ], {
            errorsContainer: document.querySelector('#checkbox').parentElement.querySelector(".checkbox-error-message"),
        })
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formDate = new FormData(form);

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                body: FormData,
            }).then(res => res.json()).then((data) => {
                console.log('Success', data);
                form.reset();
            })
        });
} catch (e) { }

try {
    const validatorFooter = new JustValidate(".footer__form");
    validatorFooter
        .addField("#footer__email", [
            {
                rule: 'required',
                errorMessage: 'Please fill the email'
            },
            {
                rule: 'email',
            },
        ], {
            errorsContainer: document.querySelector('#footer__email').parentElement.querySelector(".error-message"),
        })
        .addField("#footer__checkbox", [
            {
                rule: 'required',
                errorMessage: 'Please click the check mark'
            },
        ], {
            errorsContainer: document.querySelector('#footer__checkbox').parentElement.parentElement.querySelector(".check-error-message"),
        });
} catch (e) { }