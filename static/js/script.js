document.addEventListener("DOMContentLoaded", function() {

  // Function to validate if a field is empty
  function validateField(id, errorId, message) {
    const inputField = document.getElementById(id);
    const errorSpan = document.getElementById(errorId);

    if (inputField.value.trim() === "") {
      errorSpan.textContent = message;
      errorSpan.style.color = "red";
      return false;
    }
    errorSpan.textContent = "";
    return true;
  }

  // Function to validate a mobile number
  function validateMobileNumber(id, errorId) {
    const mobileNumber = document.getElementById(id);
    const errorSpan = document.getElementById(errorId);
    const mobileNumberRegex = /^[0-9]{10}$/;

    if (!mobileNumberRegex.test(mobileNumber.value.trim())) {
      errorSpan.textContent = "Please enter a valid 10-digit mobile number.";
      errorSpan.style.color = "red";
      return false;
    }
    errorSpan.textContent = "";
    return true;
  }

  // Function to validate password
  function validatePassword(id, errorId) {
    const password = document.getElementById(id);
    const errorSpan = document.getElementById(errorId);

    if (password.value.length < 6) {
      errorSpan.textContent = "Password must be at least 6 characters long.";
      errorSpan.style.color = "red";
      return false;
    }
    errorSpan.textContent = "";
    return true;
  }

  // Function to validate if passwords match
  function validatePasswordMatch(passwordId, confirmPasswordId, errorId) {
    const password = document.getElementById(passwordId);
    const confirmPassword = document.getElementById(confirmPasswordId);
    const errorSpan = document.getElementById(errorId);

    if (password.value !== confirmPassword.value) {
      errorSpan.textContent = "Passwords do not match.";
      errorSpan.style.color = "red";
      return false;
    }
    errorSpan.textContent = "";
    return true;
  }

  // Function to store user data
  function storeUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Function to retrieve user data
  function getUserData() {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  }

  // Function to validate the form for signup
  function validateSignupForm(event) {
    event.preventDefault();

    let valid = true;

    valid &= validateField("name", "name-error", "Name is required.");
    valid &= validateMobileNumber("mobile-number", "mobile-number-error");
    valid &= validatePassword("password", "password-error");
    valid &= validatePasswordMatch("password", "confirm-password", "confirm-password-error");
    valid &= validateField("user-type", "user-type-error", "Please select a user type.");
    valid &= validateField("address-line-1", "address-line-1-error", "Address Line 1 is required.");
    valid &= validateField("address-line-2", "address-line-2-error", "Address Line 2 is required.");
    valid &= validateField("city", "city-error", "City is required.");
    valid &= validateField("state", "state-error", "State is required.");
    valid &= validateField("pincode", "pincode-error", "Pincode is required.");

    if (valid) {
      const userData = {
        name: document.getElementById('name').value,
        mobileNumber: document.getElementById('mobile-number').value,
        userType: document.getElementById('user-type').value,
        addressLine1: document.getElementById('address-line-1').value,
        addressLine2: document.getElementById('address-line-2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
      };
      storeUserData(userData);
      window.location.href = 'profile.html'; // Redirect to profile page
    }
  }
  // Signup function
function signup() {
  const name = document.getElementById('name').value;
  const mobileNumber = document.getElementById('mobile-number').value;
  const password = document.getElementById('password').value;
  const address = document.getElementById('address').value;

  // Store user data in local storage
  const userData = {
    name,
    mobileNumber,
    password,
    address
  };
  localStorage.setItem('userData', JSON.stringify(userData));

  // Store user address in profiles
  saveUserProfileAddress(address);
}

  // Function to validate the form for login
  function validateLoginForm(event) {
    event.preventDefault();

    let valid = true;

    valid &= validateField("username", "user-name-error", "Username is required.");
    valid &= validatePassword("password", "password-error");
    valid &= validateField("user-type", "user-type-error", "Please select a user type.");
    valid &= validateField("address-line-1", "address-line-1-error", "Address Line 1 is required.");
    valid &= validateField("address-line-2", "address-line-2-error", "Address Line 2 is required.");
    valid &= validateField("city", "city-error", "City is required.");
    valid &= validateField("state", "state-error", "State is required.");
    valid &= validateField("pincode", "pincode-error", "Pincode is required.");

    if (valid) {
      const userData = {
        username: document.getElementById('username').value,
        userType: document.getElementById('user-type').value,
        addressLine1: document.getElementById('address-line-1').value,
        addressLine2: document.getElementById('address-line-2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
      };
      storeUserData(userData);
      window.location.href = 'profile.html'; // Redirect to profile page
    }
  }

  // Attach event listener to the signup form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", validateSignupForm);
  }

  // Attach event listener to the login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", validateLoginForm);
  }
});
const userData = getUserData();
console.log('User data:', userData);

