/**
 * Created by aayusharora on 9/12/17.
 */
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

var user = localStorage.getItem('user') || [];

if(user.length) {
    window.location = "tree.html";

}



function loginWithGoogle() {

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            let user = result.user;

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("user", JSON.stringify(user));

                }
            });

            window.location = 'tree.html';

        }).catch(function(error) {

            window.location = 'index.html';

            if(error.code) {
                return errorCode;
            }
            else if (error.message) {
                return error.message;
            }
            else if (error.email) {
                return email;
            }
            else {
                return error.credential;
            }

        });
}

function logoutWithGoogle() {
    firebase.auth().signOut().then(function() {
        console.log("signout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }).catch(function(error) {
    // An error happened.
    });
}



