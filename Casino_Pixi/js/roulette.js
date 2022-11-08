var rollateText = []; //THis is used to display numebr and text on oval and rect table
var rollateNumber = [];//this is use to show text on past numer on top
let rollateTable = new PIXI.Graphics();// this user to create graphics object for make roulette and oval table rect and polygone
let container = new PIXI.Container();//container used for roullete table all object of table(oval /rect);


let val_Oval_right = ["16", "33", "1", "20", "14", "31", "9", "22", "18", "29", "7", "28", "12"];//oval right side number
let val_Oval_Left = ["11", "36", "13", "27", "6", "34", "17", "25", "2", "21", "4", "19", "15"];//oval left side number
let val_Oval_top = ["30", "8", "23", "10", "5", "24"];//oval top number
let val_Ovalbottom = ["32", "0", "26", "3", "35"];//oval bottom number

let val_OvalCenter = ["TIER", "ORPH.", "VOISINS", "ZERO"];//oval center text
let polyPts = [145, 125, 300, 100, 455, 125, 455, 155, 145, 155];//this poit used to make polygone for zero in rext table
let rolletCoin = new Roulette();//all coin strip that used to place on table
let blockNumber = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28, 29, 31, 33, 35];//this is used to find number those are black
let newNumber;//this is used to show new roulette text 
let newNumberColor = colorRed;//new number rect color
let winColor = 0x666666;
let polyRedDimond = [45, 460, 55, 430, 65, 460, 55, 490];//Red dimond poly point for rect table
let polyBleckDimond = [45, 580, 55, 550, 65, 580, 55, 610];//Black dimond poly point for rect table
let previousNum, nxtNum;
//Bottom poly points for oval table
let polyBottom = [
    [60, 810, 148, 810, 162, 834, 97, 872],
    [97, 872, 162, 834, 202, 855, 174, 910],
    [174, 910, 202, 855, 265, 855, 286, 910],
    [286, 910, 265, 855, 300, 832, 363, 872],
    [363, 872, 310, 832, 310, 810, 398, 810]];
//Top poly points for oval table
let polyTop = [
    [60, 222, 86, 172, 153, 206, 148, 222],
    [86, 172, 144, 135, 190, 186, 153, 206],
    [144, 135, 230, 119, 230, 178, 190, 186],
    [230, 119, 305, 135, 260, 186, 230, 178],
    [315, 135, 360, 162, 300, 199, 268, 186],
    [374, 172, 396, 222, 310, 222, 308, 205]]





let itsOval = false;//Flag to get which table is active now rect(false), oval(true)

let polywinning = [240, 175, 320, 175, 310, 242, 250, 242];



