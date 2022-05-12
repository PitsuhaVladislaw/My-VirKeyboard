const Keyboard = {
    elements: {
        main: null,
        textsContainer: null,
        texts: []
    },

    EventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: null,
        CapsLk: null
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.textsContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "1keyboard-position");
        this.elements.textsContainer.classList.add("keyboard_text");
        this.elements.textsContainer.appendChild(this._createText());

        this.elements.texts = this.elements.textsContainer.querySelectorAll(".keyboard_text");

        this.elements.main.appendChild(this.elements.textsContainer);
        document.body.appendChild(this.elements.main);
    },

    _createText() {
        const fragment = document.createDocumentFragment();
        const textLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const createIcon = (icon_name) => {
            return `<i class="material-icons"> ${icon_name} </i>`;
        };

        textLayout.forEach(text => {
            const textElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(text) !== 1;

            textElement.setAttribute("type", "button");
            textElement.classList.add("keyboard_text");

            switch (text) {
                case "backspace":
                    textElement.classList.add("keyboard_text_wide");
                    textElement.innerHTML = createIconHTML("backspace");

                    textElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    textElement.classList.add("keyboard_text_wide", "keyboard_text_activatable");
                    textElement.innerHTML = createIconHTML("capsLK");

                    textElement.addEventListener("click", () => {
                        this._toggleCapsLk();
                        textElement.classList.toggle("keyboard_text_active", this.properties.CapsLk);

                    });

                    break;

                case "enter":
                    textElement.classList.add("keyboard_text_wide");
                    textElement.innerHTML = createIconHTML("keyboard_return");

                    textElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");

                    });

                    break;

                case "space":
                    textElement.classList.add("keyboard_text_extra_wide");
                    textElement.innerHTML = createIconHTML("space");

                    textElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");

                    });

                    break;

                case "done":
                    textElement.classList.add("keyboard_text_wide", "keyboard_text_dark");
                    textElement.innerHTML = createIconHTML("click_circle");

                    textElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");

                    });

                    break;

                default:
                    textElement.textContent = text.toLowerCase();

                    textElement.addEventListener("click", () => {
                        this.properties.value += this.properties.CapsLk ? text.toUpperCase() : text.toLowerCase();
                        this._triggerEvent("onclose");

                    });

                    break;
            }

            fragment.appendChild(textElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(HandlerName) {
        console.log("Event Triggered! Event name:" + HandlerName)
    },

    _toggleCapsLk() {
        this.properties.CapsLk = !this.properties.CapsLk;
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    },
};

window.addEventListener("DomContentLoaded", function() {
    Keyboard.init();
    Keyboard.open("dcode", function(currentValue) {
        console.log("value changed! here it is: " + currentValue);
    }, function(currentValue) {
        console.log("keyboard closed! Finishing value" + currentValue);
    });
})