// Pressing arrows while focused on a link will switch focus between links
function moveBetweenLinks(e) {
    const links = document.querySelectorAll(".photographer_section a");
    const currentIndex = Array.from(links).indexOf(e.target);
    if (e.key === "ArrowLeft" && currentIndex > 0) {
        links[currentIndex - 1].focus();
    } else if (e.key === "ArrowRight" && currentIndex < links.length-1) {
        links[currentIndex + 1].focus();
    }
}

function getPhotographerDOM(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;

    // Create DOM elements
    const article = document.createElement( 'article' );

    const link = document.createElement("a");
    link.href = `./photographer.html?id=${id}`;
    link.onkeydown = moveBetweenLinks;

    const crop = document.createElement("div");
    crop.classList.add("crop");

    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const nameData = document.createElement( 'h2' );
    nameData.textContent = name;

    const locationData = document.createElement("data");
    locationData.setAttribute("value", location);
    locationData.textContent = location;

    const taglineData = document.createElement("data");
    taglineData.setAttribute("value", `slogan de ${name} : ${tagline}`);
    taglineData.textContent = tagline;

    const priceData = document.createElement("data");
    priceData.setAttribute("value", price);
    priceData.textContent = pricePerDay;

    // Build and return the DOM
    article.appendChild(link);
        link.appendChild(crop);
        crop.appendChild(img);
        link.appendChild(nameData);
    article.appendChild(locationData);
    article.appendChild(taglineData);
    article.appendChild(priceData);
    return (article);
}