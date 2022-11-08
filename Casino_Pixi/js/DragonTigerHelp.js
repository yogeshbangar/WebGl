
//Menu Slide

class DragonTigerHelp {
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
        this.titles.push(this.loadText('Bet Statistics'));
        this.titles.push(this.loadText('Chat'));
        this.titles.push(this.loadText('Scoreboards'));
        this.titles.push(this.loadText('Game Number'));
        this.titles.push(this.loadText('Game History'));
        this.titles.push(this.loadText('Settings'));
        this.titles.push(this.loadText('Error Handling'));
        this.titles.push(this.loadText('Diconnection Policy'));
        this.titles.push(this.loadText('Shuffling'));
        this.titles.push(this.loadText('More Games'));
        this.titles.push(this.loadText('Home'));
        this.titles.forEach(element => {
            element.addChild(loadRolletSprite(basepath + "help/arro.png", 450, 10, .51));
        });
        var gameObjective = "Dragon Tiger is a very easy and fast-paced game. The game objective is to guess whether the Dragon or Tiger will draw the higher value card, and therefore win. Player may also bet on whether the Dragon and Tiger cards dealt will be of the same value, and therefore a Tie.\n\n";
        var gameRulestxt = "The aim of the Dragon Tiger is to predict which of the hands â€“ the Dragon or the Tiger â€“ will win or if it will be a Tie.\n\n" +

            " * The cards are dealt from a shoe with eight decks (Jokers are excluded)\n\n" +
            " * The player places a bet on either the Dragon, or Tiger, or Tie, or Suited Tie\n\n" +
            " * A single card face-up is dealt by the dealer to the Dragon and to the Tiger\n\n" +
            " * The highest card wins and pays even money 1:1\n\n" +
            " * Card value from the lowest to the highest is as follows: Ace with value 1, being the lowest and followed by 2 and so on, and King the highest (A-2-3-4-5-6-7-8-9-10-J-Q-K)\n\n" +
            " * In the case of a Tie, half of your main bet (the Dragon/Tiger bet) is returned and wins pay out 11:1\n\n" +
            " * If cards for the Dragon and Tiger are equal both in value and suit, it's a Suited Tie, half of your main bet (the Dragon/Tiger bet) is returned and wins pay out 50:1\n\n";
        var payouts = "Your payout depends on the type of bet placed.\n\n";
        var payoutsBET = [
            "BET	  ",
            "DRAGON	  ",
            "TIGER	  ",
            "TIE	  ",
            "SUITED TIE",
            "Even	  ",
            "Odd      ",
        ];
        var payoutsPAYS = [
            "PAYS",
            "1: 1",
            "1: 1",
            "11: 1",
            "50: 1",
            "0.95: 1",
            "0.95: 1",
        ];
        var payoutsArr = "Please note that any malfunction voids the game round and all eventual payouts for the round. Bets will be returned.\n\n"

