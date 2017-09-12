/**
 * Created by aayusharora on 9/11/17.
 */


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyCEVbcz0f6eY3FeXBRMn4gcYqGGB5xRnaQ",
    authDomain: "fir-pwa-48a1a.firebaseapp.com",
    databaseURL: "https://fir-pwa-48a1a.firebaseio.com",
    projectId: "fir-pwa-48a1a",
    storageBucket: "fir-pwa-48a1a.appspot.com",
    messagingSenderId: "815402095694"
};
firebase.initializeApp(config);

var template= [];
// function loadMoreRequest() {
//     fetch(apiUrlPath)
//         .then(function(response) {
//             return response.json();
//         }).then(function(data) {
//             template.push(data);
//         });
//
//     console.log(template);
// }
//loadMoreRequest();
var database = firebase.database();
