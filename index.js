function validateAge(today, dobobj) {
    var age = today.getFullYear() - dobobj.getFullYear();
    var m = today.getMonth() - dobobj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobobj.getDate())) {
        age--;
    }
    return age;
}

const dobelement = document.getElementById("dob");
dobelement.addEventListener("change", () => {
    const [y, m, d] = document.getElementById("dob").value.split("-");
    const dob = new Date(y, m - 1, d); 
    const Today = new Date();
    const age = validateAge(Today, dob);
    if (age < 18 || age > 55) {
        dobelement.setCustomValidity("Age must be between 18 and 55 years!");
    } else {
        dobelement.setCustomValidity("");
    }
});

const form = document.getElementById("user-form");
form.addEventListener("submit", saveUserForm);

const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));
function validate(ele) {
    if (ele.validity.typeMismatch) {
        ele.setCustomValidity("The email is not in the right format!");
        ele.reportValidity();
    } else {
        ele.setCustomValidity("");
    }
}

function retrieveEntries() {
    let entries = localStorage.getItem("userEntry");

    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let Entries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const rows = entries
        .map((entry) => {
            const name = `<td class="td">${entry.name}</td>`;
            const email = `<td class="td">${entry.email}</td>`;
            const password = `<td class="td">${entry.password}</td>`;
            const dob = `<td class="td">${entry.dob}</td>`;
            const acceptTerms = `<td class="td">${entry.acceptTerms ? "Yes" : "No"}</td>`;

            const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
            return row;
        })
        .join("\n");

    let tableBody = document.getElementById("entries-body");

    tableBody.innerHTML = rows;
};

function saveUserForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;

    let entryObj = {
        name,
        email,
        password,
        dob,
        acceptTerms,
    };

    Entries.push(entryObj);

    localStorage.setItem("userEntry", JSON.stringify(Entries));

    displayEntries();
    form.reset();
}

displayEntries();
