class Element {
    constructor(type="", extraAttributes={}, x = 0, y = 0, z = 0) {
        this.htmlElement = document.createElement(type);
        this.htmlElement.classList.add("customElement");
        this.htmlElement.setAttribute("id", `coord_${x}_${y}`);
        document.querySelector("#gameBoard").append(this.htmlElement);

        // Set any extra attributes
        for (const [key, value] of Object.entries(extraAttributes)) {
            this.htmlElement.setAttribute(key, value);
        }

        this.x = x; // X coordinate of element
        this.y = y; // Y coordinate of element
        this.z = z; // Z index of element
        this.move(x, y, z);
    }

    // Move this element to the x, y, z coordinates
    move(x = null, y = null, z = null) {
        if (x === null) {
            x = this.x
        }
        if (y === null) {
            y = this.y
        }
        if (z === null) {
            z = this.z
        }
        this.htmlElement.style.left = x + "px";
        this.htmlElement.style.bottom = y + "px"
        this.htmlElement.style.zIndex = z;
    }

    set backgroundImage(newBackgroundImage) {
        this.htmlElement.style.backgroundImage = `url("${newBackgroundImage}")`;
    }
}