//Load all related object at the time app start
function loadRollate() {
    container.addChild(rollateTable); //add child roulette graphics
    app.stage.addChild(container);//add child roulette table container in main app
    //add child roulette text  used to show number and text on table
    rollateTable.alpha = .9;

    for (let i = 0; i < 50; i++) {
        rollateText.push(loadRolletText({ fill: colorWhite, fontSize: 28, fontWeight: "normal" }, (i + 1)));
        container.addChild(rollateText[i]);
        rollateText[i].position.set(-2000, -2000);
    }
    //add child roulette text used to show past number on top of the screen
    for (let i = 0; i < 15; i++) {
        if (Math.floor(Math.random() * 37) % 2 == 0)
            rollateNumber.push(loadRolletText({ fill: colorWhite, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        else
            rollateNumber.push(loadRolletText({ fill: colorRed, fontSize: 20, fontWeight: "bold" }, (i + 1)));
        app.stage.addChild(rollateNumber[i]);
        rollateNumber[i].position.set(20 + i * 40, 56);
        rollateNumber[i].text = Math.floor(Math.random() * 37) + "";
        rollateNumber[i].visible = false;
    }
    //add child roulette text used to show new number on middile of roulette circle
    newNumber = loadRolletText({ fill: colorRed, fontSize: 36, fontWeight: "bold" }, (i + 1));
    app.stage.addChild(newNumber);
    newNumber.text = "" + Math.floor(Math.random() * 500) % 37;
    newNumber.visible = false;


    previousNum = loadRolletText({ fill: colorWhite, fontSize: 28, fontWeight: "normal" }, (i + 1));
    app.stage.addChild(previousNum);
    previousNum.text = "" + Math.floor(Math.random() * 500) % 37;
    previousNum.visible = false;
    previousNum.alpha = .8;
    nxtNum = loadRolletText({ fill: colorWhite, fontSize: 28, fontWeight: "normal" }, (i + 1));
    app.stage.addChild(nxtNum);
    nxtNum.text = "" + Math.floor(Math.random() * 500) % 37;
    nxtNum.visible = false;
    nxtNum.alpha = .8;

    findNext(newNumber.text);

    container.visible = false;
    ovalTable = loadRolletSprite(basepath + "ovalTable.svg", 230, 515, 1);
    container.addChild(ovalTable);
    ovalTable.alpha = .9;
}


//drawRoullete for animation of table of rollete 
function drawRoullete() {
    // dynamicCounter = 15;
    if (sprite_undo.down > 0) {
        sprite_undo.down++;
        console.log("sprite_undo.down ++" + sprite_undo.down);
        if (sprite_undo.down > 20) {
            rolletCoin.undoCoins();
        }
    }
    //if (itsOval == false) 
    {
        //scale ++ roullete table at the time of batting on
        if (dynamicCounter > 0 && container.scale.x < 1) {
            container.scale.x += .035;
            container.scale.y += .035;
            container.x -= 10;
            container.y -= 34;
            if (container.scale.x > 0.94) {
                container.position.set(0, 0);
                container.scale.set(1, 1)
            }
        }
        //scale -- roullete table at the time of batting off
        if (dynamicCounter < 0 && container.scale.x > 0.55) {
            container.scale.x -= .035;
            container.scale.y -= .035;
            container.x += 10;
            container.y += 34;
        }
    }

    //Show new numner on table 
    if (dynamicCounter < -25) {
        sprite_winning.visible = nxtNum.visible = previousNum.visible = newNumber.visible = true;
        newNumber.style.fill = 0xffffff;
        graphics.lineStyle(4, 0xd1c069); //colorGreen
        sprite_winning.tint = winColor;

        graphics.beginFill(newNumberColor);
        graphics.drawPolygon(polywinning);
        newNumber.position.set(280 - newNumber.width * .5, 188);
        graphics.lineStyle(0, colorLine); //yellow

        previousNum.position.set(220 - previousNum.width * .5, 198);
        nxtNum.position.set(340 - nxtNum.width * .5, 198);
        if (newNumberColor == colorBlock)
            isBatAccepted = newNumber.text + " BLACK"
        if (newNumberColor == colorRed)
            isBatAccepted = newNumber.text + " RED"
        if (newNumberColor == colorGreen)
            isBatAccepted = newNumber.text + " GREEN"
    }
    for (let i = 0; i < ovalAnim.length; i++) {
        ovalAnim[i].myCustomProperty--;
        ovalAnim[i].x -= ovalAnim[i].vx;
        ovalAnim[i].y -= ovalAnim[i].vy;
        if (ovalAnim[i].myCustomProperty <= 0) {
            app.stage.removeChild(ovalAnim[i]);
            ovalAnim.splice(i, 1);
        }

    }
}
function draw_Oval_Table() {
    for (let i = 0; i < rollateText.length; i++) {
        rollateText[i].position.set(-2000, -2000);
        rollateText[i].rotation = 0;
    }
    rollateTable.clear();
    ovalTable.visible = true;
    // draw_Oval_Table0();
    //ovalTable.alpha = 1;
    //ovalTable.alpha = .2;
    // rollateTable.beginFill(colorRed);
    // rollateTable.drawRect(152, 735, 156, 70);
    // rollateTable.drawCircle(230, 770, 65);


    // // rollateTable.beginFill(colorGreen);
    // // rollateTable.drawRect(152, 540, 156, 165);



    // rollateTable.beginFill(colorWhite);
    // rollateTable.drawRect(152, 540, 156, 165);
    // // rollateTable.drawCircle(230, 770, 65);



    // let ORTHPOLY = [152, 415, 308, 341, 308, 535, 152, 535];
    // let TIERPOLY = [152, 395, 308, 321, 308, 250, 230, 200, 152, 250];

    // rollateTable.beginFill(colorRed);
    // rollateTable.drawPolygon(ORTHPOLY);

    // rollateTable.beginFill(colorGreen);
    // rollateTable.drawPolygon(TIERPOLY);

    // draw_Oval_Table0();
}
// set all number rect and polygone of oval table
function draw_Oval_Table0() {
    // reset all roulette number and text position and rotation 
    for (let i = 0; i < rollateText.length; i++) {
        rollateText[i].position.set(-2000, -2000);
        rollateText[i].rotation = 0;
    }
    rollateTable.clear();

    //set border of all rect and polygone
    rollateTable.lineStyle(2, colorLine); //yellow

    //set fill color
    rollateTable.beginFill(colorLine);
    //set center table text
    for (let i = 0; i < val_OvalCenter.length; i++) {
        rollateText[37 + i].text = val_OvalCenter[i];
    }

    //set center table position
    rollateText[37].position.set(195, 290);
    rollateText[38].position.set(187, 450);
    rollateText[39].position.set(175, 640);
    rollateText[40].position.set(192, 770);

    //set line from number 27 to 33
    rollateTable.drawPolygon([148, 240 + 43 * 4, 320, 240 + 43 * 2]);

    //set line from number 17 to 9
    rollateTable.drawRect(148, 240 + 43 * 7, 160, 1);
    //set line from number 19 to 28
    rollateTable.drawRect(148, 240 + 43 * 12, 160, 1);


    //set rect for oval right and left side
    for (let i = 0; i < 13; i++) {
        //set Left side rect and text
        if (i % 2 != 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        if (i == 0)
            rollateTable.drawRect(60, 222 + 43 * i, 84, 50);
        else
            rollateTable.drawRect(60, 234 + 44 * i, 84, 44);
        rollateText[i].position.set(90, 250 + 43 * i);
        rollateText[i].text = val_Oval_Left[i];

        //set Right side rect and text
        if (i % 2 == 0) {
            rollateTable.beginFill(colorRed);
        } else {
            rollateTable.beginFill(colorBlock);
        }
        if (i == 0)
            rollateTable.drawRect(316, 222 + 43 * i, 84, 50);
        else
            rollateTable.drawRect(316, 234 + 44 * i, 84, 44);
        rollateText[i + 13].position.set(340, 250 + 43 * i);
        rollateText[i + 13].text = val_Oval_right[i];
    }

    //set Top side Polygon and text
    for (let i = 0; i < polyTop.length; i++) {
        rollateTable.beginFill(i % 2 == 0 ? colorRed : colorBlock);
        rollateTable.drawPolygon(polyTop[i]);
        rollateText[26 + i].text = val_Oval_top[i];
    }
    rollateText[26].position.set(100, 205);
    rollateText[27].position.set(140, 165);
    rollateText[28].position.set(190, 145);
    rollateText[29].position.set(246, 145);
    rollateText[30].position.set(304, 157);
    rollateText[31].position.set(340, 205);


    //set Bottom side Polygon and text
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyBottom[0]);
    rollateTable.beginFill(colorGreen);
    rollateTable.drawPolygon(polyBottom[1]);
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBottom[2]);
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyBottom[3]);
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBottom[4]);
    for (let i = 0; i < 5; i++) {
        rollateText[32 + i].text = val_Ovalbottom[i];

    }
    rollateText[32].position.set(102, 813);
    rollateText[33].position.set(150, 850);
    rollateText[34].position.set(220, 865);
    rollateText[35].position.set(290, 855);
    rollateText[36].position.set(340, 815);
}

