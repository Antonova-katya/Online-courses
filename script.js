const {
    validateName,
    validateEmail,
    validatePassword
} = require('./validation');

function initForm() {
    const form = document.getElementById('myForm');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const strength = document.getElementById('strength');

    function setValid(element) {
        element.classList.remove('invalid');
        element.classList.add('valid');
    }

    function setInvalid(element) {
        element.classList.remove('valid');
        element.classList.add('invalid');
    }

    function checkName() {
        const valid = validateName(nameInput.value);

        nameError.textContent = valid
            ? ''
            : "Ім'я має містити мінімум 2 символи";

        valid ? setValid(nameInput) : setInvalid(nameInput);

        return valid;
    }

    function checkEmail() {
        const valid = validateEmail(emailInput.value);

        emailError.textContent = valid
            ? ''
            : 'Введіть коректний email';

        valid ? setValid(emailInput) : setInvalid(emailInput);

        return valid;
    }

    function checkPassword() {
        const result = validatePassword(passwordInput.value);

        passwordError.textContent = result.error;
        strength.textContent = result.strength;

        if (result.strength === 'Слабкий пароль') {
            strength.style.color = 'red';
        } else if (result.strength === 'Середній пароль') {
            strength.style.color = 'orange';
        } else if (result.strength === 'Сильний пароль') {
            strength.style.color = 'green';
        }

        result.valid
            ? setValid(passwordInput)
            : setInvalid(passwordInput);

        return result.valid;
    }

    nameInput.oninput = checkName;
    emailInput.oninput = checkEmail;
    passwordInput.oninput = checkPassword;

    form.onsubmit = function () {
        let isValid = true;

        if (!checkName()) isValid = false;
        if (!checkEmail()) isValid = false;
        if (!checkPassword()) isValid = false;

        return isValid;
    };

    form.onreset = function () {
        setTimeout(() => {
            document.querySelectorAll('input').forEach(element => {
                element.classList.remove('valid', 'invalid');
                element.style.boxShadow = 'none';
            });

            document.querySelectorAll('.error').forEach(element => {
                element.textContent = '';
            });

            strength.textContent = '';
        }, 0);
    };
}

if (typeof module !== 'undefined' && module.exports) {

    module.exports = { initForm };

} else {
    document.addEventListener('DOMContentLoaded', initForm);
} 