// import Serializetion from "./Serializetion.js";

let select = document.querySelector('#select-1');
let radio = document.querySelector('input[name="rad-1"]');

select.onchange = function () {
    console.log(select.value);
    // console.log(radio.value);
}

const seri = new Serializetion();


let sendForm = document.querySelector('#sendForm');
let form = document.querySelector('form');
sendForm.onclick = function (event) {
    event.preventDefault();
    console.log('2', seri.serialize(form));
    console.log('1' ,serialize(form));
    console.log('work');
}