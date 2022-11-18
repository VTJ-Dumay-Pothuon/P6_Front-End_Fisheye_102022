function displayModal() {
    const modal = document.querySelector("#contact_modal");
    const nameData = document.querySelector(".photograph-header h1").textContent;
    const artistName = document.querySelector("#contact_artist-name");
    artistName.textContent = nameData;
	modal.style.display = "block";

    // prevent the page from scrolling
    document.body.style.overflow = "hidden";

    // focus on the first input
    document.querySelector("#prenom").focus();

    // prevent submit button default behavior and close modal instead, for now
    const submitButton = document.querySelector("#contact_modal button");
    console.log(submitButton);
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector("#contact_modal");
    modal.style.display = "none";

    // allow the page to scroll
    document.body.style.overflow = "auto";
}


function submitForm(event) {
    //stop reload page by the submit effect
    event.preventDefault()

    let inputs = document.querySelectorAll('input'),
        message = document.querySelector('textarea'),
        data = {};

    //get all the data from inputs
    inputs.forEach(input => {
        //get the data
        data[input.id] = input.value;

        //reset the data
        input.value = ""
    })

    //get the message from textarea
    data[message.id] = message.value

    //reset the data
    message.value = "";

    //show data in console
    console.log(data)

    //hide the modal
    closeModal()
}