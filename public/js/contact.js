function validateForm() {
    let form = document.querySelector("#contact-form");
    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let message = document.querySelector("#message");
    let isValid = true;

    // Email validation regex
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.value.trim()) {
        firstName.classList.add("is-invalid");
        isValid = false;
    } else {
        firstName.classList.remove("is-invalid");
        firstName.classList.add("is-valid");
    }

    if (!lastName.value.trim()) {
        lastName.classList.add("is-invalid");
        isValid = false;
    } else {
        lastName.classList.remove("is-invalid");
        lastName.classList.add("is-valid");
    }

    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        email.classList.add("is-invalid");
        isValid = false;
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    if (!message.value.trim()) {
        message.classList.add("is-invalid");
        isValid = false;
    } else {
        message.classList.remove("is-invalid");
        message.classList.add("is-valid");
    }

    return isValid;
}

function sendTheEmail() {
    console.log("The submit button was clicked.");

    if (!validateForm()) {
        return; // Stop submission if validation fails
    }

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;
    let subscribe = document.querySelector("#subscribeCheck").checked;

    let obj = {
        sub: "Contact form submitted!",
        txt: `${firstName} ${lastName} ${subscribe ? "Subbed!" : "Did not subscribe."} sent you a message that reads: \"${message}\". 
        Their email address is: ${email}.`
    };

    fetch("/mail", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((r) => r.json())
        .then((response) => {
            let responseDiv = document.querySelector("#contact-button-response");
            if (response.result === "success") {
                responseDiv.innerHTML = "Submitted!";
                responseDiv.classList.add("text-success");
                responseDiv.classList.remove("text-danger");
                document.querySelector("#contact-form").reset(); // Clear fields on success
                document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid")); // Reset validation styling
            } else {
                responseDiv.innerHTML = "Failed to send.";
                responseDiv.classList.add("text-danger");
                responseDiv.classList.remove("text-success");
            }
        })
        .then(() => {
            setTimeout(() => {
                document.querySelector("#contact-button-response").innerHTML = "";
            }, 5000);
        });
}

document.querySelector("#contact-form-button").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    sendTheEmail();
});
