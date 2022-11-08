
//Menu Slide

class RouletteHelp {
    constructor() {
        this.mainContainer = new PIXI.Container();//Create Container for PokerHelp object
        this.container = new PIXI.Container();//Create Container for PokerHelp object
        this.graphics = new PIXI.Graphics();//Showing number and cards 
        this.container.addChild(this.graphics);
        this.mainContainer.addChild(this.container);
        this.titles = [];
        this.titles.push(this.loadText('Game Rules'));
        this.titles.push(this.loadText('Bet betes'));
        this.titles.push(this.loadText('Neighbour Bets'));
        this.titles.push(this.loadText('Favourite & Special Bets'));
        this.titles.push(this.loadText('Winning Numbers'));
        this.titles.push(this.loadText('Statistics'));
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

        var gameRulestxt = "The objective in ROULETTE is to predict the number on which the ball will land by placing one or more bets that cover that particular number. The wheel in European Roulette includes the numbers 1-36 plus a single 0 (zero).\n\n" +
            "After betting time has expired, the ball is spun within the roulette wheel. The ball will eventually come to rest in one of the numbered pockets within the wheel. You win if you have placed a bet that covers that particular number.\n\n";

        var BetTypes = "You can place many different kinds of bets on the Roulette table. Bets can cover a single number or a certain range of numbers, and each type of bet has its own payout rate.\n\n" +
            "Bets that are made on the numbered space or on the lines between them are called Inside Bets, while the bets made on the special boxes below and to the left of the board are called Outside Bets.\n\n" +
            "\n\n" +
            "INSIDE BETS:\n\n" +
            " * Straight Up - place your chip directly on any single number (including zero).\n\n" +
            " * Split Bet - place your chip on the line between any two numbers, either on the vertical or horizontal.\n\n" +
            " * Street Bet - place your chip at the end of any row of numbers. A Street Bet covers three numbers.\n\n" +
            " * Corner Bet - place your chip at the corner where four numbers meet. All four numbers are covered.\n\n" +
            " * Five Bet - place your chip on the outer boundary line of the betting grid between 0 and 1 (at the point where the bottom-right corner of the number 0 meets the bottom-left corner of the number one). A Five Bet covers five numbers: 0, 00, 1, 2 and 3.\n\n" +
            " * Line Bet - place your chip at the end of two rows on the intersection between them. A line bet covers all the numbers in both rows, for a total of six numbers.\n\n" +
            "\n\n" +
            "OUTSIDE BETS:\n\n" +
            " * Column Bet - place your chip in one of the boxes marked \"2 to 1\" at the end of the column that covers all 12 numbers in that column. The zero is not covered by any column bet.\n\n" +
            " * Dozen Bet - place your chip in one of the three boxes marked \"1st 12,\" \"2nd 12\" or \"3rd 12\" to cover the 12 numbers alongside the box.\n\n" +
            " * Red/Black - place your chip in the Red or Black box to cover the 18 red or 18 black numbers. The zero is not covered by these bets.\n\n" +
            " * Even/Odd - place your chip in one of these boxes to cover the 18 even or 18 odd numbers. The zero is not covered by these bets.\n\n" +
            " * 1-18/19-36 - place your chip in either of these boxes to cover the first or second set of 18 numbers. The zero is not covered by these bets.\n\n" +
            " * Column Bet - place your chip in one of the unlabelled boxes at the end of the respective column that covers all 12 numbers in that column. The zero is not covered by any column bet.\n\n" +
            " * Dozen Bet - place your chip in one of the three boxes marked \"12p,\" \"12m\" or \"12d\" to cover the 12 numbers alongside the box.\n\n" +
            " * Red/Black - place your chip in the Red or Black box to cover the 18 red or 18 black numbers. The zero is not covered by these bets.\n\n" +
            " * Even/Odd - place your chip in one of these boxes to cover the 18 even or 18 odd numbers. The zero is not covered by these bets.\n\n" +
            " * 1-18/19-36 - place your chip in either of these boxes to cover the first or second set of 18 numbers. The zero is not covered by these bets.\n\n" +
            " * Column Bet - place your chip in one of the boxes marked \"2 to 1\" at the end of the column that covers all 12 numbers in that column. The zero and double zero is not covered by any column bet.\n\n" +
            " * Dozen Bet - place your chip in one of the three boxes marked \"1st 12,\" \"2nd 12\" or \"3rd 12\" to cover the 12 numbers alongside the box.\n\n" +
            " * Red/Black - place your chip in the Red or Black box to cover the 18 red or 18 black numbers. The zero and double zero is not covered by these bets.\n\n" +
            " * Even/Odd - place your chip in one of these boxes to cover the 18 even or 18 odd numbers. The zero and double zero is not covered by these bets.\n\n" +
            " * 1-18/19-36 - place your chip in either of these boxes to cover the first or second set of 18 numbers. The zero and double zero is not covered by these bets.\n\n\n" +
            "After the bets are closed the randomly selected  lucky numbers with their lucky payouts will be highlighted on the betting grid.\n\n";




        var NeighbourBets = "Click the NEIGHBOUR BETS button to view a special oval-shaped betting area that allows you to more easily place neighbour bets and other special bets. Re-click the button to close/re-open this feature.\n\n";
        var NeighbourBetsArr = ["Each bet covers a different set of numbers and offers different payout odds. Bet spots will be highlighted.\n\n",

            "Tiers du Cylindre\n\n" +
            "This bet covers a total of twelve numbers that include 27, 33 and the numbers that lie between them on the side of the roulette wheel opposite to zero. 6 chips are placed as follows:\n\n" +
            " * 1 chip on the 5/8 split\n\n" +
            " * 1 chip on the 10/11 split\n\n" +
            " * 1 chip on the 13/16 split\n\n" +
            " * 1 chip on the 23/24 split\n\n" +
            " * 1 chip on the 27/30 split\n\n" +
            " * 1 chip on the 33/36 split\n\n" +

            "Orphelins a Cheval\n\n" +
            "This bet covers a total of eight numbers on the two segments of the roulette wheel not covered by the voisins du zero and tiers du cylindre bets above. 5 chips are placed as follows:\n\n" +
            " * 1 chip on 1 (straight Up)\n\n" +
            " * 1 chip on the 6/9 split\n\n" +
            " * 1 chip on the 14/17 split\n\n" +
            " * 1 chip on the 17/20 split\n\n" +
            " * 1 chip on the 31/34 split\n\n" +


            "Voisins du Zero\n\n" +
            "This bet covers a total of seventeen numbers that include 22, 25 and the numbers that lie between them on the side of the roulette wheel that contains zero. 9 chips are placed as follows:\n\n" +
            " * 2 chips on the 0/2/3 street\n\n" +
            " * 1 chip on the 4/7 split\n\n" +
            " * 1 chip on the 12/15 split\n\n" +
            " * 1 chip on the 18/21 split\n\n" +
            " * 1 chip on the 19/22 split\n\n" +
            " * 2 chips on the 25/26/28/29 corner\n\n" +
            " * 1 chip on the 32/35 split\n\n" +

            "Jeu Zero\n\n" +
            "This bet covers zero and the six numbers in close proximity to zero on the roulette wheel: 12, 35, 3, 26, 0, 32 and 15. 4 chips are placed as follows:\n\n" +
            " * 1 chip on the 0/3 split\n\n" +
            " * 1 chip on the 12/15 split\n\n" +
            " * 1 chip on 26 (straight up)\n\n" +
            " * 1 chip on the 32/35 split\n\n" +

            "A neighbour bet covers a particular number as well as other numbers that lie in close proximity to it on the Roulette wheel. To place a neighbour bet, click/tap a specific number on the racetrack. A chip will be placed on the chosen number and on numbers that neighbour it to the right and left.\n\n"];



        var FavouriteSpecialBets = "The optional Favourite Bets feature allows you to save a preferred bet or combination of different types of bets for easier placement in future rounds at any roulette table. You can save and edit a list of up to 15 of your favourite bets under different names.\n\n" +
            "SAVE A FAVOURITE BET\n\n" +
            "To open the Favourite Bets menu, tap the FAVOURITE BETS button.\n\n";

        var FavouriteSpecialBetsArr = ["After you have placed a favourite bet or combination of bets on the roulette table, tap the SAVE LAST BET link in the Favourite Bets menu. A default name for this bet will be suggested. You can then save and add this bet to your list of favourite bets by tapping the SAVE button or by pressing â€œEnterâ€ on your keyboard.\n\n",

            "PLACE A FAVOURITE BET\n\n" +
            "When you wish to place a favourite bet during the betting phase of a roulette round, open the Favourite Bets menu to view a list of all bets you previously saved.They will be listed in chronological order, with the favourite bet you saved earliest listed first.Tap the name of each desired bet to place it.You can also multiply(double, triple, quadruple...) the amount of any favourite bet you have placed by tapping its name more than once.\n\n" +
            "RENAME OR DELETE A FAVOURITE BETS\n\n" +
            "When the Favourite Bets menu is open, you can tap the EDIT button to delete or rename any listed bet.\n\n",

            "You can then enter a new name and save it by tapping the SAVE button or by pressing â€œEnterâ€ on your keyboard.\n\n" +
            "Delete any bet you no longer wish to keep in your list of favourite bets by tapping DELETE button.\n\n",

            "SPECIAL BETS\n\n" +
            "Under the second tab in Favourite Bets, you can more easily place Finale en plein and Finale a Cheval bets.\n\n" +
            "Finale en Plein\n\n" +
            " * Finale en plein 0 - 4-chip bet covers 0+10+20+30, each with 1 chip\n\n" +
            " * Finale en plein 0 - 5-chip bet covers 0+00+10+20+30, each with 1 chip\n\n" +
            " * Finale en plein 1 - 4-chip bet covers 1+11+21+31, each with 1 chip\n\n" +
            " * Finale en plein 2 - 4-chip bet covers 2+12+22+32, each with 1 chip\n\n" +
            " * Finale en plein 3 - 4-chip bet covers 3+13+23+33, each with 1 chip\n\n" +
            " * Finale en plein 4 - 4-chip bet covers 4+14+24+34, each with 1 chip\n\n" +
            " * Finale en plein 5 - 4-chip bet covers 5+15+25+35, each with 1 chip\n\n" +
            " * Finale en plein 6 - 4-chip bet covers 6+16+26+36, each with 1 chip\n\n" +
            " * Finale en plein 7 - 3-chip bet covers 7+17+27, each with 1 chip\n\n" +
            " * Finale en plein 8 - 3-chip bet covers 8+18+28, each with 1 chip\n\n" +
            " * Finale en plein 9 - 3-chip bet covers 9+19+29, each with 1 chip\n\n" +
            "Finale a Cheval\n\n" +
            " * Finale a cheval 0/3 - 4-chip bet covers 0/3+10/13+20/23+30/33, each with 1 chip\n\n" +
            " * Finale a cheval 0/3 - 5-chip bet covers 0+00/3+10/13+20/23+30/33, each with 1 chip\n\n" +
            " * Finale a cheval 1/4 - 4-chip bet covers 1/4+11/14+21/24+31/34, each with 1 chip\n\n" +
            " * Finale a cheval 2/5 - 4-chip bet covers 2/5+12/15+22/25+32/35, each with 1 chip\n\n" +
            " * Finale a cheval 3/6 - 4-chip bet covers 3/6+13/16+23/26+33/36, each with 1 chip\n\n" +
            " * Finale a cheval 4/7 - 4-chip bet covers 4/7+14/17+24/27+34, each with 1 chip\n\n" +
            " * Finale a cheval 5/8 - 4-chip bet covers 5/8+15/18+25/28+35, each with 1 chip\n\n" +
            " * Finale a cheval 6/9 - 4-chip bet covers 6/9+16/19+26/29+36, each with 1 chip\n\n" +
            " * Finale a cheval 7/10 - 3-chip bet covers 7/10+17/20+27/30, each with 1 chip\n\n" +
            " * Finale a cheval 8/11 - 3-chip bet covers 8/11+18/21+28/31, each with 1 chip\n\n" +
            " * Finale a cheval 9/12 - 3-chip bet covers 9/12+19/22+29/32, each with 1 chip\n\n" +
            "Complete Bets\n\n" +
            "A Complete Bet places all of the inside bets on a specific number.\n\n" +
            "For example, a Complete Bet on number 36 will place 18 chips to completely cover it, as follows: 1 chip on Straight-up 36, 2 chips on each of Split bets 33/36 and 35/36, 3 chips on Street bet 34/35/36, 4 chips on 32/33/35/36 Corner bet and 6 chips on Line bet 31/32/33/34/35/36.\n\n",
        ];

        var WinningNumbers = "The WINNING NUMBERS display shows the most recent winning numbers.\n\n\n\n\n" +
            "Black numbers appear in white, and red numbers appear in red.\n\n";
        var WinningNumbersArr = ["14", " 2", "27", " 0", "35", "18", "10", " 5", "13", "23"];
        var Statistics = "Tapping on the STATISTICS button shows you the last 500 spins and the relevant results in a graphical way.\n\n";

        var payouts = "Your payout depends on the type of placed bet\n\nINSIDE BETS\n\n";
        var payoutsINbat = [
            "BET TYPE    ",
            "Straight Up ",
            "Split       ",
            "Street      ",
            "Corner      ",
            "Five        ",
            "Line        ",
        ];
        var payoutsINpay = [
            "PAYOUT",
            "35:1",
            "17:1",
            "11:1",
            "8:1",
            "6:1",
            "5:1",
        ];
        var payoutsOUTbat = [
            "BET TYPE	",
            "Column	    ",
            "Dozen	    ",
            "Red/Black	",
            "Even/Odd	",
            "1-18/19-36	",
        ];
        var payoutsOUTpay = [
            "PAYOUT",
            "2:1",
            "2:1",
            "1:1",
            "1:1",
            "1:1",
        ]

        var return2players = "The optimal theoretical return-to-player percentage is 97.30%.\n\n";
        var placeBets = "The BET LIMITS panel shows the minimum and maximum allowed bet limits at the table, which may change from time to time. Open the Bet Limits to check your current limits.\n\n" +
            "Immersive Roulette\n\n" +
            "€ 1 - 1,000\n\n" +
            "To participate in the game, you must have sufficient funds to cover your bets. You can see your current BALANCE on your screen.\n\n" +
            "BALANCE € 100,000.00\n\n" +
            "The TRAFFIC LIGHTS tell you the current status in the game round by informing you of when you can bet (GREEN light), when the betting time is nearly over (YELLOW light), and when betting time has expired (RED light).\n\n" ;
            // "PLACE YOUR BETS\n\n" +
            // "The CHIP DISPLAY allows you to select the value of each chip you wish to bet. Only chips of denominations that can be covered by your current balance will be enabled.\n\n";





        var placeBetsArr = [
            "Once you have selected a chip, place your bet by simply clicking/tapping the appropriate betting spot on the game table. Each time you click/tap the betting spot, the amount of your bet increases by the value of the selected chip or up to the maximum limit for the type of bet you have selected. Once you have bet the maximum limit, no additional funds will be accepted for that bet, and a message will appear above your bet to notify you that you have bet the maximum.\n\n" +
            "NOTE: Please do not minimise your browser or open any other tab in your browser while betting time remains and you have placed bets on the table. Such actions may be interpreted as leaving the game, and your bets will therefore be declined for that particular game round.\n\n" +
            "The SPIN NOW button allows you and your fellow players to avoid the wait for the normal betting time period to expire. Having placed your bet, you can click/tap the SPIN NOW button. The spin of the wheel will start as soon as all the players at that table have clicked/tapped the SPIN NOW button. When there are more than a certain number of players at the table, the SPIN NOW button is not visible and the wheel is only spun when the normal betting time period has expired.\n\n",

            "SPIN NOW\n\n" +
            "The DOUBLE (2x) button becomes available after you have placed any bet. Each click/tap doubles all your bets up to the maximum limit. Note that you must have a sufficient account balance to double ALL your placed bets.\n\n",

            "The REPEAT button allows you to repeat all bets from the previous game round. This button is available only before the first chip is placed.\n\n",

            "The UNDO button removes the last bet you placed.\n\n",

            "You can click/tap the UNDO button repeatedly to remove bets, one by one, in the reverse order of which they were placed. You can clear all your bets by holding the UNDO button.\n\n" +
            "The TOTAL BET indicator displays the total amount of all bets placed in the current round.\n\n" ,
            "TOTAL BET € 500.00\n\n",

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
        this.disc.push(this.loadText(gameRulestxt));
        this.disc.push(this.loadText(BetTypes));
        this.disc.push(this.loadText(NeighbourBets));
        this.disc.push(this.loadText(FavouriteSpecialBets));
        this.disc.push(this.loadText(WinningNumbers));
        this.disc.push(this.loadText(Statistics));
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
        var obj = loadRolletSprite(basepath + "svg/ovalselect.svg", 55, this.disc[2].allHeight, 1);
        this.disc[2].addChild(obj);
        this.disc[2].allHeight += 50;
        var text = this.loadText(NeighbourBetsArr[0], 0, this.disc[2].allHeight);
        this.disc[2].addChild(text);
        this.disc[2].allHeight += text.height + 80;

        var obj = loadRolletSprite(basepath + "help/oval.png", 230, this.disc[2].allHeight-40, 1);
        // obj.rotation = Math.PI / 2;
        this.disc[2].addChild(obj);
        this.disc[2].allHeight += obj.height * .3;

        var text = this.loadText(NeighbourBetsArr[1], 0, this.disc[2].allHeight);
        this.disc[2].addChild(text);
        this.disc[2].allHeight += text.height - this.disc[2].height;


        var i = 0;
        this.disc[3].allHeight = this.disc[3].height;
        this.disc[3].addChild(loadRolletSprite(basepath + "help/star.png", 50, this.disc[3].allHeight + 5, 1.0));
        this.disc[3].allHeight += 50;
        var text = this.loadText(FavouriteSpecialBetsArr[0], 0, this.disc[3].allHeight);
        this.disc[3].addChild(text);
        this.disc[3].allHeight += text.height;
        this.disc[3].addChild(loadRolletSprite(basepath + "help/right.png", 50, this.disc[3].allHeight + 5, 1.0));
        this.disc[3].allHeight += 50;
        var text = this.loadText(FavouriteSpecialBetsArr[1], 0, this.disc[3].allHeight);
        this.disc[3].addChild(text);
        this.disc[3].allHeight += text.height;

        this.disc[3].addChild(loadRolletSprite(basepath + "help/pencil.png", 50, this.disc[3].allHeight + 5, 1.0));
        this.disc[3].allHeight += 50;
        var text = this.loadText(FavouriteSpecialBetsArr[2], 0, this.disc[3].allHeight);
        this.disc[3].addChild(text);
        this.disc[3].allHeight += text.height;
        this.disc[3].addChild(loadRolletSprite(basepath + "help/recycle.png", 50, this.disc[3].allHeight + 5, 1.0));
        this.disc[3].allHeight += 50;
        var text = this.loadText(FavouriteSpecialBetsArr[3], 0, this.disc[3].allHeight);
        this.disc[3].addChild(text);
        this.disc[3].allHeight += text.height + 50 - this.disc[3].height;


        for (let i = 0; i < WinningNumbersArr.length; i++) {
            var txt = this.loadText(WinningNumbersArr[i], 30 + i * 30, 65);
            this.disc[4].addChild(txt);
            if (i == 3)
                txt.tint = 0x00FF00;
            if (i == 2 || i == 5 || i == 7 || i == 9)
                txt.tint = 0xff0000;
        }


        this.disc[6].allHeight = this.disc[6].height;
        for (let i = 0; i < payoutsINbat.length; i++) {
            var text = this.loadText(payoutsINbat[i], 10, this.disc[6].allHeight);
            this.disc[6].addChild(text);
            var text = this.loadText(payoutsINpay[i], 350, this.disc[6].allHeight);
            this.disc[6].addChild(text);
            this.disc[6].allHeight += 38;
        }
        var text = this.loadText("OUTSIDE BETS", 0, this.disc[6].allHeight + 10);
        this.disc[6].addChild(text);
        this.disc[6].allHeight += 50;
        for (let i = 0; i < payoutsOUTbat.length; i++) {
            var text = this.loadText(payoutsOUTbat[i], 10, this.disc[6].allHeight);
            this.disc[6].addChild(text);
            var text = this.loadText(payoutsOUTpay[i], 350, this.disc[6].allHeight);
            this.disc[6].addChild(text);
            this.disc[6].allHeight += 38;

        }
        var text = this.loadText("Malfunction voids all bets and payouts.", 0, this.disc[6].allHeight + 10);
        this.disc[6].addChild(text);



        
        this.disc[8].allHeight = this.disc[8].height;
        var text = loadRolletText({
            dropShadow: true, dropShadowColor: 'rgba(0, 0, 0, 1)', dropShadowBlur: 2, dropShadowAngle: Math.PI / 4, dropShadowDistance: 2,
            fill: "#fafafa", fontSize: 21, fontWeight: "normal"
          },"PLACE YOUR BETS\n");
        text.position.set( 150, this.disc[8].allHeight-3);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var text = this.loadText("The CHIP DISPLAY allows you to select the value of each chip you wish to bet. Only chips of denominations that can be covered by your current balance will be enabled.", 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;
        this.disc[8].allHeight += 150;



        for (var i = 0; i < 6; i++) {
            var obj = loadRolletSprite(basepath + "svg/" + i + ".svg", 20 + i * 40, 180, .25);//
            obj.x = 200 - Math.sin((90 + i * 36) * (Math.PI / 180)) * 120;//set horizontal direction for flying coin open
            obj.y = this.disc[8].allHeight + Math.cos((90 + i * 36) * (Math.PI / 180)) * 120;//set verticle direction for flying coin open
            this.disc[8].addChild(obj);
        }

        var obj = loadRolletSprite(basepath + "help/glow.png", 200, this.disc[8].allHeight, 1.51);//
        this.disc[8].addChild(obj);
        var obj = loadRolletSprite(basepath + "svg/" + 3 + ".svg", 200, this.disc[8].allHeight, .3);//
        this.disc[8].addChild(obj);
        this.disc[8].allHeight += 100;

        var text = this.loadText(placeBetsArr[0], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var text = this.loadText(placeBetsArr[1], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeatchild.svg", 50, this.disc[8].allHeight, 0.91);
        this.disc[8].addChild(obj);
        this.disc[8].allHeight += 50;

        var text = this.loadText(placeBetsArr[2], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeat.svg", 50, this.disc[8].allHeight, 0.91);//
        this.disc[8].addChild(obj);
        this.disc[8].allHeight += 50;

        var text = this.loadText(placeBetsArr[3], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "undo.svg", 50, this.disc[8].allHeight, 0.91);//
        this.disc[8].addChild(obj);
        this.disc[8].allHeight += 50;

        var text = this.loadText(placeBetsArr[4], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;

        var text = this.loadText(placeBetsArr[5], 0, this.disc[8].allHeight);
        this.disc[8].addChild(text);
        this.disc[8].allHeight += text.height;


        this.disc[8].allHeight -= this.disc[8].height;







        this.disc[9].allHeight = this.disc[9].height;
        this.disc[9].addChild(loadRolletSprite(basepath + "help/autoplay.svg", 50, this.disc[9].allHeight + 5, 0.7));
        this.disc[9].allHeight += 50;
        var text = this.loadText(autoPlayArr[0], 0, this.disc[9].allHeight);
        this.disc[9].addChild(text);
        this.disc[9].allHeight += text.height;
        this.disc[9].addChild(loadRolletSprite(basepath + "help/autoplay1.png", 50, this.disc[9].allHeight + 5, 0.7));
        this.disc[9].allHeight += 50;
        var text = this.loadText(autoPlayArr[1], 0, this.disc[9].allHeight);
        this.disc[9].addChild(text);
        this.disc[9].allHeight += text.height;

        var text = this.loadText(autoPlayArr[2], 0, this.disc[9].allHeight);
        this.disc[9].addChild(text);
        this.disc[9].allHeight += text.height;
        var text = this.loadText(autoPlayArr[3], 0, this.disc[9].allHeight);
        this.disc[9].addChild(text);
        this.disc[9].allHeight += text.height + 50 - this.disc[9].height;










        var obj = loadRolletSprite(basepath + "help/chaticon.png", 65, 80, 1.0);//HIstory icon
        this.disc[10].addChild(obj);
        var obj = loadRolletSprite(basepath + "help/history.png", 65, 80, 1.0);//HIstory icon
        this.disc[12].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/setting.png", 65, 150, 1.0);//Setting Icon
        this.disc[13].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/lobby.png", 65, 80, 1.0);//Lobby Icon
        this.disc[16].addChild(obj);

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
        this.graphicsTop.addChild(this.loadText("HELP - ROULETTE", 200, 65));
        this.graphicsTop.addChild(this.loadText2("BALANCE", { fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 20, 2));
    }
    onClick(e) {
        console.log("help e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "close":
                mRouletteHelp.speed = 30;
                mRouletteHelp.mainContainer.x = 1;
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
                    if (i == 2 || i == 3 || i == 6 || i == 8|| i == 9) {
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
            // console.log(this.minScroll + "    " + this.scroll);
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
                   
                    this.graphics.beginFill(0x222222); //green
                    this.graphics.drawRect(84, y + 58, 301, 30);
                    this.graphics.beginFill(0xff0000); //green
                    this.graphics.drawRect(84, y + 58, 30, 30);
                }
                if(i == 8){
                    this.graphics.beginFill(colorPLACEGreen); //green
                    this.graphics.drawRect(74, y+this.disc[i].height -6, 450, 30);
                    
                    this.graphics.beginFill(0x222222); //green
                    this.graphics.drawRect(54, y + this.disc[8].getChildAt(this.disc[8].children.length-1).y-6, 170, 30);
                }
                y += this.disc[i].height;

                if (i == 2 || i == 3 || i == 8 || i == 9) {
                    y += this.disc[i].allHeight;
                }
                if (i == 6) {

                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y - 10, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let j = 0; j < 6; j++) {
                        this.graphics.drawRect(55, y + 30 + j * 38, app.screen.width - 60, 38);
                    }
                    this.graphics.drawRect(300, y - 10, 1, 267);


                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y + 305, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let j = 0; j < 5; j++) {
                        this.graphics.drawRect(55, y + 345 + j * 38, app.screen.width - 60, 38);
                    }
                    this.graphics.drawRect(300, y + 305, 1, 228);
                    y += this.disc[6].allHeight;
                }


            }
            i++;
        });
        this.minScroll = -y + 700;
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