if (userData) {
const userDataDiv = document.getElementById('user-data');
console.log('User data div:', userDataDiv);

userDataDiv.innerHTML = `
  <h3>User Information</h3>
  <p><strong>Name:</strong> ${userData.name}</p>
  <p><strong>Mobile Number:</strong> ${userData.mobileNumber}</p>
  <p><strong>User Type:</strong> ${userData.userType}</p>
  <h3>Address</h3>
  <p>${userData.addressLine1}, ${userData.addressLine2}</p>
  <p>${userData.city}, ${userData.state}, ${userData.pincode}</p>
`;

console.log('User data displayed');
} else {
console.log('No user data found');
window.location.href = 'login.html'; // Redirect to login page if no user data found
}

// Attach event listener to the login form
const loginForm = document.getElementById("login-form");
if (loginForm) {
loginForm.addEventListener("submit", validateLoginForm);
}
// Function to store user credentials
function storeUserCredentials(username, password, mobileNumber, userType, addressLine1, addressLine2, city, state, pincode) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  existingUsers.push({ 
    username, 
    password, 
    mobileNumber, 
    userType, 
    addressLine1, 
    addressLine2, 
    city, 
    state, 
    pincode 
  });
  localStorage.setItem('users', JSON.stringify(existingUsers));
}
// Function to validate the form for signup
function validateSignupForm(event) {
  event.preventDefault();

  let valid = true;

  valid &= validateField("name", "name-error", "Name is required.");
  valid &= validateMobileNumber("mobile-number", "mobile-number-error");
  valid &= validatePassword("password", "password-error");
  valid &= validatePasswordMatch("password", "confirm-password", "confirm-password-error");
  valid &= validateField("user-type", "user-type-error", "Please select a user type.");
  valid &= validateField("address-line-1", "address-line-1-error", "Address Line 1 is required.");
  valid &= validateField("address-line-2", "address-line-2-error", "Address Line 2 is required.");
  valid &= validateField("city", "city-error", "City is required.");
  valid &= validateField("state", "state-error", "State is required.");
  valid &= validateField("pincode", "pincode-error", "Pincode is required.");

  if (valid) {
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const mobileNumber = document.getElementById('mobile-number').value;
    const userType = document.getElementById('user-type').value;
    const addressLine1 = document.getElementById('address-line-1').value;
    const addressLine2 = document.getElementById('address-line-2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;

    storeUserCredentials(username, password, mobileNumber, userType, addressLine1, addressLine2, city, state, pincode);

    const userData = {
      name: username,
      mobileNumber: mobileNumber,
      userType: userType,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      pincode: pincode,
    };
    storeUserData(userData);
    window.location.href = 'signup.html';
  }
}


// Function to validate the form for login
function validateLoginForm(event) {
  event.preventDefault();

  let valid = true;

  valid &= validateField("username", "username-error", "Username is required.");
  valid &= validatePassword("password", "password-error");

  if (valid) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find((user) => user.username === username && user.password === password);

    if (user) {
      const userData = {
        name: user.username,
        mobileNumber: user.mobileNumber,
        userType: user.userType,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      };
      storeUserData(userData);
      window.location.href = 'profile.html'; // Redirect to profile page
    } else {
      alert('Invalid username or password');
    }
    if (user) {
      console.log('User found:', user);
      const userData = {
        name: user.username,
        mobileNumber: user.mobileNumber,
        userType: user.userType,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      };
      console.log('Storing user data:', userData);
      storeUserData(userData);
      console.log('Redirecting to profile page...');
      window.location.href = 'profile.html'; // Redirect to profile page
    } else {
      console.log('Invalid username or password');
      alert('Invalid username or password');
    }
  }
}