// lightbox factory
// -----------------------------------
function lightboxFactory() {

    function getLightboxDOM() {
        // Create DOM elements
        const section = document.createElement( 'section' );
        section.classList.add("lightbox");

        const leftButton = document.createElement("button");
        leftButton.classList.add("lightbox__button--left");
        leftButton.setAttribute("aria-label", "previous image");
        const chevronLeft = document.createElement("i");
        chevronLeft.classList.add("fas", "fa-chevron-left");
        leftButton.appendChild(chevronLeft);

        const rightButton = document.createElement("button");
        rightButton.classList.add("lightbox__button--right");
        rightButton.setAttribute("aria-label", "next image");
        const chevronRight = document.createElement("i");
        chevronRight.classList.add("fas", "fa-chevron-right");
        rightButton.appendChild(chevronRight);

        const closeButton = document.createElement("img");
        closeButton.setAttribute("src", "assets/icons/close_lightbox.svg");
        closeButton.setAttribute("class", "lightbox__close-button");
        closeButton.setAttribute("onclick", "closeLightbox()");
        closeButton.setAttribute("aria-role", "button");
        closeButton.setAttribute("alt", "Fermer la lightbox");

        const figure = document.createElement("figure");
        
        const video = document.createElement( 'video' );
        video.setAttribute("controls", "controls");
        const img = document.createElement( 'img' );

        const nameData = document.createElement( 'figcaption' );

        // Build and return the DOM
        section.appendChild(closeButton);
        section.appendChild(leftButton);
        section.appendChild(rightButton);
        section.appendChild(figure);
        figure.appendChild(video);
        figure.appendChild(img);
        figure.appendChild(nameData);
        return (section);
    }

    return { getLightboxDOM }
}