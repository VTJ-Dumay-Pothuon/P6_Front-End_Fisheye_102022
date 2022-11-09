function headerFooterFactory(media, photographer) {

    function setHeaderDOM() {
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

    function setFooterDOM() {
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
        likesIcon.setAttribute("aria-label", "likes");

        
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

    return { setHeaderDOM, setFooterDOM };
  }