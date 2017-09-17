/**
 * Created by aayusharora on 9/17/17.
 */
(function() {
    'use strict';

    var user = {};
    var profileImageId = "";
    var username = "";

    window.onload = function() {

        profileImageId = document.getElementById('profileImage');
        username = document.getElementById('username');


        user.checkUser = function () {
            var self = user;
            var userData = localStorage.getItem('user') || [];
            if (!userData.length) {
                window.location = "index.html";
            }
            else {
                self.makeProfile(userData);
            }

        };


        user.makeProfile = function (userData) {

            userData = JSON.parse(userData);
            let profileName = userData.displayName;
            let id = userData.uid;
            let photoURL = userData.photoURL;
            user.bindUser(profileName);
            user.bindProfileImage(photoURL);

        };

        user.bindUser = function (profileName) {
            username.innerHTML = profileName;
        };
        user.bindProfileImage = function (photoUrl) {
            profileImageId.src = photoUrl;
        };

        user.checkUser();
    }
})();