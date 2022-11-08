function DrawDynamicRect() {
    graphics.visible = true;
    graphics.clear();
    graphics.alpha = 1;
    if (dynamicCounter > 5) {//this is for plase order with green color
        if (allcounter % 20 > 10)
            graphics.beginFill(0x00aa00); //green
        else
            graphics.beginFill(0x00bb00); //green
        colorBat = colorWhite;
        txtDydnamic.text = "PLACE YOUR BETS " + dynamicCounter;
    } else if (dynamicCounter > 0) {//this is for plase order with orange color
        if (allcounter % 20 > 10)
            graphics.beginFill(0xff6000); //orange
        else
            graphics.beginFill(0xd95200); //dark orange
        txtDydnamic.text = "PLACE YOUR BETS " + dynamicCounter;
    } else if (dynamicCounter > -2) {//this is for BATS CLOSED with red color
        graphics.beginFill(0xff0000); //red
        txtDydnamic.text = "BETS CLOSED";
    } else {//For "WAIT FOR NEXT GAME with gray color and increase time from nextTurn() dynamicCounter make mode negetive for more time //anim.js line 167
        graphics.beginFill(colorDynamic); //grey
        txtDydnamic.text = isBatAccepted;// "WAIT FOR NEXT GAME";
        txtDydnamic.tint = colorBat;
    }
    // txtDydnamic.text = "B";
    txtDydnamic.position.set((app.screen.width - txtDydnamic.width) * .5, 27);
    // txtDydnamic.position.x = txtDydnamic.width*.5;
    graphics.drawRect(0, 25, app.screen.width, 30);
    // graphics.beginFill(0x13463d); //dark green
    // graphics.drawRect(0, 525, app.screen.width, 500);
    if (dynamicCounter > 0) {
        graphics.lineStyle(2, colorRed,.4); //colorGreen
        if (allcounter % 80 < 40)
            graphics.beginFill(colorRed, .4 + .01 * (allcounter % 40));
        else
            graphics.beginFill(colorRed, .4 + .01 * (40 - (allcounter % 40)));
        graphics.drawCircle(posx, posy + menudis, 32);
        graphics.lineStyle(0, colorRed); //colorGreen
        if (dynamicCounter < 14){
            sprite_repeat.getChildAt(0).visible = false;
            sprite_repeat.getChildAt(1).visible = true;
        }

    }

    // if (dynamicCounter < -25) 

}

function drawCards() {
    if (dynamicCounter < -3 && dynamicCounter > -15) {//this is for showing two player card
        drawText(0, "PLAYER", 240, 528);
        drawText(1, "HIGH CARD", 230, 605);
        graphics.beginFill(0x000000, .25);
        graphics.drawRect(165, 525, app.screen.width - 330, 100);
        for (var i = 0; i < 2 && i < mSprit_Cards.length; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(255 + i * 34, 575);
        }
    }
    if (dynamicCounter <= -15 && dynamicCounter > -20) {//this is for showing five player card including(boat card)
        graphics.beginFill(0x000000, 0.25);
        graphics.drawRect(165, 525, app.screen.width - 330, 100);
        for (var i = 0; i < 5 && i < mSprit_Cards.length; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(205 + i * 34, 575);
        }
        if (is2xfoldclicked == false && isAnteClicked) {
            sprite_2x_01.visible = true;
            sprite_2x_02.visible = true;

        } else {
            txt_4_card[4].visible = false;
            drawText(5, txt_4_card[5].text, 230, 627);
            txt_4_card[5].style.fontSize = 15;
            txt_4_card[5].visible = isAnteClicked;
            txt_4_card[5].tint = colorYellow;
            sprite_2x_01.visible = false;
            sprite_2x_02.visible = false;
        }

    }
    if (dynamicCounter <= -20 && dynamicCounter > -25) {//this is for showing five player card including(boat card)
        drawText(5, txt_4_card[5].text, 230, 627);
        txt_4_card[5].style.fontSize = 15;
        txt_4_card[5].visible = isAnteClicked;
        txt_4_card[5].tint = colorYellow;
        txt_4_card[4].visible = false;
        graphics.beginFill(0x000000, 0.25);
        graphics.drawRect(165, 525, app.screen.width - 330, 120);
        for (var i = 0; i < 5 && i < mSprit_Cards.length; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(205 + i * 34, 575);
        }
        sprite_2x_01.visible = false;
        sprite_2x_02.visible = false;
    }
    var dis = 600;

    if (dynamicCounter <= -25 && dynamicCounter > -35) {//this is for showing ten player and dealer card including(boat card)
        drawText(0, "DEALER WINS", 240, 528);
        drawText(1, "HIGH CARD", 230, 605);
        drawText(2, "PLAYER", 240, dis + 35);
        drawText(3, "HIGH CARD", 230, dis + 112);
        txt_4_card[5].visible = false;
        graphics.lineStyle(2, 0xf8db74); //yellow
        graphics.beginFill(0x000000, .25); //black
        graphics.drawRect(165, 525, app.screen.width - 330, 100); graphics.lineStyle(0, 0xFF0000); //red
        graphics.drawRect(165, dis + 32, app.screen.width - 330, 100);
        for (var i = 0; i < mSprit_Cards.length; i++) {
            mSprit_Cards[i].visible = true;
            mSprit_Cards[i].position.set(200 + (i % 5) * 34, i < 5 ? 575 : dis + 80);
        }
    }
}
//common funtion for poker card text
function drawText(no, str, x, y) {
    txt_4_card[no].text = str;
    // txt_4_card[no].position.set(x, y);
    txt_4_card[no].position.set((app.screen.width - txt_4_card[no].width) * .5, y);
    txt_4_card[no].visible = true;
}

//Use to call for poker 2x and fold click
function is2x_or_Fold(event) {
    if (isAnteClicked == false) {
        return;
    }
    if (dynamicCounter <= -15 && dynamicCounter > -20 && is2xfoldclicked == false) {
        //For 2X
        //if (cir_cir_collision(190, 810, 28, event.data.global.x, event.data.global.y, 2)) 
        if (event == 121) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_right[i]);
            //rolletCoin.addOvalSingle(354, 262 + 43 * i,val_Oval_right[i]);//place selected coin in table rect and oval 
            if (isAnteClicked) {
                var total = 0;
                value4undo.forEach(element => {
                    if (element.type == POKER_COIN_TYPE[0]) {
                        total += element.chip;
                    }
                });
                sendCoinonTable([POKER_COIN_TYPE[2]], 190, 810, 222, 460, total);
                txt_4_card[5].text = "You Played";
                console.log(is2xfoldclicked + " total " + total);
            }
            is2xfoldclicked = true;
        }
        //Fold
        //if (cir_cir_collision(340, 810, 28, event.data.global.x, event.data.global.y, 2)) 
        if (event == 122) {
            fold_now();
            txt_4_card[5].text = "You Folded";
            is2xfoldclicked = true;
        }
    }

}
//Use to call for poker fold
function fold_now() {

    total = 0;
    for (let i = 0; i < value4undo.length; i++) {
        if (value4undo[i].type == POKER_COIN_TYPE[0]) {
            total += value4undo[i].chip;
            pokerchips[i].visible = false;
        }
    }
    console.log(is2xfoldclicked + "total " + total);
    currentbat -= total;//set coin current value
    balance += total;//update balance
    txtBalance.text = "" + balance;
    txtBat.text = "" + currentbat;
    console.log(is2xfoldclicked + " fold_now " + total);

}