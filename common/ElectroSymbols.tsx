class ElectroSymbol extends HTMLElement {
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
        this.symbolColor = this.getAttribute('color') || "#00AA00";
        let symbolValue = this.getAttribute('value');
        if ( this.firstElementChild && this.firstElementChild.firstElementChild) {
            this.drawSymbol(this.firstElementChild.firstElementChild, symbolValue);
        }
    }
    drawSymbol(elem, symbol) {
        let ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = this.symbolColor;
        let numpts = this.getSymbol(symbol);
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
    getSymbol(symbol) {
        return [];
    }
}
// window.customElements.define('electro-symbol', ElectroSymbol);

class ElectroDigit extends ElectroSymbol {
    constructor() {
        super();
    }
    getSymbol(symbol = 0) {
        let num = parseInt(symbol);
        if (isNaN(num))
            return [];
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

window.customElements.define('electro-digit', ElectroDigit);

class ElectroLetter extends ElectroSymbol {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ["value"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.update();
    }

    getSymbol(letter = "") {
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
        switch (letter.toLowerCase()) {
            /// corrected
            case "a": all.splice(6,1);
                all.push([[w, 0], [w-sk, t+gs+oh], [w-(sd+sk), t+gs+oh+s], [w-(t+sk), t+gs+oh], [w-t, t+gs]]); // right top for A
                all.push([[sd+gs+sk*3, sd], [t+gs+sk*3, 0], [w-gs, 0], [t+gs+ow+sk*3, t], [t+gs+sk*3, t]]); // top for A
                result = all; break;
            case "b": all.splice(6,1); all.splice(3,2); all.splice(0,2);
                all.push([[sk*3, 0], [sk*2, t+gs+oh], [sd+sk*2, t+gs+oh+s], [t+sk*2, t+gs+oh], [t+sk*3, t+gs]]
                    ,[[0, h-gs], [0, h-(t+gs)], [sk, h-(t+gs+oh)], [sd+sk, h-(t+gs+oh+s)], [t+sk,h-(t+gs+oh)], [t, h-(t+gs)]]
                    ,[[w-sd-ow/3, sd+gs], [w-ow/3, t+gs], [w-sk-ow/3, t+gs+oh], [w-(t+sk)-ow/3, t+gs+oh], [w-t-ow/3, t+gs]]
                    ,[[gs+sk*3, 0], [t+gs+sk*3, 0], [t+gs+2*ow/3+sk*3, 0], [t+gs+2*ow/3+s+sk*3, sd], [t+gs+2*ow/3+sk*3, t], [t+gs+sk*3, t]]
                    ,[[gs, h], [t+gs+ow, h], [t+gs+ow+s, h-sd], [t+gs+ow, h-t], [t+gs, h-t]]); // left top, left bottom, right top, top, bottom for B
                result = all;break;
            case "c": all.splice(5,1); all.splice(2,2);result = all;break;
            case "d": all.splice(4,3); all.splice(0,2);
                all.push([[sk*3, 0], [sk*2, t+gs+oh], [sd+sk*2, t+gs+oh+s], [t+sk*2, t+gs+oh], [t+sk*3, t+gs]]
                    ,[[0, h-gs], [0, h-(t+gs)], [sk, h-(t+gs+oh)], [sd+sk, h-(t+gs+oh+s)], [t+sk,h-(t+gs+oh)], [t, h-(t+gs)]]
                    ,[[gs+sk*3, 0], [t+gs+sk*3, 0], [t+gs+ow+sk*3, 0], [t+gs+ow+s+sk*3, sd], [t+gs+ow+sk*3, t], [t+gs+sk*3, t]]
                    ,[[gs, h], [t+gs+ow, h], [t+gs+ow+s, h-sd], [t+gs+ow, h-t], [t+gs, h-t]]); // left top, left bottom, top, bottom for D
                result = all;break;
            case "e": all.splice(5,1);all.splice(2,2);
                all.push([[sd+gs+sk*2, h/2], [t+gs+sk*2, h/2-t/2], [t+gs+ow/2+sk*2, h/2-t/2], [t+gs+ow/2+s+sk*2, h/2], [t+gs+ow/2+sk*2, h/2+t/2], [t+gs+sk*2, h/2+t/2]]); // center for E
                result = all;break;
            case "f": all.splice(5,2);all.splice(2,2);
                all.push([[sd+gs+sk*2, h/2], [t+gs+sk*2, h/2-t/2], [t+gs+ow/2+sk*2, h/2-t/2], [t+gs+ow/2+s+sk*2, h/2], [t+gs+ow/2+sk*2, h/2+t/2], [t+gs+sk*2, h/2+t/2]]); // center for E
                result = all;break;
            case "g": all.splice(5,1); all.splice(2,2);
                all.push([[w-sd-sk*2, h-(sd+gs)], [w-sk*2, h-(t+gs)], [w-sk, h-(t+gs+oh/2)], [w-(sd+sk), h-(t+gs+oh/2+s)], [w-(t+sk),h-(t+gs+oh/2)], [w-t-sk*2, h-(t+gs)]]
                    ,[[sd+gs+sk*2+ow*2/3, h/2+oh/2], [t+gs+sk*2+ow*2/3, h/2-t/2+oh/2], [t+gs+ow+sk*2, h/2-t/2+oh/2], [t+gs+ow+s+sk*2, h/2+oh/2], [t+gs+ow+sk*2, h/2+t/2+oh/2], [t+gs+sk*2+ow*2/3, h/2+t/2+oh/2]]); // right bottom, center for G
                result = all;break;
            case "h": all.splice(6,1); all.splice(4,1);result = all;break;
            case "j": all.splice(3,3);all.splice(0,2);
                all.push([[sd+gs+sk*3+ow/2, sd], [t+gs+sk*3+ow/2, 0], [w, 0], [t+gs+ow+sk*3, t], [t+gs+sk*3+ow/2, t]]
                    ,[[w, gs], [w-sk, t+gs+oh], [w-(sd+sk), t+gs+oh+s], [w-(t+sk), t+gs+oh], [w-t, t+gs]]
                    ,[[sd, h-(sd+gs)], [0, h-(t+gs)], [sk, h-(t+gs+oh/2)], [sd+sk, h-(t+gs+oh/2+s)], [t+sk,h-(t+gs+oh/2)], [t, h-(t+gs)]]); // top, right top, left bottom for J
                result = all;break;
            case "o": all.splice(5,1);result = all;break;
            case "p": all.splice(6,1);all.splice(2,1);result = all;break;
            case "n": all.splice(4,3);
                all.push([[t+gs+sk*2+gs, t+gs], [t+gs+sk*2+gs+s, t+gs], [t+ow+gs+sk*2, h/2-t-sd], [t+ow+gs+sk*2, h/2-t/2-gs], [t+ow+sk*2-sd, h/2-t/2], [t+gs+sk*2+gs, t+2*gs+s]]); // center  for N
                result = all; break;
            case "m":
                all.splice(4,3);
                all.push([[t+gs+sk*2+gs, t+gs], [t+gs+sk*2+gs+s, t+gs], [t+ow/2+gs+sk*2, h*2/5-t-sd], [t+ow/2+gs+sk*2, h*2/5-t/2-gs], [t+ow/2+sk*2-sd, h*2/5-t/2], [t+gs+sk*2+gs, t+2*gs+s]]
                    ,[[ow/2+t+gs+sk*2+gs, h*2/5-t-sd], [ow/2+t+gs+sk*3+gs+s, t+gs], [ow/2+t+ow/2+gs+sk*3, t+gs], [ow/2+t+ow/2+gs+sk*3, t+2*gs+s], [ow/2+t+ow/2+sk*2-sd, h*2/5-t/2-gs], [ow/2+t+gs+sk*2+gs, h*2/5-t/2]]); // center  for M
                // ,[[ow/2+t+gs+sk*2+gs, ], [ow/2+t+gs+sk*2+gs+s, t+gs], [ow/2+t+ow/2+gs+sk*2, ], [ow/2+t+ow/2+gs+sk*2, h*2/5-t/2-gs], [ow/2+t+ow/2+sk*2-sd, ], [ow/2+t+gs+sk*2+gs, ]]); // center  for M
                result = all;break;
            case "u": all.splice(4,2);result = all;break;
            case "v": all.splice(4,3); all.splice(2,1);
                all.push([[t+gs, h-sd], [t+gs, h-sd-t/2-gs], [t+gs+ow+sk*2, h/2+t/2-sd], [t+gs+ow+s+sk*2, h/2], [t+gs+ow+sk*2+s, h/2+t], [t+gs+s, h-sd]]); // bottom to center for V
                result = all;break;
            case "l": all.splice(2,4);
                all.push([[w-sd-sk*2, h-(sd+gs)], [w-sk*2, h-(t+gs)], [w-sk*1.5, h-(t+gs+oh/2)], [w-(sd+sk*1.5), h-(t+gs+oh/2+s)], [w-(t+sk*1.5),h-(t+gs+oh/2)], [w-t-sk*2, h-(t+gs)]]); // right bottom for L
                result = all; break;
            case "r": all.splice(6,1);all.splice(2,1);
                all.push([[t+gs+sk, h/2+t/2+gs], [t+gs+sk, h/2+t/2+2*gs+s], [t+gs+ow, h-sd], [t+gs+ow+s, h-sd], [t+gs+ow+s, h-t-sd], [t+2*gs+s+sk, h/2+t/2+gs]]); // bottom for R
                result = all;break;
            case "s": all.splice(3,1);all.splice(1,1);result = all;break;
            case "t": all.splice(5,2);all.splice(0,4);
                all.push([[sk*3+ow/2+t/2, t+gs], [sk*2+ow/2+t/2, t+gs+oh], [sk*2+ow/2+t, t+gs+oh+s], [t+sk*2+ow/2+t/2, t+gs+oh], [t+sk*3+ow/2+t/2, t+gs]]
                    ,[[ow/2+t, h-(sd+gs)], [ow/2+t/2, h-(t+gs)], [sk+ow/2+t/2, h-(t+gs+oh)], [sk+ow/2+t, h-(t+gs+oh+s)], [t+sk+ow/2+t/2,h-(t+gs+oh)], [t+ow/2+t/2, h-(t+gs)]]); // center top center botton for T
                result = all;break;
            case "y": all = [];
                all.push([[ow/2+t, h-(sd+gs)], [ow/2+t/2, h-(t+gs)], [sk+ow/2+t/2, h-(t+gs+oh)], [sk+ow/2+t, h-(t+gs+oh+s)], [t+sk+ow/2+t/2,h-(t+gs+oh)], [t+ow/2+t/2, h-(t+gs)]]
                    ,[[sd+sk*3, sd+gs], [sk*3, t+gs], [sk*2+ow/2, t+gs+oh], [sd+sk*2+ow/2+t/2, t+gs+oh+s], [sd+sk*2+ow/2+t/2, t+gs+oh-sd], [t+sk*3, s+gs]]
                    ,[[w-sd, sd+gs], [w, t+gs], [w-sk-ow/2, t+gs+oh], [w-(sd+sk)-ow/2-t/2, t+gs+oh+s], [w-(t+sk)-ow/2, t+gs+oh-sd], [w-t, s+gs]]); // all for Y
                result = all;break;
            case " ":
                result = [];break;
            default: result = all;
        }
        return result;
    }
}

window.customElements.define('electro-letter', ElectroLetter);
