let death = {
    youDied() {
        // Add death information 
        if (document.querySelector("#death") === null) {
            let death = document.createElement("p");
            death.innerText = "You died";
            death.setAttribute("id", "death");
            document.querySelector("main").append(death);
        }
    }
}