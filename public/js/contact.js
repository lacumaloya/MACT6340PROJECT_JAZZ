(function() {
    "use strict";
    
    document
        .querySelector("#contact-form-button")
        .addEventListener("click", (event) => {
            event.preventDefault;
            event.stopPropagation;
            console.log("Thanks!");
            let name = document.querySelector("#name").value;
            let email = document.querySelector("#mail").value;
            let message = document.querySelector("#msg").value;
            console.log("Name: " + name);
            console.log("Email: " + email);
            console.log("Message: " + message);
    
        });
    
    
})();
    