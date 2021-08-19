class PlanesTable extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["color", "title", "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "value" && newValue != null && newValue.replace(" ") != "") {
            this.fixTime = true;
            this.btfValue = newValue;
        }
        this.update();
    }

    disconnectedCallback() {
        clearInterval(this.timer); // важно, чтобы элемент мог быть собранным сборщиком мусора
    }

    connectedCallback() {
        this.innerHTML = "<style>.digitsDiv {display: flex;position: absolute;} " +
            ".titleDiv {position: absolute; text-align: center;background-color: #600801;white-space: nowrap;}" +
            ".titleSpan {font-family: EurostileLTStd-Ex2; font-weight: bold; font-size: 17px; color: #c0b9b7; letter-spacing: 3px;}" +
            ".bgrnd {position: relative; display:flex; background: radial-gradient(ellipse at top, gray, #484848), radial-gradient(ellipse at bottom, #4b4b4b, white);  " +
            "background-image: url(\"data:image/jpeg;base64,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\")}" +
            "</style>"+
            "<div class='bgrnd' style='border: darkgray; width: 1462px; min-width: 1462px; height: 113px; min-height: 113px;'>" +
            "<div class='titleDiv' style=\"width: 728px;height: 25px;left: 2px;top: 2px;\">" +
            "<span class='titleSpan'>DESTINATION</span>"+
            "</div>"+
            "<div id='dest' class='digitsDiv' style=\"left: 2px;top: 27px;\">"+
                "<electro-letter value=\"!\"></electro-letter>"+
                "<electro-letter value=\"d\"></electro-letter>"+
                "<electro-letter value=\"e\"></electro-letter>"+
                "<electro-letter value=\"s\"></electro-letter>"+
                "<electro-letter value=\"t\"></electro-letter>"+
                "<electro-letter value=\"i\"></electro-letter>"+
                "<electro-letter value=\"n\"></electro-letter>"+
                "<electro-letter value=\"a\"></electro-letter>"+
                "<electro-letter value=\"t\"></electro-letter>"+
                "<electro-letter value=\"i\"></electro-letter>"+
                "<electro-letter value=\"o\"></electro-letter>"+
                "<electro-letter value=\"n\"></electro-letter>"+
                "<electro-letter value=\"!\"></electro-letter>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 300px;height: 25px;left: 732px;top:2px;\">" +
            "<span class='titleSpan'>DATE</span>"+
            "</div>"+
            "<div id='btfDay' class='digitsDiv'  style=\"left: 732px;top: 27px;\">" +
                "<electro-digit value=\"8\"></electro-digit><electro-digit value=\"8\"></electro-digit>"+
                "<canvas width='20px' height='47px''></canvas>"+
                "<electro-letter value=\"m\"></electro-letter><electro-letter value=\"o\"></electro-letter><electro-letter value=\"n\"></electro-letter>"+
            "</div>"+
            "<div style='position: absolute; width: 448px; height: 25px;left: 1034px;top:2px;; display: flex; justify-content: center'>"+
            "<div class='titleDiv' style=\"min-width: 448px;\">"+
            "<span class='titleSpan'>STATUS</span>"+
            "</div></div>"+
            "<div class='digitsDiv'  style=\"left: 1034px;top: 25px;\">" +
            "<electro-letter value=\"!\"></electro-letter><electro-letter value=\"s\"></electro-letter>"+
            "<electro-letter value=\"t\"></electro-letter><electro-letter value=\"a\"></electro-letter>"+
            "<electro-letter value=\"t\"></electro-letter><electro-letter value=\"u\"></electro-letter>"+
            "<electro-letter value=\"s\"></electro-letter><electro-letter value=\"!\"></electro-letter>"+
            "</div>"+
            "</div>";

        // this.timer = setInterval(() => this.update(), 1000);
        this.update();
    }
    update() {
        this.digitColor = this.getAttribute('color') || "#00AA00";

        this.destTitle = this.getAttribute('destination') || "";
        this.dateTitle = this.getAttribute('date') || null;
        this.statusTitle = this.getAttribute('status') || "";
        let showDate = new Date();
        if (this.dateTitle != null) {
            showDate.setTime(Date.parse(this.dateTitle));
        }
        if (this.firstElementChild == null)
            return;
        this.destnode   = this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling;
        this.datenode     = this.destnode.nextElementSibling.nextElementSibling;
        this.statusnode    = this.datenode.nextElementSibling.nextElementSibling;
        let countNodes = 12;
        let curNode = this.destnode.firstElementChild;
        this.destnodes  = [ curNode ];
        while (countNodes > 0) {
            curNode = curNode.nextElementSibling;
            this.destnodes.push(curNode);
            countNodes--;
        }

        this.drawWord(this.destnodes, this.caconizeString(this.destTitle, 13));

        countNodes = 5; // 09-aug
        curNode = this.datenode.firstElementChild;
        this.daynodes = [ curNode ];
        while (countNodes > 0) {
            curNode = curNode.nextElementSibling;
            if (countNodes == 4)
                this.tir = [curNode];
            else
                this.daynodes.push(curNode);
            countNodes--;
        }
        this.drawNumber(this.daynodes.splice(0,2), showDate.getDate());
        this.drawTir(this.tir, false);
        this.drawWord(this.daynodes, showDate.toString().split(" ")[1]);

        countNodes = 7; // released/planned
        curNode = this.statusnode.firstElementChild;
        this.statusnodes = [ curNode ];
        while (countNodes > 0) {
            curNode = curNode.nextElementSibling;
            this.statusnodes.push(curNode);
            countNodes--;
        }
        this.drawWord(this.statusnodes, this.caconizeString(this.statusTitle, 8));
    }

    caconizeString(str, len) {
        if (str.length > len) {
            str = str.substr(0,len);
        } else {
            while (str.length < len) {
                str = " "+str;
            }
        }
        return str;
    }

    drawNumber(elems, num) {
        for (let i=elems.length-1; i>=0; i--) {
            let elem = elems[elems.length-i-1];
            elem.setAttribute("color", this.digitColor);
            elem.setAttribute("value", Math.floor(num/Math.pow(10, i))%(10));
        }
    }
    drawWord(elems, word) {
        for (let i=0; i <elems.length; i++) {
            let elem = elems[i];
            elem.setAttribute("color", this.digitColor);
            elem.setAttribute("value", word.substr(i,1));
        }
    }
    drawTir(elems, hide) {
        let elem = elems[0];
        let ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.rect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = hide ? "#000" : this.digitColor;
        ctx.rect(3,20,15,6);
        ctx.fill();
    }
}

window.customElements.define('planes-table', PlanesTable);

// window.customElements.define('electro-digit', ElectroDigit);
//
// window.customElements.define('electro-letter', ElectroElectro);

///<div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>