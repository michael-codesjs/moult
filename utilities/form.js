class Form {

constructor() {
this.test = {
mail: /[a-z0-9A-Z.]+@[-a-z0-9A-Z.]+\.[a-z]{2,}/,
name: /[^A-Za-z ]/,
int: /[^0-9]/,
}}

mail(mail) {
return this.test.mail.test(mail);
}
name(name) {
return !this.test.name.test(name);
}

int(no) {
return !this.test.int.test(String(no));
}

password(password) {
return (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) && password.length > 7;
}

}

module.exports = new Form();