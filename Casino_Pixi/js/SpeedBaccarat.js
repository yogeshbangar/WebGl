
//SpeedBaccarat screen
const OPENTIME = -7;
class SpeedBaccarat {
    constructor() {
        this.container = new PIXI.Container();//Create Container for SpeedBaccarat object
        this.sbContainer = new PIXI.Container();// all button of DreamCatcher like player, bankar tie and pairs ,batonalll and place coins Contain in dcCardContainer
        this.mSBGraphics = new PIXI.Graphics();//Showing number and cards 
        this.mBack = loadRolletSprite(basepath + 'dragontiger.jpg', 0, 0, 1);//Background for SpeedBaccarat
        this.mBack.position.set(this.mBack.width * .5, this.mBack.height * .5);
        this.container.addChild(this.mBack);//add background as a child in  container
        this.container.addChild(this.sbContainer);//add background as a child in sbContainer
        this.sbContainer.addChild(this.mSBGraphics);//add background as a child in mSBGraphics
        
        this.isStart = false;
        // Define All reqiure varible 
        this.mSB4undo = [], this.mSBChips = [], this.moveSprite = [], this.moveUndo = [], this.moveWin = [], this.cards = [];


        // Define  reqiure Text
        this.persentPlayer = this.loadText({ fill: colorSBBLUE, fontSize: 18, fontWeight: "bold" }, 50, 22, 572);
        this.persentBanker = this.loadText({ fill: colorRed, fontSize: 18, fontWeight: "bold" }, 25, 470, 572);
        this.persentTie = this.loadText({ fill: colorDTGreen, fontSize: 18, fontWeight: "bold" }, 25, 250, 600);

        this.txtPlayer = this.loadTextStr({ fill: colorWhite, fontSize: 26, fontWeight: "bold" }, "PLAYER", 35, 725);
        this.txtBanker = this.loadTextStr({ fill: colorWhite, fontSize: 26, fontWeight: "bold" }, "BANKER", 400, 725);
        this.txtTie = this.loadTextStr({ fill: colorWhite, fontSize: 26, fontWeight: "bold", align: 'center' }, "TIE 8:1", 230, 725);
        this.txtPPAIR = this.loadTextStr({ fill: colorSBBLUE, fontSize: 26, fontWeight: "bold", align: 'center' }, "P PAIR\n11:1", 95, 785);
        this.txtBPAIR = this.loadTextStr({ fill: colorRed, fontSize: 26, fontWeight: "bold", align: 'center' }, "B PAIR\n11:1", 360, 785);

        this.txtPCount = this.loadTextStr({ fill: colorWhite, fontSize: 35, fontWeight: "bold" }, "0", 135, 590);
        this.txtBCount = this.loadTextStr({ fill: colorWhite, fontSize: 35, fontWeight: "bold" }, "6", 385, 590);

        this.wining = [false, false, false, false, false];
        this.alpha = .8;
        this.alphavx = .01;


        this.chinesePlayer = loadRolletSprite(basepath + 'player.png', 90, 700, 1);//Background for SpeedBaccarat
        this.chineseBanker = loadRolletSprite(basepath + 'banker.png', 460, 700, 1);//Background for SpeedBaccarat
        this.mSBGraphics.addChild(this.chinesePlayer);//add background as a child in mSBGraphics
        this.mSBGraphics.addChild(this.chineseBanker);//add background as a child in mSBGraphics


        //Initialize Graphics for Winning strip
        this.rect = new PIXI.Graphics().beginTextureFill(this.gradient()).drawRect(0, 0, app.screen.width * .5, 80);
        this.rect.position.set(app.screen.width * .25, 230);
        this.youwin = loadRolletText({ fill: colorDTYellow, fontSize: 20 }, 'YOU WIN');//add text on rect
        this.youwin.position.set(147 - this.youwin.width * .5, 10);
        this.rect.addChild(this.youwin);
        this.getwin = loadRolletText({ fill: colorWhite, fontSize: 25 }, '10');//add text on rect
        this.getwin.position.set(147 - this.getwin.width * .5, 40);
        this.rect.addChild(this.getwin);
        this.container.addChild(this.rect);


    }

