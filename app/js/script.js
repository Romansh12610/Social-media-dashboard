console.log("HELLO!");

//toggle button moving
let wrapper = document.querySelector('.toggle__wrapper');
let btnBg = document.querySelector('.toggle__background');
let btn = document.querySelector('.toggle__button');
let initShift = btn.getBoundingClientRect().left - btnBg.getBoundingClientRect().left;

wrapper.addEventListener('click', toggleTheme);

function toggleTheme(event) {
    console.log(initShift);
    let newLeft;

    //changing checked radio btn
    let checkedBtn = document.querySelector('input[checked]');
    if (checkedBtn.id === 'dark') {
        checkedBtn.removeAttribute('checked');
        let newCheckedBtn = document.getElementById('system');
        newCheckedBtn.setAttribute('checked', '');

        newLeft = (btnBg.offsetWidth - btn.offsetWidth) / 2 - initShift;
        btn.style.transform = `translate(${newLeft}px)`; 
    } else if (checkedBtn.id === 'system') {
        checkedBtn.removeAttribute('checked');
        let newCheckedBtn = document.getElementById('light');
        newCheckedBtn.setAttribute('checked', '');

        newLeft = btnBg.offsetWidth - btn.offsetWidth - initShift * 2;
        btn.style.transform = `translate(${newLeft}px)`;
    } else {
        checkedBtn.removeAttribute('checked');
        let newCheckedBtn = document.getElementById('dark');
        newCheckedBtn.setAttribute('checked', '');

        newLeft = 0;
        btn.style.transform = `translate(${newLeft}px)`;
    }
}