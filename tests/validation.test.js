const {
    validateName,
    validateEmail,
    validatePassword
} = require('../validation');

test('Перевірка імені користувача', () => {
    expect(validateName('Катерина')).toBe(true);
    expect(validateName('А')).toBe(false);
}); 

test('Перевірка електронної пошти', () => {
    expect(validateEmail('test@gmail.com')).toBe(true);
    expect(validateEmail('testgmail.com')).toBe(false);
}); 

test('Перевірка пароля', () => {
    expect(validatePassword('abc').valid).toBe(false);
    expect(validatePassword('Password123!').valid).toBe(true);
    expect(validatePassword('Password123!').strength)
        .toBe('Сильний пароль');
}); 