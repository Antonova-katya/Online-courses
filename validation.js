function validateName(value) {
    return value.length >= 2;
}

function validateEmail(value) {
    const emailPattern =
        /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(value.trim());
}

function validatePassword(value) {
    if (value.length < 8) {
        return {
            valid: false,
            strength: "",
            error: "Мінімум 8 символів"
        };
    }

    let strengthLevel = 0;

    if (/[a-z]/.test(value)) strengthLevel++;
    if (/[A-Z]/.test(value)) strengthLevel++;
    if (/\d/.test(value)) strengthLevel++;
    if (/[^A-Za-z0-9]/.test(value)) strengthLevel++;

    let strength;

    if (strengthLevel <= 1) {
        strength = "Слабкий пароль";
    } else if (strengthLevel <= 3) {
        strength = "Середній пароль";
    } else {
        strength = "Сильний пароль";
    }

    return {
        valid: strengthLevel >= 2,
        strength,
        error: strengthLevel < 2
            ? "Додайте цифри або великі літери"
            : ""
    };
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword
}; 