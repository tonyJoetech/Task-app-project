// sign up validation

const signUpForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".login-form");
const fullName = document.querySelector("#FullName");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");

const nameError = document.querySelector(".signUp-name-error");

const emailError = document.querySelector(".signUp-email-error");

const passwordError = document.querySelector(".signUp-password-error");

const loginEmailError = document.querySelector(".login-email-error");

const loginPasswordError = document.querySelector(".login-password-error");

const emailMessage = document.querySelector(".email-message");

const passwordStrength = document.querySelector(".password-strength");

const signupNameMessage = document.querySelector(".signup-name-message");

const loginEmailMessage = document.querySelector(".login-email-message");

const loginPasswordMessage = document.querySelector(".login-password-message");
const loader = document.querySelector(".loader");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

// showsignup
function showsignup() {

    document.querySelector(".login-auth-wrapper").style.display = "none";

    document.querySelector(".sign-up-auth-wrapper").style.display = "block";

}

// showlogin
function showlogin() {

    document.querySelector(".sign-up-auth-wrapper").style.display = "none";

    document.querySelector(".login-auth-wrapper").style.display = "block";

}

// passwor validation
signUpPassword.addEventListener("input", function () {
    const password = signUpPassword.value;
    if (password.length === 0) {
        passwordStrength.textContent = "";
        passwordError.classList.remove("error");
        return;
    }
    if (password.length < 6) {
        passwordStrength.textContent =
            "Weak password";
        passwordStrength.className =
            "password-strength password-weak";
        return;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
    if (
        password.length >= 8 &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialCharacter
    ) {
        passwordStrength.innerHTML =
            'Strong password <i class="bi bi-check2"></i>';
        passwordStrength.className =
            "password-strength password-strong";
    }
    else {
        passwordStrength.textContent =
            "Medium password";
        passwordStrength.className =
            "password-strength password-medium";
    }

});

// email validation
signUpEmail.addEventListener("input", function () {
    const email =
        signUpEmail.value.trim();
    if (email === "") {
        emailMessage.textContent = "";
        emailError.classList.remove("error");
        return;
    }
    if (!gmailRegex.test(email)) {
        emailMessage.textContent =
            "Email must be a valid Gmail address.";
        emailMessage.className =
            "email-message email-error-message";
        emailError.classList.add("error");
    }
    else {
        emailMessage.innerHTML =
            'Valid Email Address <i class="bi bi-check2"></i>';
        emailMessage.className =
            "email-message password-strong";
        emailError.classList.remove("error");

    }
});

fullName.addEventListener("input", function () {
    if (fullName.value.trim() !== "") {
        nameError.classList.remove("error");
        signupNameMessage.textContent = "";
    }
});

// signUpForm validation

signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameValue = fullName.value.trim();
    const emailValue = signUpEmail.value.trim();
    const passwordValue = signUpPassword.value;

    let isValid = true;
    if (nameValue === "") {
        nameError.classList.add("error");
        signupNameMessage.textContent =
            "Full name is required.";
        signupNameMessage.className =
            "signup-name-message password-weak";
        isValid = false;
    }
    else {
        nameError.classList.remove("error");
        signupNameMessage.textContent = "";
    }
    if (emailValue === "") {
        emailError.classList.add("error");
        emailMessage.textContent = "Email is required.";
        emailMessage.className = "email-message email-error-message";
        isValid = false;
    }
    else if (!gmailRegex.test(emailValue)) {
        emailError.classList.add("error");
        emailMessage.textContent =
            "Email must end with @gmail.com.";
        emailMessage.className =
            "email-message email-error-message";
        isValid = false;
    }
    else {
        emailError.classList.remove("error");
    }

    const hasUppercase = /[A-Z]/.test(passwordValue);

    const hasLowercase = /[a-z]/.test(passwordValue);

    const hasNumber = /[0-9]/.test(passwordValue);

    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(passwordValue);

    if (passwordValue === "") {
        passwordError.classList.add("error");

        passwordStrength.textContent = "Password is required.";

        passwordStrength.className = "password-strength password-weak";
        isValid = false;
    }
    else if (
        passwordValue.length < 8 ||
        !hasUppercase ||
        !hasLowercase ||
        !hasNumber ||
        !hasSpecialCharacter
    ) {
        passwordError.classList.add("error");
        passwordStrength.textContent = "Password must be at least 8 characters with uppercase, lowercase, number and special character.";

        passwordStrength.className = "password-strength password-weak";
        isValid = false;
    }
    else {
        passwordError.classList.remove("error");
        passwordStrength.textContent = "Strong password ✓";
        passwordStrength.className = "password-strength password-strong";
    }
    if (!isValid) {
        return;
    }

    const existingUser = localStorage.getItem("user");

    if (existingUser) {
        const user = JSON.parse(existingUser);

        if (user.email === emailValue) {
            emailError.classList.add("error");

            emailMessage.textContent = "An account with this email already exists.";

            emailMessage.className = "email-message email-error-message";
            return;
        }
    }
    const user = {
        fullName: nameValue,
        email: emailValue,
        password: passwordValue
    };

    const userJSON = JSON.stringify(user);
    localStorage.setItem("user", userJSON);

    function sucessMsg() {

        const welcomewrapper = document.querySelector(".welcome-msg-wrapper");
        const welcomeText = document.querySelector(".welcome-msg-wrapper p");
        welcomewrapper.classList.add("show-msg");

        welcomeText.textContent = "Register Successful !"

        setTimeout(()=>{

        welcomewrapper.classList.remove("show-msg");
            
    showlogin();
        }, 2000)
    }

    signUpForm.reset();

    passwordStrength.textContent = "";

    emailMessage.textContent = "";

    signupNameMessage.textContent = "";


    sucessMsg();
});

