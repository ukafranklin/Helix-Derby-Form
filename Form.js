<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>

<script>
    // Firebase configuration and initialization
    const firebaseConfig = {
        apiKey: "AIzaSyAQ9pfGKqaXmyCrcuzWMjLg2DW1u5TIK5s",
        authDomain: "omniland-389817.firebaseapp.com",
        projectId: "omniland-389817",
        storageBucket: "omniland-389817.appspot.com",
        messagingSenderId: "534334309707",
        appId: "1:534334309707:web:92060b4f94d1d5d6d354ce",
        measurementId: "G-VJC2QQX9QL"
    };

    try {
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }

    // Social Media Sign-In Function
    const socialSignIn = (provider) => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(`${provider.providerId} sign-in successful.`);
            const idToken = result.user.Aa; // Corrected line
            authenticateUser(idToken);
        }).catch((error) => {
            if (error.code === "auth/account-exists-with-different-credential") {
                $("#errorMessage").text('The user is already registered, please login directly');
            }
            console.error(`${provider.providerId} sign-in failed: `, error);
        });
    };

    // Authenticate User Function
    const authenticateUser = (idToken) => {
        $.ajax({
            type: "GET",
            url: `https://game.server.helixderby.com/game/user/firebase/login/${idToken}`,
        }).done((login_data) => {
            console.log(login_data);
            window.location.href = "https://game.helixderby.com/account/reception?token=" + login_data.data;
            // window.location.href = "https://game.helixderby.com/main";
        }).fail((jqXHR, textStatus) => {
            console.error("Error: " + textStatus);
        });
    };

    // Event Listeners for Buttons
    document.getElementById('google').addEventListener('click', () => socialSignIn(new firebase.auth.GoogleAuthProvider()));
    document.getElementById('facebook').addEventListener('click', () => socialSignIn(new firebase.auth.FacebookAuthProvider()));
    document.getElementById('twitter').addEventListener('click', () => socialSignIn(new firebase.auth.TwitterAuthProvider()));

    // Registration Form Submission
    $("#registerForm").submit((e) => {
        e.preventDefault();
        if (!$("#checkbox").is(":checked")) {
            alert('Please agree to the terms and conditions before submitting the form');
            return;
        }

        const email = $("#email").val();
        const password = $("#password").val();
        registerUser(email, password);
    });

    // User Registration Function
    const registerUser = (email, password) => {
        $.ajax({
            url: "https://game.server.helixderby.com/game/user/landing/page/email/register",
            type: 'POST',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ emailAddress: email, password: password }),
            success: handleRegistrationResponse,
        });
    };

    // Handle Registration Response
    const handleRegistrationResponse = (response) => {
        if (response.msg === "SUCCESS") {
            showOverlay();
            showPopup();
        } else if (response.msg.includes("lowercase(a-z) and uppercase (A-Z) letters")) {
            $("#errorMessage").text('Password must include lowercase(a-z), uppercase (A-Z) letters and at least one number');
        } else if (response.msg === "The user has registered, please login directly") {
            $("#successMessage").text('The user is already registered, please login directly');
        }
    };

    // Password Validation
    const checkPassword = (str) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(str);

    // Password Input Event Listener
    $("#password").on("input", (event) => {
        const validPassword = checkPassword(event.target.value);
        $("#errorMessage").text(validPassword ? '' : 'Password must include lowercase(a-z), uppercase (A-Z) letters and at least one number');
    });

    // Popup and Overlay Functions
    const showOverlay = () => document.getElementById("overlay").style.display = "block";
    const showPopup = () => document.getElementById("popup").style.display = "block";
    const closePopup = () => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
    };

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");
        const icon = document.querySelector(".password-toggle-icon");
        const isPasswordVisible = passwordInput.type === "password";
        passwordInput.type = isPasswordVisible ? "text" : "password";
        icon.textContent = isPasswordVisible ? "🙈" : "👁️";
    };
</script>
