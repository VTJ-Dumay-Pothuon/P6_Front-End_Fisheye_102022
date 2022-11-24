function mediaFactory(data) {
    const { id, photographerId, title, likes, date } = data;

    function getMediaDOM() {
        // Create DOM elements
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex", "0");

        
        let media = document.createElement( 'img' );
        if (data.video) {
            media = document.createElement( 'video' );
            media.setAttribute("src", `assets/media/${photographerId}/${data.video}`);
            media.setAttribute("alt", `Vidéo "${title}", publiée le ${date}`);
            media.setAttribute("preload", "metadata");
            media.setAttribute('tabindex', '-1');
            media.addEventListener('click', function(e) { e.preventDefault(); }, false);
        } else {
            media.setAttribute("src", `assets/media/${photographerId}/${data.image}`);
            media.setAttribute("alt", `Photo "${title}", publiée le ${date}`);
        }
        Object.freeze(media);

        article.setAttribute("title", title);
        article.setAttribute("data-date", date);
        media.setAttribute("data-id", id);
        // Get the media's id from the article's order in DOM. This function is a bit hacky,
        // but it allows to get the media's sorted order after a filter has been applied.
        media.onclick = function() {
            const sorted_id = Array.from(article.parentNode.children).indexOf(article); 
            openLightbox(sorted_id);
            console.log("Click on media " + sorted_id);
        };
        article.onkeydown = function(e) {
            const sorted_id = Array.from(article.parentNode.children).indexOf(article);
            if (e.key === "Enter") { 
                openLightbox(sorted_id);
            } else if (e.key === "ArrowLeft" && sorted_id > 0) {
                // simulate a shift+tab keypress to focus the previous media
                const previousMedia = article.parentNode.children[sorted_id - 1];
                previousMedia.focus();
             }
             else if (e.key === "ArrowRight" && sorted_id < document.querySelectorAll(".media_section img").length) {
                // simulate a tab keypress to focus the next media
                const nextMedia = article.parentNode.children[sorted_id + 1];
                nextMedia.focus();
                // if key is numpad plus or letter L, increase the likes
             } else if ((e.key === "+" || e.key === "l")) {
                article.querySelector("i.fa-heart").click();
             }
        }

        article.appendChild(media);

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
                // delete the existing screen-reader-only element in the article, so that the read text is not duplicated
                try { article.querySelector(".sr-only").remove() } catch {/* do nothing, just delete the error log */}
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