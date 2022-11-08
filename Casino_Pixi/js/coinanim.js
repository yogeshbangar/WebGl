

function coinAnim() {
    if (count < (110 / speed)) {//For flying animation counts
        for (let i = 0; i < coinArray.length; i++) {
            coinArray[i].y += coinArray[i].vy;
            coinArray[i].rotation = (Math.PI * speed * count) / 50;//(count*Math.PI)*0.02;
            if (goOut < 0) {//move horizontal left
                coinArray[i].x += coinArray[i].vx - speed / 10;
                coinArrayBig[i].x -= speed * .26;
            } else {//move horizontal right
                coinArray[i].x += coinArray[i].vx + speed / 10;
                coinArrayBig[i].x += speed * .26;
            }

        }
        if (coinArray[2].vx > 0)//alph animation for coin flying
            trans_Background.alpha -= .05;
        else
            trans_Background.alpha += .05;
        trans_Background.visible = true;
        count++;
    } else {
        if (coinArray[2].vx > 0) {// alpha backgroun false when animation is completed
            trans_Background.visible = false;
            trans_Background.alpha = .5;
        }
        goOut = 0;
    }
    //for coin movment from bonus/ANTE to table
    for (var i = 0; i < selSprite.length; i++) {
        if ((selSprite[i].ey > selSprite[i].y && selSprite[i].vy < 0) || (selSprite[i].ey < selSprite[i].y && selSprite[i].vy > 0)) {
            for (let j = 0; j < pokerchips.length; j++) {
                if (selSprite[i].myCustomProperty === pokerchips[j].myCustomProperty) {
                    pokerchips[j].visible = true;//make visible false when
                }
            }
            app.stage.removeChild(selSprite[i]);
            selSprite.splice(i, 1);
        } else {
            selSprite[i].y += selSprite[i].vy;
            selSprite[i].x += selSprite[i].vx;
        }
    }
    //for coin show on ANTE
    for (var i = 0; i < selBigSprite.length; i++) {
        // if (selBigSprite[i].myCustomProperty > 0) {
        //     selBigSprite[i].myCustomProperty--;
        //     if (selBigSprite[i].myCustomProperty == 0) {
        //         app.stage.removeChild(selBigSprite[i]);
        //         selBigSprite.splice(i, 1);
        //     }
        // }
    }

    if (dynamicCounter > 0) {
        sprite_GlowAnte.scale.set(sprite_GlowAnte.vx, sprite_GlowAnte.vx);
        if (sprite_GlowAnte.vx > 1.2) {
            sprite_GlowAnte.vy = -.01;
        }
        if (sprite_GlowAnte.vx < 1.0) {
            sprite_GlowAnte.vy = 0.01;
        }
        sprite_GlowAnte.vx += sprite_GlowAnte.vy;
    }

    if (txtWait4Next.myCustomProperty > 0) {
        txtWait4Next.myCustomProperty--;
        txtWait4Next.visible = true;
        toolowbase.visible = true;
        toolowbase.position.set(txtWait4Next.x + 62, txtWait4Next.y + 10);
        if (txtWait4Next.myCustomProperty == 0) {
            txtWait4Next.visible = false;
            toolowbase.visible = false;
        }
    }
}

//Common function for movment coin from one place to other
function sendCoinonTable(type, stratx, starty, endx, endy, coins) {
    if (coins > balance) {
        alert("You don't have enough coins");
        return;
    }


    isBatAccepted = "BET ACCEPTED";
    var thita = getAngle(stratx, starty, endx, endy);//Get direction angle
    //let sprite = new Sprite(resources[basepath +"svg/3d"+ selCoin + ".svg"].texture);
    var sprite = addCoin3d(endx, endy, coinValue[selCoin]);
    sprite.position.set(stratx, starty);
    sprite.ex = endx;
    sprite.ey = endy;
    sprite.anchor.set(0.5, 0.5);

    //Get direction update vlaue
    sprite.vx = Math.sin(thita * (Math.PI / 180)) * speed * 2;
    sprite.vy = -Math.cos(thita * (Math.PI / 180)) * speed * 2;

    app.stage.addChild(sprite);
    selSprite.push(sprite);
    currentbat += coins;//set coin current value
    balance -= coins;//update balance
    txtBalance.text = "" + balance;
    txtBat.text = "" + currentbat;
    if (txtBat.text.includes('.')) { //true
        txtBat.text = txtBat.text + "0";
    }
    value4undo.push(new BatValuse(type, coins));
    var batval = getChipValue4Poker(type, value4undo);
    sprite.myCustomProperty = batval;
    var newSprite = addCoin3d(endx, endy, sprite.myCustomProperty);
    newSprite.myCustomProperty = sprite.myCustomProperty;
    app.stage.addChild(newSprite);
    pokerchips.push(newSprite);
    newSprite.visible = false;



    if (POKER_COIN_TYPE[0] == type) {
        var bigSprite = addCoinScal(270, 840, sprite.myCustomProperty);
        app.stage.addChild(bigSprite);
        selBigSprite.push(bigSprite);
        selBigSprite[selBigSprite.length - 1].visible = true;
    }

    // value4undo.push();

}

