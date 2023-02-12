import capitalize from "./capitalize";

export function validate(data: Record<string, string>): Record<string, string> {
  let errors: Record<string, string> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value === "") {
      errors[key] = "Can not be blank";
    } else if (key === "email" && !validateEmail(value)) {
      errors[key] = "Wrong email format";
    } else if (key === "password" && value.length < 8) {
      errors[key] = `${capitalize(key)} should be longer than 8 characters`;
    } else if (key === "username" && value.length < 6) {
      errors[key] = `${capitalize(key)} should be longer than 6 characters`;
    }
  });
  return errors;
}

function validateEmail(email: string) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
