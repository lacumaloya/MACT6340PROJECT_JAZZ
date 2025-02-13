(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("#contact-form");

        form.addEventListener("submit", function (event) {
            let isValid = true;

            // Loop through all form controls
            form.querySelectorAll("input, textarea").forEach((field) => {
                if (!field.checkValidity()) {
                    field.classList.add("is-invalid"); // Bootstrap's red border
                    isValid = false;
                } else {
                    field.classList.remove("is-invalid"); // Remove error styling if valid
                }
            });

            if (!isValid) {
                event.preventDefault(); // Prevent submission
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        }, false);
    });

})();