        var return2players = "The optimal theoretical return-to-player percentage:\n\n" +
            " * Main bet (DRAGON/TIGER) - 96.27%\n\n" +
            " * TIE - 89.64%\n\n" +
            " * SUITED TIE - 86.02%\n\n" +
            " * Even - 97.84%\n\n" +
            " * Odd - 97.16%\n\n";
        var placeBets = "The BET LIMITS panel shows the minimum and maximum allowed bet limits at the table, which may change from time to time. Open the Bet Limits to check your current limits.\n\n" +
            "Dragon Tiger\n\n" +
            "€ 1 - 5,000\n\n" +
            "To participate in the game, you must have sufficient funds to cover your bets. You can see your current BALANCE on your screen.\n\n" +
            "BALANCE € 100,000.00\n\n" +
            "The TRAFFIC LIGHTS tell you the current status in the game round by informing you of when you can bet (GREEN light), when the betting time is nearly over (YELLOW light), and when betting time has expired (RED light).\n\n" ;
            

        
        var placeBetsArr = [
            "Once you have selected a chip, place your bet by simply clicking/tapping the appropriate betting spot on the game table. Each time you click/tap the betting spot, the amount of your bet increases by the value of the selected chip or up to the maximum limit for the type of bet you have selected. Once you have bet the maximum limit, no additional funds will be accepted for that bet, and a message will appear above your bet to notify you that you have bet the maximum.\n\n" +

            "NOTE: Please do not minimise your browser or open any other tab in your browser while betting time remains and you have placed bets on the table. Such actions may be interpreted as leaving the game, and your bets will therefore be declined for that particular game round.\n\n" +
            "The DOUBLE button becomes available after you have placed any bet. Each click/tap doubles all your bets up to the maximum limit. Note that you must have a sufficient account balance to double ALL your placed bets.\n\n",

            "The REPEAT button allows you to repeat all bets from the previous game round. This button is available only before the first chip is placed.\n\n",

            "The UNDO button removes the last bet you placed.\n\n",

            "You can click/tap the UNDO button repeatedly to remove bets, one by one, in the reverse order of which they were placed. You can clear all your bets by holding the UNDO button.\n\n" +
            "The TOTAL BET indicator displays the total amount of all bets placed in the current round.\n\n",
            "TOTAL BET € 500.00\n\n"
        ];


        var betStatistics = "Shows the percentages of all bets placed on the DRAGON, TIGER and TIE.\n\n";

