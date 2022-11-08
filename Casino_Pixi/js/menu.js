
//Menu Slide

class Menu {
    constructor() {
        //Menu container
        this.graphics = new PIXI.Graphics();
        //set button for all Menu items
        this.lobby = this.loadButtom("lobby.svg", "lobby", 425, 80, 1.0);
        this.history = this.loadButtom("history.svg", "history", 425, 135, 1.0);
        this.logout = this.loadButtom("logout.svg", "logout", 425, 190, 1.0);
        this.help = this.loadButtom("help.svg", "help", 425, 190, 1);
        this.close = this.loadButtom("close.svg", "close", 500, 900, 1);


        //set bakgrount for menu
        this.graphics.beginFill(0x474449); //gray
        // this.graphics.beginFill(0xffffff); //gray
        this.graphics.drawRect(app.screen.width * .57, 55, app.screen.width * .6, app.screen.height);
        this.graphics.beginFill(0x433a41); //green
        // this.graphics.drawRect(app.screen.width * .4, 55, app.screen.width * .6, 100);
        this.graphics.beginFill(0x433a41); //green
        // this.graphics.drawRect(app.screen.width * .4, 255, app.screen.width * .6, 100);
        this.graphics.position.set(1000, 0);
        this.speed = 0;
        // app.stage.addChild(this.graphics);//add graphics in app view for drowing Rectangles
    }

    // Draw animtion for menu
    drawMenu() {
        // this.history.position.set(425,134);
        if (this.graphics.x > 0 && this.graphics.x < 400) {
            this.graphics.x += this.speed;
            if (this.graphics.x > 300) {
                this.graphics.x = 400;
                app.stage.removeChild(this.graphics);
            }
        }
    }
    // Load button and event 
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
        this.graphics.addChild(sprite);
        return sprite;
    }
    //button click event for open respective items
    onClick(e) {
        console.log("menu e.target.myCustomProperty " + e.target.myCustomProperty);
        switch (e.target.myCustomProperty) {
            case "lobby":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;
                for (let i = 0; i < app.stage.children.length; i++) {
                    app.stage.getChildAt(i).visible = false;
                }
                nowinRoullete = false;
                sprite_menu.visible = true;
                mSidemenu.graphics.visible = true;
                switch (APP_SCREEN) {
                    case APP_DREAM_CATCHER:
                        mDreamCatcher.onClose();
                        break;
                    case mDragonTiger:
                        mDragonTiger.onClose();
                        break;
                }
                if (APP_SCREEN != APP_HOME)
                    app.stage.addChild(mHome.container);
                mHome.container.visible = true;
                APP_SCREEN = APP_HOME;
                if (timeoutHandle)
                    clearTimeout(timeoutHandle);
                break;
            case "history":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;

                break;
            case "logout":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;
                break;
            case "help":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;
                switch (APP_SCREEN) {
                    case APP_POKER:
                        mPokerHelp.onstart();
                        break;
                    case APP_ROULLETE:
                        mRouletteHelp.onstart();
                        break;
                    case APP_DREAM_CATCHER:
                        mDreamCatcherHelp.onstart();
                        break;
                    case APP_DRAGON_TIGER:
                        mDragonTigerHelp.onstart();
                        break;
                    case APP_SPEED_BACCARAT:
                        mSpeedBaccaratHelp.onstart();
                        break;
                    case APP_SIC_BO:
                        mSicBoHelp.onstart();
                break;
                }
                break;
            case "close":
                mSidemenu.speed = 30;
                mSidemenu.graphics.x = 1;
                break;
            default:
                break;
        }
    }
    //call when click on menu
    open() {

        switch (APP_SCREEN) {
            case APP_POKER:
                if (mPokerHelp.mainContainer.x < 100)
                    return;
                break;
            case APP_ROULLETE:
                if (mRouletteHelp.mainContainer.x < 100)
                    return;
                break;
            case APP_DREAM_CATCHER:
                if (mDreamCatcherHelp.mainContainer.x < 100)
                    return;
                break;
            case APP_DRAGON_TIGER:
                if (mDragonTigerHelp.mainContainer.x < 100)
                    return;
                break;
            case APP_SPEED_BACCARAT:
                if (mSpeedBaccaratHelp.mainContainer.x < 100)
                    return;
                break;
            case APP_SIC_BO:
                if (mSicBoHelp.mainContainer.x < 100)
                    return;
                break;
        }
        this.speed = -30;
        this.graphics.x = 300;
        app.stage.addChild(this.graphics);
        this.help.visible = APP_SCREEN != APP_HOME;
        this.logout.y = APP_SCREEN == APP_HOME ? 190 : 245;
    }

}