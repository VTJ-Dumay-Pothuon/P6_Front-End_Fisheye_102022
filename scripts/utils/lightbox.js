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
        image.classList.add("lightbox__figure--hidden");
        video.classList.remove("lightbox__figure--hidden");
        media = video
    } else {
        video.classList.add("lightbox__figure--hidden");
        image.classList.remove("lightbox__figure--hidden");
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
        leftButton.classList.add("lightbox__button--hidden");
        rightButton.classList.remove("lightbox__button--hidden");
    } else if (id === document.querySelectorAll(".media_section img").length) {
        leftButton.classList.remove("lightbox__button--hidden");
        rightButton.classList.add("lightbox__button--hidden");
    } else {
        leftButton.classList.remove("lightbox__button--hidden");
        rightButton.classList.remove("lightbox__button--hidden");
    }

    // prevent the page from scrolling
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.classList.remove("lightbox--open");

    // allow the page to scroll
    document.body.style.overflow = "auto";
}