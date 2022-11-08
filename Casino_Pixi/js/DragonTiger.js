
//working 

class DragonTiger {
    constructor() {
        this.container = new PIXI.Container();//Create Container for DragonTiger object
        this.dtCardContainer = new PIXI.Container();// all button of DreamCatcher like Dragon, Tiger tie and suied tie ,batonalll and place coins Contain in dcCardContainer
        this.dtGraphics = new PIXI.Graphics();//Showing number and cards 
        this.mBack = loadRolletSprite(basepath + 'dragontiger.jpg', 0, 0, 1);//Background for Dragan Tiger
        this.mBack.position.set(this.mBack.width * .5, this.mBack.height * .5);//set Postion
        this.container.addChild(this.mBack);//add background as a child in dragon tiger container
        this.container.addChild(this.dtCardContainer);//add dtCardContainer as a child in dragon tiger container
        this.dtCardContainer.addChild(this.dtGraphics);
        this.persentDragan = this.loadText({ fill: colorDTRed, fontSize: 21, fontWeight: "bold" }, 50, 42, 588);//Create Text for dragon percent
        this.persentTiger = this.loadText({ fill: colorDTYellow, fontSize: 21, fontWeight: "bold" }, 25, 453, 588);//Create Text for Tiger percent
        this.persentTie = this.loadText({ fill: colorDTGreen, fontSize: 21, fontWeight: "bold" }, 25, 250, 692);//Create Text for Tie percent
        this.txtDragan = this.loadTextStr({ fill: colorWhite, fontSize: 32, fontWeight: "normal" }, "DRAGON", 22, 810);//Create Text for dragon Text
        this.txtTiger = this.loadTextStr({ fill: colorWhite, fontSize: 32, fontWeight: "normal" }, "TIGER", 420, 810);//Create Text for Tiger Text
        this.txtTie = this.loadTextStr({ fill: colorWhite, fontSize: 26, fontWeight: "normal", align: 'center' }, "11:1\nTIE", 242, 592);//Create Text for Tie text
        this.txtSTie = this.loadTextStr({ fill: colorWhite, fontSize: 26, fontWeight: "normal", align: 'center' }, "SUITED TIE\n50:1", 200, 752);//Create Text for Suited Tie text
        this.imgtiger = loadRolletSprite(basepath + 'tiger.png', 480, 770, 1);//create sprite for Chinese text tiger
        this.imgdragan = loadRolletSprite(basepath + 'dragan.png', 60,770, 1);//create sprite for Chinese text dragan
        this.dtCardContainer.addChild(this.imgtiger );
        this.dtCardContainer.addChild(this.imgdragan );



        //create Grapichs Rect for Showing wining condition
        this.rect = new PIXI.Graphics().beginTextureFill(this.gradient('#0ff000', '#fff000')).drawRect(0, 0, app.screen.width, 80);
        this.rect.position.set(100, 230);
        this.youwin = loadRolletText({ fill: colorDTYellow, fontSize: 20 }, 'YOU WIN');//add text on rect
        this.youwin.position.set(147 - this.youwin.width * .5, 10);
        this.rect.addChild(this.youwin);
        this.getwin = loadRolletText({ fill: colorWhite, fontSize: 25 }, '10');//add text on rect
        this.getwin.position.set(147 - this.getwin.width * .5, 40);
        this.rect.addChild(this.getwin);
        this.container.addChild(this.rect);

        this.cards = [];//Card use for Dragan and tiger
        this.moveSprite = [];//Hold card for moviving animation
        this.mDTChips = [];
        this.moveUndo = [];
        this.moveWin = [];
        this.mDT4undo = [];
        this.isStart = false;
        this.winningPosition = "";
        this.alpha = .8;
        this.alphavx = .01;
        this.totalwin = 0;
        // this.container.addChild(this.delGraphics);
    }
    drawDragonTiger() {
        this.drawPerset();
        if (dynamicCounter > -15 && dynamicCounter < 0 && this.dtCardContainer.scale.x < 1) {
            this.dtCardContainer.scale.x += .020;
            this.dtCardContainer.scale.y += .020;
            this.dtCardContainer.x -= 1;
            this.dtCardContainer.y -= 5;
            if (this.dtCardContainer.scale.x > 0.96) {
                this.dtCardContainer.position.set(0, 0);
                this.dtCardContainer.scale.set(1, 1)
            }
        }
        //scale -- roullete table at the time of batting off
        if ((dynamicCounter <= -15 || dynamicCounter > 0) && this.dtCardContainer.scale.x > 0.85) {
            this.dtCardContainer.scale.x -= .020;
            this.dtCardContainer.scale.y -= .020;
            this.dtCardContainer.x += 1;
            this.dtCardContainer.y += 5;
        }


        //animation for placing coin on cards
        for (var i = 0; i < this.moveSprite.length; i++) {
            for (let j = 0; j < this.moveSprite[i].length; j++) {
                if (this.moveSprite[i][j].ex > this.moveSprite[i][j].x) {
                    this.mDTChips[i][j].visible = true;
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
                this.dtCardContainer.removeChild(this.moveUndo[i]);
                this.moveUndo.splice(i, 1);
            } else {
                this.moveUndo[i].y -= this.moveUndo[i].vy;
                this.moveUndo[i].x -= this.moveUndo[i].vx;
            }

        }


    }

    //Use to handle user event 
    onClick(e) {
        if (this.isStart == false || mDragonTigerHelp.mainContainer.x < 100) {
            this.isStart = true;
            return;
        }
        //check Wait for next game 
        if (dynamicCounter <= 0 || mSidemenu.graphics.x < 300 || trans_Background.visible) {
            if (dynamicCounter <= 0) {
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
                txtWait4Next.text = "Wait for next game";
            }
            return;
        }
        //check balance 
        if (coinValue[selCoin] > balance) {// check balance
            txtWait4Next.myCustomProperty = 100;
            txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
            txtWait4Next.text = 'Balance too low ';
            return;
        }
        //check Suited Tie and tie
        if (cir_cir_collision(235, 631, 100, e.data.global.x, e.data.global.y, 2)) {
            if (e.data.global.y > 631) {
                console.log("Suited Tie cir_cir~   ");
                this.callBat(DTSUITETIE);
            } else {
                console.log(" Tie cir_cir~   ");
                this.callBat(DTTIE);
            }
            return;
        }
        //check for Dragon
        if (CircRectCollision(21, 500, 207, 255, e.data.global.x, e.data.global.y, 5)) {
            console.log("Dragon~   ");
            this.callBat(DTDRAGON);
            return;
        }
        //check for Tiget
        if (CircRectCollision(240, 500, 207, 255, e.data.global.x, e.data.global.y, 5)) {
            console.log("Tiget~   ");
            this.callBat(DTTIGER);
            return;
        }

        // Ó
    }
    //Call when give coin on table
    callBat(type) {
        currentbat += coinValue[selCoin];//set coin current value
        balance -= coinValue[selCoin];//update balance
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;
        this.mDT4undo.push(new BatValuse(type, coinValue[selCoin]));
        var sprips = this.getCoinStrip(type, getChipValue(type, this.mDT4undo));

        if (sprips.length > 0) {
            this.moveSprite.push([sprips[0]]);
            this.mDTChips.push([sprips[1]]);
        }
    }


    //Call for coin plasing postion
    getCoinStrip(type, coin) {
        var sprips = [];
        switch (type) {
            case DTDRAGON:
                sprips = this.DTCoins(160, 751, coin);
                break;
            case DTTIGER:
                sprips = this.DTCoins(560, 751, coin);
                break;
            case DTTIE:
                sprips = this.DTCoins(305, 620, coin);
                break;
            case DTSUITETIE:
                sprips = this.DTCoins(417, 732, coin);
                break;
        }
        return sprips;
    }
    //Call on Game start
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
        APP_SCREEN = APP_DRAGON_TIGER;

    }
    //Call on Game close
    onClose() {
        app.stage.removeChild(this.container);
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
        //set visiblity of flying center coin
        coinArrayBig[selCoin].visible = isvisible && dynamicCounter > 0;//set visible big coin 
        trans_Background.visible = false;
        txtbottomLeft.visible = true;//set screen bottomLeft text visibility
        txtbottomRight.visible = true;//set screen bottomLeft text visibility
        txtBalance.visible = true;//set screen Balance text visibility
        txtBat.visible = true;//set screen Bat text visibility
        txtDydnamic.visible = true;//set screen Dydnamic text visibility
    }
    //set timer for Dragan Tiger
    onDTigerTimer() {//set timer for Dragan Tiger
        if (dynamicCounter == 0) {//call when bet is closed
            this.setVisible(false);
        }
        if (dynamicCounter == -12) {//Show first card
            this.newCard();
        }
        if (dynamicCounter == -14) {//Show Secoend card
            this.cards[1].visible = true;//TIger card set visible true
            if (this.totalwin > 0) {
                for (let i = 0; i < this.moveWin.length; i++) {
                    this.moveWin[i].visible = true;
                }
                this.rect.visible = true;
                txtBatType.text = 'LAST WIN';
                txtBat.text = this.totalwin;
                
                
                this.getwin.text = "" + this.totalwin;
                this.getwin.position.set(147 - this.getwin.width * .5, 40);
                balance += this.totalwin;//update balance
                txtBalance.text = "" + balance;
            }
            isBatAccepted = this.winningPosition+" WINS";
            colorBat = colorDTYellow;
            this.removeChips();

        }
        if (dynamicCounter < -20) {//end of the game
            dynamicCounter = 8;//restart dynamicCounter
            this.setVisible(true);//call when bet is oped
            resetValue();
            this.persentDragan.rot = Math.floor(Math.random() * 70);
            this.persentTiger.rot = Math.floor(Math.random() * (100 - this.persentDragan.rot));
            this.persentTie.rot = 100 - (this.persentDragan.rot + this.persentTiger.rot);
            this.persentDragan.text = this.persentDragan.rot + " %";
            this.persentTiger.text = this.persentTiger.rot + " %";
            this.persentTie.text = this.persentTie.rot + " %";
            colorBat = colorWhite;
            txtDydnamic.tint = colorBat;
        }
    }
    //remove all chips from dream chatcher cards
    removeChips() {
        while (this.mDTChips.length > 0) {
            var sprites = this.mDTChips.pop();//reset DT chip
            while (sprites.length > 0) {
                this.dtCardContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.dtCardContainer.removeChild(sprites.pop());
            }
        }
    }
    undoCoins() {
        console.log("DT undoCoins");
        if (this.mDT4undo.length > 0) {
            var bat = this.mDT4undo.pop();
            currentbat -= bat.chip;
            balance += bat.chip;
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;

        }
        if (this.mDTChips.length > 0) {
            var sprites = this.mDTChips.pop();
            console.log("DreamCatcher sprites =" + sprites.length);
            while (sprites.length > 0) {
                this.dtCardContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                var sprite = sprites.pop();
                sprite.visible = true;
                this.moveUndo.push(sprite);
            }
        }

    }
    repeatCoins() {
        if (this.mDT4undo.length > 0) {
            var bat = this.mDT4undo[this.mDT4undo.length - 1];
            this.callBat(bat.type);
        }
    }
    resetValue() {
        txtBatType.text = 'TOTAL BET';
        this.rect.visible = false;
        while (this.cards.length > 0) {
            this.dtCardContainer.removeChild(this.cards.pop());
        }
        while (this.mDTChips.length > 0) {
            var sprites = this.mDTChips.pop();
            while (sprites.length > 0) {
                this.dtCardContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.dtCardContainer.removeChild(sprites.pop());
            }
        }
        while (this.mDT4undo.length > 0) {
            this.mDT4undo.pop();
        }
        while (this.moveWin.length > 0) {
            this.moveUndo.push(this.moveWin.pop());
        }

    }
    DTCoins(endx, endy, coins) {
        var stratx = posx + 80;
        var starty = posy + 80;
        if (coins > balance) {
            alert("You don't have enough coins");
            return;
        }
        isBatAccepted = "BET ACCEPTED";
        var thita = getAngle(stratx, starty, endx, endy);//Get direction angle
        var sprite = addCoin(stratx, starty, coinValue[selCoin]);
        sprite.ex = endx;
        sprite.ey = endy;
        //Get direction update vlaue
        sprite.vx = Math.sin(thita * (Math.PI / 180)) * speed * 3;
        sprite.vy = -Math.cos(thita * (Math.PI / 180)) * speed * 3;
        this.dtCardContainer.addChild(sprite);

        var newSprite = addCoin(endx, endy, coins);
        console.log("endx, endy," + endx, endy);
        this.dtCardContainer.addChild(newSprite);
        newSprite.visible = false;
        return [sprite, newSprite];

    }
    drawPerset() {
        if (this.alpha > .7)
            this.alphavx = -.005;
        if (this.alpha < 0.2)
            this.alphavx = .005;
        this.alpha += this.alphavx;
        this.dtGraphics.clear();
        //Draw Dragon
        this.dtGraphics.lineStyle(4, colorDTRed, 1);
        this.dtGraphics.beginFill(colorDTRed, .2);
        if (dynamicCounter < -13 && this.winningPosition == DTDRAGON) {
            this.dtGraphics.beginFill(colorDTRed, this.alpha);
        }
        this.dtGraphics.arc(265, 703, 123, Math.PI * .5, Math.PI * 1.5);
        this.dtGraphics.arcTo(265, 550, 275, 853, 0);
        this.dtGraphics.arcTo(15, 550, 275, 853, 0);
        this.dtGraphics.arcTo(15, 855, 275, 853, 0);
        this.dtGraphics.arcTo(265, 855, 275, 853, 0);
        this.dtGraphics.arcTo(265, 825, 275, 853, 0);

        //Draw Tiger
        this.dtGraphics.endFill(colorDTRed, .41);
        this.dtGraphics.lineStyle(4, colorDTYellow, 1);
        this.dtGraphics.beginFill(colorDTYellow, .2);
        if (dynamicCounter < -13 && this.winningPosition == DTTIGER) {
            this.dtGraphics.beginFill(colorDTYellow, this.alpha);
        }
        this.dtGraphics.arc(275, 703, 123, Math.PI * 1.5, Math.PI * .5);
        this.dtGraphics.arcTo(275, 855, 275, 853, 0);
        this.dtGraphics.arcTo(525, 855, 275, 853, 0);
        this.dtGraphics.arcTo(525, 550, 275, 853, 0);
        this.dtGraphics.arcTo(275, 550, 275, 853, 0);
        this.dtGraphics.arcTo(275, 582, 275, 853, 0);

        //Draw Tie
        this.dtGraphics.endFill(colorDTRed, .41);
        this.dtGraphics.lineStyle(4, colorDTGreen, 1);
        this.dtGraphics.beginFill(colorDTGreen, .2);
        if (dynamicCounter < -13 && this.winningPosition == DTTIE) {
            this.dtGraphics.beginFill(colorDTGreen, this.alpha);
        }
        this.dtGraphics.arc(270, 701, 45, -Math.PI * .02, Math.PI * 1.02, true);
        this.dtGraphics.arc(270, 705, 115, Math.PI * 1.02, -Math.PI * .02);
        this.dtGraphics.arcTo(315, 697, 275, 853, 0);

        //Draw Suited Tie
        this.dtGraphics.endFill(colorDTRed, .41);
        this.dtGraphics.lineStyle(4, colorDTGreen, 1);
        this.dtGraphics.beginFill(colorDTGreen, .2);
        if (dynamicCounter < -13 && this.winningPosition == DTSUITETIE) {
            this.dtGraphics.beginFill(colorDTGreen, this.alpha);
        }
        this.dtGraphics.arc(270, 704, 45, Math.PI * .98, Math.PI * .02, true);
        this.dtGraphics.arc(270, 701, 115, Math.PI * .02, Math.PI * .98);
        this.dtGraphics.arcTo(225, 709, 275, 853, 0);


        //Draw Tiger percent Circle
        this.dtGraphics.endFill(colorBlock, .51);
        this.dtGraphics.lineStyle(4, colorDTRed, .41);
        this.dtGraphics.beginFill(colorBlock, .51);
        this.dtGraphics.drawCircle(64, 600, 40);
        this.dtGraphics.endFill(colorDTRed, .41);
        this.dtGraphics.lineStyle(4, colorDTRed, .81);
        this.dtGraphics.arc(64, 600, 40, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentDragan.orot % 100) * (Math.PI / 50));
        if (this.persentDragan.orot > this.persentDragan.rot) {
            this.persentDragan.orot--;
        }
        if (this.persentDragan.orot < this.persentDragan.rot) {
            this.persentDragan.orot++;
        }

