const form = document.getElementById('user-form');
const entriesTable = document.getElementById('entries-body');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const dobInput = document.getElementById('dob');

emailInput.addEventListener('input', function () {
    emailInput.setCustomValidity('');
});


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const password = document.getElementById('password').value;
    const dob = dobInput.value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    const email = emailInput.value; 

    function validate(ele) {
        if (ele.validity.typeMismatch) {
            ele.setCustomValidity("The email is not in the right format!");
            ele.reportValidity();
        } else {
            ele.setCustomValidity("");
        }
    }

    emailInput.addEventListener("input", () => validate(emailInput));
  

    const userData = { name, email, password, dob, acceptTerms };
    let storedEntries = JSON.parse(localStorage.getItem('userData')) || [];
    storedEntries.push(userData);
    localStorage.setItem('userData', JSON.stringify(storedEntries));

    updateEntriesTable();

    form.reset();
});


function updateEntriesTable() {
    entriesTable.innerHTML = '';
    let storedEntries = JSON.parse(localStorage.getItem('userData')) || [];
    storedEntries.forEach(userData => {
        const newRow = entriesTable.insertRow();
        newRow.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td>${userData.dob}</td>
            <td>${userData.acceptTerms ? 'Yes' : 'No'}</td>
        `;
    });
}

window.addEventListener('load', function () {
    updateEntriesTable();
});
