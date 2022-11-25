function setFooterDOM(media, photographer) {
    // Sum the likes of all the media
    let likes = 0;
        media.forEach((media) => {
        likes += media.likes;
    });

    // Create DOM elements
    const likesphotographer = document.createElement("data");
    likesphotographer.setAttribute("value", likes);
    likesphotographer.textContent = `${likes} `;

    const likesIcon = document.createElement("i");
    likesIcon.setAttribute("class", "fas fa-heart");
    likesIcon.setAttribute("title", "likes");

    
    const pricePerDay = `${photographer.price}€/jour`;
    const price = document.createElement("data");
    price.setAttribute("value", photographer.price);
    price.textContent = pricePerDay;

    // Build and return the DOM
    const footer = document.querySelector(".photograph-footer");
    footer.appendChild(likesphotographer);
    likesphotographer.appendChild(likesIcon);
    footer.appendChild(price);

    return (footer);
}