const input = document.querySelector('#favchap')
const button = document.querySelector('button')
const list = document.querySelector('#list')

button.addEventListener("click", function() {
    if (input.value.trim() !== "") {
        li.textContent = input.value;
        list.appendChild(li);
        input.value = '';

        const li = document.createElement('li')

        li.textContent = input.value

        const deleteButton = document.createElement('button')

        deleteButton.textContent = "❌";
        li.append(deleteButton);
        list.append(li);
    }
});

if (input.value.trim() === "") {
    alert("Please enter a value before adding to the list.");
}

if (input.value.trim() === input.value) {
    alert("Please do not use duplicate values in the list.");
}

deleteButton.addEventListener("click", function() {
    li.removeChild(li);
    input.focus();
});

input.value = "";
input.focus();

