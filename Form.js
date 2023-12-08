<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>

<script>
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAQ9pfGKqaXmyCrcuzWMjLg2DW1u5TIK5s",
        authDomain: "omniland-389817.firebaseapp.com",
        projectId: "omniland-389817",
        storageBucket: "omniland-389817.appspot.com",
        messagingSenderId: "534334309707",
        appId: "1:534334309707:web:92060b4f94d1d5d6d354ce",
        measurementId: "G-VJC2QQX9QL"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);



//Google Sign-In
const googleButton = document.getElementById('google');
console.log(googleButton);

googleButton.addEventListener('click', function () {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((result) => {
        console.log("Google sign-in successful.");
        var idToken = result.credential.idToken;
        console.log(idToken);
        console.log(result.credential);

            $.ajax({
                        type: "GET",
                        url: "https://game.server.helixderby.com/game/user/firebase/login/" + idToken,
                    })
                    .done(function(login_data) {
                        console.log(login_data);
                    })
                    .fail(function(jqXHR, textStatus) {
                        console.error("Error: " + textStatus);
                    });

        }).catch((error) => {
            console.error("Google sign-in failed: ", error);
        });
    }); 

    // Facebook Sign-In
    const facebookButton = document.getElementById('facebook');
    console.log(facebookButton);

    facebookButton.addEventListener('click', function() {
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(facebookProvider).then((result) => {
            console.log("Facebook sign-in successful.");

            var idToken = result.credential.idToken;
        console.log(idToken);
        console.log(result.credential);

            $.ajax({
                        type: "GET",
                        url: "https://game.server.helixderby.com/game/user/firebase/login/" + idToken,
                    })
                    .done(function(login_data) {
                        console.log(login_data);
                    })
                    .fail(function(jqXHR, textStatus) {
                        console.error("Error: " + textStatus);
                    });




        }).catch((error) => {
            console.error("Facebook sign-in failed: ", error);
        });
    });

    // Twitter Sign-In
    const twitterButton = document.getElementById('twitter');
    console.log(twitterButton);

    twitterButton.addEventListener('click', function() {
        var twitterProvider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(twitterProvider).then((result) => {
            console.log("Twitter sign-in successful.");
        }).catch((error) => {
            console.error("Twitter sign-in failed: ", error);
        });
    });
</script>
    
    
    
    
<script>
   
    var Webflow = Webflow || [];
    Webflow.push(function() {  });
    var form = $(form);
    
            $("#registerForm").submit(function(e){
                e.preventDefault();
        
       if(!$("#checkbox").is(":checked")){
            alert('Please agree to the terms and conditions before submitting the form');
            return;
                  }
                  
         
    
                let email = $("#email").val();
                let password = $("#password").val();
    
                $.ajax({
                    url: "https://game.server.helixderby.com/game/user/landing/page/email/register",
                    type: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify({
                        emailAddress: email,
                        password: password
                    }),
                    success: function(response) {
                        if (response.msg==="SUCCESS"){
                showOverlay();
                showPopup();
                        }

                        if (response.msg==="X including lowercase(a-z) and uppercase (A-Z) letters X at least one number"){
                        $("#successMessage").text('');
                        $("#errorMessage").text('Password must include lowercase(a-z), uppercase (A-Z) letters and at least one number');
                        }

                        if (response.msg==="The user has registered, please login directly"){
                        $("#successMessage").text('The user is already registered, please login directly');
                        }

                    },
                });
            });

            const  checkPassword = (str) => 
                {
                    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
                    return re.test(str);
                }

            const onChange = () => {

                const selectElement = document.querySelector("#password");
                const result = document.querySelector(".result");

            selectElement.addEventListener("input", (event) => {
            const validpassword=checkPassword(event.target.value)

            if (!validpassword) {
                $("#errorMessage").text('Password must include lowercase(a-z), uppercase (A-Z) letters and at least one number');
            } else {
                $("#errorMessage").text('');
            }

            });
        

            }

            onChange();
       
     
 

    function showOverlay() {
      document.getElementById("overlay").style.display = "block";
    }

    function showPopup() {
      document.getElementById("popup").style.display = "block";
    }

    function closePopup() {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("popup").style.display = "none";
    }

  
    function togglePasswordVisibility() {
      var passwordInput = document.getElementById("password");
      var icon = document.querySelector(".password-toggle-icon");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.textContent = "🙈";
      } else {
        passwordInput.type = "password";
        icon.textContent = "👁️";
      }
    }
    
   

</script>