// loginForm validation

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value;
    let isValid = true;

    if (emailValue === "") {
        loginEmailError.classList.add("error");
        loginEmailMessage.textContent = "Email is required."
        loginEmailMessage.className = "login-email-message password-weak";

        isValid = false;
    }
    else if (!gmailRegex.test(emailValue)) {
        loginEmailError.classList.add("error");

        loginEmailMessage.textContent = "Please enter a valid Gmail address.";
        loginEmailMessage.className = "login-email-message password-weak";

        isValid = false;
    }
    else {

        loginEmailError.classList.remove("error");

        loginEmailMessage.textContent = "";
    }

    if (passwordValue === "") {

        loginPasswordError.classList.add("error");

        loginPasswordMessage.textContent = "Password is required.";

        loginPasswordMessage.className = "login-password-message password-weak";

        isValid = false;
    }
    else {

        loginPasswordError.classList.remove("error");
        loginPasswordMessage.textContent = "";
    }
    if (!isValid) {

        return;
    }
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        loginEmailError.classList.add("error");

        loginEmailMessage.textContent = "No account found. Please sign up first.";

        loginEmailMessage.className = "login-email-message password-weak";

        return;
    }

    const user = JSON.parse(storedUser);
    if (emailValue !== user.email) {

        loginEmailError.classList.add("error");
        loginEmailMessage.textContent = "Email does not match any registered account.";

        loginEmailMessage.className = "login-email-message password-weak";
        return;
    }
    else if (passwordValue !== user.password) {

        loginPasswordError.classList.add("error");

        loginPasswordMessage.textContent = "Incorrect password.";

        loginPasswordMessage.className = "login-password-message password-weak";
        return;
    }

    else {
        loginEmailError.classList.remove("error");
        loginPasswordError.classList.remove("error");
        loader.classList.add("show-loader");
        document.querySelector(".login-text").style.display = "none";


        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        window.location.href = "dashboard.html";
    }

});



loginEmail.addEventListener("input", function () {

    loginEmailError.classList.remove("error");
    loginEmailMessage.textContent = "";
});

loginPassword.addEventListener("input", function () {
    loginPasswordError.classList.remove("error");
    loginPasswordMessage.textContent = "";

});

const passwordToggles = document.querySelectorAll(".password-toggle");


passwordToggles.forEach(function (toggle) {

    toggle.addEventListener("click", function () {

        const targetId = toggle.getAttribute("data-target");

        const passwordInput = document.querySelector("#" + targetId);


        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            toggle.classList.remove("bi-eye-slash");

            toggle.classList.add("bi-eye");
        }

        else {
            passwordInput.type = "password";

            toggle.classList.remove("bi-eye");

            toggle.classList.add("bi-eye-slash");
        }

    });

});