// set all number rect and polygone of Rectangle table
function drawRectangle_Table() {
    rollateTable.clear();
    // set text of Rectangle Table
    rollateText[36].text = "0";
    rollateText[37].text = "2 - 1";
    rollateText[38].text = "2 - 1";
    rollateText[39].text = "2 - 1";
    rollateText[40].text = "1st - 12";
    rollateText[41].text = "2nd - 12";
    rollateText[42].text = "3rd - 12";
    rollateText[43].text = "1 - 18";
    rollateText[44].text = "EVEN";
    rollateText[47].text = "ODD";
    rollateText[48].text = "19 - 36";
    for (let i = 40; i < 49; i++) {
        rollateText[i].rotation = (Math.PI * .5);// set left side text rotaion by 90 of Rectangle Table
    }

    rollateTable.lineStyle(3, colorLine); //yellow

    //set polygone for Zero
    rollateTable.beginFill(colorGreen);
    rollateTable.drawPolygon(polyPts);
    rollateText[36].position.set(295, 120);//set Zero text for table

    //set polygone for Red Dimond
    rollateTable.beginFill(colorRed);
    rollateTable.drawPolygon(polyRedDimond);

    //set polygone for Block Dimond
    rollateTable.beginFill(colorBlock);
    rollateTable.drawPolygon(polyBleckDimond);



    //set REd / Block Rect for  Roulette table
    for (let i = 0; i < 36; i++) {
        //set color for rect
        if ((i < 10 || (i > 18 && i < 28))) {
            if (i % 2 == 0) {
                rollateTable.beginFill(colorRed);
            } else {
                rollateTable.beginFill(colorBlock);
            }
        } else {
            if (i % 2 != 0) {
                rollateTable.beginFill(colorRed);
            } else {
                rollateTable.beginFill(colorBlock);
            }
        }
        //set rect for table
        rollateTable.drawRect(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60);
        //set text for table
        rollateText[i].position.set((i < 9 ? 10 : 0) + 145 + 103 * (i % 3) + 35, 15 + 155 + 60 * Math.floor(i / 3));
        rollateText[i].text = (i + 1) + "";
    }
    rollateTable.endFill();


    //set text for bottom(2 - 1) of Roulette table
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(145 + 103 * i, 876, 103, 40);
        rollateText[37 + i].position.set(160 + 103 * i, 880);
    }
    //set text for Left(1st,2st,3st - 12) of Roulette table
    for (let i = 0; i < 3; i++) {
        rollateTable.drawRect(85, 155 + 240 * i, 60, 240);
        rollateText[40 + i].position.set(135, 225 + 240 * i);
    }
    //set text for Left(EVEN,Odd dimond) of Roulette table
    for (let i = 0; i < 6; i++) {
        rollateTable.drawRect(25, 155 + 120 * i, 60, 120);
        if (i != 2 && i != 3)
            rollateText[43 + i].position.set(70, 180 + 120 * i - (i == 5 ? 12 : 0));
    }

}


