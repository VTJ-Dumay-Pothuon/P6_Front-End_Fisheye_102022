// Get the id parameter from URL
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');

// If the photographer id is not in the URL, redirect to index.html
if (!id) {
    window.location.href = "./index.html";
}

async function getPhotographer() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        // select only the photographer with the url id and return it as an object
        return { photographer: data.photographers.find(photographer => photographer.id == id) };
    }
}

async function displayHeaderFooter(media, photographer) {
    new photographerFactory("header", photographer);
    new photographerFactory("footer", {media : media, photographer : photographer});
}

async function getMedias() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        // select only the medias of the photographer with the url id and return it as an array
        return { media: data.media.filter(media => media.photographerId == id) };
    }
}

async function displayData(media) {
    const mediaSection = document.querySelector(".media_section");

    media.forEach((photo) => {
        const mediaDOM = new photographerFactory("media", photo);
        mediaSection.appendChild(mediaDOM);
    });
}

function createLightbox() {
    const lightboxContainer = document.querySelector(".lightbox-container");
    const lightboxDOM = new photographerFactory("lightbox");
    lightboxContainer.appendChild(lightboxDOM);
}

function sortMedia(media, filter) {
    switch (filter) {
        case "Popularité":
            media.sort((a, b) => b.likes - a.likes);
            break;
        case "Date":
            media.sort((a, b) => a.date.localeCompare(b.date));
            break;
        case "Titre":
            media.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }
    displayData(media);
}

async function init() {
    // Get photographer's data from the "API"
    const { photographer } = await getPhotographer();

    // Add a screen-reader only title to the media section
    const mediaSection = document.querySelector(".media_section");
    const srOnlyTitle = document.createElement("span");
    const main = document.querySelector("main");
    srOnlyTitle.setAttribute("class", "sr-only");
    srOnlyTitle.textContent = `Photos et vidéos de ${photographer.name}`;
    main.insertBefore(srOnlyTitle, mediaSection);

    // Get photographer's media data from the "API"
    const { media } = await getMedias();
    displayData(media);
    displayHeaderFooter(media, photographer);

    // Add an event listener on #filter to sort all medias in .media_section
    const filter = document.querySelector("#filter");
    filter.addEventListener("change", () => {
        const filter = document.querySelector("#filter").value;
        const mediaSection = document.querySelector(".media_section");
        mediaSection.innerHTML = "";
        sortMedia(media, filter);
    });

    // Add a fake chevron onto the filter select to make it look like a custom dropdown
    // but with the native select behavior instead of a custom dropdown with JS
    const chevron = document.createElement("i");
    chevron.classList.add("fa-solid", "fa-chevron-down");
    const filterbox = document.querySelector(".filterbox");
    filterbox.appendChild(chevron);
    
    // The chevron is always pointing up when the filter is open
    filter.addEventListener("click", () => {
        chevron.classList.toggle("fa-chevron-down");
        chevron.classList.toggle("fa-chevron-up");
    });

    // The chevron is always pointing down when the filter is closed
    filter.addEventListener("focusout", () => {
        chevron.classList.remove("fa-arrows-left-right");
        chevron.classList.add("fa-chevron-down");
        chevron.classList.remove("fa-chevron-up");
    }, false);


    // Remove default behavior on spacebar when the filter is focused
    // if any arrow is pressed, the chevron will be pointing right
    // and if tab is pressed, the chevron will be pointing down
    filter.addEventListener("keydown", (e) => {
        chevron.classList.remove("fa-chevron-down");
        chevron.classList.remove("fa-chevron-up");
        if (e.key === " ") {
            e.preventDefault();
            chevron.classList.add("fa-arrows-left-right");
        } else if (e.key === "ArrowDown" || e.key === "ArrowUp" ||
                   e.key === "ArrowLeft" || e.key === "ArrowRight") {
            chevron.classList.add("fa-arrows-left-right");
        } else if (e.key === "Tab") {
            chevron.classList.remove("fa-arrows-left-right");
            chevron.classList.add("fa-chevron-down");
        }
    });


    // Create the lightbox
    createLightbox();
}

init();