    ///Dwaring Funtion
    drawSpeedBaccarat() {
        if (dynamicCounter > -14 && dynamicCounter < 0 && this.sbContainer.scale.x < 1) {
            this.sbContainer.scale.x += .020;
            this.sbContainer.scale.y += .020;
            this.sbContainer.x -= 1;
            this.sbContainer.y -= 5;
            if (this.sbContainer.scale.x > 0.96) {
                this.sbContainer.position.set(0, 0);
                this.sbContainer.scale.set(1, 1)
            }
        }
        //scale -- roullete table at the time of batting off
        if ((dynamicCounter <= -14 || dynamicCounter > 0) && this.sbContainer.scale.x > 0.85) {
            this.sbContainer.scale.x -= .020;
            this.sbContainer.scale.y -= .020;
            this.sbContainer.x += 1;
            this.sbContainer.y += 5;
        }


        //animation for placing coin on cards
        for (var i = 0; i < this.moveSprite.length; i++) {
            for (let j = 0; j < this.moveSprite[i].length; j++) {
                if (this.moveSprite[i][j].ex > this.moveSprite[i][j].x) {
                    this.mSBChips[i][j].visible = true;
                    this.moveSprite[i][j].visible = false;
                } else {
                    this.moveSprite[i][j].y += this.moveSprite[i][j].vy;
                    this.moveSprite[i][j].x += this.moveSprite[i][j].vx;
                }
            }
        }

        //animation for placing coin on cards for undo
        for (var i = 0; i < this.moveUndo.length; i++) {
            if (posx + 80 < this.moveUndo[i].x) {
                this.sbContainer.removeChild(this.moveUndo[i]);
                this.moveUndo.splice(i, 1);
            } else {
                this.moveUndo[i].y -= this.moveUndo[i].vy;
                this.moveUndo[i].x -= this.moveUndo[i].vx;
            }

        }

        this.drawGrapics();
    }


    ///Call when game start
    onStart() {
        this.isStart = false;
        dynamicCounter = 8;//restart dynamicCounter
        timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
        app.stage.removeChild(mHome.container);
        this.setVisible(true);
        this.resetValue();
        resetValue();
        app.stage.addChildAt(this.container, 0);
        this.container.visible = true;
        txtBatType.visible = true;
        txtBatType.text = 'TOTAL BET';
        APP_SCREEN = APP_SPEED_BACCARAT;

    }

