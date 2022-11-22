function openLightbox(id) {
    const lightbox = document.querySelector(".lightbox");
    // This simple trick allows to reuse the openLightbox function for switching between media
    if (!lightbox.classList.contains("lightbox--open")) {
        lightbox.classList.add("lightbox--open");
    }
    // retrieve src and alt from the clicked media thanks to the id
    // that corresponds to the order of .media_section children
    const mediaSrc = document.querySelector(".media_section").children[id].querySelector("img, video");
    
    const image = document.querySelector(".lightbox figure img");
    const video = document.querySelector(".lightbox figure video");
    let media = image;
    if (mediaSrc.tagName === "VIDEO") {
        image.classList.add("lightbox--hidden");
        video.classList.remove("lightbox--hidden");
        media = video
    } else {
        video.classList.add("lightbox--hidden");
        image.classList.remove("lightbox--hidden");
    }
    Object.freeze(media);

    media.setAttribute("src", mediaSrc.getAttribute("src"));
    media.setAttribute("alt", mediaSrc.getAttribute("alt"));
    media.setAttribute("title", mediaSrc.parentNode.getAttribute("title"));
    media.setAttribute("data-date", mediaSrc.parentNode.getAttribute("data-date"));

    // update the title
    const title = document.querySelector(".lightbox figcaption");
    title.textContent = mediaSrc.parentNode.getAttribute("title");

    const leftButton = document.querySelector(".lightbox__button--left");
    leftButton.setAttribute("onclick", `openLightbox(${id - 1})`);
    const rightButton = document.querySelector(".lightbox__button--right");
    rightButton.setAttribute("onclick", `openLightbox(${id + 1})`);

    if (id === 0) {
        leftButton.classList.add("lightbox--hidden");
        rightButton.classList.remove("lightbox--hidden");
    } else if (id === document.querySelectorAll(".media_section img").length) {
        leftButton.classList.remove("lightbox--hidden");
        rightButton.classList.add("lightbox--hidden");
    } else {
        leftButton.classList.remove("lightbox--hidden");
        rightButton.classList.remove("lightbox--hidden");
    }

    // call checkKey function to the document
    document.onkeydown = function(e) {
        checkKey(e, id);
    };

    // prevent the page from scrolling
    document.body.style.overflow = "hidden";

    // hide the footer
    const footer = document.querySelector("footer");
    footer.classList.add("lightbox--hidden");
}

function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.remove("lightbox--open");

    // disable the keydown event
    document.onkeydown = null;

    // allow the page to scroll
    document.body.style.overflow = "auto";

    // show the footer
    const footer = document.querySelector("footer");
    footer.classList.remove("lightbox--hidden");
}

function checkKey(event, id) {

    e = event || window.event;

    if (e.key === "ArrowLeft" && id > 0) {
       openLightbox(id - 1)
    }
    else if ((e.key === "ArrowRight" || e.key === "Enter") && 
    id < document.querySelectorAll(".media_section img").length) {
       openLightbox(id + 1)
    } else if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === " ") {
        videoPlay = document.querySelector(".lightbox--open video")
        videoPlay.focus();
    }
}