//set visiblity of table releted object
function setRollate(isvisible) {
    sprite_menu.visible = true;
    //set visiblity of buttons
    sprite_repeat.visible = isvisible && dynamicCounter > 0;
    sprite_ovalselect.visible = !itsOval;
    sprite_deselect.visible = itsOval;

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

    //set table 
    if (itsOval == true) {//set table  oval
        draw_Oval_Table();
    } else {//set table  Rect
        container.visible = true;
        drawRectangle_Table();
    }

    //set past number visiblity that shows on top of the screen 
    for (let i = 0; i < rollateNumber.length; i++) {
        rollateNumber[i].visible = true;
    }

    //set coin visibility that we place on oval and rect table
    rolletCoin.setVisible();
    ovalTable.visible = itsOval;
    txtbottomLeft.visible = true;//set screen bottomLeft text visibility
    txtbottomRight.visible = true;//set screen bottomLeft text visibility
    txtBalance.visible = true;//set screen Balance text visibility
    txtBat.visible = true;//set screen Bat text visibility
    txtDydnamic.visible = true;//set screen Dydnamic text visibility
    console.log("~~~~~~~~");
}



//Handle tuch event for Rect Table
function Handle_rectTuch(event) {
    var pints = []; //define points varible for selected point at the time of click
    var sendCoin = false;//if any number and text click the it become true
    var zeroclick = false;//if zero number  click the it become true
    var is12 = false;//if (1st,2nd,3rd)-12 number  click the it become true
    var isDimond = false;//if (odd, even,dimond,1-18,19-36) number  click the it become true
    var type = [];

    //if zero number  click the it become true
    if (CircRectCollision(145, 115, 309, 40, event.data.global.x, event.data.global.y, 5)) {
        console.log(" ~Zero~~   ");
        sendCoin = true;
        zeroclick = true;
        type.push("0");
    }

    //if - to 36 number  click the it become true
    for (let i = 0; i < 36; i++) {
        if (CircRectCollision(145 + 103 * (i % 3), 155 + 60 * Math.floor(i / 3), 103, 60, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~~   " + (145 + 103 * (i % 3)));

            // getting point for set position of coin
            var point = [145 + 103 * (i % 3) + 103 * .5, 155 + 60 * Math.floor(i / 3) + 30];
            pints.push(point);
            sendCoin = true;
            type.push("" + (i + 1));
        }
    }


    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(145 + 103 * i, 876, 103, 40, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~A~   ");
            // getting point for set position of coin
            var point = [145 + 103 * (i % 3) + 103 * .5, 896];
            pints.push(point);
            sendCoin = true;
            type.push("2s" + i);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (CircRectCollision(85, 155 + 240 * i, 60, 240, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~B~   ");
            sendCoin = true;
            if (pints.length == 0) {// getting point for set position of coin if not get point from number (1 - 36)
                var point = [115, 155 + 240 * i + 120];
                pints.push(point);
            } else {
                //set true if click in middile of numbers and 1st,2nd,3rd - 12
                is12 = true;
            }
            type.push((i + 1) + "is12");
        }
    }
    for (let i = 0; i < 6; i++) {
        if (CircRectCollision(25, 155 + 120 * i, 60, 120, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~C~   ");
            sendCoin = true;
            isDimond = true;
            if (pints.length == 0) {// getting point for set position of coin if not get point from number (1st,2nd,3rd - 12)
                var point = [55, 155 + 120 * i + 60];
                pints.push(point);
                type.push((i + 1) + "left");
            }

        }
    }
    if (sendCoin == true) {
        //set coin in the center of points getting from above
        var point = center(pints);
        if (pints.length > 0) {
            if (zeroclick) {
                point[1] -= 30;
            } else if (is12) {
                point[0] -= 50;
            }
        } else if (zeroclick) {
            point[0] = 300;
            point[1] = 130;
        }
        rolletCoin.addRect(type, point[0], point[1]);//place coin in table rect and oval 
    }
}


//Handle tuch event for Oval Table
function Handle_OvalTuch(event) {
    //if left and right number click the it become true
    console.log("Handle_OvalTuch    ~~~");

    
        if (CircRectCollision(316, 222 , 84, 50, event.data.global.x, event.data.global.y, 5)) {
            console.log(( 1) + " ~~Oval~   " + val_Oval_right[0]);
            rolletCoin.addOvalSingle(356, 250, val_Oval_right[0]);//place selected coin in table rect and oval 
            return;
        }
        //if left  number click the it become true
        if (CircRectCollision(60, 222 , 84, 50, event.data.global.x, event.data.global.y, 5)) {
            rolletCoin.addOvalSingle(104, 250, val_Oval_Left[0]);//place selected coin in table rect and oval 
            return;
        }

    for (let i = 1; i < 13; i++) {
        //if right number click the it become true
        if (CircRectCollision(316, 234 + 44 * i, 84, 44, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_right[i]);
            rolletCoin.addOvalSingle(354, 254 + (44.3) * i, val_Oval_right[i]);//place selected coin in table rect and oval 
            return;
        }
        //if left  number click the it become true
        if (CircRectCollision(60, 234 + 44 * i, 84, 44, event.data.global.x, event.data.global.y, 5)) {
            console.log((i + 1) + " ~~Oval~   " + val_Oval_Left[i]);
            console.log((i + 1) + " ~Oval~A~   ");
            rolletCoin.addOvalSingle(104, 254 + (44.3) * i, val_Oval_Left[i]);//place selected coin in table rect and oval 
            return;
        }
    }
    //if Top side oval  number click the it become true
    for (let i = 0; i < polyTop.length; i++) {
        if (polyCircle(polyTop[i], event.data.global.x, event.data.global.y, 1)) {
            //var point = polycenter(polyTop[i]);
            //console.log((i + 1) + " ~Oval~" + point + "~   " + val_Oval_top[i]);
            var point = getPositionOvalCoin(val_Oval_top[i]);
            rolletCoin.addOvalSingle(point[0], point[1], val_Oval_top[i]);
            return;
        }
    }
    //if Top side bottom  number click the it become true
    for (let i = 0; i < polyBottom.length; i++) {
        if (polyCircle(polyBottom[i], event.data.global.x, event.data.global.y, 1)) {
            console.log((i + 1) + " Oval~" + point + "~C~   " + val_Ovalbottom[i]);
            // var point = polycenter(polyBottom[i]);
            var point = getPositionOvalCoin(val_Ovalbottom[i]);
            rolletCoin.addOvalSingle(point[0], point[1], val_Ovalbottom[i]);
            return;
        }
    }
    //if center side bottom  number click the it become true
    // var cenerCordinate = [[162, 220, 140, 120], [162, 410, 140, 120], [162, 550, 140, 200], [162, 760, 140, 50]];//collition rect position and area
    // for (let i = 0; i < cenerCordinate.length; i++) {
    //     if (CircRectCollision(cenerCordinate[i][0], cenerCordinate[i][1], cenerCordinate[i][2], cenerCordinate[i][3], event.data.global.x, event.data.global.y, 5)) {
    //         console.log(i + " ~~cenerCordinate~   " + val_OvalCenter[i]);
    //         switch (i) {
    //             case 0:
    //                 rolletCoin.addTIER();//place TIER selected coin in table rect and oval 
    //                 break;
    //             case 1:
    //                 rolletCoin.addORPH();//place ORPH. selected coin in table rect and oval 
    //                 break;
    //             case 2:
    //                 rolletCoin.addVoisins();//place Voisins selected coin in table rect and oval 
    //                 break;
    //             case 3:
    //                 rolletCoin.addZero();//place Zero selected coin in table rect and oval 
    //                 break;
    //         }
    //     }

    // }


    if (cir_cir_collision(230, 770, 65, event.data.global.x, event.data.global.y, 2) ||
        CircRectCollision(152, 735, 156, 70, event.data.global.x, event.data.global.y, 5)) {
        console.log(+ "Oval addZero~   ");
        rolletCoin.addZero();//place Zero selected coin in table rect and oval

        return;
    }

    if (CircRectCollision(152, 540, 156, 165, event.data.global.x, event.data.global.y, 5)) {
        console.log(+ "Oval addVoisins~   ");
        rolletCoin.addVoisins();//place Voisins selected coin in table rect and oval 
        return;
    }
    let ORTHPOLY = [152, 415, 308, 341, 308, 535, 152, 535];
    if (polyCircle(ORTHPOLY, event.data.global.x, event.data.global.y, 5)) {
        console.log("Oval addORPH~   ");
        rolletCoin.addORPH();//place ORPH. selected coin in table rect and oval
        return;
    }
    let TIERPOLY = [152, 395, 308, 321, 308, 250, 230, 200, 152, 250];
    if (polyCircle(TIERPOLY, event.data.global.x, event.data.global.y, 5)) {
        console.log(+ "Oval addTIER~   ");
        rolletCoin.addTIER();//place TIER selected coin in table rect and oval
        return;
    }

}


function getPositionOvalCoin(num) {




    for (let i = 0; i < 13; i++) {
        if (val_Oval_right[i] == num) {
            return [354, 254 + (44.3) * i];
        }
        if (val_Oval_Left[i] == num) {
            return [104, 254 + (44.3) * i];
        }
    }
    for (let i = 0; i < polyTop.length; i++) {
        if (val_Oval_top[i] == num) {
            var point = polycenter(polyTop[i]);
            if(num == 23)
            point[0] +=13;
            if(num == 10)
            point[0] -=6;
            if(num == 5){
                point[0] +=10;
            }
            if(num == 5 || num == 10|| num == 8||num == 23)
            point[1] -=5; 
            if(num == 24 || num == 30)
            point[1] +=8; 
            return point;
        }
    }
    for (let i = 0; i < polyBottom.length; i++) {
        console.log(val_Ovalbottom[i] == num, val_Ovalbottom[i], num);
        if (val_Ovalbottom[i] == num) {
            var point = polycenter(polyBottom[i]);
            if(num == 32 || num == 35)
                point[1] -=8; 
                if(num == 0)
                point[0] +=10;
                if(num == 3)
                point[0] -=10;
            return point;
        }
    }
}



//Load text common function for rolette table
function loadRolletText(style_var, str) {
    var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
    return text;
}
//Load Sprite common function for rolette table
function loadRolletSprite(str, x, y, s) {
    let sprite = new Sprite(resources[str].texture);
    sprite.position.set(x, y);
    sprite.scale.set(s, s);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
}

function rouletteRepeat() {
    var bat = value4undo[this.coinOval.length - 1];
    if (value4undo.length > 0) {
        currentbat -= bat;
        balance += bat;
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;
        value4undo.push(bat);
        if (APP_SCREEN == APP_ROULLETE) {
            rolletCoin.repeatCoins();
        }
        console.log(currentbat + "  balance = " + balance);
    }

}
function findNext(num) {

    for (let i = 0; i < val_Oval_right.length; i++) {
        if (num == val_Oval_right[i]) {
            if (i > 0)
                previousNum.text = val_Oval_right[i - 1];
            else {
                previousNum.text = val_Oval_top[val_Oval_top.length - 1];
            }
            if (i < val_Oval_right.length - 1) {
                nxtNum.text = val_Oval_right[i + 1];
            } else {
                nxtNum.text = val_Ovalbottom[val_Ovalbottom.length - 1];
            }
            //return;
        }
    }
    for (let i = 0; i < val_Oval_Left.length; i++) {
        if (num == val_Oval_Left[i]) {
            if (i > 0)
                previousNum.text = val_Oval_Left[i - 1];
            else {
                previousNum.text = val_Oval_top[0];
            }
            if (i < val_Oval_Left.length - 1) {
                nxtNum.text = val_Oval_Left[i + 1];
            } else {
                nxtNum.text = val_Ovalbottom[0];
            }
            //return;
        }
    }
    for (let i = 0; i < val_Oval_top.length; i++) {
        if (num == val_Oval_top[i]) {
            if (i > 0)
                previousNum.text = val_Oval_top[i - 1];
            else {
                previousNum.text = val_Oval_Left[0];
            }
            if (i < val_Oval_top.length - 1) {
                nxtNum.text = val_Oval_top[i + 1];
            } else {
                nxtNum.text = val_Oval_right[0];
            }
            //return;
        }
    }
    for (let i = 0; i < val_Ovalbottom.length; i++) {
        if (num == val_Ovalbottom[i]) {
            if (i > 0)
                previousNum.text = val_Ovalbottom[i - 1];
            else {
                previousNum.text = val_Oval_Left[val_Oval_Left.length - 1];
            }
            if (i < val_Ovalbottom.length - 1) {
                nxtNum.text = val_Ovalbottom[i + 1];
            } else {
                nxtNum.text = val_Ovalbottom[val_Ovalbottom.length - 1];
            }
            //return;
        }
    }
    console.log(previousNum.text + " < " + num + "  >  " + nxtNum.text);
}
var ovalAnim = [];
function createAnimation(x, y) {

    for (let i = 0; i < 6; i++) {
        let sprite = new Sprite(resources[basepath + "svg/" + selCoin + ".svg"].texture);
        sprite.anchor.set(.5, .5);
        sprite.vx = -Math.sin(i * 60 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin open
        sprite.vy = Math.cos(i * 60 * (Math.PI / 180)) * speed;//set verticle direction for flying coin open
        sprite.x = x + sprite.vx * 10;
        sprite.y = y + sprite.vy * 10;
        sprite.myCustomProperty = 10;
        sprite.scale.set(SCALECOIN, SCALECOIN);//This gives 3D Effect
        app.stage.addChild(sprite);
        ovalAnim.push(sprite);
    }
}
function rouletteTimer() {//set timer for Roulette
    if (dynamicCounter == 0) {//call when bet is closed
        setRollate(false);
        newNumber.text = "" + Math.floor(Math.random() * 1000) % 37;
        newNumberColor = colorRed;
        winColor = 0x666666;
        blockNumber.forEach(element => {
            if (element == newNumber.text) {
                newNumberColor = colorBlock;
                winColor = colorRed;
            }
            if (0 == newNumber.text) {
                newNumberColor = colorGreen;
            }
        });
        findNext(newNumber.text);
    }
    if (dynamicCounter < -30) {//end of the game
        dynamicCounter = 15;//restart dynamicCounter
        setRollate(true);//call when bet is oped
        resetValue();
        {
            for (let i = rollateNumber.length - 1; i > 0; i--) {
                rollateNumber[i].text = rollateNumber[i - 1].text;
                rollateNumber[i].style.fill = rollateNumber[i - 1].style.fill;
            }
            rollateNumber[0].text = newNumber.text;
            rollateNumber[0].style.fill = newNumberColor == 0xff0000 ? newNumberColor : 0xffffff;
            sprite_winning.visible = nxtNum.visible = previousNum.visible = newNumber.visible = false;
        }
    }
}