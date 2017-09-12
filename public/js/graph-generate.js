/**
 * Created by aayusharora on 9/11/17.
 */

define([], function() {
    //var apiUrl = "https://jsonplaceholder.typicode.com/posts";

    function loadRequest () {
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
               console.log(data);
        })
    }

})