        //Draw Tiger percent Circle
        this.dtGraphics.endFill(colorBlock, .51);
        this.dtGraphics.lineStyle(4, colorDTYellow, .41);
        this.dtGraphics.beginFill(colorBlock, .51);
        this.dtGraphics.drawCircle(476, 600, 40);
        this.dtGraphics.endFill(colorDTYellow, .41);
        this.dtGraphics.lineStyle(4, colorDTYellow, .81);
        this.dtGraphics.arc(476, 600, 40, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentTiger.orot % 100) * (Math.PI / 50));
        if (this.persentTiger.orot > this.persentTiger.rot) {
            this.persentTiger.orot--;
        }
        if (this.persentTiger.orot < this.persentTiger.rot) {
            this.persentTiger.orot++;
        }

        //Draw Tie percent Circle
        this.dtGraphics.endFill(colorBlock, .51);
        this.dtGraphics.lineStyle(4, colorDTGreen, .41);
        this.dtGraphics.beginFill(colorBlock, .51);
        this.dtGraphics.drawCircle(270, 703, 35);
        this.dtGraphics.endFill(colorDTGreen, .41);
        this.dtGraphics.lineStyle(4, colorDTGreen, .81);
        this.dtGraphics.arc(270, 703, 35, Math.PI * (3 / 2), Math.PI * (3 / 2) + (this.persentTie.orot % 100) * (Math.PI / 50));
        if (this.persentTie.orot > this.persentTie.rot) {
            this.persentTie.orot--;
        }
        if (this.persentTie.orot < this.persentTie.rot) {
            this.persentTie.orot++;
        }

    }
    DTCoins(endx, endy, coins) {
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
        this.dtCardContainer.addChild(sprite);

        var newSprite = this.addCoin(endx, endy, coins);
        console.log("endx, endy," + endx, endy);
        this.dtCardContainer.addChild(newSprite);
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
    newCard() {
        var crds = [];
        var j = 0;
        for (i = 2; i < 15; i++) {
            crds[j++] = "H" + i;
            crds[j++] = "D" + i;
            crds[j++] = "C" + i;
            crds[j++] = "S" + i;

        }
        for (i = 2; i < 15; i++) {
            crds[j++] = "H" + i;
            crds[j++] = "D" + i;
            crds[j++] = "C" + i;
            crds[j++] = "S" + i;
        }
        crds.sort(compRan);
        crds.sort(compRan);



        while (this.cards.length > 0) {
            this.dtCardContainer.removeChild(this.cards.pop());
        }
        this.cards.push(loadRolletSprite(basepath + "cards/" + crds[0] + ".png", 65, 692, .45));
        this.cards[0].card = crds[0];
        this.cards.push(loadRolletSprite(basepath + "cards/" + crds[1] + ".png", 475, 692, .45));
        this.cards[1].card = crds[1];
        this.cards[1].visible = false;

        var suita = this.cards[0].card.substring(0, 1);
        var ranka = parseInt(this.cards[0].card.substring(1));

        var suitb = this.cards[1].card.substring(0, 1);
        var rankb = parseInt(this.cards[1].card.substring(1));

        this.dtCardContainer.addChild(this.cards[0]);
        this.dtCardContainer.addChild(this.cards[1]);

        if (ranka == 14)
            ranka = 1;
        if (rankb == 14)
            rankb = 1;
        this.totalwin = 0;

        if (suita == suitb && ranka == rankb) {
            this.winningPosition = DTSUITETIE;
            this.totalwin = getChipValue(DTSUITETIE, this.mDT4undo) * 51;
        } else if (ranka == rankb) {
            this.winningPosition = DTTIE;
            this.totalwin = getChipValue(DTTIE, this.mDT4undo) * 12;
        } else if (ranka < rankb) {
            this.winningPosition = DTTIGER;
            this.totalwin = getChipValue(DTTIGER, this.mDT4undo) * 2;
        } else {
            this.winningPosition = DTDRAGON;
            this.totalwin = getChipValue(DTDRAGON, this.mDT4undo) * 2;
        }
        console.log("this.winningPosition = " + this.winningPosition);
        //13925.4       5

        if (this.totalwin > 0) {
            var sprip = this.getCoinStrip(this.winningPosition, this.totalwin);
            sprip[1].vx = sprip[0].vx;
            sprip[1].vy = sprip[0].vy;
            this.dtCardContainer.removeChild(sprip[0]);
            sprip[1].visible = false;
            this.moveWin.push(sprip[1]);
        }



        return [crds[0], crds[1]];
    }
    loadText(style_var, percent, x, y) {
        var text = new PIXI.Text(percent + ' %', new PIXI.TextStyle(style_var));
        text.position.set(x, y);
        text.rot = percent;
        text.orot = percent;
        this.dtCardContainer.addChild(text);
        return text;
    }
    loadTextStr(style_var, str, x, y) {
        var text = new PIXI.Text(str, new PIXI.TextStyle(style_var));
        text.position.set(x, y);
        this.dtCardContainer.addChild(text);
        return text;
    }
    // use to create transprent rectangle
    gradient(from, to) {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        var gradient = ctx.createLinearGradient(10, 0, app.screen.width * .55, 0);
        gradient.addColorStop(0 / 4, 'rgba(0, 0, 0, 0.0)');
        gradient.addColorStop(1 / 4, 'rgba(0, 0, 0, 0.7)');
        gradient.addColorStop(2 / 4, 'rgba(0, 0, 0, 1.0)');
        gradient.addColorStop(3 / 4, 'rgba(0, 0, 0, 0.7)');
        gradient.addColorStop(4 / 4, 'rgba(0, 0, 0, 0.0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, app.screen.width, 80);
        return new PIXI.Texture.from(c);
    }
}