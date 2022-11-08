const MAXTIME = 50;
class Sicbo {
    constructor() {
        this.container = new PIXI.Container();
        this.sicboContainer = new PIXI.Container();
        this.coinContainer = new PIXI.Container();
        this.mGraphics = new PIXI.Graphics();
        this.container.addChild(this.sicboContainer);
        this.sicboContainer.addChild(this.mGraphics);
        this.isStart = false;
        this.m4undo = [], this.mChips = [], this.moveSprite = [], this.moveUndo = [], this.moveWin = []


        this.imgbig = loadRolletSprite(basepath + 'big.png', 380, 450, 1);//create sprite for Chinese text tiger
        this.imgsmall = loadRolletSprite(basepath + 'small.png', 60, 450, 1);//create sprite for Chinese text dragan
        this.sicboContainer.addChild(this.imgbig);
        this.sicboContainer.addChild(this.imgsmall);
        this.imgbig.alpha = this.imgsmall.alpha = .5;

        this.txtArr = Array(45);
        for (let i = 0; i < this.txtArr.length; i++) {
            this.txtArr[i] = this.loadTextStr({ fill: 0x333027, fontSize: 35, fontWeight: "bold", align: "center", leading: -5 }, "0", -135, -590);
        }

        // fontFamily: "Comic Sans MS"
        this.txtArrX = Array(12);
        for (let i = 0; i < this.txtArrX.length; i++) {
            this.txtArrX[i] = this.loadTextStr({ fill: colorBrown, fontSize: 15, fontWeight: "normal", align: "center", leading: -5 }, "0", -135, -590);
        }

        this.txtArrComic = Array(16);
        for (let i = 0; i < this.txtArrComic.length; i++) {
            this.txtArrComic[i] = this.loadTextStr({ fontFamily: "Comic Sans MS", fill: 0x333027, fontSize: 15, fontWeight: "normal", align: "center", leading: -5 }, "0", -135, -590);
        }



        this.ratioNo = ["50:1", "20:1", "15:1", "12:1", "8:1", "6:1", "6:1"];
        this.no126 = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"];
        this.dwonY = 0;
        this.isMove = false;
        this.startY = 0;
        this.sicboContainer.addChild(this.coinContainer);
        this.butArr = [[5, 380, 113, 136], [122, 380, 60, 136], [186, 380, 80, 136], [270, 380, 60, 136], [334, 380, 113, 136]];
        this.mBack = loadRolletSprite(basepath + 'sicbo.png', 0, 0, 1);
        this.mBack.position.set(this.mBack.width * .5, this.mBack.height * .5);
        this.container.addChild(this.mBack);



        this.anim = 0;
        this.multiplyer = Array(52);
        for (let i = 0; i < this.multiplyer.length; i++)
            this.multiplyer[i] = 0;
        this.lastArr = [46, 49, 47, 50, 48, 51];
        this.diesval = [0, 0, 0];
        this.bordVal = [
            1, 1, 30, 1, 1,
            8, 8, 8, 8, 8, 8,
            150, 150, 150, 150, 150, 150,
            50, 20, 15, 12, 8, 6, 6,
            6, 6, 8, 12, 15, 20, 50,
            5, 5, 5, 5, 5,
            5, 5, 5, 5, 5,
            5, 5, 5, 5, 5,
            1, 1, 1, 1, 1, 1];
        this.result = Array(52);
        for (let i = 0; i < this.result.length; i++)
            this.result[i] = 0;

        this.forlastvalue = [0, 1, 2, 0, 1, 2];

        this.rect = new PIXI.Graphics().beginTextureFill(this.gradient('#0ff000', '#fff000')).drawRect(0, 0, app.screen.width, 80);
        this.rect.scale.set(1.5, 1.7);
        this.rect.position.set(50, 115);

        this.rect.scale.set(1.5, 1.5);
        this.rect.position.set(50, 95);

        this.container.addChild(this.rect);
        this.mdie = loadRolletSprite(basepath + 'die.png', 0, 0, 1);
        this.mdie.position.set(this.mdie.width * .5, 150);
        this.container.addChild(this.mdie);
        this.mDieGraphics = new PIXI.Graphics();
        this.container.addChild(this.mDieGraphics);
        this.txtYouWin = loadRolletText({ fill: colorBrown, fontSize: 25, fontWeight: "normal", align: "center", leading: -5 }, "YOU WIN");
        this.txtYouWin.position.set(220, 190);
        this.container.addChild(this.txtYouWin);
        this.txtWinCoin = loadRolletText({ fill: colorWhite, fontSize: 25, fontWeight: "normal", align: "center", leading: -5 }, "2563");
        this.txtWinCoin.position.set(220, 190);
        this.container.addChild(this.txtWinCoin);
        this.rect.visible = false;
        this.mdie.visible = false;
        this.mDieGraphics.visible = true;
        this.txtYouWin.visible = false;
        this.txtWinCoin.visible = false;
        this.totalwin = 0;

        this.winningnumber = Array(16);
        for (let i = 0; i < this.winningnumber.length; i++) {
            this.winningnumber[i] = loadRolletText({ fill: colorWhite, fontSize: 25, fontWeight: "normal", align: "center", leading: -5 }, "" + (3 + i));
            if (i == 0 || i == 3 || i == 6 || i == 9)
                this.winningnumber[i].color = colorDTRed;
            else
                this.winningnumber[i].color = colorBrown;
            this.winningnumber[i].tint = this.winningnumber[i].color;
            this.winningnumber[i].position.set(20 + i * 36 - this.winningnumber[i].width * .5, 60);
            this.container.addChild(this.winningnumber[i]);
        }
    }
    drawSicbo() {

        if (dynamicCounter < 0 && dynamicCounter > -8) {
            this.drawNot4Bat();
        }
        if (dynamicCounter <= -8) {
            this.drawWIN4Bat();
        }
    }

