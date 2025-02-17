function validateForm() {
    let firstName = document.querySelector("#firstName").value.trim();
    let lastName = document.querySelector("#lastName").value.trim();
    let email = document.querySelector("#email").value.trim();
    let message = document.querySelector("#message").value.trim();
    let responseDiv = document.querySelector("#contact-button-response");

    // Email validation regex
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName) {
        responseDiv.innerHTML = "Please enter your first and last name.";
        responseDiv.classList.add("text-danger");
        return false;
    }

    if (!email || !emailPattern.test(email)) {
        responseDiv.innerHTML = "Please enter a valid email address.";
        responseDiv.classList.add("text-danger");
        return false;
    }

    if (!message) {
        responseDiv.innerHTML = "Please enter a message.";
        responseDiv.classList.add("text-danger");
        return false;
    }

    // Clear error message if validation passes
    responseDiv.innerHTML = "";
    return true;
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
    let form = document.querySelector("#contact-form");

    let obj = {
        sub: "Contact form submitted!",
        txt: `${firstName} ${lastName} ${subscribe ? "Subbed!" : "Did not subscribe."} sent you a message that reads: "${message}". 
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

                // Clear the form after successful submission
                form.reset();
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
