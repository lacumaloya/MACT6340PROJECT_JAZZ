function sendTheEmail() {
    console.log("The submit button was clicked.");
    let obj = {
        sub: "Contact form submitted!",
        txt: `${firstName} ${lastName} ${subscribe ? "Subbed!" : "Did not subscribe."} sent you a message that reads ${message}. 
        Their email address is ${email},`
    };

    console.log(obj);
}