    draw4Bat() {
        this.mDieGraphics.clear();
        this.mDieGraphics.visible = true;
        this.mDieGraphics.beginFill(colorBlock, .5);
        this.mDieGraphics.lineStyle(2, colorWhite, 1);
        for (let i = 0; i < this.winningnumber.length; i++) {
            this.mDieGraphics.drawRect(2 + i * 36, 60, 34, 30);
            this.mDieGraphics.lineStyle(0, colorWhite, 1);
            this.winningnumber[i].visible = true;
        }




        var tno = 0;
        var cno = 0;
        this.imgbig.position.y = 450;
        this.imgsmall.position.y = 450;
        this.mGraphics.clear();
        this.mGraphics.beginFill(colorBrown);
        this.mGraphics.drawRoundedRect(5, 352, 174, 24, 6);
        this.mGraphics.drawRoundedRect(184, 352, 80, 24, 6);
        this.mGraphics.drawRoundedRect(274, 352, 174, 24, 6);
        this.mGraphics.drawRoundedRect(5, 520, 442, 24, 6);
        this.mGraphics.drawRoundedRect(5, 634, 442, 24, 6);
        this.mGraphics.drawRoundedRect(5, 904, 442, 24, 6);
        this.mGraphics.drawRoundedRect(5, 1244, 442, 24, 6);
        this.textStr(tno++, "1:1 LOSE IF ANY TRIPLE          30:1          1:1 LOSE IF ANY TRIPLE", 228, 355, 14);
        this.textStr(tno++, "8:1 EACH DOUBLE", 225, 522, 16);
        this.textStr(tno++, "150:1 EACH TRIPLE", 225, 636, 16);
        this.textStr(tno++, "5:1 TWO DICE", 225, 906, 16);
        this.textStr(tno++, "1:1 ON SINGLE     2:1 ON DOUBLE     3:1 ON TRIPLE", 225, 1246, 16);
        this.mGraphics.beginFill(colorCream);
        for (let i = 0; i < 5; i++) {
            this.mGraphics.drawRoundedRect(this.butArr[i][0], this.butArr[i][1], this.butArr[i][2], this.butArr[i][3], 10);

        }
        this.textStr(tno++, "SMALL\n", 63, 418, 28);
        this.textStrcomic(cno++, "\n4 - 10", 63, 428, 28);
        this.textStr(tno++, "O\nD\nD", 151, 406, 28);
        this.textStr(tno++, "ANY\nTRIPLE", 226, 423, 22);
        this.textStr(tno++, "E\nV\nE\nN", 302, 392, 28);
        this.textStr(tno++, "BIG\n", 388, 418, 28);
        this.textStrcomic(cno++, "\n11 - 17", 388, 428, 28);
        for (let i = 0; i < 6; i++) {
            this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(5 + (74.5) * i, 548, 70, 82, 10);
            this.mGraphics.drawRoundedRect(5 + (74.5) * i, 662, 70, 82, 10);
            for (let j = 0; j < 2; j++) {
                this.drawCircle(24 + 74 * i, 552 + 38 * j, i + 1, 36);
            }
            for (let j = 0; j < 3; j++) {
                this.drawCircle(29 + 74 * i, 663 + 27 * j, i + 1, 25);
            }
        }
        this.mGraphics.beginFill(colorCream);
        for (let i = 0; i < 7; i++) {
            this.mGraphics.drawRoundedRect(5 + (63.5) * i, 748, 60, 74, 10);
            this.mGraphics.drawRoundedRect(5 + (63.5) * i, 826, 60, 74, 10);
            this.textStrcomic(cno++, "" + (4 + i), 34 + (63.5) * i, 754, 30);
            this.textStrcomic(cno++, "" + (11 + i), 34 + (63.5) * i, 832, 30);
            this.textStr(tno++, this.ratioNo[i], 35 + (63.5) * i, 790, 20);
            this.textStr(tno++, this.ratioNo[6 - i], 35 + (63.5) * i, 868, 20);
        }
        for (let j = 0, n = 1, nc = 2; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                this.mGraphics.beginFill(colorCream);
                this.mGraphics.drawRoundedRect(5 + (89) * i, 932 + 104 * j, 85, 100, 10);
                this.drawCircle(25 + (89) * i, 936 + 104 * j, n, 45);
                this.drawCircle(25 + (89) * i, 984 + 104 * j, nc, 45);
                nc++;
                if (nc > 6) {
                    nc = n + 2; n++;
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(5, 1272 + i * 62, 220, 58, 10);
            this.mGraphics.drawRoundedRect(229, 1272 + i * 62, 220, 58, 10);
            this.drawCircle(165, 1282 + i * 62, i * 2 + 1, 40);
            this.drawCircle(389, 1282 + i * 62, i * 2 + 2, 40);
            this.textStr(tno++, this.no126[i * 2], 75, 1286 + i * 62, 30);
            this.textStr(tno++, this.no126[i * 2 + 1], 320, 1286 + i * 62, 30);
        }



    }
    drawNot4Bat() {
        this.imgbig.position.y = 410;
        this.imgsmall.position.y = 410;
        var tno = 0;
        var cno = 0;
        var tnox = 0;
        this.mGraphics.clear();
        if (this.anim < MAXTIME)
            this.anim++;
        for (let i = 0; i < 5; i++) {
            this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(this.butArr[i][0], this.butArr[i][1], this.butArr[i][2], 70, 10);
            if (this.multiplyer[i] > 0 && dynamicCounter < 0) {
                this.mGraphics.beginFill(colorDarkBrown);
                this.mGraphics.drawRoundedRect(this.butArr[i][0], 70 + this.butArr[i][1] - (70 / MAXTIME) * this.anim, this.butArr[i][2], (70 / MAXTIME) * this.anim, 10);
                if (this.anim >= MAXTIME)
                    this.textStrX(tnox++, this.multiplyer[i] + "x", this.butArr[i][0] + this.butArr[i][2] * .5, this.butArr[i][1]);
            }
        }
        this.textStr(tno++, "SMALL\n", 63, 385, 28);
        this.textStrcomic(cno++, "\n4 - 10", 63, 385, 28);
        this.textStr(tno++, "O\nD\nD", 151, 382, 22);
        this.textStr(tno++, "ANY\nTRIPLE", 226, 390, 22);
        this.textStr(tno++, "E\nV\nE\nN", 302, 380, 18);
        this.textStr(tno++, "BIG\n", 388, 383, 28);
        this.textStrcomic(cno++, "\n11 - 17", 388, 383, 28);
        for (let i = 0; i < 6; i++) {
            this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(5 + 74 * i, 454, 70, 42, 10);
            this.mGraphics.drawRoundedRect(5 + 74 * i, 500, 70, 82, 10);
            this.mGraphics.beginFill(colorDarkBrown);
            if (this.multiplyer[5 + i] > 0 && dynamicCounter < 0) {
                this.mGraphics.drawRoundedRect(5 + 74 * i, 42 + 454 - (42 / MAXTIME) * this.anim, 70, (42 / MAXTIME) * this.anim, 10);
            }
            if (this.multiplyer[11 + i] > 0 && dynamicCounter < 0) {
                this.mGraphics.drawRoundedRect(5 + 74 * i, 84 + 500 - (84 / MAXTIME) * this.anim, 70, (82 / MAXTIME) * this.anim, 10);
            }
        }

        for (let i = 0; i < 7; i++) {
            this.mGraphics.beginFill(colorCream);
            if ((this.multiplyer[17 + i] > 0) && this.anim >= MAXTIME)
                this.mGraphics.beginFill(colorDarkBrown);
            else
                this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(5 + (63) * i, 586, 60, 61, 10);

            if ((this.multiplyer[24 + i] > 0) && this.anim >= MAXTIME)
                this.mGraphics.beginFill(colorDarkBrown);
            else
                this.mGraphics.beginFill(colorCream);

            this.mGraphics.drawRoundedRect(5 + (63) * i, 651, 60, 61, 10);
            this.textStrcomic(cno++, "" + (4 + i), 35 + (63) * i, 589, 30);
            this.textStrcomic(cno++, "" + (11 + i), 35 + (63) * i, 654, 30);
            this.textStr(tno++, this.ratioNo[i], 35 + (63) * i, 620, 22);
            this.textStr(tno++, this.ratioNo[6 - i], 35 + (63) * i, 686, 22);


            if (this.multiplyer[17 + i] > 0 && this.anim < MAXTIME && dynamicCounter < 0) {
                this.mGraphics.beginFill(colorDarkBrown);
                this.mGraphics.drawRoundedRect(5 + (63) * i, 61 + 586 - (61 / MAXTIME) * this.anim, 60, (61 / MAXTIME) * this.anim, 10);

            } if (this.multiplyer[24 + i] > 0 && this.anim < MAXTIME && dynamicCounter < 0) {
                this.mGraphics.beginFill(colorDarkBrown);
                this.mGraphics.drawRoundedRect(5 + (63) * i, 61 + 651 - (61 / MAXTIME) * this.anim, 60, (61 / MAXTIME) * this.anim, 10);

            }

        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                this.mGraphics.beginFill(colorCream);
                this.mGraphics.drawRoundedRect(5 + (89) * i, 716 + 45 * j, 85, 41, 10);
                this.mGraphics.beginFill(colorDarkBrown);
                if (this.multiplyer[31 + i + (j * 5)] > 0 && dynamicCounter < 0)
                    this.mGraphics.drawRoundedRect(5 + (89) * i, 41 + 716 + 45 * j - (41 / MAXTIME) * this.anim, 85, (41 / MAXTIME) * this.anim, 10);
            }
        }
        for (let i = 0; i < 3; i++) {
            this.mGraphics.beginFill(colorCream);
            this.mGraphics.drawRoundedRect(5 + (148) * i, 851, 145, 41, 10);
            this.mGraphics.drawRoundedRect(5 + (148) * i, 897, 145, 41, 10);
            this.textStr(tno++, this.no126[i], 60 + (148) * i, 861, 22);
            this.textStr(tno++, this.no126[3 + i], 60 + (148) * i, 907, 22);
            this.mGraphics.beginFill(colorDarkBrown);
            if (this.multiplyer[this.lastArr[i]] > 0 && dynamicCounter < 0) {
                this.mGraphics.drawRoundedRect(5 + (148) * i, 851 + 41 - (41 / MAXTIME) * this.anim, 145, (41 / MAXTIME) * this.anim, 10);//1
            }
            if (this.multiplyer[this.lastArr[i + 3]] > 0 && dynamicCounter < 0) {
                this.mGraphics.drawRoundedRect(5 + (148) * i, 897 + 41 - (41 / MAXTIME) * this.anim, 145, (41 / MAXTIME) * this.anim, 10);//4
            }

        }



        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 2; j++) {
                this.drawCircle(11 + 74 * i + j * 33, 462, i + 1, 25);
            }
            for (let j = 0; j < 3; j++) {
                this.drawCircle(27 + 74 * i, 502 + (26.5) * j, i + 1, 25);
            }
            if (this.multiplyer[5 + i] > 0 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[5 + i] + "x", 40 + 74 * i, 454);
            }
            if (this.multiplyer[11 + i] > 0 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[11 + i] + "x", 40 + 74 * i, 500);
            }
        }
        for (let i = 0, n = 1, nc = 2; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                this.drawCircle(20 + (89) * j, 725 + 45 * i, n, 25);
                this.drawCircle(52 + (89) * j, 725 + 45 * i, nc, 25);
                nc++;
                if (nc > 6) {
                    nc = n + 2; n++;
                }


            }
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.multiplyer[31 + i + (j * 5)] > 0 && this.anim >= MAXTIME)
                    this.textStrX(tnox++, this.multiplyer[31 + i + (j * 5)] + "x", 47 + (89) * i, 716 + 45 * j);
            }
        }
        for (let i = 0; i < 3; i++) {
            this.drawCircle(113 + (148) * i, 860, i + 1, 25);
            this.drawCircle(113 + (148) * i, 906, i + 4, 25);
            if (this.multiplyer[this.lastArr[i]] > 0 && this.anim >= MAXTIME) {



                this.textStrX(tnox++, this.multiplyer[this.lastArr[i]] + "x on " + (this.forlastvalue[this.lastArr[i] - 46] == 0 ? "DOUBLE" : "TRIPLE"), 80 + (148) * i, 851);

            }
            if (this.multiplyer[this.lastArr[i + 3]] > 0 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[this.lastArr[3 + i]] + "x on " + (this.forlastvalue[this.lastArr[3 + i] - 46] == 0 ? "DOUBLE" : "TRIPLE"), 80 + (148) * i, 897);
            }
        }
        for (let i = 0; i < 7; i++) {

            if (this.multiplyer[17 + i] > 0 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[17 + i] + "x", 35 + (63) * i, 586);
            }
            if (this.multiplyer[24 + i] > 0 && this.anim >= MAXTIME)
                this.textStrX(tnox++, this.multiplyer[24 + i] + "x", 35 + (63) * i, 651);
        }

    }
    drawWIN4Bat() {
        var tno = 0;
        var tnox = 0;
        var cno = 0;
        this.mGraphics.clear();
        if (this.anim < MAXTIME)
            this.anim++;
        for (let i = 0; i < 5; i++) {
            if (this.result[i] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
            } else {
                this.mGraphics.beginFill(colorDarkCream);
            }
            this.mGraphics.drawRoundedRect(this.butArr[i][0], this.butArr[i][1], this.butArr[i][2], 70, 10);
            if (this.multiplyer[i] > 0 && this.result[i] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(this.butArr[i][0], 70 + this.butArr[i][1] - (70 / MAXTIME) * this.anim, this.butArr[i][2], (70 / MAXTIME) * this.anim, 10);
                if (this.anim >= MAXTIME)
                    this.textStrX(tnox++, this.multiplyer[i] + "x", this.butArr[i][0] + this.butArr[i][2] * .5, this.butArr[i][1]);
            }
        }
        this.textStr(tno++, "SMALL\n", 63, 385, 28);
        this.textStrcomic(cno++, "\n4 - 10", 63, 385, 28);
        this.textStr(tno++, "O\nD\nD", 151, 382, 22);
        this.textStr(tno++, "ANY\nTRIPLE", 226, 390, 22);
        this.textStr(tno++, "E\nV\nE\nN", 302, 380, 18);
        this.textStr(tno++, "BIG\n", 388, 383, 28);
        this.textStrcomic(cno++, "\n11 - 17", 388, 383, 28);
        for (let i = 0; i < 6; i++) {
            if (this.result[5 + i] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
            } else {
                this.mGraphics.beginFill(colorDarkCream);
            }
            this.mGraphics.drawRoundedRect(5 + 74 * i, 454, 70, 42, 10);
            if (this.result[11 + i] == 1) {
                this.mGraphics.beginFill(colorCream);
            } else {
                this.mGraphics.beginFill(colorDarkCream);
            }
            this.mGraphics.drawRoundedRect(5 + 74 * i, 500, 70, 82, 10);
            this.mGraphics.beginFill(colorDarkBrown);
            if (this.multiplyer[5 + i] > 0 && this.result[5 + i] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + 74 * i, 42 + 454 - (42 / MAXTIME) * this.anim, 70, (42 / MAXTIME) * this.anim, 10);
            }
            if (this.multiplyer[11 + i] > 0 && this.result[11 + i] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + 74 * i, 84 + 500 - (84 / MAXTIME) * this.anim, 70, (82 / MAXTIME) * this.anim, 10);
            }
        }

        for (let i = 0; i < 7; i++) {

            if ((this.multiplyer[17 + i] > 0 && this.result[17 + i] == 1) && this.anim >= MAXTIME)
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
            else {
                if (this.result[17 + i] == 1) {
                    this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
                } else {
                    this.mGraphics.beginFill(colorDarkCream);
                }
            }
            this.mGraphics.drawRoundedRect(5 + (63) * i, 586, 60, 61, 10);

            if ((this.multiplyer[24 + i] > 0 && this.result[24 + i] == 1) && this.anim >= MAXTIME)
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
            else {
                if (this.result[24 + i] == 1) {
                    this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
                } else {
                    this.mGraphics.beginFill(colorDarkCream);
                }
            }
            this.mGraphics.drawRoundedRect(5 + (63) * i, 651, 60, 61, 10);
            this.textStrcomic(cno++, "" + (4 + i), 35 + (63) * i, 586, 30);
            this.textStrcomic(cno++, "" + (11 + i), 35 + (63) * i, 651, 30);
            this.textStr(tno++, this.ratioNo[i], 35 + (63) * i, 620, 22);
            this.textStr(tno++, this.ratioNo[6 - i], 35 + (63) * i, 686, 22);


            if (this.multiplyer[17 + i] > 0 && this.result[17 + i] == 1 && this.anim < MAXTIME) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + (63) * i, 61 + 586 - (61 / MAXTIME) * this.anim, 60, (61 / MAXTIME) * this.anim, 10);

            } if (this.multiplyer[24 + i] > 0 && this.result[24 + i] == 1 && this.anim < MAXTIME) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + (63) * i, 61 + 651 - (61 / MAXTIME) * this.anim, 60, (61 / MAXTIME) * this.anim, 10);

            }

        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.result[31 + i + (j * 5)] == 1) {
                    this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
                } else {
                    this.mGraphics.beginFill(colorDarkCream);
                }
                this.mGraphics.drawRoundedRect(5 + (89) * i, 716 + 45 * j, 85, 41, 10);
                if (this.multiplyer[31 + i + (j * 5)] > 0 && this.result[31 + i + (j * 5)] == 1) {
                    this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                    this.mGraphics.drawRoundedRect(5 + (89) * i, 41 + 716 + 45 * j - (41 / MAXTIME) * this.anim, 85, (41 / MAXTIME) * this.anim, 10);
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.result[this.lastArr[i]] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
            } else {
                this.mGraphics.beginFill(colorDarkCream);
            }
            this.mGraphics.drawRoundedRect(5 + (148) * i, 851, 145, 41, 10);
            if (this.result[this.lastArr[i + 3]] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamCream : colorCream);
            } else {
                this.mGraphics.beginFill(colorDarkCream);
            }
            this.mGraphics.drawRoundedRect(5 + (148) * i, 897, 145, 41, 10);
            this.textStr(tno++, this.no126[i], 60 + (148) * i, 861, 22);
            this.textStr(tno++, this.no126[3 + i], 60 + (148) * i, 907, 22);

            if (this.multiplyer[this.lastArr[i]] > 0 && this.result[this.lastArr[i]] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + (148) * i, 851 + 41 - (41 / MAXTIME) * this.anim, 145, (41 / MAXTIME) * this.anim, 10);//1
            }
            if (this.multiplyer[this.lastArr[i + 3]] > 0 && this.result[this.lastArr[i + 3]] == 1) {
                this.mGraphics.beginFill(allcounter % 16 > 5 ? colorMidiamBrown : colorCream);
                this.mGraphics.drawRoundedRect(5 + (148) * i, 897 + 41 - (41 / MAXTIME) * this.anim, 145, (41 / MAXTIME) * this.anim, 10);//4
            }

        }



        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 2; j++) {
                this.drawCircle(11 + 74 * i + j * 33, 462, i + 1, 25);
            }
            for (let j = 0; j < 3; j++) {
                this.drawCircle(27 + 74 * i, 502 + (26.5) * j, i + 1, 25);
            }
            if (this.multiplyer[5 + i] > 0 && this.result[5 + i] == 1 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[5 + i] + "x", 40 + 74 * i, 454);
            }
            if (this.multiplyer[11 + i] > 0 && this.result[11 + i] == 1 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[11 + i] + "x", 40 + 74 * i, 500);
            }
        }
        for (let i = 0, n = 1, nc = 2; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                this.drawCircle(20 + (89) * j, 725 + 45 * i, n, 25);
                this.drawCircle(52 + (89) * j, 725 + 45 * i, nc, 25);
                nc++;
                if (nc > 6) {
                    nc = n + 2; n++;
                }


            }
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.multiplyer[31 + i + (j * 5)] > 0 && this.anim >= MAXTIME && this.result[31 + i + (j * 5)] == 1)
                    this.textStrX(tnox++, this.multiplyer[31 + i + (j * 5)] + "x", 47 + (89) * i, 716 + 45 * j);
            }
        }
        for (let i = 0; i < 3; i++) {
            this.drawCircle(113 + (148) * i, 860, i + 1, 25);
            this.drawCircle(113 + (148) * i, 906, i + 4, 25);
            if (this.multiplyer[this.lastArr[i]] > 0 && this.result[this.lastArr[i]] == 1 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[this.lastArr[i]] + "x on " + (this.forlastvalue[this.lastArr[i] - 46] == 0 ? "DOUBLE" : "TRIPLE"), 80 + (148) * i, 851);

            }
            if (this.multiplyer[this.lastArr[i + 3]] > 0 && this.result[this.lastArr[i + 3]] == 1 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[this.lastArr[3 + i]] + "x on " + (this.forlastvalue[this.lastArr[3 + i] - 46] == 0 ? "DOUBLE" : "TRIPLE"), 80 + (148) * i, 897);
            }
        }
        for (let i = 0; i < 7; i++) {

            if (this.multiplyer[17 + i] > 0 && this.result[17 + i] == 1 && this.anim >= MAXTIME) {
                this.textStrX(tnox++, this.multiplyer[17 + i] + "x", 35 + (63) * i, 586);
            }
            if (this.multiplyer[24 + i] > 0 && this.result[24 + i] == 1 && this.anim >= MAXTIME)
                this.textStrX(tnox++, this.multiplyer[24 + i] + "x", 35 + (63) * i, 651);
        }

    }

    onTuch(e, type) {
        //return if bet is closed or menu is open

        if (dynamicCounter <= 0 || mSidemenu.graphics.x < 300 || trans_Background.visible || mSicBoHelp.mainContainer.x < 100) {
            if (dynamicCounter <= 0 && (type == "up") && e.data.global.y > 420 && e.data.global.y < 1000 && e.data.global.x < 435) {
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
                txtWait4Next.text = "Wait for next game";
            }
            return;
        }
        if (type == "down") {
            this.dwonY = e.data.global.y;
            this.isMove = true;
            this.startY = e.data.global.y;
        }

        if (type == "up") {
            this.isMove = false;
            if (Math.abs(e.data.global.y - this.startY) > 5) {
                return;
            }

            if (coinValue[selCoin] > balance) {// check balance
                txtWait4Next.myCustomProperty = 100;
                txtWait4Next.position.set(e.data.global.x - 60, e.data.global.y - 50);
                txtWait4Next.text = 'Balance too low ';
                return;
            }
            for (let i = 0; i < 5; i++) {
                if (CircRectCollision(this.butArr[i][0], this.butArr[i][1] + this.sicboContainer.y, this.butArr[i][2], this.butArr[i][3], e.data.global.x, e.data.global.y, 5)) {
                    this.callBat(i);
                    return;
                }
            }
            for (let i = 0; i < 6; i++) {
                if (CircRectCollision(5 + (74.5) * i, 548 + this.sicboContainer.y, 70, 82, e.data.global.x, e.data.global.y, 5)) {
                    console.log("~~~~" + i);
                    this.callBat(5 + i);
                    return;
                }
                if (CircRectCollision(5 + (74.5) * i, 662 + this.sicboContainer.y, 70, 82, e.data.global.x, e.data.global.y, 5)) {
                    console.log("~~~~" + i);
                    this.callBat(11 + i);
                    return;
                }
            }
            for (let i = 0; i < 7; i++) {
                if (CircRectCollision(5 + (63.5) * i, 748 + this.sicboContainer.y, 60, 74, e.data.global.x, e.data.global.y, 5)) {
                    this.callBat(17 + i);
                    return;
                }
                if (CircRectCollision(5 + (63.5) * i, 826 + this.sicboContainer.y, 60, 74, e.data.global.x, e.data.global.y, 5)) {
                    this.callBat(24 + i);
                    return;
                }
            }
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 5; i++) {
                    if (CircRectCollision(5 + (89) * i, 932 + 104 * j + this.sicboContainer.y, 85, 100, e.data.global.x, e.data.global.y, 5)) {
                        this.callBat(31 + i + (j * 5));
                        return;
                    }

                }
            }
            for (let i = 0; i < 3; i++) {
                if (CircRectCollision(5, 1272 + i * 62 + this.sicboContainer.y, 220, 58, e.data.global.x, e.data.global.y, 5)) {
                    this.callBat(46 + i);
                    return;
                }
                if (CircRectCollision(229, 1272 + i * 62 + this.sicboContainer.y, 220, 58, e.data.global.x, e.data.global.y, 5)) {
                    this.callBat(49 + i);
                    return;
                }

            }
        }
        if (this.isMove) {
            this.sicboContainer.y -= this.dwonY - e.data.global.y;
            this.dwonY = e.data.global.y;

            if (this.sicboContainer.y > 40) {
                this.sicboContainer.y = 40;
            }
            if (this.sicboContainer.y < -480) {
                this.sicboContainer.y = -480;
            }
            // console.log(this.sicboContainer.y + "  ~~~~~~~  ");
            // if (this.minScroll > this.scroll)
            //     this.scroll = this.minScroll;
        }
    }
    drawCircle(x, y, no, size) {
        this.mGraphics.beginFill(colorDTRed);
        this.mGraphics.drawRoundedRect(x, y, size, size, 6);
        this.mGraphics.beginFill(colorWhite);
        var r = size / 12;
        if (no == 1)
            this.mGraphics.drawCircle(x + size * .50, y + size * .50, r);
        if (no == 2) {
            this.mGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 3) {
            this.mGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .50, y + size * .50, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 4) {
            this.mGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 5) {
            this.mGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mGraphics.drawCircle(x + size * .50, y + size * .50, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .75, r);
        }
        if (no == 6) {
            this.mGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .25, y + size * .50, r);
            this.mGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .50, r);
            this.mGraphics.drawCircle(x + size * .75, y + size * .75, r);
        }
    }
    drawWinCircle(x, y, no, size) {
        // this.mDieGraphics.beginFill(colorYellow);
        // this.mDieGraphics.drawRoundedRect(x, y, size, size, 6);
        this.mDieGraphics.beginFill(colorWhite);
        var r = size / 10;
        if (no == 1)
            this.mDieGraphics.drawCircle(x + size * .50, y + size * .50, r);
        if (no == 2) {
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 3) {
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .50, y + size * .50, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 4) {
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .75, r);
        } if (no == 5) {
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mDieGraphics.drawCircle(x + size * .50, y + size * .50, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .75, r);
        }
        if (no == 6) {
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .50, r);
            this.mDieGraphics.drawCircle(x + size * .25, y + size * .75, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .25, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .50, r);
            this.mDieGraphics.drawCircle(x + size * .75, y + size * .75, r);
        }
    }


    onStart() {
        this.isStart = false;
        dynamicCounter = 17;//restart dynamicCounter
        timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
        app.stage.removeChild(mHome.container);
        this.setVisible(true);
        this.resetValue();
        resetValue();
        app.stage.addChildAt(this.container, 0);
        this.container.visible = true;
        txtBatType.visible = true;
        txtBatType.text = 'TOTAL BET';
        APP_SCREEN = APP_SIC_BO;
        this.draw4Bat();
        this.sicboContainer.y = 40;
        // app.stage.addChildAt(txtBalance, app.stage.children.length - 1);
        // app.stage.addChildAt(txtBat, app.stage.children.length - 1);
        // app.stage.addChildAt(txtBatType, app.stage.children.length - 1);
        // this.sicboContainer.y = 200;

    }
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
    onClose() {
        app.stage.removeChild(this.container);
    }
    onTimer() {//set timer for Dragan Tiger
        if (dynamicCounter == 0) {//call when bet is closed
            this.txtArr.forEach(element => { element.position.set(-100, -1000); });
            this.txtArrX.forEach(element => { element.position.set(-100, -1000); });
            this.txtArrComic.forEach(element => { element.position.set(-100, -1000); });





            isBatAccepted = "MULTIPLIER";
            colorDynamic = colorDarkBrown;
            colorBat = colorWhite;
            this.setVisible(false);
            this.drawNot4Bat();
            this.sicboContainer.y = 40;
            this.getCoinNotBet();
            this.diesval[0] = Math.floor(Math.random() * 6) + 1;
            this.diesval[1] = Math.floor(Math.random() * 6) + 1;
            this.diesval[2] = Math.floor(Math.random() * 6) + 1;
            this.checkcondition();
        }

        if (dynamicCounter < -12) {//end of the game
            dynamicCounter = 17;//restart dynamicCounter
            this.setVisible(true);//call when bet is oped
            resetValue();
            this.resetValue();
            this.draw4Bat();
            this.sicboContainer.y = 40;
            colorBat = colorWhite;
            txtDydnamic.tint = colorBat;
        }
        if (dynamicCounter == -8) {
            isBatAccepted = this.diesval[0] + " " + this.diesval[1] + " " + this.diesval[2] + " Total " + (this.diesval[0] + this.diesval[1] + this.diesval[2]);
            colorBat = colorYellow;
            colorDynamic = DYNAMICCOLOR;
            this.mdie.visible = true;
            this.mDieGraphics.visible = true;
            this.rect.visible = true;
            this.rect.scale.set(1.5, 1.5);
            this.rect.position.set(50, 95);
            if (this.totalwin > 0) {
                this.rect.scale.set(1.5, 1.8);
                this.rect.position.set(50, 115);
                this.txtWinCoin.text = "" + this.totalwin;
                this.txtWinCoin.position.set(280 - this.txtWinCoin.width * .5, 220);
                this.txtYouWin.visible = true;
                this.txtWinCoin.visible = true;
                txtBatType.text = 'LAST WIN';
                txtBat.text = this.totalwin;

                balance += this.totalwin;//update balance
                txtBalance.text = "" + balance;
            }
            this.mDieGraphics.clear();
            this.drawWinCircle(168, 127, this.diesval[0], 50);
            this.drawWinCircle(249, 121, this.diesval[1], 50);
            this.drawWinCircle(330, 127, this.diesval[2], 50);
            this.txtArrX.forEach(element => {
                element.position.set(-1000, -1000);
            });


            for (let i = this.coinContainer.children.length - 1; i >= 0; i--) {
                var sprite = this.coinContainer.getChildAt(i);
                this.coinContainer.removeChild(sprite);
            }
        }
        // dynamicCounter = 1000;
        // console.log("~~~~~~~~~" + dynamicCounter);
        // app.stage.addChildAt(txtDydnamic, app.stage.children.length - 1);
        // txtDydnamic.visible = true;
    }
    //remove all chips 

    undoCoins() {
        console.log("DT undoCoins");
        if (this.m4undo.length > 0) {
            var bat = this.m4undo.pop();
            currentbat -= bat.chip;
            balance += bat.chip;
            txtBalance.text = "" + balance;
            txtBat.text = "" + currentbat;
        }
        this.coinContainer.removeChild(this.coinContainer.getChildAt(this.coinContainer.children.length - 1));
    }
    repeatCoins() {
        if (this.m4undo.length > 0) {
            var bat = this.m4undo[this.m4undo.length - 1];
            this.callBat(bat.type);
        }
    }
    callBat(type) {
        currentbat += coinValue[selCoin];//set coin current value
        balance -= coinValue[selCoin];//update balance
        txtBalance.text = "" + balance;
        txtBat.text = "" + currentbat;
        this.m4undo.push(new BatValuse(type, coinValue[selCoin]));
        console.log(type + "  ~~~~~~~  " + coinValue[selCoin]);
        this.getCoinStrip(type, getChipSicbo(type, this.m4undo));
    }
    getCoinStrip(type, coin) {

        if (type < 5) {
            var strip = this.addCoin(this.butArr[type][0] + this.butArr[type][2] * .5, this.butArr[type][1] + this.butArr[type][3] * .5, coin, type);
            this.coinContainer.addChild(strip);
            console.log(type + "  ~~~~~@~@~~~  " + strip.type);
        }
        if (type >= 5 && type < 11)
            this.coinContainer.addChild(this.addCoin(40 + (74.5) * (type - 5), 589, coin, type));
        if (type >= 11 && type < 17)
            this.coinContainer.addChild(this.addCoin(40 + (74.5) * (type - 11), 703, coin, type));
        if (type >= 17 && type < 24)
            this.coinContainer.addChild(this.addCoin(35 + (63.5) * (type - 17), 785, coin, type));
        if (type >= 24 && type < 31)
            this.coinContainer.addChild(this.addCoin(35 + (63.5) * (type - 24), 863, coin, type));
        if (type >= 31 && type < 46) {
            var i = (type - 31) % 5, j = Math.floor((type - 31) / 5);
            this.coinContainer.addChild(this.addCoin(47.5 + (89) * i, 982 + 104 * j, coin, type));
        }
        if (type >= 46 && type < 49)
            this.coinContainer.addChild(this.addCoin(115, 1301 + (type - 46) * 62, coin, type));
        if (type >= 49 && type < 52)
            this.coinContainer.addChild(this.addCoin(339, 1301 + (type - 49) * 62, coin, type));
    }
    //coin reset for small view of when dynamic counter is < 0
    getCoinNotBet() {
        for (let ii = 0; ii < this.coinContainer.children.length; ii++) {
            var sprite = this.coinContainer.getChildAt(ii);
            sprite.scale.set(sprite.scale.x * .8, sprite.scale.x * .8);
            var type = sprite.type;
            console.log("tyoe = " + type);
            if (type < 5) {
                sprite.position.set(this.butArr[type][0] + this.butArr[type][2] * .5, this.butArr[type][1] + this.butArr[type][3] * .25);
            }
            if (type >= 5 && type < 11)
                sprite.position.set(40 + (74.5) * (type - 5), 475);
            if (type >= 11 && type < 17)
                sprite.position.set(40 + (74.5) * (type - 11), 541);
            if (type >= 17 && type < 24)
                sprite.position.set(35 + (63.5) * (type - 17), 616);
            if (type >= 24 && type < 31)
                sprite.position.set(35 + (63.5) * (type - 24), 681);
            if (type >= 31 && type < 46) {
                var i = (type - 31) % 5, j = Math.floor((type - 31) / 5);
                sprite.position.set(47.5 + (89) * i, 736 + 45 * j);
            }
            if (type == 46)
                sprite.position.set(75 + (148) * (0), 871);
            if (type == 47)
                sprite.position.set(75 + (148) * (2), 871);
            if (type == 48)
                sprite.position.set(75 + (148) * (1), 917);
            if (type == 49)
                sprite.position.set(75 + (148) * (1), 871);
            if (type == 50)
                sprite.position.set(75 + (148) * (0), 917);
            if (type == 51)
                sprite.position.set(75 + (148) * (2), 917);
        }

    }
    addCoin(x, y, val, type) {
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
        var coinstrip = loadRolletSprite(basepath + "svg/a" + col + ".svg", x, y, SCALECOIN + .05);
        coinstrip.type = type;
        var txt = loadRolletText({ fill: colorWhite, fontSize: 70 - val.length * 5, fontWeight: "bold" }, val);
        coinstrip.addChild(txt);
        txt.position.set(-txt.width * .5, -txt.height * .52);
        return coinstrip;
    }
    resetValue() {
        this.anim = 10;
        txtBatType.text = 'TOTAL BET';
        this.removeCoin();
        while (this.m4undo.length > 0) {
            this.m4undo.pop();
        }
        for (let i = this.coinContainer.children.length - 1; i >= 0; i--) {
            var sprite = this.coinContainer.getChildAt(i);
            this.coinContainer.removeChild(sprite);
        }
        for (let i = 0; i < this.multiplyer.length; i++)
            this.multiplyer[i] = 0;
        var maxmulti = 2 + Math.floor(Math.random() * 10);

        for (let i = 0; i < maxmulti; i++)
            this.multiplyer[i] = 2 + Math.floor(Math.random() * 10);
        this.multiplyer.sort(compRan);
        for (let i = 0; i < maxmulti; i++) {
            this.forlastvalue[i] = Math.floor(Math.random() * 33) % 2;
            this.multiplyer[46 + i] *= this.forlastvalue[i] == 0 ? 3 : 6;
        }
        for (let i = 0; i < this.multiplyer.length; i++)
            this.multiplyer[i] *= this.bordVal[i];

        this.txtArrX.forEach(element => {
            element.position.set(-1000, -1000);
        });
        this.mdie.visible = false;
        // this.mDieGraphics.visible = false;
        this.txtYouWin.visible = false;
        this.txtWinCoin.visible = false;
        this.rect.visible = false;
    }

    onClick() { }
    removeCoin() {
        while (this.mChips.length > 0) {
            var sprites = this.mChips.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
            var sprites = this.moveSprite.pop();
            while (sprites.length > 0) {
                this.sbContainer.removeChild(sprites.pop());
            }
        }
    }
    loadTextStr(style_var, str, x, y) {
        var text = new PIXI.Text(str, new PIXI.TextStyle(style_var));
        text.position.set(x, y);
        this.sicboContainer.addChild(text);
        return text;
    }
    textStr(no, str, x, y, size) {
        this.txtArr[no].text = str;
        this.txtArr[no].style.fontSize = size;
        this.txtArr[no].position.set(x - this.txtArr[no].width * .5, y);
        this.txtArr[no].tint = colorBlock;
    }
    textStrcomic(no, str, x, y, size) {
        y -= 10;
        this.txtArrComic[no].text = str;
        this.txtArrComic[no].style.fontSize = size;
        this.txtArrComic[no].position.set(x - this.txtArrComic[no].width * .5, y);

    }
    textStrX(no, str, x, y) {
        y -= 10;
        this.txtArrX[no].text = str;
        this.txtArrX[no].position.set(x - this.txtArrX[no].width * .5, y);
        this.mGraphics.beginFill(colorBlock);
        this.mGraphics.lineStyle(2, colorBrown, 1);
        this.mGraphics.drawRoundedRect(x - this.txtArrX[no].width * .5 - 5, y, this.txtArrX[no].width + 10, 20, 10);
        this.mGraphics.lineStyle(0, colorBrown, 1);
    }
    checkcondition() {
        // this.diesval[0] = 4; this.diesval[1] = 5; this.diesval[2] = 6;
        for (let i = 0; i < this.result.length; i++)
            this.result[i] = 0;
        var dieTotal = this.diesval[0] + this.diesval[1] + this.diesval[2];
        console.log(this.diesval[0], this.diesval[1], this.diesval[2], dieTotal);

        if (this.diesval[0] == this.diesval[1] && this.diesval[1] == this.diesval[2])
            this.result[2] = 1;
        if (this.result[2] == 0) {
            if (dieTotal >= 4 && dieTotal <= 10)
                this.result[0] = 1;
            if (dieTotal % 2 != 0)
                this.result[1] = 1;
            if (dieTotal % 2 == 0)
                this.result[3] = 1;
            if (dieTotal >= 11 && dieTotal <= 17)
                this.result[4] = 1;
        }
        for (let i = 1; i <= 6; i++) {
            var nos = 0;
            for (let j = 0; j < 3; j++) {
                if (this.diesval[j] == i) {
                    nos++;
                }
            }
            if (nos > 1) {
                this.result[4 + i] = 1;
            }
            if (nos > 2) {
                this.result[10 + i] = 1;
            }

        }
        if (dieTotal > 3 && dieTotal < 18) {
            this.result[17 + dieTotal - 4] = 1;
        }

        for (let i = 0, n = 1, nc = 2; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                var first = false;
                var second = false;
                for (let j = 0; j < 3; j++) {
                    if (this.diesval[j] == n) {
                        first = true;
                    }
                    if (this.diesval[j] == nc) {
                        second = true;
                    }
                }
                if (first && second)
                    this.result[31 + j + (i * 5)] = 1;
                nc++;
                if (nc > 6) {
                    nc = n + 2; n++;
                }
            }
        }
        for (let i = 1; i <= 6; i++) {
            if (this.diesval[0] == i || this.diesval[1] == i || this.diesval[2] == i) {
                this.result[this.lastArr[i - 1]] = 1;
            }
        }

        this.totalwin = 0;
        for (let i = 0; i < this.result.length; i++) {
            var coin = getChipSicbo(i, this.m4undo);
            if (this.result[i] == 1 && coin > 0) {
                if (this.multiplyer[i] > 0) {
                    coin *= this.multiplyer[i];
                } else {
                    if (i > 45) {
                        var val = this.getPos(i);
                        coin *= this.bordVal[i];
                        if (this.result[val + 5] == 1) {
                            coin *= 2;
                        }
                        if (this.result[val + 11] == 1) {
                            coin *= 3;
                        }
                        console.log(i + "  " + val + "  " + coin);
                    } else {
                        coin *= this.bordVal[i];
                    }
                }
                this.totalwin += coin + getChipSicbo(i, this.m4undo);
            }
        }

        this.winningnumber[i] = loadRolletText({ fill: colorDTRed, fontSize: 25, fontWeight: "normal", align: "center", leading: -5 }, "" + i);
        for (let i = this.winningnumber.length - 1; i > 0; i--) {
            this.winningnumber[i].text = this.winningnumber[i - 1].text;
            this.winningnumber[i].color = this.winningnumber[i - 1].color;
            this.winningnumber[i].tint = this.winningnumber[i].color;
            this.winningnumber[i].position.set(20 + i * 36 - this.winningnumber[i].width * .5, 60);
            this.winningnumber[i].visible = false;
        }
        this.winningnumber[0].text = "" + dieTotal;
        this.winningnumber[0].color = this.result[2] == 1 ? colorDTRed : (this.totalwin > 0 ? colorCream : colorBrown);
        this.winningnumber[0].tint = this.winningnumber[0].color;
        this.winningnumber[0].position.set(20 - this.winningnumber[0].width * .5, 60);
        this.winningnumber[0].visible = false;
        this.mDieGraphics.clear();
    }
    getPos(val) {
        for (let i = 0; i < this.lastArr.length; i++) {
            if (this.lastArr[i] == val) {
                return i;
            }
        }
        return 1;
    }
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
