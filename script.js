// 1. Мобильное меню (кнопка-бургер)
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
});

// закрываем меню после выбора пункта
nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});

// 2. Раскрывающиеся блоки "Частые вопросы"
document.querySelectorAll(".faq__q").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        const answer = item.querySelector(".faq__a");
        item.classList.toggle("open");
        answer.style.maxHeight = item.classList.contains("open") ? answer.scrollHeight + "px" : null;
    });
});

// 3. Анимированные счётчики в разделе "О нас"
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        let current = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current === target) clearInterval(timer);
        }, 30);
        counterObserver.unobserve(el);
    });
});
counters.forEach(c => counterObserver.observe(c));

// 4. Проверка формы заявки
const form = document.getElementById("form");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");
    let ok = true;

    [name, phone, message].forEach(field => {
        const empty = field.value.trim() === "";
        field.classList.toggle("error", empty);
        if (empty) ok = false;
    });

    if (ok && !/^[+\d\s()-]{6,}$/.test(phone.value)) {
        phone.classList.add("error");
        ok = false;
    }

    if (ok) {
        formMsg.style.color = "#16a34a";
        formMsg.textContent = "Спасибо, " + name.value.trim() + "! Заявка принята (учебная форма, данные никуда не отправляются).";
        form.reset();
    } else {
        formMsg.style.color = "#dc2626";
        formMsg.textContent = "Пожалуйста, заполните все поля правильно.";
    }
});

// 5. Кнопка "Наверх"
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 400);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