//get angle for getting direction of movment
var getAngle = function (currX, currY, endX, endY) {
    var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);
    if (angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }

    return angle;
};
//call when undo button clicks
function undoValuse() {
    switch (APP_SCREEN) {
        case APP_POKER://use for poker
            if (mPokerHelp.mainContainer.x < 100)
                return;
            if (value4undo.length > 0) {
                // remove chips 
                var bat = value4undo.pop();
                currentbat -= bat.chip;
                balance += bat.chip;
                txtBalance.text = "" + balance;
                txtBat.text = "" + currentbat;
                if (txtBat.text.includes('.')) { //true
                    txtBat.text = txtBat.text + "0";
                }
                if (pokerchips.length > 0) {
                    var sprite = pokerchips.pop();
                    app.stage.removeChild(sprite);
                }
                if (POKER_COIN_TYPE[0] == bat.type && selBigSprite.length > 0) {
                    app.stage.removeChild(selBigSprite.pop());
                }
            }
            isAnteClicked = selBigSprite.length > 0;
            break;
        case APP_ROULLETE://use for ROULLETE
            if (mRouletteHelp.mainContainer.x < 100)
                return;
            rolletCoin.undoCoins();
            break;
        case APP_DREAM_CATCHER://use for DREAM_CATCHER
            if (mDreamCatcherHelp.mainContainer.x < 100)
                return;
            mDreamCatcher.undoCoins();
            break;
        case APP_DRAGON_TIGER://use for DRAGON_TIGER
            if (mDragonTigerHelp.mainContainer.x < 100)
                return;
            mDragonTiger.undoCoins();
            break;
        case APP_SPEED_BACCARAT://use for SPEED_BACCARAT
            if (mSpeedBaccaratHelp.mainContainer.x < 100)
                return;
            mSpeedBaccarat.undoCoins();
            break;
        case APP_SIC_BO:
            if (mSicBoHelp.mainContainer.x < 100)
                return;
            mSicbo.undoCoins();
            break;
    }

}
//call when repeat button clicks
function repeatValues() {
    switch (APP_SCREEN) {
        case APP_POKER:
            if (mPokerHelp.mainContainer.x < 100)
                return;
            sendCoinonTable([POKER_COIN_TYPE[0]], 500, 810, 320, 458, coinValue[selCoin]);
            isAnteClicked = true;
            break;
        case APP_ROULLETE:
            if (mRouletteHelp.mainContainer.x < 100)
                return;
            rolletCoin.repeatCoins();
            break;
        case APP_DREAM_CATCHER:
            if (mDreamCatcherHelp.mainContainer.x < 100)
                return;
            mDreamCatcher.repeatCoins();
            break;
        case APP_DRAGON_TIGER://use for DRAGON_TIGER
            if (mDragonTigerHelp.mainContainer.x < 100)
                return;
            mDragonTiger.repeatCoins();
            break;
        case APP_SPEED_BACCARAT://use for SPEED_BACCARAT
            if (mSpeedBaccaratHelp.mainContainer.x < 100)
                return;
            mSpeedBaccarat.repeatCoins();
            break;
        case APP_SIC_BO:
            if (mSicBoHelp.mainContainer.x < 100)
                return;
            mSicbo.repeatCoins();
            break;
    }



}


