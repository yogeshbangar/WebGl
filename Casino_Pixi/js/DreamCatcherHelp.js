
//Menu Slide

class DreamCatcherHelp {
    constructor() {
        this.mainContainer = new PIXI.Container();//Create Container for PokerHelp object
        this.container = new PIXI.Container();//Create Container for PokerHelp object
        this.graphics = new PIXI.Graphics();//Showing number and cards 
        this.container.addChild(this.graphics);
        this.mainContainer.addChild(this.container);
        this.titles = [];
        this.titles.push(this.loadText('Game Objective'));
        this.titles.push(this.loadText('Game Rules'));
        this.titles.push(this.loadText('Payouts'));
        this.titles.push(this.loadText('Return to Player'));
        this.titles.push(this.loadText('Place Bets'));
        this.titles.push(this.loadText('Auto Play'));
        this.titles.push(this.loadText('Chat'));
        this.titles.push(this.loadText('Game Number'));
        this.titles.push(this.loadText('Game History'));
        this.titles.push(this.loadText('Settings'));
        this.titles.push(this.loadText('Error Handling'));
        this.titles.push(this.loadText('Diconnection Policy'));
        this.titles.push(this.loadText('More Games'));
        this.titles.push(this.loadText('Home'));
        this.titles.forEach(element => {
            element.addChild(loadRolletSprite(basepath + "help/arro.png", 450, 10, .51));
        });
        var gameObjective = "Dream Catcher allows you to play the Money Wheel game of chance that is played using a large vertical wheel, spun by the dealer. Money Wheel game is found in many land-based casinos and used in TV game shows.\n\n";
        var gameRulestxt = "Simply place a bet on a number you believe the wheel will stop at: 1, 2, 5, 10, 20 or 40.\n\n"+
        "The dealer then spins the wheel. When it comes to a stop, the winning segment is indicated by a pointer mounted on a flexible piece of leather at the top of the wheel.\n\n"+
        "All bets are paid on a to one basis with the odds matching the number in the winning segment: e.g. winning number 5 pays 5 to 1, winning number 10 pays 10 to 1, and so on.\n\n"+
        "If the wheel stops on a multiplier segment (2x or 7x), then all bets remain in place and no new bets will be allowed. The wheel is spun again and the outcome of the spin (1, 2, 5, 10, 20 or 40) will determine the winning odds as usual but the odds will be multiplied twice or seven times over, depending on which multiplier the wheel stopped on in the previous spin.\n\n"+
        "If the wheel stops on a multiplier two or more times in a row, then all bets remain in place, and the multipliers stack: i.e. the multiplied payout from the last spin is multiplied again! The dealer continues to spin the wheel until the spin stops on 1, 2, 5, 10, 20 or 40. (For example, the wheel stops on 2x, then on the next spin it stops on 7x, and on the next spin â€“ on number 5. The outcome for the player who originally placed a bet on number 5, is: (5 to 1) x 2 x 7 = (10 to 1) x 7 = 70 to 1).\n\n"+
        "Consecutive multipliers are unlimited subject to a default maximum win displayed in the limits panel.\n\n";
        var payouts = " ";
        var payoutsWheel = [
            "Number\non Wheel",
            "1",
            "2",
            "5",
            "10",
            "20",
            "40",
            "2x",
            "7x",
        ];
        var payoutsSegments = [
            "Number of\nSegments",
            "23",
            "15",
            "7",
            "4",
            "2",
            "1",
            "1",
            "1",
        ];
        var payoutsPays = [
            "Pays",
            "1 to 1",
            "2 to 1",
            "5 to 1",
            "10 to 1",
            "20 to 1",
            "40 to 1",
            "Multiplies the payout of the next\nwinning number by 2x",
            "Multiplies the payout of the next\nwinning number by 7x",
        ];

        var payoutsArr = "Maximum payout for your all winnings within a game round is limited. For details see the Bet Limit table.\n\n" +
            "Please note that any malfunction voids the game round and all eventual payouts for the round.\n\n"

        var return2players = "The optimal theoretical return-to-player percentage is 96.58% (90.57%-96.58%).\n\n";
        var placeBets = "The BET LIMITS panel shows the minimum and maximum allowed bet limits at the table, which may change from time to time. Open the Bet Limits to check your current limits.\n\n" +
            "Dream Catcher\n\n" +
            "€ 0.10 - 1,000\n\n" +
            "To participate in the game, you must have sufficient funds to cover your bets. You can see your current BALANCE on your screen.\n\n" +
            "BALANCE € 100,000.00\n\n" +
            "The TRAFFIC LIGHTS tell you the current status in the game round by informing you of when you can bet (GREEN light), when the betting time is nearly over (YELLOW light), and when betting time has expired (RED light).\n\n" ;
            // "PLACE YOUR BETS\n\n" +
            // "The CHIP DISPLAY allows you to select the value of each chip you wish to bet. Only chips of denominations that can be covered by your current balance will be enabled.\n\n";


        var placeBetsArr = [
            "Once you have selected a chip, place your bet by simply clicking/tapping the appropriate betting spot on the game table. Each time you click/tap the betting spot, the amount of your bet increases by the value of the selected chip or up to the maximum limit for the type of bet you have selected. Once you have bet the maximum limit, no additional funds will be accepted for that bet, and a message will appear above your bet to notify you that you have bet the maximum.\n\n" +
            "You can also click/tap the BET ON ALL button which allows you to place a bet on all bet spots. The value of your selected chip will be placed on all bet spots simultaneously.\n\n\n",

           "\n\n\n"+
           "NOTE: Please do not minimise your browser or open any other tab in your browser while betting time remains and you have placed bets on the table. Such actions may be interpreted as leaving the game, and your bets will therefore be declined for that particular game round.\n\n"+
           "The DOUBLE button becomes available after you have placed any bet. Each click/tap doubles all your bets up to the maximum limit. Note that you must have a sufficient account balance to double ALL your placed bets.\n\n",

           "The REPEAT button allows you to repeat all bets from the previous game round. This button is available only before the first chip is placed.\n\n",
           
           "The UNDO button removes the last bet you placed.\n\n",

           "You can click/tap the UNDO button repeatedly to remove bets, one by one, in the reverse order of which they were placed. You can clear all your bets by holding the UNDO button.\n\n"+
           "The TOTAL BET indicator displays the total amount of all bets placed in the current round.\n\n",
           "TOTAL BET € 500.00\n\n"
        ];


        var autoPlay = "Once you have placed a bet, Autoplay allows you to repeat your selected bet or bets for a chosen number of game rounds.\n\n" +
            "To start Autoplay, place your bets on the betting grid as usual and then click/tap the Autoplay button.\n\n";

        var autoPlayArr = [
            "The Autoplay panel will then open, and from here you simply select the number of game rounds you would like your bet to be repeated in. Then click/tap START to Autoplay.\n\n",

            "You can keep track of the number of Autoplay rounds remaining as they are displayed in an indicator on the Autoplay button.\n\n" +
            "Your Autoplay limit will be displayed in the Autoplay panel. (Example: a total bet of €200 made on the betting grid followed by x10 Autoplay rounds selected by you = Autoplay limit of €2000.)\n\n" +
            "Your automatic game rounds will continue until either your chosen number of Autoplay rounds is complete, or you choose to stop Autoplay, by simply clicking/tapping STOP\n\n",
            "STOP\n\n",
            "Placing additional bets on the betting grid or doubling your bets while Autoplay is running will not stop Autoplay. A message will appear that will allow you to choose to continue Autoplay with your changed bets or to stop Autoplay."];

        var chattxt = "Tap the MENU button and then the CHAT button to launch a chat window that allows you to chat with the dealer and other players.\n\n" +
            "\n\n\n\n" +
            "Tap the enter field to open a virtual keyboard that allows you to type your message. The keyboard will disappear when the chat message is sent.\n\n" +
            "Tap the MENU button again to close chat. The most recent chat messages are displayed beneath the betting grid.\n\n";
        var gamenumber = "Each game round is identified by a unique GAME NUMBER.\n\n" +
            "       #21:11:08\n\n" +
            "This number reflects when the game round began in terms of GMT by hour:minute:second. Please use this game number for reference (or take a screenshot of the game number) if you wish to contact Customer Service regarding a particular round.\n\n";

        var gamehistory = "he HISTORY button will launch a window showing all live game rounds you have played and the results of those rounds..\n\n" +
            "\n\n\n\n" +
            "You can review your past gaming activity by viewing your:.\n\n" +
            "* ACCOUNT HISTORY - Shows your complete account history as a list of dates, games, bet amounts and payouts. The game round completed most recently appears at the top of the list..\n\n" +
            "* GAME HISTORY - Shows your history related to a particular game once you tap/click the game in the GAME column..\n\n";

        var setting = "Your chosen settings will be applied at once and will be stored to your profile. Stored settings will be launched automatically when you log in from any device..\n\n" +
            "You can alter your general and game settings..\n\n" +
            "\n\n\n\n";

        var ErroHandling = "If there is any error in the game, gambling system or game procedure, the game round will be temporarily paused while the dealer notifies the shift manager. You and other players will be notified via Chat, or by an on-screen pop-up message, that the issue is being investigated. If the manager can immediately resolve the error, the game round will continue as normal. If immediate resolution is not possible, the game round will be cancelled and initial bets will be refunded to all players who participated in the game round..\n\n";
        var disconnection = "If you are disconnected from a game round while betting time remains, any bets placed will be void and the bets returned to you. If you are disconnected after betting is closed, placed bets remain valid and are settled in your absence. Upon reconnecting, you can view bet outcomes in the History window.\n\n";
        var MoreGames = "The LOBBY button (if applicable) can be selected at any time from any game..\n\n" +
            "\n\n\n\n" +
            "It allows you to easily change game table or select any other live game. You will not be removed from this table until you have actually selected the new table you wish to join. You can use the LIVE LOBBY to browse other games while still playing at your current table.\n\n";
        var Home = "The HOME button in the MENU (if applicable) will take you back to the website homepage.\n\n";


        this.disc = [];
        this.disc.push(this.loadText(gameObjective));
        this.disc.push(this.loadText(gameRulestxt));
        // this.disc.push(this.loadText(BetTypes));1
        // this.disc.push(this.loadText(NeighbourBets));2
        // this.disc.push(this.loadText(FavouriteSpecialBets));3
        // this.disc.push(this.loadText(WinningNumbers));4
        // this.disc.push(this.loadText(Statistics));5
        this.disc.push(this.loadText(payouts));
        this.disc.push(this.loadText(return2players));
        this.disc.push(this.loadText(placeBets));
        this.disc.push(this.loadText(autoPlay));
        this.disc.push(this.loadText(chattxt));
        this.disc.push(this.loadText(gamenumber));
        this.disc.push(this.loadText(gamehistory));
        this.disc.push(this.loadText(setting));
        this.disc.push(this.loadText(ErroHandling));
        this.disc.push(this.loadText(disconnection));
        this.disc.push(this.loadText(MoreGames));
        this.disc.push(this.loadText(Home));


        

        this.disc[2].allHeight = this.disc[2].height;
        for (let i = 0; i < payoutsWheel.length; i++) {
            var text = this.loadText(payoutsWheel[i], 5, this.disc[2].allHeight + (i == 0 ?0:10));
            this.disc[2].addChild(text);
            var text = this.loadText(payoutsSegments[i], 105, this.disc[2].allHeight+(i == 0 ?0:10));
            this.disc[2].addChild(text);
            var text = this.loadText(payoutsPays[i], 205, this.disc[2].allHeight+(i == 7 || i == 8 ?0:10));
            this.disc[2].addChild(text);

            this.disc[2].allHeight += 42;
        }
        var text = this.loadText(payoutsArr, 0, this.disc[2].allHeight + 10);
        this.disc[2].addChild(text);
        this.disc[2].allHeight += text.height;



        this.disc[4].allHeight = this.disc[4].height;
        var text = loadRolletText({
            dropShadow: true, dropShadowColor: 'rgba(0, 0, 0, 1)', dropShadowBlur: 2, dropShadowAngle: Math.PI / 4, dropShadowDistance: 2,
            fill: "#fafafa", fontSize: 21, fontWeight: "normal"
          },"PLACE YOUR BETS\n");
        text.position.set( 150, this.disc[4].allHeight-3);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var text = this.loadText("The CHIP DISPLAY allows you to select the value of each chip you wish to bet. Only chips of denominations that can be covered by your current balance will be enabled.", 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;
        this.disc[4].allHeight += 150;
        
        for (var i = 0; i < 6; i++) {
            var obj = loadRolletSprite(basepath + "svg/" + i + ".svg", 20 + i * 40, 180, .25);//
            obj.x = 200 - Math.sin((90 + i * 36) * (Math.PI / 180)) * 120;//set horizontal direction for flying coin open
            obj.y = this.disc[4].allHeight + Math.cos((90 + i * 36) * (Math.PI / 180)) * 120;//set verticle direction for flying coin open
            this.disc[4].addChild(obj);
        }

        var obj = loadRolletSprite(basepath + "help/glow.png", 200, this.disc[4].allHeight, 1.51);//
        this.disc[4].addChild(obj);
        var obj = loadRolletSprite(basepath + "svg/" + 3 + ".svg", 200, this.disc[4].allHeight, .3);//
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 100;

        var text = this.loadText(placeBetsArr[0], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "batonAll.png", 100, this.disc[4].allHeight, 0.81);//
        this.disc[4].addChild(obj);

        var text = this.loadText(placeBetsArr[1], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeatchild.svg", 50, this.disc[4].allHeight, 0.91);
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[2], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeat.svg", 50, this.disc[4].allHeight, 0.91);//
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[3], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "undo.svg", 50, this.disc[4].allHeight, 0.91);//
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[4], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var text = this.loadText(placeBetsArr[5], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;


        this.disc[4].allHeight -= this.disc[4].height;







        this.disc[5].allHeight = this.disc[5].height;
        this.disc[5].addChild(loadRolletSprite(basepath + "help/autoplay.svg", 50, this.disc[5].allHeight + 5, 0.7));
        this.disc[5].allHeight += 50;
        var text = this.loadText(autoPlayArr[0], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;
        this.disc[5].addChild(loadRolletSprite(basepath + "help/autoplay1.png", 50, this.disc[5].allHeight + 5, 0.7));
        this.disc[5].allHeight += 50;
        var text = this.loadText(autoPlayArr[1], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;

        var text = this.loadText(autoPlayArr[2], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;
        var text = this.loadText(autoPlayArr[3], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height + 50 - this.disc[5].height;

        var obj = loadRolletSprite(basepath + "help/chaticon.png", 65, 80, 1.0);//HIstory icon
        this.disc[6].addChild(obj);
        var obj = loadRolletSprite(basepath + "help/history.png", 65, 80, 1.0);//HIstory icon
        this.disc[8].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/setting.png", 65, 150, 1.0);//Setting Icon
        this.disc[9].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/lobby.png", 65, 80, 1.0);//Lobby Icon
        this.disc[12].addChild(obj);

        this.scroll = 0;//-7000;
        this.dwonY = 0;
        this.mainContainer.x = 6000;
        this.speed = 0;

        this.close = this.loadButtom("close.svg", "close", 500, 900, 1);
        this.select = -1;
        this.minScroll = 0;

        this.graphicsTop = new PIXI.Graphics();//Showing number and cards 
        this.mainContainer.addChild(this.graphicsTop);
        this.graphicsTop.beginFill(0x000000);
        this.graphicsTop.drawRect(0, 0, app.screen.width + 30, 30);
        this.graphicsTop.beginFill(0x555555);
        this.graphicsTop.drawRect(0, 25, app.screen.width + 30, 30);
        this.graphicsTop.beginFill(0x343237);
        this.graphicsTop.drawRect(50, 55, app.screen.width + 30, 35);
        this.graphicsTop.addChild(this.loadText("HELP - MONEY WHEEL", 200, 65));
        this.graphicsTop.addChild(this.loadText2("BALANCE", { fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 20, 2));
    }
    onClick(e) {
        console.log("help e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "close":
                mDreamCatcherHelp.speed = 30;
                mDreamCatcherHelp.mainContainer.x = 1;
                break;
        }
    }
    loadText(txt, x, y) {
        var text = new PIXI.Text(txt, style);
        this.container.addChild(text);
        text.position.set(x || 0, y || 0);
        text.visible = true;
        return text;
    }
    loadText2(txt, sty, x, y) {
        var text = new PIXI.Text(txt, sty);
        this.container.addChild(text);
        text.position.set(x || 0, y || 0);
        text.visible = true;
        return text;
    }
    drawHelp() {
        // console.log(this.scroll);
        if (this.mainContainer.x < 500) {
            this.container.position.set(0, this.scroll);
        }
        if (this.mainContainer.x > 0 && this.mainContainer.x < 500) {
            this.mainContainer.x += this.speed;
            if (this.mainContainer.x > 500) {
                this.mainContainer.x = 600;
                app.stage.removeChild(this.mainContainer);
            }
        }
    }
    onstart() {
        this.scroll = 0;//-7000;
        this.dwonY = 0;
        this.mainContainer.x = 499;
        this.speed = -30;
        console.log("this.container.x = " + this.mainContainer.x);
        this.setDescription(-1);
        app.stage.addChild(this.mainContainer);
        app.stage.addChildAt(txtDydnamic, app.stage.children.length - 1);
        app.stage.addChildAt(txtBalance, app.stage.children.length - 1);
        app.stage.addChildAt(txtBat, app.stage.children.length - 1);
        app.stage.addChildAt(txtBatType, app.stage.children.length - 1);


    }

    onTuch(e, type) {
        if (this.mainContainer.x > 30)
            return;
        if (type == "down") {
            this.dwonY = e.data.global.y;
            this.isMove = true;
            this.startY = e.data.global.y;
        }

        if (type == "up") {
            console.log("isMove~   @@@@@@@");
            this.isMove = false;

            if (Math.abs(e.data.global.y - this.startY) > 5) {
                return;
            }
            console.log("isMove~   ####");
            var y = this.scroll + 95;
            var i = 0;
            for (let i = 0; i < this.titles.length; i++) {
                if (CircRectCollision(50, y - 8, app.screen.width, this.titles[i].height + 20, e.data.global.x, e.data.global.y, 5)) {
                    console.log("isMove~   " + i);
                    if (i == this.select)
                        this.setDescription(-1);
                    else
                        this.setDescription(i);
                    return;
                }
                y += this.titles[i].height + 20;
                if (i == this.select) {
                    y += this.disc[i].height;
                    if (i == 2 || i == 4 || i == 5) {
                        y += this.disc[i].allHeight;
                    }

                }
            }
        }
        if (this.isMove) {
            this.scroll -= this.dwonY - e.data.global.y;
            this.dwonY = e.data.global.y;

            if (this.scroll > 0) {
                this.scroll = 0;
            }
            console.log(this.minScroll + "  ~~~~~~~  " + this.scroll);
            if (this.minScroll > this.scroll)
                this.scroll = this.minScroll;
        }
    }

    //Drawing help  
    setDescription(sel) {
        this.select = sel;
        var y = 95;
        var i = 0;
        var diff = 0;
        this.graphics.clear();
        this.graphics.beginFill(0x544f56); //
        this.graphics.drawRect(50, 55, app.screen.width, app.screen.height * 10);


        this.titles.forEach(element => {
            this.graphics.beginFill(0x211720); //Title back dark
            this.graphics.drawRect(50, y - 8, app.screen.width, element.height + 20);
            this.graphics.beginFill(0x3e343d); ////Title back light
            this.graphics.drawRect(50, y - 8, app.screen.width, element.height + 18);

            element.position.set(60, y);//set title text position
            element.getChildAt(0).rotation = 0;//set selection icon zero rotation
            y += element.height + 20;
            this.disc[i].visible = false;
            if (this.select == i) {
                element.getChildAt(0).rotation = Math.PI / 2;
                console.log("[ this.scroll " + Math.floor(this.scroll) + "] [y =" + y + "][diff = " + Math.floor(this.scroll - y) + "]");
                diff = Math.floor(this.scroll - y);
                this.disc[i].visible = true;
                this.disc[i].position.set(60, y);

                if (i == 4) {
                    this.graphics.beginFill(colorPLACEGreen); //green
        this.graphics.drawRect(74, y+this.disc[i].height -6, 450, 30);

                    this.graphics.beginFill(0x222222); //green
                    this.graphics.drawRect(54, y + this.disc[4].getChildAt(this.disc[4].children.length - 1).y - 6, 170, 30);
                }
                y += this.disc[i].height;

                if (i == 4 || i == 5) {
                    y += this.disc[i].allHeight;
                }
                if (i == 2) {

                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y - 5, app.screen.width - 60, 45);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let j = 0; j < 8; j++) {
                        this.graphics.drawRect(55, y + 40 + j * 42, app.screen.width - 60, 42);
                    }
                    this.graphics.drawRect(150, y - 5, 1, 381);
                    this.graphics.drawRect(255, y - 5, 1, 381);

                    this.graphics.lineStyle(0, 0xaaaaaa, 1);
                    y += this.disc[2].allHeight;
                }


            }
            i++;
        });
        this.minScroll = -y + 600;
        console.log("this.minScroll = " + this.minScroll);
        if (diff < -300) {
            this.scroll = -0;
        }
    }
    loadButtom(str, tag, x, y, s) {
        let sprite = new Sprite(resources[basepath + str].texture);//create strip
        sprite.interactive = true;//set interactive true for click event
        sprite.buttonMode = true;
        sprite.myCustomProperty = tag;//set tag for getting strip event
        sprite.on('pointerdown', this.onClick); // use for onclick event
        sprite.x = x;
        sprite.y = y;
        sprite.scale.set(s, s);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        this.mainContainer.addChild(sprite);
        return sprite;
    }
    check() {
        app.stage.removeChild(this.mainContainer);
        app.stage.addChild(this.mainContainer);
        app.stage.addChildAt(txtDydnamic, app.stage.children.length - 1);
        app.stage.addChildAt(txtBalance, app.stage.children.length - 1);
        app.stage.addChildAt(txtBat, app.stage.children.length - 1);
        app.stage.addChildAt(txtBatType, app.stage.children.length - 1);
    }
}