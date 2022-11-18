// Get the id parameter from URL
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');

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
    const photographerModel = headerFooterFactory(media, photographer);
    photographerModel.setHeaderDOM();
    photographerModel.setFooterDOM();
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
        const photoModel = mediaFactory(photo);
        const mediaDOM = photoModel.getMediaDOM();
        mediaSection.appendChild(mediaDOM);
    });
};

function createLightbox(media) {
    const lightboxContainer = document.querySelector(".lightbox-container");

    const lightbox = lightboxFactory(media);
    const lightboxDOM = lightbox.getLightboxDOM();
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
    chevron.classList.add("fas", "fa-chevron-down");
    const filterbox = document.querySelector(".filterbox");
    filterbox.appendChild(chevron);
    
    // The chevron is always pointing up when the filter is open
    filter.addEventListener("click", () => {
        chevron.classList.toggle("fa-chevron-down");
        chevron.classList.toggle("fa-chevron-up");
    });

    // The chevron is always pointing down when the filter is closed
    filter.addEventListener("focusout", () => {
        chevron.classList.add("fa-chevron-down");
        chevron.classList.remove("fa-chevron-up");
    }, false);

    // Create the lightbox
    createLightbox(media);
};

init();