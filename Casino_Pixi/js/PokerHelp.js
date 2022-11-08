
//Menu Slide
const style = new PIXI.TextStyle({ fill: "#fafafa", fontSize: 16, fontWeight: "normal", wordWrap: true, wordWrapWidth: 470 });
class PokerHelp {
    constructor() {
        this.mainContainer = new PIXI.Container();//Create Container for PokerHelp object
        this.container = new PIXI.Container();//Create Container for PokerHelp object
        this.graphics = new PIXI.Graphics();//Showing number and cards 
        this.container.addChild(this.graphics);
        this.mainContainer.addChild(this.container);
        this.titles = [];
        this.titles.push(this.loadText('Game Rules'));
        this.titles.push(this.loadText('Side betes'));
        this.titles.push(this.loadText('Winning Hands'));
        this.titles.push(this.loadText('Game Outcomes and Payouts'));
        this.titles.push(this.loadText('Return to Player'));
        this.titles.push(this.loadText('Place Bets'));
        this.titles.push(this.loadText('Make a Decision'));
        this.titles.push(this.loadText('Decision Statistics'));
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

        var gameRulestxt = "Casino Hold'em is played with one standard 52 card deck (Jokers are excluded). Only one game is played with one deck of cards, and cards are shuffled after each game round.\n\n" +
            "The aim of Casino Hold'em is to beat the dealer's hand by getting the best possible five-card hand, made out of the two cards dealt to the player and five community cards.\n\n" +
            "An unlimited number of players can play simultaneously at one Casino Hold'em table. Each player can take only one seat by the table.\n\n" +
            "Casino Hold'em is played with one standard 52 card deck (Jokers are excluded). Only one game is played with one deck of cards, and cards are shuffled after each game round.\n\n" +
            "To play the game you place a bet on the <b>Ante bet</b> (initial bet). To add to the excitement, you can also place a Bonus bet that pays out if a pair of Aces or higher is dealt in the first five cards.\n\n" +
            "The dealer deals out two cards face up to you and two cards face down to the dealer. Three community cards are dealt face up in the middle of the table. These three community cards are common for you and the dealer for making up the hand.\n\n" +
            "You must decide whether to PLAY or FOLD. Choose PLAY to continue the round by placing a Play bet equal to double your Ante. Choose FOLD to end the round, thereby forfeiting your Ante bet. Bonus bet is not effected by PLAY/FOLD decision. Note that you must choose PLAY to receive a payout on your Bonus bet.\n\n" +
            "After you have made your decision, the dealer will deal two more community cards (called \"Turn\" and \"River\"). The dealer will also reveal his/her two initial cards.\n\n" +
            "To find a winner, the best paying hands are formed and compared for you and for the dealer, using five out of seven available cards.\n\n";
        var sideBetsrtxt = "The Bonus bet is optional bet and cannot be placed alone. After a chip is placed on the Ante bet spot a flashing arrow will show you that the Bonus bet spot is activated. Place your Bonus bet in the same way as you place the Ante bet.\n\n" +
            "The Bonus bet is evaluated on the first hand of five cards only. If you have a Pair of Aces or better combination and you decided to Call, you will win the Bonus bet and will be paid according to Bonus pay table.\n\n";

        var winning_Hands = "The individual cards are ranked in descending order: Ace (high or low), King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3 and 2.\n\n" +
            "An Ace can be the highest value card in a Straight of A, K, Q, J, 10 or the lowest value card in a Straight of 5, 4, 3, 2, A.\n\n" +
            "Possible hands from the highest payouts to the lowest:\n\n\n\n\n\n" +
            "";
        var winning_HandsArr = ["Royal Flush is a straight flush involving the Ace, King, Queen, Jack and 10 all in the same suit.\n\n",
            "Straight Flush is a hand that contains five cards in sequence, all of the same suit, for example: Nine, Eight, Seven, Six and Five, all Hearts.\n\n",
            "Four of a Kind is a hand that contains all four cards of one rank and any other card. For example, four Aces in your hand would be Four of a Kind. Quads with higher ranking cards defeat lower ranking ones.\n\n",
            "Full House is a hand that contains three matching cards of one rank and two matching cards of another rank, e.g. three Kings and two Sixes. Between two full houses, the one with the higher ranking three cards wins.\n\n",
            "Flush is a hand where all five cards are of the same suit, but not in a sequence, e.g. five cards that are all Clubs. Two flushes are compared as if they were high card hands; the highest ranking card of each is compared to determine the winner. If both hands have the same highest card, then the second-highest ranking card is compared, and so on until a difference is found.\n\n",
            "Straight is a hand that contains five cards of sequential rank in at least two different suits, e.g. Nine, Eight, Seven, Six and Five in two or more suits. Two straights are ranked by comparing the highest card of each. Two straights with the same high card are of equal value, as suits are not used to separate them.\n\n",
            "Three of a Kind is a hand that contains three cards of the same rank, plus two cards which are not of this rank or the same as each other. For example, a player having three Kings in their hand would have Three of a Kind. Higher-valued Three of a Kind defeat lower-valued Three of a Kind. If two hands contain Three of a Kind of the same value, the Kickers are compared to break the tie.\n\n",
            "Two Pairs is the hand that contains two cards of the same rank, plus two cards of another rank(that match each other but not the first pair), plus any card not of either rank. An example of this would be having two aces and two Kins. To rank hands, both containing Two Pairs, the higher ranking pair of each is first compared, and the higher pair wins. If both hands the same top pair, then the second pair of each is compared. if both hands have the same two pairs, the kicker determines the winner.",
            "Pair is a hand that contains two cards of one rank (e.g. two Kings), plus three cards which are not of this rank or the same as each other. Pair is the lowest hand you can be paid out for. Higher ranking pairs defeat lower ranking pairs. If two hands have the same pair, the Kickers are compared in descending order to determine the winner.\n\n",
            "High Card is a high-card or no-pair hand is a poker hand made of any five cards not meeting any of the above requirements. Essentially, no hand is made, and the only thing of any meaning in the player's hand is their highest card.\n\n"];



        var playerOutcomes = "The outcomes are determined by comparing the player's and dealer's best five-card hands (combining the player/dealer two cards with the five community cards).\n\n" +
            "The dealer must have a pair of fours or higher to qualify.\n\n" +
            "Outcomes quick-reference table\n\n" +
            "The quick way to check game outcomes, whether you win, lose or tie.\n\n";
        var return2players = "The optimal theoretic percentage return to the player for the Ante bet is 97.84% and for the Bonus bet is 93.74%.\n\n";

        var placeBets = "The BET LIMITS panel shows the minimum and maximum allowed bet limits at the table, which may change from time to time. Open the Bet Limits to check your current limits.\n\n" +
            "Casino Hold'em\n\n" +
            "€ 1 - 1,000\n\n" +
            "To participate in the game, you must have sufficient funds to cover your bets. You can see your current BALANCE on your screen.\n\n" +
            "BALANCE € 100,000.00\n\n" +
            "The TRAFFIC LIGHTS tell you the current status in the game round by informing you of when you can bet (GREEN light), when the betting time is nearly over (YELLOW light), and when betting time has expired (RED light).\n\n";



        var placeBetsArr = [
            "Once you have selected a chip, place your bet by simply clicking/tapping the appropriate betting spot on the game table labelled Ante or with the side bet you desire (if applicable). Each time you click/tap the betting spot, the amount of your bet increases by the value of the selected chip or up to the maximum limit for the type of bet you have selected. Once you have bet the maximum limit, no additional funds will be accepted for that bet, and a message will appear above your bet to notify you that you have bet the maximum.\n\n" +
            "NOTE: Please do not minimise your browser or open any other tab in your browser while betting time remains and you have placed bets on the table. Such actions may be interpreted as leaving the game, and your bets will therefore be declined for that particular game round.\n\n" +
            "The DOUBLE (2x) button becomes available after you have placed any bet. Each click/tap doubles all your bets up to the maximum limit. Note that you must have a sufficient account balance to double ALL your placed bets.\n\n",

            "The REPEAT button allows you to repeat all bets from the previous game round. This button is available only before the first chip is placed.\n\n",
            "The UNDO button removes the last bet you placed.\n\n",
            "You can click/tap the UNDO button repeatedly to remove bets, one by one, in the reverse order of which they were placed. You can clear all your bets by holding the UNDO button.\n\n" +
            "The TOTAL BET indicator displays the total amount of all bets placed in the current round.\n\n" +
            "TOTAL BET € 999,999.00\n"
        ];
        var make_Decision = "After your cards have been dealt, your card combination and the \"MAKE YOUR DECISION\" window will be displayed.\n\n" +
            "PLAYER\n\n" +
            "You must decide whether to PLAY to continue the round or FOLD to end the round and forfeit your placed bets.\n\n" +
            "After your cards have been dealt, your card combination and the \"MAKE YOUR DECISION\" window will be displayed.\n\n" +
            "               PLAYER\n\n";

        var make_DecisionArr = [
            "              High Card\n\n" +
            "You must decide whether to PLAY to continue the round or FOLD to end the round and forfeit your placed bets.\n\n" +
            "MAKE YOUR DECISION\n\n\n",
            "                   PLAY 2x            FOLD\n\n" +
            "By clicking/tapping PLAY you will continue to play the game and place the Play bet. The Play bet will be placed automatically on the Play bet spot.\n\n" +
            "By clicking/tapping FOLD you will lose all bets placed, but you will still see the remainder of the game played out, but you will not participate in the game. You will need to wait until next game round to place your bets.\n\n" +
            "If decision time has expired and you have not yet made a decision to PLAY or FOLD, your hand will be automatically folded and you will lose all your bets. The betting-time indicator will display the message: AUTO FOLDED.\n\n"
        ];
        var decisionStatistics = "Show the percentage of the decision made by all the players during the current player phase\n\n";
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
        var outResult = ["Result\n\n",
            "Dealer does not qualify and you win\n\n",
            "Dealer qualifies and you win\n\n",
            "Dealer qualifies and you lose\n\n",
            "Dealer qualifies and you tie\n\n",
            "Player folds\n\n"];

        var outANT = ["ANTE\n\n",
            "Win*\n\n",
            "Win*\n\n",
            "Lose\n\n",
            "Push\n\n",
            "Lose\n\n"];
        var outPLAY = ["PLAY\n\n",
            "Push\n\n",
            " 1:1\n\n",
            "Lose\n\n",
            "Push\n\n",
            "Lose\n\n"];

        var handANTE = ["Hand\n\n",
            "Royal Flush\n\n",
            "Straight Flush\n\n",
            "Four of a Kind\n\n",
            "Full House\n\n",
            "Flush\n\n",
            "Straight\n\n",
            "Three of a Kind\n\n",
            "Two Pairs\n\n",
            "One Pair or less\n\n",
            "BONUS\n"];

        var playoutANTE = ["Payout\n\n",
            "100:1\n\n",
            " 20:1\n\n",
            " 10:1\n\n",
            "  3:1\n\n",
            "  2:1\n\n",
            "  1:1\n\n",
            "  1:1\n\n",
            "  1:1\n\n",
            "  1:1\n\n"];

        var handBonus = ["Hand\n\n",
            "Royal Flush\n\n",
            "Straight Flush\n\n",
            "Four of a Kind\n\n",
            "Full House\n\n",
            "Flush\n\n",
            "Straight\n\n",
            "Three of a Kind\n\n",
            "Two Pairs\n\n",
            "Pair of Aces\n\n",
            "Play bet payout is 1:1.\n\n",
            "Malfunction voids all pays and play.\n\n"];

        var playoutBonus = ["Payout\n\n",
            "100:1\n\n",
            " 50:1\n\n",
            " 40:1\n\n",
            " 30:1\n\n",
            " 20:1\n\n",
            "  7:1\n\n",
            "  7:1\n\n",
            "  7:1\n\n",
            "  7:1\n\n"];

        this.disc = [];
        this.disc.push(this.loadText(gameRulestxt));
        this.disc.push(this.loadText(sideBetsrtxt));
        this.disc.push(this.loadText(winning_Hands));
        this.disc.push(this.loadText(playerOutcomes));

        this.disc.push(this.loadText(return2players));
        this.disc.push(this.loadText(placeBets));
        this.disc.push(this.loadText(make_Decision));
        this.disc.push(this.loadText(decisionStatistics));

        this.disc.push(this.loadText(chattxt));
        this.disc.push(this.loadText(gamenumber));
        this.disc.push(this.loadText(gamehistory));
        this.disc.push(this.loadText(setting));
        this.disc.push(this.loadText(ErroHandling));
        this.disc.push(this.loadText(disconnection));
        this.disc.push(this.loadText(MoreGames));
        this.disc.push(this.loadText(Home));


        // mSprit_Cards.push(loadSprite_2(basepath + "cards/" + cards[i] + ".png", 100 + i * 34, 600, .25));
        var fourcards = ["C14", "D14", "H14", "S14", "D5"];
        var fullhouse = ["C13", "D13", "H13", "S6", "D6"];
        var straight = ["C9", "D8", "H7", "S6", "D5"];
        var threeking = ["C13", "D13", "H13", "S4", "D6"];
        var twopair = ["C14", "D14", "H13", "S13", "D6"];
        var pairsc = ["C13", "D13", "D12", "S9", "H8"];
        var highcard = ["H12", "C9", "S7", "H4", "D2"];
        for (var i = 0; i < 5; i++) {
            var obj = loadRolletSprite(basepath + "cards/D" + (14 - i) + ".png", 20 + i * 40, 180, .3);//Royal Fulsh
            this.disc[2].addChild(obj);

            var obj1 = loadRolletSprite(basepath + "cards/H" + (9 - i) + ".png", 20 + i * 40, 310, .3);//Strait fulsh
            this.disc[2].addChild(obj1);

            var obj2 = loadRolletSprite(basepath + "cards/" + fourcards[i] + ".png", 20 + i * 40, 460, .3);//Four of king 
            this.disc[2].addChild(obj2);

            var obj3 = loadRolletSprite(basepath + "cards/" + fullhouse[i] + ".png", 20 + i * 40, 635, .3);//full house
            this.disc[2].addChild(obj3);

            var obj4 = loadRolletSprite(basepath + "cards/C" + (12 - i * 2) + ".png", 20 + i * 40, 800, .3);//fulsh
            this.disc[2].addChild(obj4);

            var obj5 = loadRolletSprite(basepath + "cards/" + straight[i] + ".png", 20 + i * 40, 1010, .3);//Starit
            this.disc[2].addChild(obj5);

            var obj6 = loadRolletSprite(basepath + "cards/" + threeking[i] + ".png", 20 + i * 40, 1200, .3);//Three of kind
            this.disc[2].addChild(obj6);

            var obj6 = loadRolletSprite(basepath + "cards/" + twopair[i] + ".png", 20 + i * 40, 1410, .3);//Pair
            this.disc[2].addChild(obj6);
            var obj6 = loadRolletSprite(basepath + "cards/" + pairsc[i] + ".png", 20 + i * 40, 1650, .3);//Pair
            this.disc[2].addChild(obj6);
            var obj6 = loadRolletSprite(basepath + "cards/" + highcard[i] + ".png", 20 + i * 40, 1860, .3);//Pair
            this.disc[2].addChild(obj6);
        }
        i = 0;
        var pos = [225, 355, 505, 680, 845, 1055, 1245, 1455, 1695, 1905];
        winning_HandsArr.forEach(element => {
            this.disc[2].addChild(this.loadText(element, 0, pos[i]));
            i++;
        });

        var i = 0;
        var rpy = this.disc[3].height;
        outResult.forEach(element => {
            this.disc[3].addChild(this.loadText(element, 5, rpy));
            this.disc[3].addChild(this.loadText(outANT[i], 305, rpy));
            this.disc[3].addChild(this.loadText(outPLAY[i], 405, rpy));
            i++
            rpy += 38;
        });
        this.disc[3].addChild(this.loadText('*Ante bet pays according to the Ante payout table below.\n\nANTE', 0, rpy));
        rpy += 100;
        var i = 0;
        handANTE.forEach(element => {
            this.disc[3].addChild(this.loadText(element, 5, rpy));
            if (playoutANTE[i])
                this.disc[3].addChild(this.loadText(playoutANTE[i], 405, rpy));
            i++
            rpy += 38;
        });


        var i = 0;
        handBonus.forEach(element => {
            this.disc[3].addChild(this.loadText(element, 5, rpy));
            if (playoutBonus[i])
                this.disc[3].addChild(this.loadText(playoutBonus[i], 405, rpy));
            i++
            rpy += 38;
        });

        // this.disc[3].addChild(txttable);
        // txttable.position.set(6, this.disc[3].height);

        // var txttable2 = this.loadText(handANTE, 6, this.disc[3].height + txttable.height + 80);
        // txttable2.addChild(this.loadText(playoutANTE, 400, 0));
        // this.disc[3].addChild(txttable2);

        // var txttable3 = this.loadText(handBonus, 6, this.disc[3].height + txttable.height + 80 + txttable2.height);
        // txttable3.addChild(this.loadText(playoutBonus, 400, 0));
        // this.disc[3].addChild(txttable3);

        // this.gPayouts = txttable;

        this.graphics.beginFill(0x4e5e5d); //green
        this.graphics.drawRect(50, 55, app.screen.width, app.screen.height * 10);

        this.graphics.beginFill(0x4e5e5d); //green
        this.graphics.drawRect(50, 55, app.screen.width, app.screen.height);
        var y = 95;
        var i = 0;
        this.titles.forEach(element => {
            this.graphics.beginFill(0x354d4b); //green
            this.graphics.drawRect(50, y - 5, app.screen.width, element.height + 10);

            element.position.set(60, y);
            y += element.height + 10;

            this.disc[i].position.set(60, y);
            y += this.disc[i].height;
            if (i == 3) {
                y += 1000;//this.gPayouts.height * 5;
            }
            i++;
        });



        this.disc[5].allHeight = this.disc[5].height;
        var text = loadRolletText({
            dropShadow: true, dropShadowColor: 'rgba(0, 0, 0, 1)', dropShadowBlur: 2, dropShadowAngle: Math.PI / 4, dropShadowDistance: 2,
            fill: "#fafafa", fontSize: 21, fontWeight: "normal"
        }, "PLACE YOUR BETS\n");
        text.position.set(150, this.disc[5].allHeight - 3);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;

        var text = this.loadText("The CHIP DISPLAY allows you to select the value of each chip you wish to bet. Only chips of denominations that can be covered by your current balance will be enabled.", 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;
        this.disc[5].allHeight += 150;



        for (var i = 0; i < 6; i++) {
            var obj = loadRolletSprite(basepath + "svg/" + i + ".svg", 20 + i * 40, 180, .25);//
            obj.x = 200 - Math.sin((90 + i * 36) * (Math.PI / 180)) * 120;//set horizontal direction for flying coin open
            obj.y = this.disc[5].allHeight + Math.cos((90 + i * 36) * (Math.PI / 180)) * 120;//set verticle direction for flying coin open
            this.disc[5].addChild(obj);
        }

        var obj = loadRolletSprite(basepath + "help/glow.png", 200, this.disc[5].allHeight, 1.51);//
        this.disc[5].addChild(obj);
        var obj = loadRolletSprite(basepath + "svg/" + 3 + ".svg", 200, this.disc[5].allHeight, .3);//
        this.disc[5].addChild(obj);
        this.disc[5].allHeight += 100;

        var text = this.loadText(placeBetsArr[0], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;








        var obj = loadRolletSprite(basepath + "repeatchild.svg", 50, this.disc[5].allHeight, 0.91);
        this.disc[5].addChild(obj);
        this.disc[5].allHeight += 50;

        var text = this.loadText(placeBetsArr[1], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "repeat.svg", 50, this.disc[5].allHeight, 0.91);//
        this.disc[5].addChild(obj);
        this.disc[5].allHeight += 50;

        var text = this.loadText(placeBetsArr[2], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;

        var obj = loadRolletSprite(basepath + "undo.svg", 50, this.disc[5].allHeight, 0.91);//
        this.disc[5].addChild(obj);
        this.disc[5].allHeight += 50;

        var text = this.loadText(placeBetsArr[3], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;

        var text = this.loadText(placeBetsArr[4], 0, this.disc[5].allHeight);
        this.disc[5].addChild(text);
        this.disc[5].allHeight += text.height;
        this.disc[5].allHeight -= this.disc[5].height;



        for (var i = 0; i < 5; i++) {
            var obj = loadRolletSprite(basepath + "cards/" + highcard[i] + ".png", 20 + i * 40, this.disc[6].height, .3);//Royal Fulsh
            this.disc[6].addChild(obj);
        }
        var md1txt = this.loadText(make_DecisionArr[0], 0, this.disc[6].height + 45);
        this.disc[6].addChild(md1txt);
        var obj = loadRolletSprite(basepath + "2x_01.svg", 115, md1txt.height + this.disc[6].height + 45, .3);//2x
        this.disc[6].addChild(obj);
        var obj = loadRolletSprite(basepath + "2x_02.svg", 215, md1txt.height + this.disc[6].height + 45, .3);//minus
        this.disc[6].addChild(obj);
        this.disc[6].addChild(this.loadText(make_DecisionArr[1], 0, md1txt.height + this.disc[6].height + 90));

        var obj = loadRolletSprite(basepath + "help/chaticon.png", 65, 80, 1.0);//Chat Icon
        this.disc[8].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/history.png", 65, 80, 1.0);//HIstory icon
        this.disc[10].addChild(obj);

        var obj = loadRolletSprite(basepath + "help/setting.png", 65, 150, 1.0);//Setting Icon
        this.disc[11].addChild(obj);

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
        this.graphicsTop.beginFill(0x000000); //
        this.graphicsTop.drawRect(0, 0, app.screen.width + 30, 30);
        this.graphicsTop.beginFill(0x555555); //green
        this.graphicsTop.drawRect(0, 25, app.screen.width + 30, 30);
        this.graphicsTop.beginFill(0x2c3a3a); //green
        this.graphicsTop.drawRect(50, 55, app.screen.width + 30, 35);
        this.graphicsTop.addChild(this.loadText("HELP - CASINO HOLD'EM", 200, 65));
        this.graphicsTop.addChild(this.loadText2("BALANCE", { fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 20, 2));
    }
    onClick(e) {
        console.log("help e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "close":
                mPokerHelp.speed = 30;
                mPokerHelp.mainContainer.x = 1;
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
                    if (i == 2) {
                        y += 1780;
                    }
                    if (i == 3) {
                        y += 1210;//this.gPayouts.height * 5;
                    }
                    if (i == 5) {
                        y += 500;
                    }
                    if (i == 6) {
                        y += 600;
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
        this.graphics.beginFill(0x4e5e5d); //green
        this.graphics.drawRect(50, 55, app.screen.width, app.screen.height * 10);


        this.titles.forEach(element => {
            this.graphics.beginFill(0x172224); //Title back dark
            this.graphics.drawRect(50, y - 8, app.screen.width, element.height + 20);
            this.graphics.beginFill(0x354d4b); ////Title back light
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
                if (i == 5) {
                    this.graphics.beginFill(colorPLACEGreen); //green
                    this.graphics.drawRect(74, y + this.disc[i].height - 6, 450, 30);

                    this.graphics.beginFill(0x222222); //green
                    this.graphics.drawRect(54, y + this.disc[5].getChildAt(this.disc[5].children.length - 1).y - 44, 210, 30);
                    y += this.disc[i].allHeight;
                }
                y += this.disc[i].height;
                if (i == 2) {
                    y += 1780;
                }
                 if (i == 6) {
                    y += 600;
                }
                if (i == 3) {


                    // make table for payouts fir

                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y - 10, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let i = 0; i < 5; i++) {
                        this.graphics.drawRect(55, y + 30 + i * 38, app.screen.width - 60, 38);
                    }
                    this.graphics.drawRect(345, y - 10, 1, 230);
                    this.graphics.drawRect(445, y - 10, 1, 230);




                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y + 315, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let j = 0; j < 9; j++) {
                        this.graphics.drawRect(55, y + 355 + j * 38, app.screen.width - 60, 38);
                    }
                    this.graphics.drawRect(300, y + 315, 1, 381);



                    this.graphics.lineStyle(1, 0xaaaaaa, 1);
                    this.graphics.beginFill(0x555555); //green
                    this.graphics.drawRect(55, y + 735, app.screen.width - 60, 40);
                    this.graphics.endFill(0x555555); //green
                    this.graphics.lineStyle(1, 0xaaaaaa, 1);

                    for (let i = 0; i < 9; i++) {
                        this.graphics.drawRect(55, y + 775 + i * 38, app.screen.width - 60, 38);
                    }
                    this.graphics.drawRect(300, y + 735, 1, 381);


                    this.graphics.lineStyle(1, 0xaaaaaa, 0);
                    y += 1210;//this.gPayouts.height * 5;



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