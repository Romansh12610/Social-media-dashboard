//checking media query
let btnBg = document.querySelector('.toggle__background');
let btn = document.querySelector('.toggle__button');
let shiftX = btn.getBoundingClientRect().left - btnBg.getBoundingClientRect().left;

const userTheme = window.matchMedia("(prefers-color-scheme: dark)");
const initTheme = localStorage.getItem("theme");

function showInitTheme(initTheme, userTheme) {
    if (initTheme !== null) {
        return initTheme;
    } else {
        return userTheme.matches ? "dark" : "light"; 
    }
}

let currentThemeSetting = showInitTheme(initTheme, userTheme);

document.documentElement.setAttribute('data-theme', currentThemeSetting);

let checkedInput = document.querySelector('input[checked]');

if (checkedInput.id !== currentThemeSetting) {
    let unCheckedInput = document.querySelector('input:not([checked])');
    checkedInput.removeAttribute('checked');
    unCheckedInput.setAttribute('checked', '');
    moveButton(unCheckedInput);

    checkedInput = unCheckedInput;
}

//helper functions
function moveButton(inputId) {
    if (inputId === 'dark') {
        btn.style.transform = `translate(${0}px)`;
    } else {
        let leftEdge = btnBg.offsetWidth - btn.offsetWidth - shiftX * 2;
        btn.style.transform = `translate(${leftEdge}px)`;
    }
}

function moveToRight(bg, el, shiftX) {
    let leftEdge = bg.offsetWidth - el.offsetWidth - shiftX * 2;
    el.style.transform = `translate(${leftEdge}px)`;
}

function moveToLeft(el) {
    el.style.transform = `translate(${0}px)`;
}


//toggle button moving
btnBg.addEventListener('click', toggleTheme);

function toggleTheme() {
    //changing checked radio btn
    let checkedBtn = document.querySelector('input[checked]');
    let newCheckedBtn;
    btn.focus();

    switch(checkedBtn.id) {
        case 'dark':
            checkedBtn.removeAttribute('checked');
            newCheckedBtn = document.getElementById('light');
            newCheckedBtn.setAttribute('checked', '');
            moveToRight(btnBg, btn, shiftX);
            document.documentElement.setAttribute('data-theme', newCheckedBtn.id);
            break;

        case 'light':
            checkedBtn.removeAttribute('checked');
            newCheckedBtn = document.getElementById('dark');
            newCheckedBtn.setAttribute('checked', '');
            moveToLeft(btn);
            document.documentElement.setAttribute('data-theme', newCheckedBtn.id);
            break;
    }
}


//moving toggle on label-clicking
let fieldset = document.querySelector('.toggle');
fieldset.addEventListener('click', onLabelClick);

function onLabelClick(event) {
    let target = event.target.closest('label');
    if (!target || !fieldset.contains(target)) return;

    let nextId = target.getAttribute('for');
    let targetInput = document.getElementById(nextId);
    if (!targetInput.checked) targetInput.setAttribute('checked', '');
    document.documentElement.setAttribute('data-theme', targetInput.id);

    if (nextId == 'dark') {
        moveToLeft(btn); 
    } else {
        moveToRight(btnBg, btn, shiftX);
    }
}


//focus-button event
btn.addEventListener('focus', onButtonFocus);

function onButtonFocus() {
    document.addEventListener('keydown', arrowPressed);
    btn.addEventListener('blur', function() {
        document.removeEventListener('keydown', arrowPressed);
    });

    function arrowPressed(event) {
        let checkedBtn = document.querySelector('input[checked]');

        if (checkedBtn.id === 'dark' && event.key == 'ArrowRight') {
            checkedBtn.removeAttribute('checked');
            let newCheckedBtn = document.getElementById('light');
            newCheckedBtn.setAttribute('checked', '');
            document.documentElement.setAttribute('data-theme', newCheckedBtn.id);
    
            moveToRight(btnBg, btn, shiftX);

        } else if (checkedBtn.id === 'light' && event.key == 'ArrowLeft') {
            checkedBtn.removeAttribute('checked');
            let newCheckedBtn = document.getElementById('dark');
            newCheckedBtn.setAttribute('checked', '');
            document.documentElement.setAttribute('data-theme', newCheckedBtn.id);

            moveToLeft(btn);
        } else {
            return;
        }
    }
}