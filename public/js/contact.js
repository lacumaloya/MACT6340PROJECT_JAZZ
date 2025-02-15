function sendTheEmail() {
    console.log("The submit button was clicked.");

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;
    let subscribe = document.querySelector("#subscribeCheck").checked; // Correct ID

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
            document.querySelector("#contact-button-response").innerHTML =
                response.result;
        })
        .then(() => {
            setTimeout(() => {
                document.querySelector("#contact-button-response").innerHTML = "";
            }, "5000");
        });

}

document.querySelector("#contact-form-button").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    sendTheEmail();
});
