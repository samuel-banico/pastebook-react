export const InputEmpty = (value) => {
    return (!value || /^\s*$/.test(value));
}

export const InputValidation = (register) => {
    var emptyArray = []; 

    Object.keys(register).map((key) => {
        if(InputEmpty(register[key].value)) {
            emptyArray.push(key)
        }
    });

    return emptyArray;
}

export const EmailIsValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email)
}

export const PasswordIsValid = (password) => {
    const smallLetter = /[a-z]+/;
    const bigLetter = /[A-Z]+/;
    const digit = /\d+/;
    const specialCharacter = /[^\w\s]+/;
        
    var textLacking = '';

    if (!smallLetter.test(password))
        textLacking += '▫️ undercase letter\n';

    if (!bigLetter.test(password))
        textLacking += '▫️ uppercase letter\n';

    if (!digit.test(password))
        textLacking += '▫️ number\n';

    if (!specialCharacter.test(password))
        textLacking += '▫️ special character\n';

    if (`${password}`.length < 8)
        textLacking += '▫️ at least 8 characters\n';

    return textLacking;
}



export const MobileNumberIsValid = (mobileNumber) => {
    const regex = /^(?:\+639|09)\d{9}$/;
    
    return regex.test(mobileNumber)
}

