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

async function init() {
    // Get photographer's data from the "API"
    const { photographer } = await getPhotographer();
    // Get photographer's media data from the "API"
    const { media } = await getMedias();
    displayData(media);
    displayHeaderFooter(media, photographer);
};

init();
