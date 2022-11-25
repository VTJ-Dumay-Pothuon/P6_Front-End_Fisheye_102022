class photographerFactory {
    constructor(type, data = null) {
// This bit allows us to use the same factory for the lightbox that doesn't need any data
        if (!data && type !== "lightbox") { throw new Error("No data provided") }

        switch (type) {
            case "photographer":
                return getPhotographerDOM(data);
            case "media":
                return getMediaDOM(data);
            case "lightbox":
                return getLightboxDOM();

// Header and footer are not created by the factory, but directly in the DOM, because their
// semantic tag already exists in the DOM and we don't want to add a useless level of nesting.
            case "header":
                setHeaderDOM(data);
                break;
            case "footer":
                setFooterDOM(data.media, data.photographer);
                break;

            default:
                throw new Error("No type specified");
        }
    }
}