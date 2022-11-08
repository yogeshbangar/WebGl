
//Home screen

class Home {
    constructor() {
        //Home container
        this.container = new PIXI.Container();

        //set button for all games
        this.mPoker = this.loadButtom("homebutton.png", APP_POKER, 270, 240, 1);
        this.mRullete = this.loadButtom("homebutton.png", APP_ROULLETE, 270, 340, 1);
        this.mDreamCatcher = this.loadButtom("homebutton.png", APP_DREAM_CATCHER, 270, 440, 1);
        this.mDragonTiger = this.loadButtom("homebutton.png", APP_DRAGON_TIGER, 270, 540, 1);
        this.mSpeedBaccarat = this.loadButtom("homebutton.png", APP_SPEED_BACCARAT, 270, 640, 1);
        this.mSicBo = this.loadButtom("homebutton.png", APP_SIC_BO, 270, 740, 1);
        app.stage.addChild(this.container);
        console.log("Home");
    }

    // use for if want to add animation for home screen
    drawHome() {
    }

    // Load button and event 
    loadButtom(str, tag, x, y, s) {
        let sprite = new Sprite(resources[basepath + str].texture);//create strip
        sprite.interactive = true;//set interactive true for click event
        sprite.buttonMode = true;
        sprite.myCustomProperty = tag;//set tag for getting strip event
        sprite.on('pointerup', this.onClick); // use for onclick event
        sprite.x = x;
        sprite.y = y;
        sprite.scale.set(s, s);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        var txt = new PIXI.Text(tag, new PIXI.TextStyle({ fill: colorWhite, fontSize: 32, fontWeight: "bold" }));
        sprite.addChild(txt);
        txt.position.set(-txt.width * .5, -txt.height * .5);
        this.container.addChild(sprite);
        return sprite;
    }

    //button click event for open respective game
    onClick(e) {
        // return;
        console.log("Home e.target.myCustomProperty " + e.target.myCustomProperty);
        txtBatType.text = 'TOTAL BET';
        colorBat = colorWhite;
        colorDynamic = COLORGRAY;
        if (mSidemenu.graphics.x < 300) {
            mSidemenu.speed = 30;
            mSidemenu.graphics.x = 1;
        }


        switch (e.target.myCustomProperty) {
            case APP_POKER:
                APP_SCREEN = APP_POKER;
                timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
                dynamicCounter = 15;//restart dynamicCounter
                setVisible(true);//call when bet is oped
                resetValue();
                txtBatType.visible = background.visible = true;
                tableBonus.visible = tablePlay.visible = tableANTE.visible = true;
                app.stage.removeChild(mHome.container);
                return;
            case APP_ROULLETE:
                dynamicCounter = 15;//restart dynamicCounter
                itsOval = false;
                timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
                setRollate(true);
                resetValue();
                APP_SCREEN = APP_ROULLETE;
                txtBatType.visible = backRoulette.visible = true;
                app.stage.removeChild(mHome.container);
                return;
            case APP_DREAM_CATCHER:
                txtBatType.visible = true;
                dynamicCounter = 15;//restart dynamicCounter
                timeoutHandle = setTimeout(nextTurn, 1000);//set timeout function for game dynamicCounter
                app.stage.removeChild(mHome.container);
                mDreamCatcher.onStart();
                APP_SCREEN = APP_DREAM_CATCHER;
                return;
            case APP_DRAGON_TIGER:

                mDragonTiger.onStart();

                return;
            case APP_SPEED_BACCARAT:
                mSpeedBaccarat.onStart();
                return;
            case APP_SIC_BO:
                mSicbo.onStart();
                return;
        }
    }


}
