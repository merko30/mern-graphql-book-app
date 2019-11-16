
// VALIDATE REGISTER/LOGIN FORMS

// OBJECT.ENTRIES RETURNS ARRAY LIKE ['username', 'Michael'] 

// d[0] = username

// d[1] = 'Michael'

export function validate(data) {
    let errors = {};
    Object.entries(data).map((d) => {

        if (d[1] === '') {
            errors[d[0]] = 'Can not be blank'
        }
        else if (d[0] === 'email' && !validateEmail(d[1])) {
            errors[d[0]] = 'Wrong email format'
        }
        else if (d[0] === 'password' && d[1].length < 8) {
            errors[d[0]] = `${d[0].slice(0, 1).toUpperCase() + d[0].slice(1, d[0].length)} should be longer than 8 characters`
        }
        else if ((d[0] === 'username' && d[1].length < 6)) {
            errors[d[0]] = `${d[0].slice(0, 1).toUpperCase() + d[0].slice(1, d[0].length)} should be longer than 6 characters`
        }
    })
    return errors;
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}