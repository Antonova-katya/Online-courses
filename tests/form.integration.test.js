const { initForm } = require('../script');

beforeEach(() => {
    document.body.innerHTML = ` 
        <form id="myForm"> 
            <input id="name"> 
            <small id="nameError" class="error"></small> 
 
            <input id="email"> 
            <small id="emailError" class="error"></small> 
 
            <input id="password"> 
            <small id="passwordError" class="error"></small> 
 
            <div id="strength"></div> 
 
            <button type="submit">Зареєструватися</button> 
        </form> 
    `;

    initForm();
});

test('Перевірка відображення помилки для неправильного імені', () => {
    const nameInput = document.getElementById('name');

    nameInput.value = 'А';
    nameInput.dispatchEvent(new Event('input'));

    expect(document.getElementById('nameError').textContent)
        .toBe("Ім'я має містити мінімум 2 символи");

    expect(nameInput.classList.contains('invalid')).toBe(true);
}); 

test('Перевірка форми з правильними даними', () => {
    document.getElementById('name').value = 'Катерина';
    document.getElementById('email').value = 'test@gmail.com';
    document.getElementById('password').value = 'Password123';

    const form = document.getElementById('myForm');

    expect(form.onsubmit()).toBe(true);

    expect(document.getElementById('name')
        .classList.contains('valid')).toBe(true);

    expect(document.getElementById('email')
        .classList.contains('valid')).toBe(true);

    expect(document.getElementById('password')
        .classList.contains('valid')).toBe(true);
}); 
