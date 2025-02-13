(function() {
    "use strict";

    // Select the contact form
    let form = document.querySelector("#contact-form");

    // Attach event listener to the submit button
    document
        .querySelector("#contact-form-button")
        .addEventListener("click", (event) => {
            event.preventDefault(); // Fix: Add parentheses
            event.stopPropagation(); // Fix: Add parentheses

            // Check form validity
            if (!form.checkValidity()) {
                form.classList.add("was-validated"); // Add Bootstrap validation styling
                return; // Stop execution if form is invalid
            }

            // If valid, send the email
            sendTheEmail();
        });

    function sendTheEmail() {
        console.log("Thanks!");

        // Get values from the form
        let firstName = document.querySelector("#firstName").value;
        let lastName = document.querySelector("#lastName").value;
        let email = document.querySelector("#email").value;
        let message = document.querySelector("#message").value;

        // Log values for debugging
        console.log("First Name: " + firstName);
        console.log("Last Name: " + lastName);
        console.log("Email: " + email);
        console.log("Message: " + message);

        // TODO: Send the form data to a server or API
    }
})();