        var betStatisticsArr = [
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

        var scoreboards = "Dragon Tiger streaks and trends for either the Dragon or the Tiger using a particular shoe are recorded in various scoreboards. These pictorial representations of past round results and other statistics regarding the current shoe may be of help to you in predicting the results of future rounds.\n\n" +
            "The BEAD ROAD and BIG ROAD display the results of each past round, while the Big Eye Road, Small Road and Cockroach Road display patterns derived from the BIG ROAD.\n\n" +
            "Roads and shoe statistics are always cleared when a new shoe is introduced.\n\n";




        var scoreboardsArr = [
            "BEAD ROAD\n",
            "Each cell in the BEAD ROAD represents the result of a past round. The result of the earliest round is recorded in the upper left corner. Read the column downwards all the way to the bottom; then start at the top of the adjacent column to the right and so forth. A solid red cell indicates a Dragon win. A solid yellow cell represents a Tiger win. A solid green cell represents a Tie.\n\n" +
            "You can change the Bead Road display from English to Simplified Chinese or Score Mode by clicking/tapping it anywhere.\n\n",

            "BIG ROAD\n",
            "In the BIG ROAD, the result of the earliest round is recorded in the upper left corner.\n\n" +
            "A new column is created each time the Dragon's winning streak changes in favour of the Tiger, or vice versa.\n\n" +
            "A cell outlined in red indicates a Dragon win. A cell outlined in yellow indicates a Tiger win.\n\n" +
            "A Tie is recorded as a green line through the cell for the preceding round. If the first round is a Tie, the green line will appear first, and the red or yellow outline will appear around the line once the Dragon or Tiger wins a round.\n\n" +
            "If there are two or more consecutive tie rounds, the number on line will show the number of ties.\n\n",

            "DERIVED ROADS\n",
            "For the true Dragon Tiger enthusiast, the Big Eye Road, Small Road and Cockroach Road are included to display patterns derived from past results recorded in the BIG ROAD. The Big Eye Road uses outlined circles, the Small Road uses solid circles, and the Cockroach road uses slashes. However, in these derived roads, the colours red and yellow do not correspond to Dragon and Tiger wins, and there is no way to discern ties. In derived roads, red entries are a sign of repetition, whereas yellow entries signal a more erratic, \"choppy\" shoe.\n\n",

            "The derived roads do not start at the very beginning of the shoe. They start with the hand following the first hand in the second, third and fourth columns of the BIG ROAD. Once a derived road starts, an additional red or yellow symbol is added after every round.\n\n",
            
            "SHOE STATISTICS\n",
            "The following statistics based on the current shoe are displayed for you:\n\n" +
            "# - The number of completed rounds thus far.\n\n" +
            "Dragon - The number of Dragon wins thus far.\n\n" +
            "Tiger - The number of Tiger wins thus far.\n\n" +
            "Tie - The number of Tie rounds thus far.\n\n",

            "ROAD PROBING TABLE\n",
            "The Road PROBING Table displays the icon that will be added to the three derived roads if the next round is won by the Dragon or the Tiger. Click the Dragon (D) or Tiger (T) button to see the icon that will be added in the roads if the next round is won by the Dragon or the Tiger.\n\n",
        ];



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
        var shuffling = "Game-play continues until the cut card is dealt. Subsequently, the cards are shuffled by a dealer or a shuffler.\n\n" +
            "If a shuffle table is available, then two shoes with two sets of playing cards are used at the table. In this case, the dealer swaps the shoes, and the shuffle is performed by a shuffler at the shuffling table while the dealer continues to host the game round.\n\n";

        var MoreGames = "The LOBBY button (if applicable) can be selected at any time from any game..\n\n" +
            "\n\n\n\n" +
            "It allows you to easily change game table or select any other live game. You will not be removed from this table until you have actually selected the new table you wish to join. You can use the LIVE LOBBY to browse other games while still playing at your current table.\n\n";
        var Home = "The HOME button in the MENU (if applicable) will take you back to the website homepage.\n\n";


        this.disc = [];
        this.disc.push(this.loadText(gameObjective));
        this.disc.push(this.loadText(gameRulestxt));
        this.disc.push(this.loadText(payouts));
        this.disc.push(this.loadText(return2players));
        this.disc.push(this.loadText(placeBets));
        this.disc.push(this.loadText(betStatistics));
        this.disc.push(this.loadText(chattxt));
        this.disc.push(this.loadText(scoreboards));
        this.disc.push(this.loadText(gamenumber));
        this.disc.push(this.loadText(gamehistory));
        this.disc.push(this.loadText(setting));
        this.disc.push(this.loadText(ErroHandling));
        this.disc.push(this.loadText(disconnection));
        this.disc.push(this.loadText(shuffling));
        this.disc.push(this.loadText(MoreGames));
        this.disc.push(this.loadText(Home));




        this.disc[2].allHeight = this.disc[2].height;
        for (let i = 0; i < payoutsBET.length; i++) {
            var text = this.loadText(payoutsBET[i], 5, this.disc[2].allHeight);
            this.disc[2].addChild(text);
            var text = this.loadText(payoutsPAYS[i], 155, this.disc[2].allHeight);
            this.disc[2].addChild(text);
            this.disc[2].allHeight += 38;
        }
        var text = this.loadText(payoutsArr, 0, this.disc[2].allHeight + 10);
        this.disc[2].addChild(text);
        this.disc[2].allHeight += (text.height - this.disc[2].height);



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

        // this.graphics.beginFill(colorPLACEGreen); //green
        // this.graphics.drawRect(74, y+this.disc[i].height -6, 450, 30);

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






        

        var obj = loadRolletSprite(basepath + "repeatchild.svg", 50, this.disc[4].allHeight, 0.91);
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[1], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeat.svg", 50, this.disc[4].allHeight, 0.91);//
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[2], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "undo.svg", 50, this.disc[4].allHeight, 0.91);//
        this.disc[4].addChild(obj);
        this.disc[4].allHeight += 50;

