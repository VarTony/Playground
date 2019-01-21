document.querySelector('.push').onclick = function () {
    // данные из input type = text
    console.log(document.querySelector('.text-input').value);


    // данные из input type = password
    console.log(document.querySelector('.pass-input').value);


    // данные из input type = range
    console.log(document.querySelector('.range-input').value);

    // данные из input type = date
    console.log(document.querySelector('.calendar-input').value);

    // данные из input type = color
    console.log(document.querySelector('.color-input').value);

    // данные из input type = checkbox
    console.log(document.querySelector('#checkbox-input').checked);
    if (document.querySelector('#checkbox-input').checked) {
        console.log('Даааааа!');
    }
    else {
        console.log('Heeeeeт');
    }

    console.log('----------------Radio------------');

    // данные из input type = radio
    // console.log(document.querySelector('.radio-input[checked="checked"]').value);

}