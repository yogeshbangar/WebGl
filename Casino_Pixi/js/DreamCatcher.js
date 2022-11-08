var justcheck = 0;
class DreamCatcher {
    constructor() {
        this.container = new PIXI.Container();//Create Container for DreamCatcher object
        this.dcCardContainer = new PIXI.Container(); // all button of DreamCatcher like 1,2,5,10,20,40 ,batonalll and place coins Contain in dcCardContainer
        this.mDCGrapics = new PIXI.Graphics();// for showing past numbers
        this.mBack = loadRolletSprite(basepath + 'DreamCatcher.jpg', 0, 0, 1); //Backgroud Image
        this.mBack.position.set(this.mBack.width * .5, this.mBack.height * .5);//set position center of the game

        //Load button sprite  DreamCatcher
        this.dc_40 = this.loadButtom("dc_40.svg", DC40, 402, 820, .85);
        this.dc_20 = this.loadButtom("dc_20.svg", DC20, 139, 820, .85);
        this.dc_10 = this.loadButtom("dc_10.svg", DC10, 402, 685, .85);
        this.dc_5 = this.loadButtom("dc_5.svg", DC05, 139, 685, .85);
        this.dc_2 = this.loadButtom("dc_2.svg", DC02, 402, 550, .85);
        this.dc_1 = this.loadButtom("dc_1.svg", DC01, 139, 550, .85);
        this.batonAll = this.loadButtom("batonAll.png", BATONALL, 270, 970, .85);
        this.eclips = [];
        for (let i = 0; i < 10; i++) {
            this.eclips.push(loadRolletSprite(basepath + 'eclips.png', 0, 0, 1)); //Backgroud Image
            this.mDCGrapics.addChild(this.eclips[i]);
            this.eclips[i].position.set(40 + 51 * i, 460);
        }
        //Add child in DreamCatcher containers
        this.container.addChild(this.mBack);
        this.container.addChild(this.dcCardContainer);
        this.dcCardContainer.addChild(this.mDCGrapics);
        //Load effect sprite of DreamCatcher
        this.effect = [];
        for (let i = 0; i < 5; i++) {
            if (i < 3)
                this.effect.push(loadRolletSprite(basepath + 'effect.png', 70 + i * 100, 250 - i * 50, 1))
            else
                this.effect.push(loadRolletSprite(basepath + 'effect.png', 70 + i * 100, 250 - (4 - i) * 50, 1))
            this.container.addChild(this.effect[i]);
            this.effect[i].visible = false;
        }
        //Add all 54 number of DreamCatcher
        this.numbers = [];
        for (let i = 0; i < 23; i++) {
            this.numbers.push(1);
            if (i < 15)
                this.numbers.push(2);
            if (i < 7)
                this.numbers.push(5);
            if (i < 4)
                this.numbers.push(10);
            if (i < 2)
                this.numbers.push(20);
        }
        this.numbers.push(40);
        this.numbers.push('2x');
        this.numbers.push('7x');
        this.numbers.sort(compRan); //suffle all 54 number of DreamCatcher
        //use for alpha animation
        this.alphavx = .02;
        this.alpha = 1;
        // Past DreamCatcher open numbers
        this.winningNumbers = [];
        for (let i = 0; i < 10; i++) {
            this.winningNumbers.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "bold" }, (this.numbers[Math.floor(Math.random() * 1000) % this.numbers.length])));
            this.dcCardContainer.addChild(this.winningNumbers[i]);
        }
        this.setWinningNumbers();//set position of numbers
        //find next number to show on table
        this.newNumber = this.numbers[Math.floor(Math.random() * 1000) % this.numbers.length];
        this.moveSprite = [];
        this.moveUndo = [];
        this.moveWin = [];
        this.mDCChips = [];
        this.mDreamCatcher4undo = [];
        //for Showing winning coins
        this.rect = new PIXI.Graphics().beginTextureFill(this.gradient('#0ff000', '#fff000')).drawRect(0, 0, app.screen.width, 80);
        this.rect.position.set(100, 330);
        this.dcxx = loadRolletSprite(basepath + 'dc7x.png', 270, 360, 1);
        this.txt7x = loadRolletText({
            dropShadow: true, dropShadowColor: 'rgba(0, 0, 0, 1)', dropShadowBlur: 5, dropShadowAngle: Math.PI / 4, dropShadowDistance: 2,
            fill: colorWhite, fontSize: 20
        }, 'MULTIPLIER 7X');//add text on rect

        this.txt7x.position.set(-this.txt7x.width * .5, -12);
        this.dcxx.addChild(this.txt7x);
        this.youwin = loadRolletText({ fill: colorYellow, fontSize: 20 }, 'YOU WIN');//add text on rect
        this.rect.addChild(this.youwin);
        //this.youwin.position.set(105, 7);
        this.youwin.position.set(70, 47);
        this.getwin = loadRolletText({ fill: colorWhite, fontSize: 24 }, '7X');//add text on rect
        this.rect.addChild(this.getwin);
        //this.getwin.position.set(148 - this.getwin.width * .5, 35);
        this.getwin.position.set(147 - this.getwin.width * .5, 7);
        this.rect.visible = true;
        this.container.addChild(this.rect);
        this.container.addChild(this.dcxx);
        this.dcxx.visible = false;
    }

    //Main drrawing function of DreamCatcher
    drawDreamCatcher() {
        //set animation of scal up when bet closed
        if (dynamicCounter > -25 && dynamicCounter < 0 && this.dcCardContainer.scale.x < 1) {
            this.dcCardContainer.scale.x += .020;
            this.dcCardContainer.scale.y += .020;
            this.dcCardContainer.x -= 1;
            this.dcCardContainer.y -= 5;
            if (this.dcCardContainer.scale.x > 0.96) {
                this.dcCardContainer.position.set(0, 0);
                this.dcCardContainer.scale.set(1, 1)
            }
            this.batonAll.visible = false;
            this.setopacity(.5);

        }
        if (dynamicCounter > -25 && dynamicCounter < 0) {
            this.setnumberAlpha();
        }
        //scale -- DreamCatcher at the time of batting on
        if (dynamicCounter > 0 && this.dcCardContainer.scale.x > 0.85) {
            this.dcCardContainer.scale.x -= .020;
            this.dcCardContainer.scale.y -= .020;
            this.dcCardContainer.x += 1;
            this.dcCardContainer.y += 5;
            this.batonAll.visible = true;
            this.setopacity(1);
        }
        if (dynamicCounter > 0) {
            this.alpha += this.alphavx;
            if (this.alpha > 1)
                this.alphavx = -.005;
            if (this.alpha < 0.7)
                this.alphavx = .005;
            this.setopacity(this.alpha);
        }

        //Shing winning number bet and effect
        if (dynamicCounter < -25) {

            //animating effect
            for (let i = 0; i < this.effect.length; i++) {
                this.effect[i].rotation = allcounter * .01;
            }
            // set all card opacity by .5
            this.setopacity(.5);

            //make scale animation for DreamCatcher cards
            if (this.dcCardContainer.scale.x > 0.83) {
                this.dcCardContainer.scale.x -= .020;
                this.dcCardContainer.scale.y -= .020;
                this.dcCardContainer.x += 1;
                this.dcCardContainer.y += 5;
                this.batonAll.visible = true;
                this.setopacity(1);
            }

            //Alpha animation for winning number
            if (this.newNumber == '40')
                this.dc_40.alpha = this.alpha;
            if (this.newNumber == '20')
                this.dc_20.alpha = this.alpha;
            if (this.newNumber == '10')
                this.dc_10.alpha = this.alpha;
            if (this.newNumber == '5')
                this.dc_5.alpha = this.alpha;
            if (this.newNumber == '2')
                this.dc_2.alpha = this.alpha;
            if (this.newNumber == '1')
                this.dc_1.alpha = this.alpha;
            this.alpha += this.alphavx;
            if (this.alpha > 1)
                this.alphavx = -.01;
            if (this.alpha < 0.8)
                this.alphavx = .01;

        }

        //animation for placing coin on cards
        for (var i = 0; i < this.moveSprite.length; i++) {
            for (let j = 0; j < this.moveSprite[i].length; j++) {
                if (this.moveSprite[i][j].ex > this.moveSprite[i][j].x) {
                    this.mDCChips[i][j].visible = true;
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
                this.dcCardContainer.removeChild(this.moveUndo[i]);
                this.moveUndo.splice(i, 1);
            } else {
                this.moveUndo[i].y -= this.moveUndo[i].vy;
                this.moveUndo[i].x -= this.moveUndo[i].vx;
            }

        }

    }
    //Load button
    loadButtom(str, tag, x, y, s) {
        let sprite = new Sprite(resources[basepath + str].texture);//create strip
        sprite.interactive = true;//set interactive true for click event
        sprite.buttonMode = true;
        sprite.myCustomProperty = tag;//set tag for getting strip event
        sprite.on('pointerdown', this.onClickdown); // use for onclick event on pointerdown
        sprite.on('pointerup', this.onClick); // use for onclick event on pointerup
        sprite.position.set(x, y);//set positon
        sprite.scale.set(s, s);//set scal
        sprite.anchor.set(0.5, 0.5);//set anchor
        this.dcCardContainer.addChild(sprite);
        return sprite;
    }
    //onClick event for pointerdown
    onClickdown(e) {
        
        if (dynamicCounter <= 0 || mSidemenu.graphics.x < 300 ||mDreamCatcherHelp.mainContainer.x < 300) {
            e.target.scale.set(.85, .85);
            return;
        }
        e.target.scale.set(.82, .82);
    }
    //onClick event for pointerup
    onClick(e) {
        e.target.scale.set(.85, .85);
        console.log("(" + mDreamCatcherHelp.graphics.x + ") DreamCatcher   sprips.length  e.target.myCustomProperty " + e.data.global.x, e.data.global.y);
        if (dynamicCounter <= 0 || mSidemenu.graphics.x < 300 || mDreamCatcherHelp.mainContainer.x < 300 || trans_Background.visible) {
            if (dynamicCounter <= 0) {//when wheel spinning
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
                txtWait4Next.text = "Wait for next game";
            }
            return;
        }
        mDreamCatcher.onBatSet(e.target.myCustomProperty, e.target.x, e.target.y);//call funtion for set bet
    }
    //Call when game intially start
    onStart() {
        this.setVisible(true);
        this.resetValue();
        resetValue();
        app.stage.addChildAt(this.container, 0);//add Dreatm catcher container on app main container
        this.container.visible = true;
    }
    // call when  Dreatm catcher close
    onClose() {
        app.stage.removeChild(this.container);//remove Dreatm catcher container on app main container
    }
    //set visiblity of table releted object
    setVisible(isvisible) {
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
    onDreamCatcherTimer() {//set timer for DreamCatcher
        // console.log('dynamicCounter = ' + dynamicCounter);
        if (dynamicCounter == 0) {//call when bet is closed
            this.newNumber = this.numbers[Math.floor(Math.random() * 1000) % this.numbers.length];
            // this.newNumber = '7x';
            this.setVisible(false);
        }
        if (dynamicCounter == -8) {//set dynmic text strip
            isBatAccepted = "SPINNING WHEEL";
        }
        if (dynamicCounter == -25) {//call when showing and finding wining number

            // move by one place of all anumber
            for (let i = this.winningNumbers.length - 1; i > 0; i--) {
                this.winningNumbers[i].text = this.winningNumbers[i - 1].text;
            }
            this.winningNumbers[0].text = this.newNumber;//set new number on first place
            var totalwin = 0;
            var cardval = 0;
            var sprip = null;
            //find total coin on placed number coin
            switch (this.winningNumbers[0].text) {
                case '1':
                    cardval = getChipValue4DreamCatcher(DC01, this.mDreamCatcher4undo);
                    totalwin = cardval;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_1.x, this.dc_1.y, totalwin);
                    break;
                case '2':
                    cardval = getChipValue4DreamCatcher(DC02, this.mDreamCatcher4undo);
                    totalwin = cardval * 2;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_2.x, this.dc_2.y, totalwin);
                    break;
                case '5':
                    cardval = getChipValue4DreamCatcher(DC05, this.mDreamCatcher4undo);
                    totalwin = cardval * 5;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_5.x, this.dc_5.y, totalwin);
                    break;
                case '10':
                    cardval = getChipValue4DreamCatcher(DC10, this.mDreamCatcher4undo);
                    totalwin = cardval * 10;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_10.x, this.dc_10.y, totalwin);
                    break;
                case '20':
                    cardval = getChipValue4DreamCatcher(DC20, this.mDreamCatcher4undo);
                    totalwin = cardval * 20;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_20.x, this.dc_20.y, totalwin);
                    break;
                case '40':
                    cardval = getChipValue4DreamCatcher(DC40, this.mDreamCatcher4undo);
                    totalwin = cardval * 40;
                    if (totalwin > 0)//add sprite if getting coin on number
                        sprip = this.dreamCatcherCoins(this.dc_40.x, this.dc_40.y, totalwin);
                    break;
            }
            var i = 1;
            // run loop loop for privius if 7x or 2x comes, it run til 7x or 2x not come
            while ((this.winningNumbers[i].text == '7x' || this.winningNumbers[i].text == '2x') && totalwin > 0 && this.winningNumbers.length > i) {
                if (this.winningNumbers[i].text == '2x')
                    totalwin *= 2;
                else
                    totalwin *= 7;
                var txt = sprip[1].getChildAt(0);
                txt.text = totalwin;
                txt.position.set(-txt.width * .5, -txt.height * .6);
                i++;
            }
            totalwin += cardval;
            //set winnig coin on table of  totalwin > 0
            if (totalwin > 0) {
                this.getwin.text = "" + totalwin;
                this.rect.visible = true;
                this.getwin.position.set(148 - this.getwin.width * .5, 35);
                this.youwin.position.set(105, 7);
                this.youwin.text = 'YOU WIN';
                balance += totalwin;

                //set winning coin on card location
                sprip[1].vx = sprip[0].vx;
                sprip[1].vy = sprip[0].vy;
                this.dcCardContainer.removeChild(sprip[0]);
                sprip[1].visible = true;
                this.moveWin.push(sprip[1]);

                txtBatType.text = 'LAST WIN';
                txtBat.text = totalwin;


                if (txtBat.text.includes('.')) { //true
                    txtBat.text = txtBat.text + "0";
                }

                for (let i = 0; i < this.effect.length; i++) {
                    this.effect[i].visible = true;
                }

                this.dcxx.visible = false;
                console.log("Total Win = " + totalwin);
            }
            // set 7x or 2x if current wheel number shows 
            if (this.winningNumbers[0].text == '7x' || (this.winningNumbers[0].text == '2x')) {
                // this.getwin.text = "7X";
                // this.rect.visible = true;
                this.getwin.position.set(147 - this.getwin.width * .5, 7);
                this.txt7x.text = 'MULTIPLIER ' + (this.winningNumbers[0].text == '7x' ? '7X' : '2X');
                this.dcxx.visible = true;
            } else {
                this.removeChips();
            }


            //set reset and color for dynamic strip
            this.setWinningNumbers();
            colorBat = 0xffff4a;
            isBatAccepted = 'RESULT: ' + this.newNumber;

        }
        if (dynamicCounter < -30) {//end of the game
            if (this.winningNumbers[0].text == '7x' || this.winningNumbers[0].text == '2x') {
                this.newNumber = this.numbers[Math.floor(Math.random() * 1000) % this.numbers.length];
                // if (justcheck == 0)
                //     this.newNumber = '7x';
                // if (justcheck == 1)
                //     this.newNumber = 40;
                // justcheck++;
                dynamicCounter = -1;
                this.rect.visible = false;
                this.dcxx.visible = false;
            } else {
                dynamicCounter = 15;//restart dynamicCounter
                this.setVisible(true);//call when bet is oped
                resetValue();

            }
        }
    }

    //call when tap on undo
    undoCoins() {
        console.log("DreamCatcher undoCoins");
        if (this.mDreamCatcher4undo.length > 0) {
            var bat = this.mDreamCatcher4undo.pop();
            currentbat -= bat.chip;
            balance += bat.chip;
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            if (txtBat.text.includes('.')) { //true
                txtBat.text = txtBat.text + "0";
            }
            if (this.mDCChips.length > 0) {
                var sprites = this.mDCChips.pop();
                console.log("DreamCatcher sprites =" + sprites.length);
                while (sprites.length > 0) {
                    this.dcCardContainer.removeChild(sprites.pop());
                }
                var sprites = this.moveSprite.pop();
                while (sprites.length > 0) {
                    var sprite = sprites.pop();
                    sprite.visible = true;
                    this.moveUndo.push(sprite);
                }
            }
        }
        this.setnumberAlpha();
    }

    //call when tap on Repeat
    repeatCoins() {
        if (this.mDreamCatcher4undo.length > 0) {
            var bat = this.mDreamCatcher4undo[this.mDreamCatcher4undo.length - 1];
            switch (bat.type) {
                case DC40:
                    this.onBatSet(bat.type, mDreamCatcher.dc_40.x, mDreamCatcher.dc_40.y);//set Bet on catds
                    break;
                case DC20:
                    this.onBatSet(bat.type, mDreamCatcher.dc_20.x, mDreamCatcher.dc_20.y);//set Bet on catds
                    break;
                case DC10:
                    this.onBatSet(bat.type, mDreamCatcher.dc_10.x, mDreamCatcher.dc_10.y);//set Bet on catds
                    break;
                case DC05:
                    this.onBatSet(bat.type, mDreamCatcher.dc_5.x, mDreamCatcher.dc_5.y);//set Bet on catds
                    break;
                case DC02:
                    this.onBatSet(bat.type, mDreamCatcher.dc_2.x, mDreamCatcher.dc_2.y);//set Bet on catds
                    break;
                case DC01:
                    this.onBatSet(bat.type, mDreamCatcher.dc_1.x, mDreamCatcher.dc_1.y);//set Bet on catds
                    break;
                case BATONALL:
                    this.onBatSet(bat.type, mDreamCatcher.dc_40.x, mDreamCatcher.dc_40.y);//set Bet on All catds
                    break;
            }
        }
    }

    //Reaset game when game finish and start new
    resetValue() {
        for (let i = 0; i < this.effect.length; i++) {
            this.effect[i].visible = false;
        }
        colorBat = colorWhite;
        txtBatType.text = 'TOTAL BET';
        this.rect.visible = false;
        this.dcxx.visible = false;
        this.removeChips();
        while (this.mDreamCatcher4undo.length > 0) {
            this.mDreamCatcher4undo.pop();
        }
        while (this.moveWin.length > 0) {
            this.moveUndo.push(this.moveWin.pop());
        }
        this.setopacity(1);
    }

    //Set coin for animation and placment on cards
    dreamCatcherCoins(endx, endy, coins) {
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
        this.dcCardContainer.addChild(sprite);

        var newSprite = this.addCoin(endx, endy, coins);
        console.log("endx, endy," + endx, endy);
        this.dcCardContainer.addChild(newSprite);
        newSprite.visible = false;
        return [sprite, newSprite];

    }

    //create common funtion for placing coin on dream catcher

    onBatSet(type, x, y) {
        if (type === BATONALL) {
            if (coinValue[selCoin] * 6 > balance) { // check balance
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(x, y - 50);
                txtWait4Next.text = 'Balance too low ';
                return;
            }
            // create 6 coin for bet on all

            currentbat += coinValue[selCoin] * 6;//set coin current value
            balance -= coinValue[selCoin] * 6;//update balance
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            if (txtBat.text.includes('.')) { //true
                txtBat.text = txtBat.text + "0";
            }
            this.mDreamCatcher4undo.push(new BatValuse(type, coinValue[selCoin] * 6));

            // getChipValue4DreamCatcher calls form chip.js
            var sprip0 = this.dreamCatcherCoins(this.dc_40.x, this.dc_40.y, getChipValue4DreamCatcher(DC40, this.mDreamCatcher4undo));
            var sprip1 = this.dreamCatcherCoins(this.dc_20.x, this.dc_20.y, getChipValue4DreamCatcher(DC20, this.mDreamCatcher4undo));
            var sprip2 = this.dreamCatcherCoins(this.dc_10.x, this.dc_10.y, getChipValue4DreamCatcher(DC10, this.mDreamCatcher4undo));
            var sprip3 = this.dreamCatcherCoins(this.dc_5.x, this.dc_5.y, getChipValue4DreamCatcher(DC05, this.mDreamCatcher4undo));
            var sprip4 = this.dreamCatcherCoins(this.dc_2.x, this.dc_2.y, getChipValue4DreamCatcher(DC02, this.mDreamCatcher4undo));
            var sprip5 = this.dreamCatcherCoins(this.dc_1.x, this.dc_1.y, getChipValue4DreamCatcher(DC01, this.mDreamCatcher4undo));
            this.moveSprite.push([sprip0[0], sprip1[0], sprip2[0], sprip3[0], sprip4[0], sprip5[0]]);
            this.mDCChips.push([sprip0[1], sprip1[1], sprip2[1], sprip3[1], sprip4[1], sprip5[1]]);
        } else {
            if (coinValue[selCoin] > balance) {// check balance
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(x, y - 50);
                txtWait4Next.text = 'Balance too low ';
                return;
            }
            currentbat += coinValue[selCoin];//set coin current value
            balance -= coinValue[selCoin];//update balance
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            if (txtBat.text.includes('.')) { //true
                txtBat.text = txtBat.text + "0";
            }
            // create  coin for bet on all
            this.mDreamCatcher4undo.push(new BatValuse(type, coinValue[selCoin]));
            // getChipValue4DreamCatcher calls form chip.js
            var sprips = this.dreamCatcherCoins(x, y, getChipValue4DreamCatcher(type, this.mDreamCatcher4undo));
            this.moveSprite.push([sprips[0]]);
            this.mDCChips.push([sprips[1]]);
        }
        this.setnumberAlpha();
    }

    //set alph for all plaing number on dream catcher table
    setnumberAlpha() {
        for (let i = 0; i < this.mDreamCatcher4undo.length; i++) {
            if (this.mDreamCatcher4undo[i].type == DC40 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_40.alpha = this.alpha;
            if (this.mDreamCatcher4undo[i].type == DC20 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_20.alpha = this.alpha;
            if (this.mDreamCatcher4undo[i].type == DC10 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_10.alpha = this.alpha;
            if (this.mDreamCatcher4undo[i].type == DC05 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_5.alpha = this.alpha;
            if (this.mDreamCatcher4undo[i].type == DC02 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_2.alpha = this.alpha;
            if (this.mDreamCatcher4undo[i].type == DC01 || this.mDreamCatcher4undo[i].type == BATONALL)
                this.dc_1.alpha = this.alpha;
        }

        this.alpha += this.alphavx;
        if (this.alpha > 1)
            this.alphavx = -.005;
        if (this.alpha < 0.7)
            this.alphavx = .005;

    }

    //remove all chips from dream chatcher cards
    removeChips() {
        while (this.mDCChips.length > 0) {
            var sprites = this.mDCChips.pop();
            while (sprites.length > 0) {
                this.dcCardContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.dcCardContainer.removeChild(sprites.pop());
            }
        }
    }
    // set DC card opacity for all 
    setopacity(alpha) {
        this.dc_40.alpha = alpha;
        this.dc_20.alpha = alpha;
        this.dc_10.alpha = alpha;
        this.dc_5.alpha = alpha;
        this.dc_2.alpha = alpha;
        this.dc_1.alpha = alpha;
        this.batonAll.alpha = alpha;
    }
    // set and aling DC past WinningNumbers 
    setWinningNumbers() {
        this.mDCGrapics.clear();
        var alpha = 1;
        var border = 2;
        for (let i = 0; i < this.winningNumbers.length; i++) {
            if (this.winningNumbers[i].text.length == 1)
                this.winningNumbers[i].position.set(34 + 51 * i, 448);
            else
                this.winningNumbers[i].position.set(28 + 51 * i, 448);
            this.winningNumbers[i].tint = color01;

            switch (this.winningNumbers[i].text) {
                case '1':
                    this.mDCGrapics.lineStyle(border, color01);      //set color for eclips border
                    this.mDCGrapics.beginFill(color01, alpha);  //ser fill color and alpha for number
                    this.eclips[i].tint = color01;
                    this.winningNumbers[i].tint = color01;      // set test color for number
                    break;
                case '2':
                    this.mDCGrapics.lineStyle(border, color02); ////set color for eclips border
                    this.mDCGrapics.beginFill(color02, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color02;
                    this.winningNumbers[i].tint = color02;// set test color for number
                    break;
                case '5':
                    this.mDCGrapics.lineStyle(border, color05); ////set color for eclips border
                    this.mDCGrapics.beginFill(color05, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color05;
                    this.winningNumbers[i].tint = color05;// set test color for number
                    break;
                case '10':
                    this.mDCGrapics.lineStyle(border, color10); ////set color for eclips border
                    this.mDCGrapics.beginFill(color10, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color10;
                    this.winningNumbers[i].tint = color10;// set test color for number
                    break;
                case '20':
                    this.mDCGrapics.lineStyle(border, color20); ////set color for eclips border
                    this.mDCGrapics.beginFill(color20, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color20;
                    this.winningNumbers[i].tint = color20;// set test color for number
                    break;
                case '40':
                    this.mDCGrapics.lineStyle(border, color40); ////set color for eclips border
                    this.mDCGrapics.beginFill(color40, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color40;
                    this.winningNumbers[i].tint = color40// set test color for number
                    break;
                case '2x':
                    this.mDCGrapics.lineStyle(border, color2x); ////set color for eclips border
                    this.mDCGrapics.beginFill(color2x, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color2x;
                    this.winningNumbers[i].tint = color2x;// set test color for number
                    break;
                case '7x':
                    this.mDCGrapics.lineStyle(border, color7x); ////set color for eclips border
                    this.mDCGrapics.beginFill(color7x, alpha);//ser fill color and alpha for number
                    this.eclips[i].tint = color7x;
                    this.winningNumbers[i].tint = color7x;// set test color for number
                    break;
            }
            // if(i == 0)
            this.mDCGrapics.drawEllipse(40 + 51 * i, 460, 19, 10);//set eclips position
            // this.mDCGrapics.scale.set(.1,.1);
            this.eclips[i].visible = false;


            alpha = .4;
        }
        this.winningNumbers[0].tint = colorWhite;
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
        var txt = loadRolletText({ fill: colorWhite, fontSize: 50, fontWeight: "bold" }, val);
        coinstrip.addChild(txt);
        txt.position.set(-txt.width * .5, -txt.height * .52);
        console.log(txt.width + "  ~~  " + txt.height);
        return coinstrip;
    }

}

