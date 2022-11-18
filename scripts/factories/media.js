function mediaFactory(data) {
    const { id, photographerId, title, likes, date } = data;

    function getMediaDOM() {
        // Create DOM elements
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex", "0");

        article.addEventListener("click", () => {
            // Get the media's id from the article's order in DOM. This function is a bit hacky,
            // but it allows to get the media's sorted order after a filter has been applied.
            const sorted_id = Array.from(article.parentNode.children).indexOf(article);
            openLightbox(sorted_id)

        });

        if (data.video) {
            const media = document.createElement( 'video' );
            media.setAttribute("src", `assets/media/${photographerId}/${data.video}`);
            media.setAttribute("alt", `Vidéo "${title}", publiée le ${date}`);
            article.setAttribute("title", title);
            article.setAttribute("data-date", date);
            media.setAttribute("data-id", id);
            media.setAttribute("preload", "metadata");
            //media.addEventListener('mouseover',  function() { this.controls = true  }, false);
            //media.addEventListener('mouseleave', function() { this.controls = false }, false);
            media.addEventListener('click', function(e) { e.preventDefault(); }, false);
            article.appendChild(media);
        } else {
            const media = document.createElement( 'img' );
            media.setAttribute("src", `assets/media/${photographerId}/${data.image}`);
            media.setAttribute("alt", `Photo "${title}", publiée le ${date}`);
            article.setAttribute("title", title);
            article.setAttribute("data-date", date);
            media.setAttribute("data-id", id);  
            article.appendChild(media);
        }

        const nameData = document.createElement( 'h2' );
        nameData.textContent = title;

        likesText = document.createElement( 'p' );
        const likesData = document.createElement("data");
        likesData.setAttribute("value", likes);
        likesData.textContent = `${likes} `;

        const likesIcon = document.createElement("i");
        likesIcon.setAttribute("class", "far fa-heart");
        likesIcon.setAttribute("title", "likes");

        // The heart icon is only needed for the total likes update
        const totalLikesIcon = document.createElement("i");
        totalLikesIcon.setAttribute("class", "fas fa-heart");
        totalLikesIcon.setAttribute("title", "likes");

        // Add an event listener to the heart icon to update both the media likes and the total likes
        likesIcon.addEventListener("click", function() {
            let likesTotal = document.querySelector(".photograph-footer data")
            if (likesIcon.classList.contains("far")) {
                // switch to full heart icon
                likesIcon.classList.remove("far");
                likesIcon.classList.add("fas");
                // update the media likes
                likesData.setAttribute("value", likes + 1);
                likesData.textContent = `${likes + 1} `;
                likesData.appendChild(likesIcon);
                // likesData.appendChild(likesIcon);
                // update the total likes
                likesTotal = document.querySelector(".photograph-footer data")
                likesTotal.setAttribute("value", parseInt(likesTotal.getAttribute("value")) + 1);
                likesTotal.textContent = `${parseInt(likesTotal.getAttribute("value"))} `;
                likesTotal.appendChild(totalLikesIcon);
            } else {
                // switch to empty heart icon
                likesIcon.classList.remove("fas");
                likesIcon.classList.add("far");
                // update the media likes
                likesData.setAttribute("value", likes);
                likesData.textContent = `${likes} `;
                likesData.appendChild(likesIcon);
                // update the total likes
                likesTotal.setAttribute("value", parseInt(likesTotal.getAttribute("value")) - 1);
                likesTotal.textContent = `${parseInt(likesTotal.getAttribute("value"))} `;
                likesTotal.appendChild(totalLikesIcon);
            }
        });

        // Build and return the DOM
        article.appendChild(nameData);
        article.appendChild(likesText);
        likesText.appendChild(likesData);
        likesText.appendChild(likesIcon);
        return (article);
    }
    return { getMediaDOM };
  }