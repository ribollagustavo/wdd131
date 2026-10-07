let firstName = 'Antonia';
let lastName = 'Francesca';

function fullName(first, last) {
    return "${first} ${last}";
}
const fullName = fullName(first, last); {
    return "${first} ${last}";
}
const fullName = (first, last) => "${first} ${last}";

document.querySelector('#full-name').textContent = fullName(firstName, lastName);