async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        const data = await response.json();
        return { photographers: data.photographers };
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Get photographers data from the "API"
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
