const form = document.getElementById("myForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strength = document.getElementById("strength");

/* Події */
nameInput.oninput = validateName;
emailInput.oninput = validateEmail;
passwordInput.oninput = validatePassword;

form.onsubmit = function () {
    let isValid = true;

    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;

    return isValid;
};

/* Очистка */
form.onreset = function () {
    setTimeout(() => {
        document.querySelectorAll("input").forEach(el => {
            el.classList.remove("valid", "invalid");
            el.style.boxShadow = "none";
        });

        document.querySelectorAll(".error").forEach(el => {
            el.textContent = "";
        });

        strength.textContent = "";
    }, 0);
};

/* Валідація */
function validateName() {
    if (nameInput.value.length < 2) {
        nameError.textContent = "Ім'я має містити мінімум 2 символи";
        setInvalid(nameInput);
        return false;
    } else {
        nameError.textContent = "";
        setValid(nameInput);
        return true;
    }
}

function validateEmail() {
    let value = emailInput.value.trim();

    let emailPattern = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value)) {
        emailError.textContent = "Введіть коректний email";
        setInvalid(emailInput);
        return false;
    } else {
        emailError.textContent = "";
        setValid(emailInput);
        return true;
    }
}

function validatePassword() {
    let value = passwordInput.value;
    let strengthLevel = 0;

    if (value.length < 8) {
        passwordError.textContent = "Мінімум 8 символів";
        setInvalid(passwordInput);
        strength.textContent = "";
        return false;
    }

    if (/[a-z]/.test(value)) strengthLevel++;
    if (/[A-Z]/.test(value)) strengthLevel++;
    if (/\d/.test(value)) strengthLevel++;
    if (/[^A-Za-z0-9]/.test(value)) strengthLevel++;

    if (strengthLevel <= 1) {
        strength.textContent = "Слабкий пароль";
        strength.style.color = "red";
    } else if (strengthLevel <= 3) {
        strength.textContent = "Середній пароль";
        strength.style.color = "orange";
    } else {
        strength.textContent = "Сильний пароль";
        strength.style.color = "green";
    }

    if (strengthLevel < 2) {
        passwordError.textContent = "Додайте цифри або великі літери";
        setInvalid(passwordInput);
        return false;
    } else {
        passwordError.textContent = "";
        setValid(passwordInput);
        return true;
    }
}

/* Допоміжні */
function setValid(el) {
    el.classList.remove("invalid");
    el.classList.add("valid");
}

function setInvalid(el) {
    el.classList.remove("valid");
    el.classList.add("invalid");
}