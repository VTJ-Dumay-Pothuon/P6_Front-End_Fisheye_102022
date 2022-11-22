function displayModal() {
    const modal = document.querySelector("#contact_modal");
    const nameData = document.querySelector(".photograph-header h1").textContent;
    const artistName = document.querySelector("#contact_artist-name");
    artistName.textContent = nameData;
	modal.style.display = "block";

    // focus on the first input
    document.querySelector("#prenom").focus();

    // prevent submit button default behavior and close modal instead, for now
    const submitButton = document.querySelector("#contact_modal button");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        submitForm(e);
    });

    // purely aesthetic : scrolls to the bottom of the modal when the textarea is focused
    const message = document.querySelector("#contact_modal textarea");
    message.addEventListener("focus", () => {
        const scrollableForm = document.querySelector("#contact_modal .modal");
        scrollableForm.scrollTo(0, message.scrollHeight + 100);
    });

    // prevent the page from scrolling
    document.body.style.overflow = "hidden";

    // hide the footer
    const footer = document.querySelector("footer");
    footer.classList.add("lightbox--hidden");
}

function closeModal() {
    const modal = document.querySelector("#contact_modal");
    modal.style.display = "none";

    // allow the page to scroll
    document.body.style.overflow = "auto";

    // show the footer
    const footer = document.querySelector("footer");
    footer.classList.remove("lightbox--hidden");
}


function submitForm(event) {
    //stop page from refreshing when form is submitted
    event.preventDefault();

    const inputs = document.querySelectorAll('#contact_modal input');
    const message = document.querySelector('#contact_modal textarea');


    let form = {};
    inputs.forEach(input => {
        //get the data
        form[input.id] = input.value;

        //clear the input
        input.value = "";
    })

    //get the message from textarea
    form[message.id] = message.value

    //clear the textarea
    message.value = "";

    //show data in console
    console.log(form);

    //hide the modal
    closeModal();
}