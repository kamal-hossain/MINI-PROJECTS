const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

let submissionTicket;

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
  submissionTicket = false;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Re-initialize the form for another input
function resetForm() {
  username.parentElement.classList.remove('success');
  email.parentElement.classList.remove('success');
  password.parentElement.classList.remove('success');
  password2.parentElement.classList.remove('success');
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   checkRequired([username, email, password, password2]);
//   checkLength(username, 3, 15);
//   checkLength(password, 6, 25);
//   checkEmail(email);
//   checkPasswordsMatch(password, password2);
// });

//////////////////////////////////////////////
//  Registered Users List 
let ul = document.querySelector('.toggle-content');
let showOrHide = document.querySelector('.showorhide');

// HIDE or SHOW user list
showOrHide.addEventListener('click', () => {
  if (ul.classList.contains('is-visible') && showOrHide.innerHTML === 'Show') {
    ul.classList.remove('is-visible');
    showOrHide.innerHTML = 'Hide';
  } else {
    ul.classList.add('is-visible');
    showOrHide.innerHTML = 'Show';
  }
});

/////////////////////////////////////////////////
// Without page reload
function itemTemplate(data) {
  return `
  <li>
    <span><strong>User:</strong>${data.username}</span>
    <span><strong>Email:</strong> ${data.email}</span>
    <button class="delete-me" id='${data._id}'>Remove User</button>
  </li> `;
}
// Submit button event
form.addEventListener('submit', function(e) {
  e.preventDefault();
  submissionTicket = true;
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  if (submissionTicket) {
    axios
      .post('/createUser', { username: username.value, email: email.value })
      .then(response => {
        document
          .getElementById('item-list')
          .insertAdjacentHTML('beforeend', itemTemplate(response.data));
        form.reset();
        username.focus();
        resetForm();
      })
      .catch();
  }
});

// Delete Button event
document
  .querySelector('.registered-users')
  .addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-me')) {
      var id = e.target.getAttribute('id');
      axios
        .post('/delete-user', { id: id })
        .then(response => {
          e.target.parentNode.remove();
        })
        .catch();
    }
  });
