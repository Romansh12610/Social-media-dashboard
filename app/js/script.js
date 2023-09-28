console.log("HELLO!");

//toggle button moving
let wrapper = document.querySelector('.toggle__wrapper');
let btnBg = document.querySelector('.toggle__background');
let btn = document.querySelector('.toggle__button');
let shiftX = btn.getBoundingClientRect().left - btnBg.getBoundingClientRect().left;

btn.addEventListener('click', toggleTheme);

function toggleTheme(event) {
    if (event.target.tagName == 'INPUT') return;
    //changing checked radio btn
    let checkedBtn = document.querySelector('input[checked]');
    let newCheckedBtn;

    switch(checkedBtn.id) {
        case 'dark':
            checkedBtn.removeAttribute('checked');
            newCheckedBtn = document.getElementById('system');
            newCheckedBtn.setAttribute('checked', '');
            moveToCenter(btnBg, btn, shiftX);
            break;

        case 'system':
            checkedBtn.removeAttribute('checked');
            newCheckedBtn = document.getElementById('light');
            newCheckedBtn.setAttribute('checked', '');
            moveToRight(btnBg, btn, shiftX);
            break;

        case 'light':
            checkedBtn.removeAttribute('checked');
            newCheckedBtn = document.getElementById('dark');
            newCheckedBtn.setAttribute('checked', '');
            moveToLeft(btn);
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

    if (nextId == 'dark') {
        moveToLeft(btn); 
    } else if (nextId == 'system') {
        moveToCenter(btnBg, btn, shiftX);
    } else {
        moveToRight(btnBg, btn, shiftX);
    }
}



//helper functions
function moveToCenter(bg, el, shiftX) {
    let center = (bg.offsetWidth - el.offsetWidth) / 2 - shiftX;
    el.style.transform = `translate(${center}px)`; 
}

function moveToRight(bg, el, shiftX) {
    let leftEdge = bg.offsetWidth - el.offsetWidth - shiftX * 2;
    el.style.transform = `translate(${leftEdge}px)`;
}

function moveToLeft(el) {
    el.style.transform = `translate(${0}px)`;
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
            let newCheckedBtn = document.getElementById('system');
            newCheckedBtn.setAttribute('checked', '');
    
            moveToCenter(btnBg, btn, shiftX);

        } else if (checkedBtn.id === 'system' && event.key == 'ArrowRight') {
            checkedBtn.removeAttribute('checked');
            let newCheckedBtn = document.getElementById('light');
            newCheckedBtn.setAttribute('checked', '');
    
            moveToRight(btnBg, btn, shiftX);

        } else if (checkedBtn.id === 'system' && event.key == 'ArrowLeft') {
            checkedBtn.removeAttribute('checked');
            let newCheckedBtn = document.getElementById('dark');
            newCheckedBtn.setAttribute('checked', '');
    
            moveToLeft(btn);

        } else if (checkedBtn.id === 'light' && event.key == 'ArrowLeft') {
            checkedBtn.removeAttribute('checked');
            let newCheckedBtn = document.getElementById('system');
            newCheckedBtn.setAttribute('checked', '');
    
            moveToCenter(btnBg, btn, shiftX);
        } else {
            return;
        }
    }
}

