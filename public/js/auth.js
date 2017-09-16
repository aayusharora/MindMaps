/**
 * Created by aayusharora on 9/12/17.
 */

(function() {
    'use strict';
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    var app  = {};

    app.checklocalStorage = function () {
        var user = localStorage.getItem('user') || [];

        if(user.length) {
            window.location = "tree.html";

        }
    };

    app.checklocalStorage();

    app.setlocalStorage = function (token, user) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
    };

    app.setLocation = function (location) {
        window.location = location;
    };

    app.loginUser = function () {

        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                   app.setlocalStorage(token, user);
                }
            });

            app.setLocation('tree.html');

        }).catch(function(error) {

            app.setLocation('index.html');

            if(error.code) {
                return errorCode;
            }
        });
    };

    app.logoutUser = function () {
        firebase.auth().signOut().then(function() {
            console.log("signout");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }).catch(function(error) {
            // An error happened.
        });
    }
    window.app = app;
})();







function loginWithGoogle() {
    app.loginUser();
}

function logoutWithGoogle() {
   app.logoutUser();
}



