export function validate(data) {
  let errors = {};
  Object.entries(data).forEach(field => {
    if (field[1] === "") {
      errors[field[0]] = "Can not be blank";
    } else if (field[0] === "email" && !validateEmail(field[1])) {
      errors[field[0]] = "Wrong email format";
    } else if (field[0] === "password" && field[1].length < 8) {
      errors[field[0]] = `${field[0].slice(0, 1).toUpperCase() +
        field[0].slice(1, field[0].length)} should be longer than 8 characters`;
    } else if (field[0] === "username" && field[1].length < 6) {
      errors[field[0]] = `${field[0].slice(0, 1).toUpperCase() +
        field[0].slice(1, field[0].length)} should be longer than 6 characters`;
    }
  });
  return errors;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
