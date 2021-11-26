class Element {
    constructor(type="", extraAttributes={}, x = 0, y = 0, z = 0) {
        this.element = document.createElement(type);
        this.element.classList.add("customElement")
        document.body.append(this.element);

        // Set any extra attributes
        for (const [key, value] of Object.entries(extraAttributes)) {
            this.element.setAttribute(key, value);
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
        this.element.style.left = x + "px";
        this.element.style.bottom = y + "px"
        this.element.style.zIndex = z;
    }
}
