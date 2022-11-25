function setHeaderDOM(photographer) {
    // Create DOM elements
    const crop = document.createElement("div");
    crop.classList.add("crop");

    const picture = document.createElement("img");
    picture.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    picture.setAttribute("alt", photographer.name);

    const name = document.createElement("h1");
    name.textContent = photographer.name;

    const location = document.createElement("data");
    location.setAttribute("value", `${photographer.city}, ${photographer.country}`);
    location.textContent = `${photographer.city}, ${photographer.country}`;

    const tagline = document.createElement("p");
    tagline.textContent = photographer.tagline;

    // Build and return the DOM
    const header = document.querySelector(".photograph-header");
    header.appendChild(crop);
    crop.appendChild(picture);
    
    header.appendChild(name);
    header.appendChild(location);
    header.appendChild(tagline);

    return (header);
}