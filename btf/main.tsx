class Btfwatches extends HTMLElement {
    constructor() {
        super();
    }
    disconnectedCallback() {
        clearInterval(this.timer); // важно, чтобы элемент мог быть собранным сборщиком мусора
    }

    connectedCallback() {
        this.innerHTML = "<style>.digitsDiv {display: flex;position: absolute;} " +
            ".titleDiv {display:block;position: absolute; text-align: center;background-color: #600801;}" +
            ".titleSpan {font-family: EurostileLTStd-Ex2; font-weight: bold; font-size: 17px; color: #c0b9b7; letter-spacing: 3px;}</style>"+
            "<div style='display: block; border: darkgray; width: 955px; min-width: 955px; height: 180px; min-height: 180px;'>" +
            "<div class='titleDiv' style=\"width: 140px;height: 25px;left: 47px;top: 10px;\">" +
            "<span class='titleSpan'>MONTH</span>"+
            "</div>"+
            "<div id='btfMonthName' class='digitsDiv' style=\"left: 23px;top: 42px;\">"+
                "<btf-digit value=\"8\"></btf-digit>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 90px;height: 25px;left: 245px;top:10px;\">" +
            "<span class='titleSpan'>DAY</span>"+
            "</div>"+
            "<div id='btfDay' class='digitsDiv'  style=\"width: 118px;height: 85px;left: 236px;top: 42px;\">" +
                "<btf-digit value=\"8\"></btf-digit><btf-digit value=\"8\"></btf-digit>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 100px;height: 25px;left: 445px;top:10px;\">"+
            "<span class='titleSpan'>YEAR</span>"+
            "</div>"+
            "<div class='digitsDiv'  style=\"width: 225px;height: 85px;left: 386px;top: 42px;\">" +
            "<btf-digit value=\"8\"></btf-digit><btf-digit value=\"8\"></btf-digit>"+
            "<btf-digit value=\"8\"></btf-digit><btf-digit value=\"8\"></btf-digit>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 100px;height: 25px;left: 675px;top:10px;\">"+
            "<span class='titleSpan'>HOUR</span>"+
            "</div>"+
            "<div class='digitsDiv'  style=\"width: 115px;height: 85px;left: 670px;top: 42px;\">" +
            "<btf-digit value=\"8\"></btf-digit><btf-digit value=\"8\"></btf-digit>"+
            "</div>"+

            "<div class='digitsDiv' style=\"width: 20px;height: 47px;left: 793px;top: 60px;\">" +
            "<canvas width='20px' height='47px''></canvas>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 80px;height: 25px;left: 835px;top:10px;\">"+
            "<span class='titleSpan'>MIN</span>"+
            "</div>"+
            "<div class='digitsDiv' style=\"width: 115px;height: 85px;left: 822px;top: 42px;\">" +
            "<btf-digit value=\"8\"></btf-digit><btf-digit value=\"8\"></btf-digit>"+
            "</div>"+

            "<div class='titleDiv' style=\"width: 52px;height: 23px;left: 615px;top: 30px;\">"+
            "<span class='titleSpan'>AM</span>"+
            "</div>"+
            "<div class='titleDiv' style=\"width: 52px;height: 23px;left: 615px;top: 85px;\">"+
            "<span class='titleSpan'>PM</span>"+
            "</div>"+
            "<div class='titleDiv' style=\"background-color:#121212; width: 350px;height: 27px;left: 302px;top: 137px;\">"+
            "<span class='titleSpan' style='font-size: 19px;'>DESTINATION TIME</span>"+
            "</div>"+
            "</div>";

        this.timer = setInterval(() => this.update(), 1000);
        this.update();
    }
    update() {
        this.digitColor = this.getAttribute('color') || "#00AA00";
        let showDate = new Date();

        this.monthName = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild];
        this.drawNumber(this.monthName, 1);

        this.btfday = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild,
            this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling];
        this.drawNumber(this.btfday, showDate.getSeconds());//showDate.getDate());

        this.btfyear = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild,
            this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling,
            this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling,
            this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling,
        ];
        this.drawNumber(this.btfyear, showDate.getFullYear());

        this.btfhours = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild,
                         this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling];
        this.drawNumber(this.btfhours, showDate.getHours());

        this.btfsec = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild];
        this.drawPoint(this.btfsec, showDate.getSeconds() % 2);

        this.btfminutes = [this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild,
                           this.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling];
        this.drawNumber(this.btfminutes, showDate.getMinutes());
    }

    drawNumber(elems, num) {
        for (let i=elems.length-1; i>=0; i--) {
            let elem = elems[elems.length-i-1];
            elem.setAttribute("color", this.digitColor);
            elem.setAttribute("value", Math.floor(num/Math.pow(10, i))%(10));
        }
    }
    drawPoint(elems, hide) {
        let elem = elems[0];
        let ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = hide ? "#000" : this.digitColor;
        ctx.beginPath();
        ctx.arc(10,10,10, 0, 2*Math.PI);
        ctx.stroke();
        // ctx.closePath();
        ctx.moveTo(10,37);
        ctx.arc(10,37,10, 0,2*Math.PI);
        ctx.fill();
    }
}

