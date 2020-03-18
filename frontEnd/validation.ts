class Validation {
  validateEmail(value: string) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(emailRegex)) return true;
    else return false;
  }
  validatePhone(value: string) {
    let phoneRegex = /^\d{10}$/;
    if (value.match(phoneRegex)) return true;
    else return false;
  }
  checkothers(value: string) {
    let Regex = /([^\s])/;
    if (value.match(Regex)) return true;
    else return false;
  }
}
export let objValidate = new Validation();
