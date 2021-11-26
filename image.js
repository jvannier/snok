class Image {
    constructor(url, alt="", x = 0, y = 0, z = 0) {
        this.image = document.createElement('img');
        this.image.src = url;
        this.image.alt = alt;
        document.body.append(this.image);

        this.x = x; // X coordinate of Image
        this.y = y; // Y coordinate of Image
        this.z = z; // Z index of Image
        this.move(x, y, z);
    }

    // Move this Image to the x, y, z coordinates
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
        this.image.style.left = x + "px";
        this.image.style.bottom = y + "px"
        this.image.style.zIndex = z;
    }
}