        var text = this.loadText(placeBetsArr[3], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;

        var text = this.loadText(placeBetsArr[4], 0, this.disc[4].allHeight);
        this.disc[4].addChild(text);
        this.disc[4].allHeight += text.height;
        this.disc[4].allHeight -= this.disc[4].height;


        var obj = loadRolletSprite(basepath + "help/chaticon.png", 65, 80, 1.0);//HIstory icon
        this.disc[6].addChild(obj);
        this.disc[7].allHeight = this.disc[7].height;
        var arrs = ["bead_road", "big_road", "derived_road", "shoe_statistics"];
        // this.graphicsTop.addChild(this.loadText2("BALANCE", { fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 20, 2));
        var text = this.loadText2(scoreboardsArr[0], { fill: colorDTYellow, fontSize: 20, fontWeight: "bold" }, 0, this.disc[7].allHeight);
        this.disc[7].addChild(text);
        this.disc[7].allHeight += text.height;

        var text = this.loadText(scoreboardsArr[1], 0, this.disc[7].allHeight);
        this.disc[7].addChild(text);
        this.disc[7].allHeight += text.height;
        var next = 2;
        for (let i = 0; i < betStatisticsArr.length; i++) {
            var obj = this.loadSprite(basepath + "help/" + arrs[i] + ".png", 5, this.disc[7].allHeight - 20, 1);//
            this.disc[7].addChild(obj);
            this.disc[7].allHeight += obj.height;

            if(i==2){
                var text = this.loadText(scoreboardsArr[next + i], 0, this.disc[7].allHeight);
                this.disc[7].addChild(text);
                this.disc[7].allHeight += text.height;
                next++;
            }
            {
                var text = this.loadText2(scoreboardsArr[next + i], { fill: colorDTYellow, fontSize: 18, fontWeight: "bold" }, 0, this.disc[7].allHeight);
                this.disc[7].addChild(text);
                this.disc[7].allHeight += text.height;
                next++;
            }
            var text = this.loadText(scoreboardsArr[next + i], 0, this.disc[7].allHeight);
            this.disc[7].addChild(text);
            this.disc[7].allHeight += text.height;
            // if(i==1){
            //     next++;
            //     var text = this.loadText2(scoreboardsArr[next + i], { fill: colorDTYellow, fontSize: 20, fontWeight: "bold" }, 0, this.disc[7].allHeight);
            //     this.disc[7].addChild(text);
            //     this.disc[7].allHeight += text.height;
            //     next++;
            //     var text = this.loadText(scoreboardsArr[next + i], 0, this.disc[7].allHeight);
            //     this.disc[7].addChild(text);
            //     this.disc[7].allHeight += text.height;
            // }
        }



        var obj = this.loadSprite(basepath + "help/road_probing_table.png", 5, this.disc[7].allHeight - 20, 1);//
        this.disc[7].addChild(obj);
        this.disc[7].allHeight += obj.height;

        this.disc[7].allHeight -= this.disc[7].height;


        var obj = loadRolletSprite(basepath + "help/history.png", 65, 80, 1.0);//HIstory icon
        this.disc[9].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/setting.png", 65, 150, 1.0);//Setting Icon
        this.disc[10].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/lobby.png", 65, 80, 1.0);//Lobby Icon
        this.disc[14].addChild(obj);

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
        this.graphicsTop.addChild(this.loadText("HELP - DRAGON TIGER", 200, 65));
        this.graphicsTop.addChild(this.loadText2("BALANCE", { fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 20, 2));
    }
    onClick(e) {
        console.log("help e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "close":
                mDragonTigerHelp.speed = 30;
                mDragonTigerHelp.mainContainer.x = 1;
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
                    if (i == 2 || i == 4 || i == 7) {
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

                if (i == 4 || i == 7) {
                    y += this.disc[i].allHeight;
                }
                if (i == 2) {

                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y - 10, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let j = 0; j < 6; j++) {
                        this.graphics.drawRect(55, y + 30 + j * 38, app.screen.width - 60, 38);
                    }

                    this.graphics.drawRect(200, y - 10, 1, 268);

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
    //Load Sprite common function for rolette table
    loadSprite(str, x, y, s) {
        let sprite = new Sprite(resources[str].texture);
        sprite.position.set(x, y);
        sprite.scale.set(s, s);
        // sprite.anchor.set(0.5, 0.5);
        return sprite;
    }
}