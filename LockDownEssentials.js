const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    LIGHTBULB:   Symbol("lightbulb"),
    STORAGEBIN:   Symbol("storagebin"),
    BROOM:   Symbol("broom"),
    PLANTPOT:   Symbol("plantpot"),
    HANDSAN:   Symbol("handsanitizer"),
    WIPES:   Symbol("wipes"),
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sLightbulb = "";
        this.sStorageBin = "";
        this.sBroom = "";
        this.sPlantPot = "";
        this.sHandSan = "";
        this.sWipes = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.LIGHTBULB;
                aReturn.push("Welcome to Home Hardware's curbside delivery service! 🛠");
                aReturn.push(`Check out our latest deals:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Would you like to order a lightbulb 3-set for $5.99? 💡");
                break;
            case OrderState.LIGHTBULB:
                this.stateCur = OrderState.STORAGEBIN
                this.sLightbulb = sInput;
                aReturn.push("Would you like to order a storage bin set for $10.99? 🗃");
                break;
            case OrderState.STORAGEBIN:
                this.stateCur = OrderState.BROOM
                this.sStorageBin = sInput;
                aReturn.push("Would you like to order a broom for $7.99? 🧹");
                break;
            case OrderState.BROOM:
                this.stateCur = OrderState.PLANTPOT
                this.sBroom = sInput;
                aReturn.push("Would you like to order a ceramic plant pot for $4.99? 🌱");
                break;
            case OrderState.PLANTPOT:
                this.stateCur = OrderState.HANDSAN
                this.sPlantPot = sInput;
                aReturn.push("Stay safe! Add hand sanitizer to your order for $0.99? 🧴");
                break;
            case OrderState.HANDSAN:
                this.stateCur = OrderState.WIPES
                this.sHandSan = sInput;
                aReturn.push("Add disinfectant wipes to your order for $2.99? 🧼");
                break;
            case OrderState.WIPES:
                this.isDone(true);
                this.sWipes = sInput; 

                aReturn.push("You have ordered the following items:");
                if(this.sLightbulb.toLowerCase() == "yes"){
                  aReturn.push("Lightbulb 3-Set");
                }
                if(this.sStorageBin.toLowerCase() == "yes"){
                  aReturn.push("Storage Bin Set");
                }
                if(this.sBroom.toLowerCase() == "yes"){
                  aReturn.push("Broom");
                }
                if(this.sPlantPot.toLowerCase() == "yes"){
                  aReturn.push("Ceramic Plant Pot");
                }
                if(this.sHandSan.toLowerCase() == "yes"){
                  aReturn.push("Hand Sanitizer");
                }
                if(this.sWipes.toLowerCase() == "yes"){
                  aReturn.push("Disinfectant Wipes");
                }

                // calculate costs
                let totalCost = 0;
                if(this.sLightbulb.toLowerCase() == "yes"){
                  totalCost += 5.99;
                }
                if(this.sStorageBin.toLowerCase() == "yes"){
                  totalCost += 10.99;
                }
                if(this.sBroom.toLowerCase() == "yes"){
                  totalCost += 7.99;
                }
                if(this.sPlantPot.toLowerCase() == "yes"){
                  totalCost += 4.99;
                }
                if(this.sHandSan.toLowerCase() == "yes"){
                  totalCost += 0.99;
                }
                if(this.sHandSan.toLowerCase() == "yes"){
                  totalCost += 2.99;
                }

                aReturn.push(`Your total including tax is $${(totalCost*1.13).toFixed(2)}.`);

                aReturn.push("You'll recieve a text from us when your order is ready.");
                aReturn.push("Thank you for ordering with Home Hardware's curbside delivery service! 🛠");

                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">@import url('https://themes.googleusercontent.com/fonts/css?kit=Qx6FPcitRwTC_k88tLPc-ahgAuOdDK1U5JaDvkK2BTliU46up7xuWLCdJ03a4EOS_kmCvy597kDopqFAXvpeaA');ol{margin:0;padding:0}table td,table th{padding:0}.c6{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c7{color:#000000;font-weight:300;text-decoration:none;vertical-align:baseline;font-size:20pt;font-family:"Inter";font-style:normal}.c10{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:30pt;font-family:"Alfa Slab One";font-style:normal}.c2{padding-top:0pt;padding-bottom:0pt;line-height:2.0;orphans:2;widows:2;text-align:left}.c9{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c11{color:#000000;text-decoration:none;vertical-align:baseline;font-style:normal}.c8{color:#000000;text-decoration:none;vertical-align:baseline;font-style:italic}.c0{font-size:22pt;font-family:"Alfa Slab One";font-weight:400}.c4{font-size:22pt;font-family:"Inter";font-weight:700}.c3{font-size:20pt;font-family:"Inter";font-weight:400}.c1{font-size:22pt;font-family:"Inter";font-weight:300}.c5{font-size:22pt;font-family:"Inter";font-weight:400}.c13{font-size:20pt;font-family:"Inter";font-weight:300}.c14{font-weight:400;font-size:11pt;font-family:"Arial"}.c12{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c12"><div><p class="c6"><span class="c11 c14"></span></p></div><p class="c9"><span class="c10">Home Hardware @ Curbside </span></p><p class="c2"><span class="c5 c11">Text &ldquo;HARDWARE&rdquo; to (226)-489-2983 &#x1f6e0;</span></p><p class="c2"><span class="c4">&darr;</span><span class="c1">&nbsp;</span><span class="c1">Our current deals </span><span class="c11 c4">&darr;</span></p><p class="c9"><span class="c0">Brooms </span><span class="c5">- - - - - - </span><span class="c8 c1">7.99</span></p><p class="c9"><span class="c0">Storage bins </span><span class="c5">- - - - - - </span><span class="c1 c8">10.99</span></p><p class="c9"><span class="c0">Lightbulbs </span><span class="c5">- - - - - - </span><span class="c8 c1">5.99</span></p><p class="c9"><span class="c0">Plant pots</span><span class="c0">&nbsp;</span><span class="c5">- - - - - - </span><span class="c8 c1">4.99</span></p><p class="c6"><span class="c8 c1"></span></p><p class="c2"><span class="c13">We offer </span><span class="c3">FAST DELIVERY&#x1f4a8;</span><span class="c7">&nbsp;for all your essentials!</span></p></body></html>`);
  
    }
}