window.customElements.define('btf-watches', Btfwatches);

class BtfDigit extends HTMLElement {
    // private digitColor: number;
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.update();
    }

    disconnectedCallback() {
    }
    connectedCallback() {
        this.innerHTML = "<div style=\"background-color: black;width: 56px;height: 85px;\">" +
            "<canvas width='50px' height='74px' style='position: relative; left: 7px;top: 7px;'></canvas>"+
            "</div>";
    }
    update() {
        this.digitColor = this.getAttribute('color') || "#00AA00";
        let digitValue = parseInt(this.getAttribute('value'));
        if (!isNaN(digitValue) && this.firstElementChild && this.firstElementChild.firstElementChild) {
            this.drawDigit(this.firstElementChild.firstElementChild, digitValue);
        }
    }
    drawDigit(elem, letter) {
        let ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = this.digitColor;
        let numpts = this.getNumber(letter);
        for (let j = 0; j < numpts.length; j++) {
            let pts = numpts[j];
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.closePath();
            ctx.fill();
        }
    }
    getNumber(num = 0) {
        let result = [];
        let w  = 44; let h = 74; let t = 8; let gs = 1; let sk = 1;
        let s = 3*t/5;
        let sd = t - s;
        let oh = h/2 - 2*s - gs*2-3;
        let ow = w/2+1;//25;
        let all = [
            [[sd+sk*3, sd+gs], [sk*3, t+gs], [sk*2, t+gs+oh], [sd+sk*2, t+gs+oh+s], [t+sk*2, t+gs+oh], [t+sk*3, t+gs]] // left top 0
            ,[[sd, h-(sd+gs)], [0, h-(t+gs)], [sk, h-(t+gs+oh)], [sd+sk, h-(t+gs+oh+s)], [t+sk,h-(t+gs+oh)], [t, h-(t+gs)]] // left bottom 1
            ,[[w-sd-sk*2, h-(sd+gs)], [w-sk*2, h-(t+gs)], [w-sk, h-(t+gs+oh)], [w-(sd+sk), h-(t+gs+oh+s)], [w-(t+sk),h-(t+gs+oh)], [w-t-sk*2, h-(t+gs)]] // right bottom 2
            ,[[w-sd, sd+gs], [w, t+gs], [w-sk, t+gs+oh], [w-(sd+sk), t+gs+oh+s], [w-(t+sk), t+gs+oh], [w-t, t+gs]] // right top 3
            ,[[sd+gs+sk*3, sd], [t+gs+sk*3, 0], [t+gs+ow+sk*3, 0], [t+gs+ow+s+sk*3, sd], [t+gs+ow+sk*3, t], [t+gs+sk*3, t]] // top 4
            ,[[sd+gs+sk*2, h/2], [t+gs+sk*2, h/2-t/2], [t+gs+ow+sk*2, h/2-t/2], [t+gs+ow+s+sk*2, h/2], [t+gs+ow+sk*2, h/2+t/2], [t+gs+sk*2, h/2+t/2]] // center 5
            ,[[sd+gs, h-sd], [t+gs, h], [t+gs+ow, h], [t+gs+ow+s, h-sd], [t+gs+ow, h-t], [t+gs, h-t]] // bottom 6
        ];
        switch (num) {
            case 0: all.splice(5,1);result = all;break;
            case 1: result = [all[2],all[3]];break;
            case 2: all.splice(2,1);all.splice(0,1);result = all;break;
            case 3: all.splice(1,1);all.splice(0,1);result = all;break;
            case 4: all.splice(6,1);all.splice(4,1);all.splice(1,1);result = all;break;
            case 5: all.splice(3,1);all.splice(1,1);result = all;break;
            case 6: all.splice(3,1);result = all;break;
            case 7: all.splice(5,2);all.splice(0,2);result = all;break;
            case 8: result = all; break;
            case 9: all.splice(1,1);result = all;break;
            default: break;
        }
        return result
    }
}

window.customElements.define('btf-digit', BtfDigit);

///<div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>