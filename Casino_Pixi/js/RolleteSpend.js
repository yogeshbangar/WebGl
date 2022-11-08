
class Roulette {
    constructor() {
        // object for coin that place on table
        this.coinOval = [];
        this.coinRect = [];
        this.roulette4undo = [];
    }


    //Add coin when click on oval Zero
    addZero() {

        var bat = this.setBet([val_OvalCenter[3]], 4);
        console.log("addZero " + bat);
        if (bat) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin(230, 800, bat * .75));
            var point = getPositionOvalCoin(26);
            ovalcontainer.addChild(addCoin(point[0], point[1], getChipValueOn(["26"], this.roulette4undo)));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            let zeroCOR = [[400, 155], [400, 395], [300, 664], [300, 820]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < zeroCOR.length; i++) {
                rectcontaner.addChild(addCoin(zeroCOR[i][0], zeroCOR[i][1], getChipValueOn(rect_zero[i], this.roulette4undo)));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
            createAnimation(230, 800) ;
        }
    }

    //Add coin when click on oval Voisins
    addVoisins() {
        var bat = this.setBet([val_OvalCenter[2]], 9);
        if (bat) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin(230, 660, bat));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);
            createAnimation(230, 660);
            let voisinsCOR = [[356, 155], [190, 275], [400, 395], [400, 515], [190, 575], [248, 695], [300, 815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < voisinsCOR.length; i++) {
                rectcontaner.addChild(addCoin(voisinsCOR[i][0], voisinsCOR[i][1], getChipValueOn(rect_voisins[i], this.roulette4undo)));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
        }
    }
    //Add coin when click on oval ORPH
    addORPH() {

        var bat = this.setBet([val_OvalCenter[1]], 5);
        if (bat) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin(230, 460, bat * .8));
            var point = getPositionOvalCoin(1);
            ovalcontainer.addChild(addCoin(point[0], point[1], getChipValueOn(["1"], this.roulette4undo)));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);
            createAnimation(230, 460) ;
            let orphCOR = [[200, 185], [400, 275], [300, 455], [300, 515], [200, 815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < orphCOR.length; i++) {
                rectcontaner.addChild(addCoin(orphCOR[i][0], orphCOR[i][1], getChipValueOn(rect_orph[i], this.roulette4undo)));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
        }


    }
    //Add coin when click on oval TIER
    addTIER() {
        var bat = this.setBet([val_OvalCenter[0]], 6);
        if (bat) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin(230, 300, bat));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);
createAnimation(230, 300) ;
            let tierCOR = [[300, 275], [250, 365], [200, 455], [350, 605], [400, 815]];
            let rectcontaner = new PIXI.Container();
            for (let i = 0; i < tierCOR.length; i++) {
                rectcontaner.addChild(addCoin(tierCOR[i][0], tierCOR[i][1], getChipValueOn(rect_tier[i], this.roulette4undo)));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
        }

    }

    //Add coin when click on oval Single number
    addOvalSingle(ox, oy, num) {
        var total = this.setBet(["" + num], 1);
        if (total) {
            let ovalcontainer = new PIXI.Container();
            ovalcontainer.addChild(addCoin(ox, oy, total));
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            num = Number(num) - 1;
            let rectcontaner = new PIXI.Container();
            if (num > -1) {
                rectcontaner.addChild(addCoin(145 + 103 * (num % 3) + 103 * .5, 155 + 60 * Math.floor(num / 3) + 30, total));
            } else {
                rectcontaner.addChild(addCoin(295, 125, total));
            }
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);


            this.setVisible();
        }
    }


    //Add coin when click on Rect  table for number and combine number
    addRect(type, x, y) {
        console.log(type, x, y);
        var total = this.setBet(type, 1);
        console.log(total + "   " + type, x, y);
        if (total) {
            let ovalcontainer = new PIXI.Container();
            if (type.length == 1) {
                if (Number(type[0]) >= 0) {
                    var point = getPositionOvalCoin(type[0]);
                    ovalcontainer.addChild(addCoin(point[0], point[1], total));
                }
            }
            container.addChild(ovalcontainer);
            this.coinOval.push(ovalcontainer);

            console.log(x, y + " Number ===== " + Number(type[0]));
            let rectcontaner = new PIXI.Container();
            rectcontaner.addChild(addCoin(x, y, total));
            container.addChild(rectcontaner);
            this.coinRect.push(rectcontaner);
            this.setVisible();
        }

    }

    //set Visible for rect and oval table coin
    setVisible() {
        this.coinOval.forEach(element => {
            element.visible = itsOval;
        });
        this.coinRect.forEach(element => {
            element.visible = !itsOval;
        });
    }
    //remove coin at time game reset
    removeCoins() {
        // console.log(this.coinOval.length + "  removeCoins  " + this.coinRect.length);
        while (this.coinOval.length > 0) {
            var sprite = this.coinOval.pop();
            container.removeChild(sprite);
        }
        while (this.coinRect.length > 0) {
            var sprite = this.coinRect.pop();
            container.removeChild(sprite);
        }
        while (this.roulette4undo.length > 0) {
            this.roulette4undo.pop();
        }
        // console.log(this.coinOval.length + "  remove~~Coins  " + this.coinRect.length);
    }
    //undo coin at time click on undo button
    undoCoins() {
        console.log(this.coinOval.length + "  undoCoins  " + this.roulette4undo.length);
        if (this.coinOval.length > 0) {
            var sprite = this.coinOval.pop();
            container.removeChild(sprite);
        }
        if (this.coinRect.length > 0) {
            var sprite = this.coinRect.pop();
            container.removeChild(sprite);
        }
        if (this.roulette4undo.length > 0) {
            var bat = this.roulette4undo.pop();
            currentbat -= bat.chip;
            balance += bat.chip;
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            if (txtBat.text.includes('.')) { //true
                txtBat.text = txtBat.text + "0";
            }
        }


        console.log(this.coinOval.length + "  remove~~Coins  " + this.coinRect.length);
    }
    //repeat coin at time click on repeat button
    repeatCoins() {
        if (this.roulette4undo.length > 0) {
            var last = this.roulette4undo[this.roulette4undo.length - 1];
            // this.roulette4undo.push(new BatValuse(last.type, last.chipl));
            switch (last.type[0]) {
                case val_OvalCenter[3]://zero
                    this.addZero();
                    break;
                case val_OvalCenter[2]://VOISINS
                    this.addVoisins();
                    break;
                case val_OvalCenter[1]://ORPH
                    this.addORPH;
                    break;
                case val_OvalCenter[0]://TIER
                    this.addTIER()
                    break;
                default:
                    var sprite = this.coinRect[this.coinOval.length - 1].getChildAt(0);
                    this.addRect(last.type, sprite.x, sprite.y);
                    break;
            }

        }


    }
    // Set bet for table
    setBet(type, val) {
        console.log(this.coinOval.length + "  setBet  " + this.roulette4undo.length);
        if (coinValue[selCoin] * val <= balance) {// Chaeck Balnce
            currentbat += coinValue[selCoin] * val;//set coin current value
            balance -= coinValue[selCoin] * val;//update balance
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
            if (txtBat.text.includes('.')) { //true
                txtBat.text = txtBat.text + "0";
            }
            isBatAccepted = "BET ACCEPTED";
            this.roulette4undo.push(new BatValuse(type, coinValue[selCoin] * val));

            return getChipValueOn(type, this.roulette4undo);//Get all valuse of bet numbers 
        }
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.text = 'Balance too low ';
        return false;
    }
}