    //Set Visible call accouring to var isvisible
    setVisible(isvisible) {//set visiblity of table releted object
        sprite_menu.visible = true;
        //set visiblity of buttons
        sprite_repeat.visible = isvisible && dynamicCounter > 0;
        //set visiblity of undo buttom
        sprite_undo.visible = isvisible && dynamicCounter > 0;
        //set visiblity of flying coin
        coinArray.forEach(element => { element.visible = isvisible && dynamicCounter > 0; });
        coinArrayBig.forEach(element => {
            element.visible = false;
        });
        this.chinesePlayer.visible  = isvisible;
this.chineseBanker.visible  = isvisible;
        //set visiblity of flying center coin
        coinArrayBig[selCoin].visible = isvisible && dynamicCounter > 0;//set visible big coin 
        trans_Background.visible = false;
        txtbottomLeft.visible = true;//set screen bottomLeft text visibility
        txtbottomRight.visible = true;//set screen bottomLeft text visibility
        txtBalance.visible = true;//set screen Balance text visibility
        txtBat.visible = true;//set screen Bat text visibility
        txtDydnamic.visible = true;//set screen Dydnamic text visibility
    }
    //Call on Game close
    onClose() {
        app.stage.removeChild(this.container);
    }
    //set timer for SpeedBaccarat
    onSBTimer() {//set timer for SpeedBaccarat Tiger
        if (dynamicCounter == 0) {//call when bet is closed
            this.setVisible(false);
        }
        if (dynamicCounter < OPENTIME) {
            this.checkWinConditions();
        }

        if (dynamicCounter < -16) {//end of the game
            dynamicCounter = 8;//restart dynamicCounter
            this.setVisible(true);//call when bet is oped
            resetValue();
            this.persentPlayer.rot = Math.floor(Math.random() * 70);
            this.persentBanker.rot = Math.floor(Math.random() * (100 - this.persentPlayer.rot));
            this.persentTie.rot = 100 - (this.persentPlayer.rot + this.persentBanker.rot);
            this.persentPlayer.text = this.persentPlayer.rot + " %";
            this.persentBanker.text = this.persentBanker.rot + " %";
            this.persentTie.text = this.persentTie.rot + " %";
        }
    }
    //remove all chips from dream chatcher cards
    removeChips() {
        while (this.mSBChips.length > 0) {
            var sprites = this.mSBChips.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
        }
    }
    //Call when req to undo
    undoCoins() {
        console.log("DT undoCoins");
        if (this.mSB4undo.length > 0) {
            var bat = this.mSB4undo.pop();
            currentbat -= bat.chip;
            balance += bat.chip;
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;

        }
        if (this.mSBChips.length > 0) {
            var sprites = this.mSBChips.pop();
            console.log("DreamCatcher sprites =" + sprites.length);
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                var sprite = sprites.pop();
                sprite.visible = true;
                this.moveUndo.push(sprite);
            }
        }

    }
    //Call for repeat Coin
    repeatCoins() {
        if (this.mSB4undo.length > 0) {
            var bat = this.mSB4undo[this.mSB4undo.length - 1];
            this.callBat(bat.type);
        }
    }

    //Call for when requir to reset all values for next game
    resetValue() {

        this.txtPCount.visible = false;
        this.txtBCount.visible = false;
        this.rect.visible = false;
        txtBatType.text = 'TOTAL BET';
        // this.rect.visible = false;
        while (this.cards.length > 0) {
            this.sbContainer.removeChild(this.cards.pop());
        }
        this.removeBoardCoin();
        while (this.mSB4undo.length > 0) {
            this.mSB4undo.pop();
        }
        while (this.moveWin.length > 0) {
            this.moveUndo.push(this.moveWin.pop());
        }
        for (let i = 0; i < this.wining.length; i++) {
            this.wining[i] = false;

        }

        make_deck();

        var kk = ['S4', 'D11', 'C11', 'H4', 'S11', 'H3'];

        for (let i = 0; i < 6; i++) {
            // cards[i] = kk[i];
            this.cards.push(loadRolletSprite(basepath + "cards/" + cards[i] + ".png", 100 + i * 40, 660, .30));
            this.sbContainer.addChild(this.cards[i]);
            if (i % 2 == 0) {
                this.cards[i].x = 100 + (i / 2) * 40;
            } else {
                this.cards[i].x = 400 + Math.floor(i / 2) * 40;
            }
            if (i == 4) {
                this.cards[i].x = 45;
                this.cards[i].rotation = Math.PI * .5;
            }
            if (i == 5) {
                this.cards[i].x = 495;
                this.cards[i].rotation = Math.PI * 1.5;
            }
            this.cards[i].visible = false;
            this.cards[i].suit = cards[i].substring(0, 1);
            this.cards[i].rank = parseInt(cards[i].substring(1));
            if (this.cards[i].rank == 14) {
                this.cards[i].rank = 1;
            }
            colorBat = colorWhite;
            txtDydnamic.tint = colorBat;
            console.log(this.cards[i].suit + " = ranka = " + this.cards[i].rank);
        }


    }
    //call when req to load new text varible
    loadText(style_var, percent, x, y) {
        var text = new PIXI.Text(percent + ' %', new PIXI.TextStyle(style_var));
        text.position.set(x, y);
        text.rot = percent;
        text.orot = percent;
        this.sbContainer.addChild(text);
        return text;
    }
    //call when req to load new text varible
    loadTextStr(style_var, str, x, y) {
        var text = new PIXI.Text(str, new PIXI.TextStyle(style_var));
        text.position.set(x, y);
        this.sbContainer.addChild(text);
        return text;
    }
    //Handle Click event
    onClick(e) {

        if (this.isStart == false || mSpeedBaccaratHelp.mainContainer.x < 100) {//return false if game not initillze 
            this.isStart = true;
            return;
        }
        //return if bet is closed or menu is open
        if (dynamicCounter <= 0 || mSidemenu.graphics.x < 300 || trans_Background.visible) {
            if (dynamicCounter <= 0) {
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
                txtWait4Next.text = "Wait for next game";
            }
            return;
        }
        if (coinValue[selCoin] > balance) {// check balance
            txtWait4Next.myCustomProperty = 100;
            txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
            txtWait4Next.text = 'Balance too low ';
            return;
        }

        //Check if bet on tie
        if (cir_cir_collision(235, 591, 76, e.data.global.x, e.data.global.y, 2) ||
            CircRectCollision(159, 591, 152, 87, e.data.global.x, e.data.global.y, 5)) {
            console.log(" Tie cir_cir~Rect   ");
            this.callBat(SBTIE);
            return;
        }
        //Check if bet on  player
        if (CircRectCollision(15, 498, 215, 180, e.data.global.x, e.data.global.y, 5)) {
            console.log("Player~   ");
            this.callBat(SBPLAYER);
            return;
        }
        //Check if bet on Banker
        if (CircRectCollision(238, 498, 215, 180, e.data.global.x, e.data.global.y, 5)) {

            console.log("Banker~   ");
            this.callBat(SBBANKER);
            return;

        }
        //Check if bet on P Pair
        if (CircRectCollision(15, 687, 215, 80, e.data.global.x, e.data.global.y, 5)) {
            console.log("P Pair~   ");
            this.callBat(SBPTIE);
            return;
        }
        //Check if bet on B Pair
        if (CircRectCollision(238, 687, 215, 80, e.data.global.x, e.data.global.y, 5)) {

            console.log("Ba Pair~   ");
            this.callBat(SBBTIE);
            return;
        }
        // Ó
    }
    callBat(type) {
        currentbat += coinValue[selCoin];//set coin current value
        balance -= coinValue[selCoin];//update balance
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;
        this.mSB4undo.push(new BatValuse(type, coinValue[selCoin]));
        var sprips = this.getCoinStrip(type, getChipValue(type, this.mSB4undo));

        if (sprips.length > 0) {
            this.moveSprite.push([sprips[0]]);
            this.mSBChips.push([sprips[1]]);
        }
    }
    getCoinStrip(type, coin) {
        var sprips = [];
        switch (type) {
            case SBPLAYER:
                sprips = this.SBCoins(175, 700, coin);
                break;
            case SBBANKER:
                sprips = this.SBCoins(540, 700, coin);
                break;
            case SBTIE:
                sprips = this.SBCoins(360, 700, coin);
                break;
            case SBPTIE:
                sprips = this.SBCoins(220, 790, coin);
                break;
            case SBBTIE:
                sprips = this.SBCoins(490, 790, coin);
                break;
        }
        return sprips;
    }
    SBCoins(endx, endy, coins) {
        var stratx = posx + 80;
        var starty = posy + 80;
        endx -= 90;
        endy += 25;
        if (coins > balance) {
            alert("You don't have enough coins");
            return;
        }
        isBatAccepted = "BET ACCEPTED";

        var thita = getAngle(stratx, starty, endx, endy);//Get direction angle
        var sprite = this.addCoin(stratx, starty, coinValue[selCoin]);/// create coin for move to coinbar to card
        sprite.ex = endx;
        sprite.ey = endy;
        //Get direction update vlaue
        sprite.vx = Math.sin(thita * (Math.PI / 180)) * speed * 3;
        sprite.vy = -Math.cos(thita * (Math.PI / 180)) * speed * 3;
        this.sbContainer.addChild(sprite);

        var newSprite = this.addCoin(endx, endy, coins);
        console.log("endx, endy," + endx, endy);
        this.sbContainer.addChild(newSprite);
        newSprite.visible = false;
        return [sprite, newSprite];

    }
    addCoin(x, y, val) {
        // console.log(x+"<5 pink <10 red  <25 green <125 black < 500 purple <2500 yellow.");
        var col = 0;
        if (val < 5) col = 0;
        else if (val < 25) col = 1;
        else if (val < 125) col = 2;
        else if (val < 500) col = 3;
        else if (val < 2500) col = 4;
        else col = 5;
        var val = (val + "");
        if (val.includes('.') && val.length > 3) { //true
            val = Math.floor(val) + "+";
        }
        var coinstrip = loadRolletSprite(basepath + "svg/a" + col + ".svg", x, y, SCALECOIN + .1);
        var txt = loadRolletText({ fill: colorWhite, fontSize: 70 - val.length * 5, fontWeight: "bold" }, val);
        coinstrip.addChild(txt);
        txt.position.set(-txt.width * .5, -txt.height * .52);
        console.log(txt.width + "  ~~  " + txt.height);
        return coinstrip;
    }
    drawGrapics() {
        this.mSBGraphics.clear();
        this.mSBGraphics.lineStyle(4, colorSBBLUE, 1);
        this.mSBGraphics.beginFill(colorSBBLUE, .2);
        if (this.wining[0]) {
            this.mSBGraphics.beginFill(colorSBBLUE, this.alpha);
        }
        this.mSBGraphics.arc(265, 650, 95, Math.PI, Math.PI * 1.5);
        this.mSBGraphics.arcTo(265, 545, 175, 853, 0);
        this.mSBGraphics.arcTo(10, 545, 175, 853, 0);
        this.mSBGraphics.arcTo(10, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(170, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(170, 650, 175, 853, 0);
        this.mSBGraphics.endFill(colorSBBLUE, .41);


        this.mSBGraphics.lineStyle(4, colorRed, 1);
        this.mSBGraphics.beginFill(colorRed, .2);
        if (this.wining[1]) {
            this.mSBGraphics.beginFill(colorRed, this.alpha);
        }
        this.mSBGraphics.arc(275, 650, 95, Math.PI * 1.5, 0);
        this.mSBGraphics.arcTo(370, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(530, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(530, 545, 175, 853, 0);
        this.mSBGraphics.arcTo(275, 545, 175, 853, 0);
        this.mSBGraphics.arcTo(275, 557, 175, 853, 0);
        this.mSBGraphics.endFill(colorRed, .41);



        this.mSBGraphics.lineStyle(4, colorGreen, 1);
        this.mSBGraphics.beginFill(colorGreen, .2);
        if (this.wining[2]) {
            this.mSBGraphics.beginFill(colorGreen, this.alpha);
        }
        this.mSBGraphics.arc(270, 655, 90, Math.PI, 0);
        this.mSBGraphics.arcTo(360, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(180, 760, 175, 853, 0);
        this.mSBGraphics.arcTo(180, 654, 175, 853, 0);
        this.mSBGraphics.endFill(colorDTRed, .41);


        this.mSBGraphics.lineStyle(4, colorSBBLUE, 1);
        this.mSBGraphics.beginFill(colorSBBLUE, .2);
        if (this.wining[3]) {
            this.mSBGraphics.beginFill(colorSBBLUE, this.alpha);
        }
        this.mSBGraphics.drawRect(10, 770, 255, 94);
        this.mSBGraphics.lineStyle(4, colorRed, 1);
        this.mSBGraphics.beginFill(colorRed, .2);
        if (this.wining[4]) {
            this.mSBGraphics.beginFill(colorRed, this.alpha);
        }
        this.mSBGraphics.drawRect(275, 770, 255, 94);
        this.mSBGraphics.endFill(colorRed, .41);

        if (this.alpha > .6)
            this.alphavx = -.005;
        if (this.alpha < 0.4)
            this.alphavx = .005;
        this.alpha += this.alphavx;

        //Draw Tiger percent Circle
        this.mSBGraphics.endFill(colorBlock, .51);
        this.mSBGraphics.lineStyle(4, colorSBBLUE, .41);
        this.mSBGraphics.beginFill(colorBlock, .51);
        this.mSBGraphics.drawCircle(43, 582, 28);
        this.mSBGraphics.endFill(colorSBBLUE, .41);
        this.mSBGraphics.lineStyle(4, colorSBBLUE, .81);
        this.mSBGraphics.arc(43, 582, 28, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentPlayer.orot % 100) * (Math.PI / 50));
        if (this.persentPlayer.orot > this.persentPlayer.rot) {
            this.persentPlayer.orot--;
        }
        if (this.persentPlayer.orot < this.persentPlayer.rot) {
            this.persentPlayer.orot++;
        }

        //Draw Tiger percent Circle
        this.mSBGraphics.endFill(colorBlock, .51);
        this.mSBGraphics.lineStyle(4, colorRed, .41);
        this.mSBGraphics.beginFill(colorBlock, .51);
        this.mSBGraphics.drawCircle(490, 582, 28);
        this.mSBGraphics.endFill(colorRed, .41);
        this.mSBGraphics.lineStyle(4, colorRed, .81);
        this.mSBGraphics.arc(490, 582, 28, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentBanker.orot % 100) * (Math.PI / 50));
        if (this.persentBanker.orot > this.persentBanker.rot) {
            this.persentBanker.orot--;
        }
        if (this.persentBanker.orot < this.persentBanker.rot) {
            this.persentBanker.orot++;
        }
        // this.persentBanker.position.set(rx+480, 572);
        //Draw Tie percent Circle
        this.mSBGraphics.endFill(colorBlock, .51);
        this.mSBGraphics.lineStyle(4, colorDTGreen, .41);
        this.mSBGraphics.beginFill(colorBlock, .51);
        this.mSBGraphics.drawCircle(270, 610, 28);
        this.mSBGraphics.endFill(colorDTGreen, .41);
        this.mSBGraphics.lineStyle(4, colorDTGreen, .81);
        this.mSBGraphics.arc(270, 610, 28, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentTie.orot % 100) * (Math.PI / 50));
        if (this.persentTie.orot > this.persentTie.rot) {
            this.persentTie.orot--;
        }
        if (this.persentTie.orot < this.persentTie.rot) {
            this.persentTie.orot++;
        }








    }
    gradient() {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, app.screen.width * .5, 0);
        gradient.addColorStop(0 / 4, 'rgba(0, 0, 0, 0.05)');
        gradient.addColorStop(1 / 4, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(2 / 4, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(3 / 4, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(4 / 4, 'rgba(0, 0, 0, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, app.screen.width * .5, 80);
        return new PIXI.Texture.from(c);
    }
    checkWinConditions() {
        if (this.mSB4undo.length > 0) {
            isBatAccepted = "DEALING";
        }
        if (this.wining[0] || this.wining[1] || this.wining[2]) {
            this.removeBoardCoin();
            return;
        }
        var rankP = 0;
        var rankB = 0;
        var i = 0;
        for (i = 0; i < this.cards.length; i++) {
            if (OPENTIME - dynamicCounter == i)
                break;
            this.cards[i].visible = true;
            if (this.cards[i].rank < 10) {
                if (i % 2 == 0)
                    rankP += this.cards[i].rank;
                else
                    rankB += this.cards[i].rank;
                rankP = rankP % 10;
                rankB = rankB % 10;
            }
            if (i > 2 && (rankP > 7 || rankB > 7 || rankP == rankB)) {
                if (rankP > rankB) {
                    this.wining[0] = true;
                }
                if (rankP < rankB) {
                    this.wining[1] = true;
                }
                if (rankP == rankB) {
                    this.wining[2] = true;
                }
                if (this.cards[0].rank == this.cards[2].rank || (
                    (i == 4 && (this.cards[0].rank == this.cards[4].rank || this.cards[2].rank == this.cards[4].rank)))) {
                    console.log(i + " SBPTIE~~~@@~~~~`");
                    this.wining[3] = true;
                }
                if (this.cards[1].rank == this.cards[3].rank) {

                    this.wining[4] = true;
                }
                break;
            }

        }
        if (i == 6) {
            if (rankP > rankB) {
                this.wining[0] = true;
            }
            if (rankP < rankB) {
                this.wining[1] = true;
            }
            if (rankP == rankB) {
                this.wining[2] = true;
            }
            if (this.cards[0].rank == this.cards[2].rank || this.cards[0].rank == this.cards[4].rank || this.cards[2].rank == this.cards[4].rank) {
                console.log("SBPTIE~~~~!!~~~`");
                this.wining[3] = true;
            }
            if (this.cards[1].rank == this.cards[3].rank || this.cards[1].rank == this.cards[5].rank || this.cards[3].rank == this.cards[5].rank) {

                this.wining[4] = true;
            }
        }
        var winAmount = 0;
        for (let i = 0; i < this.wining.length; i++) {
            if (this.wining[i] == true) {
                if (i == 0) {
                    isBatAccepted = "PLAYER WIN";
                    winAmount = this.setWingingCoin(SBPLAYER, 2);
                }
                if (i == 1) {
                    isBatAccepted = "BANKER WIN";
                    winAmount = this.setWingingCoin(SBBANKER, 2);
                }
                if (i == 2) {
                    isBatAccepted = "TIE";
                    winAmount = this.setWingingCoin(SBTIE, 9);

                }
                if (i == 3) {
                    console.log("SBPTIE~~~~~~~`");




                    var amount = this.setWingingCoin(SBPTIE, 12);;
                    winAmount += amount;
                }
                if (i == 4) {
                    console.log("SBBTIE~~~~~~~`");
                    var amount = this.setWingingCoin(SBBTIE, 12);;
                    winAmount += amount;
                }
                colorBat = colorYellow;
            }
        }
        this.txtPCount.text = (rankP % 10) + ''
        this.txtBCount.text = (rankB % 10) + ''

        this.txtPCount.visible = true;
        this.txtBCount.visible = (OPENTIME - dynamicCounter) > 1;
        console.log(OPENTIME + " dynamicCounter~~~~~~~`" + dynamicCounter);
        if (winAmount > 0) {
            this.rect.visible = true;
            this.getwin.text = winAmount + '';
            this.getwin.position.set(147 - this.getwin.width * .5, 40);
            balance += winAmount;
            this.removeBoardCoin();
        }
    }

    setWingingCoin(type, times) {
        //set winning coin on card location
        var coins = getChipValue(type, this.mSB4undo) * times;
        if (coins == 0) {
            return 0;
        }
        var sprip = this.getCoinStrip(type, coins);
        sprip[1].vx = sprip[0].vx;
        sprip[1].vy = sprip[0].vy;
        this.sbContainer.removeChild(sprip[0]);
        sprip[1].visible = true;
        this.moveWin.push(sprip[1]);
        return coins;
    }
    removeBoardCoin() {
        while (this.mSBChips.length > 0) {
            var sprites = this.mSBChips.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
        }
    }
}
