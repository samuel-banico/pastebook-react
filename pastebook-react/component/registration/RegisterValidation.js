const InputEmpty = (value) => {
    return value === null || value === undefined || value === '';
}

export const InputValidation = (register) => {
    console.log(register);
    var emptyArray = []; 

    Object.keys(register).map((key) => {
        if(InputEmpty(register[key].value)) {
            emptyArray.push(key)
        }
    });

    return emptyArray;
}

