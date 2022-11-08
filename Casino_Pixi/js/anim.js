//Game canvas
let app = new Application({ width: 540, height: 1024, antialias: true, antialiasing: true, transparent: false, resolution: window.devicePixelRatio || 1 });

var element = document.getElementById("anim");//HTML elemet for placing canvas for game
element.appendChild(app.view);//Add app view in html element
var basepath = "./assets/";
//Image string that uses in game 


var imageArr = [basepath + "logout.svg", basepath + "lobby.svg", basepath + "history.svg", basepath + "close.svg",
basepath + "oval.svg", basepath + "svg/ovalselect.svg", basepath + "ovalTable.svg", basepath + "winningnumber.png",
basepath + "homebutton.png", basepath + "repeatchild.svg", basepath + "2x_02.svg", basepath + "2x_01.svg",
basepath + "svg/tableBonus.svg", basepath + "svg/tablePlay.svg", basepath + "tableANTE.svg", basepath + "opecity.png",
basepath + "toolowbase.png", basepath + "menu.svg", basepath + "repeat.svg", basepath + "undo.svg", basepath + "bonus.svg",
basepath + "anteglow.png", basepath + "ante.svg", basepath + "svg/0.svg", basepath + "svg/1.svg", basepath + "svg/2.svg",
basepath + "svg/3.svg", basepath + "svg/4.svg", basepath + "svg/5.svg", basepath + "svg/a0.svg", basepath + "svg/a1.svg",
basepath + "svg/a2.svg", basepath + "svg/a3.svg", basepath + "svg/a4.svg", basepath + "svg/a5.svg", basepath + "svg/3d0.svg",
basepath + "svg/3d1.svg", basepath + "svg/3d2.svg", basepath + "svg/3d3.svg", basepath + "svg/3d4.svg", basepath + "batonAll.png",
basepath + "svg/3d5.svg", basepath + "background.jpeg", basepath + "background1.jpeg", basepath + "DreamCatcher.jpg",
basepath + "dc_40.svg", basepath + "dc_20.svg", basepath + "dc_10.svg", basepath + "dc_5.svg", basepath + "dc_2.svg", basepath + "dc_1.svg",
basepath + "dragontiger.jpg", basepath + "effect.png", basepath + "dc7x.png", basepath + "eclips.png", basepath + "tiger.png", basepath + "dragan.png",
basepath + "help/glow.png", basepath + "help/chaticon.png", basepath + "help/history.png", basepath + "help/lobby.png", basepath + "help/setting.png",
basepath + "help.svg", basepath + "help/arro.png", basepath + "banker.png", basepath + "player.png", basepath + "help/right.png", basepath + "help/star.png",
basepath + "help/pencil.png", basepath + "help/recycle.png", basepath + "help/autoplay1.png", basepath + "help/autoplay.svg", basepath + "help/oval.png",
basepath + "help/shoe_statistics.png", basepath + "help/road_probing_table.png", basepath + "help/derived_road.png", basepath + "help/big_road.png", basepath + "help/bead_road.png",
basepath + "help/sbshoe_statistics.png", basepath + "help/sbroad_probing_table.png", basepath + "help/sbderived_road.png", basepath + "help/sbbig_road.png", basepath + "help/sbbead_road.png",
basepath + "help/sicbo-grid-legend.svg", basepath + "help/sicbo-recent-results.png", basepath + "help/sicbo-result-roadmap.png",
basepath + "sicbo.png", basepath + "die.png", basepath + "big.png", basepath + "small.png"
];
for (var i = 2; i < 15; i++) {
  imageArr.push(basepath + "cards/C" + i + ".png");//club card load
  imageArr.push(basepath + "cards/D" + i + ".png");//Dimond card load
  imageArr.push(basepath + "cards/H" + i + ".png");//Heart card load
  imageArr.push(basepath + "cards/S" + i + ".png");//Spade card load
}
// Load images
loader.add(imageArr).on("progress", loadProgressHandler).load(setup);

//for loading progress
function loadProgressHandler(loader, resource) {
  // console.log("loading: " + resource.url);
  // console.log("progress: " + loader.progress + "%");
}

// Call after load all resources 
function setup() {
  document.addEventListener('touchstart', e => { toggleFullScreen(); }); //toggle fullscreen for mobile
  document.addEventListener('mousedown', e => { toggleFullScreen(); });  //toggle fullscreen for desktop
  background = new Sprite(resources[basepath + "background1.jpeg"].texture);//create background Sprite
  app.stage.addChild(background);//add background Sprite in app
  backRoulette = new Sprite(resources[basepath + "background.jpeg"].texture);//create background Sprite
  app.stage.addChild(backRoulette);//add background Sprite in app
  backRoulette.visible = background.visible = false;
  trans_Background = new Sprite(resources[basepath + "opecity.png"].texture);//create background Sprite
  sprite_winning = loadSprite(basepath + "winningnumber.png", -1, 280, 213, 1);//create and add repeat Sprite in app view with click event 111
  sprite_winning.visible = false;
  app.stage.addChild(graphics);//add graphics in app view for drowing Rectangles

  tableBonus = loadSprite(basepath + "svg/tableBonus.svg", 113, 130, 435, 1);//create and add tableBonus Sprite in app view with click event 112
  tablePlay = loadSprite(basepath + "svg/tablePlay.svg", 114, 222, 460, 1);//create and add tablePlay Sprite in app view with click event 112
  tableANTE = loadSprite(basepath + "tableANTE.svg", 115, 320, 457, 1);//create and add tableANTE Sprite in app view with click event 112
  tableBonus.alpha = tablePlay.alpha = tableANTE.alpha = .5;
  tableBonus.visible = tablePlay.visible = tableANTE.visible = false;
  sprite_undo = loadSprite(basepath + "undo.svg", 112, posx, posy - menudis, 1);//create and add undo Sprite in app view with click event 112 
  sprite_undo.down = 0;
  sprite_undo.on('pointerdown', onButtonDown); // use for onclick event
  txtundo = loadRolletText({ fill: colorWhite, fontSize: 14, fontWeight: "bold" }, "UNDO");
  sprite_undo.addChild(txtundo);
  txtundo.alpha = .5;
  txtundo.position.set(-txtundo.width * .5, -50);


  sprite_repeat = new PIXI.Container();//Create Container for PokerHelp object
  var childa = loadRolletSprite(basepath + "repeat.svg", 0, 0, 1);
  var childb = loadRolletSprite(basepath + "repeatchild.svg", 0, 0, 1);
  var txtrepeat = loadRolletText({ fill: colorWhite, fontSize: 14, fontWeight: "bold" }, "REPEAT");
  sprite_repeat.addChild(childa);
  sprite_repeat.addChild(childb);
  sprite_repeat.addChild(txtrepeat);
  app.stage.addChild(sprite_repeat);
  sprite_repeat.position.set(posx, posy + menudis);
  txtrepeat.position.set(-txtrepeat.width * .5, 42);
  txtrepeat.alpha = .6;
  operty = 111;//set tag for getting strip event
  sprite_repeat.myCustomProperty = 111;//set tag for getting strip event
  sprite_repeat.interactive = true;//set interactive true for click event
  sprite_repeat.buttonMode = true;
  sprite_repeat.on('pointerup', onButtonClick); // use for onclick event


  // sprite_repeat = loadSprite(basepath + "repeat.svg", 111, posx, posy + menudis, 1);//create and add repeat Sprite in app view with click event 111
  // sprite_repeat.alpha = 1;
  // var childr =loadRolletSprite(basepath + "repeatchild.svg", 0, 0, 1);
  // childr.alpha = 1.6;
  // sprite_repeat.addChild(childr);




  // txtrepeat.alpha = .5;



  sprite_2x_01 = loadSprite(basepath + "2x_01.svg", 121, 190, 810, .55);//create and add 2x_01 Sprite in app view with click event 110
  sprite_2x_02 = loadSprite(basepath + "2x_02.svg", 122, 340, 810, .55);//create and add 2x_02 Sprite in app view with click event 110

  sprite_menu = loadSprite(basepath + "menu.svg", 110, posx, posy - menudis * 2.2, 1);//create and add menu Sprite in app view with click event 110
  sprite_ovalselect = loadSprite(basepath + "oval.svg", 119, posx, posy + menudis * 2.2, 1);//create and add repeat Sprite in app view with click event 111
  sprite_deselect = loadSprite(basepath + "svg/ovalselect.svg", 120, posx, posy + menudis * 2.2, 1);//create and add repeat Sprite in app view with click event 111
  sprite_ovalselect.visible = sprite_deselect.visible = false;


  sprite_menu.alpha = sprite_repeat.alpha = sprite_undo.alpha = sprite_ovalselect.alpha = sprite_deselect.alpha = .5;


  loadRollate();//load roulette object

  app.stage.addChild(trans_Background);//add background Sprite in app
  trans_Background.visible = false;
  // Require small coin for flying animation  



  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i] = loadSprite(basepath + "svg/" + i + ".svg", i, posx, posy, SCALECOIN + .01);//create and add coinArray Sprite in app view with click event i(0 to 5)
  }
  // Require big coin for flying animation  
  for (let i = 0; i < coinArrayBig.length; i++) {
    coinArrayBig[i] = loadSprite(basepath + "svg/" + i + ".svg", i + 6, posx, posy, SCALECOIN + .04);//create and add coinArrayBig Sprite in app view with click event i + 6(6 to 11)
    coinArrayBig[i].visible = selCoin == 0;//set visible big coin 
  }
  console.log("Boolean(10 > 9)" + Math.random());
  console.log(compRan());
  sprite_GlowAnte = loadSprite(basepath + "anteglow.png", -1, 270, 840, 1);//create and add sprite_GlowAnte Sprite in app view
  sprite_GlowAnte.vx = 1;//set sprite_GlowAnte scale 
  sprite_GlowAnte.vy = .01;//for animating glow by scale fector 
  // Require to load for ANTE button
  spriteAnte = loadSprite(basepath + "ante.svg", 100, 270, 840, .61);//create and add Ante Sprite in app view with click event 100
  // Require to load for Bonus button
  sprite_bonus = loadSprite(basepath + "bonus.svg", 101, 170, 688, .61);//create and add bonus in app view with click event 101
  txtBalance = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Balance Text in app view
  txtBat = loadText({ fill: "#9e9b4d", fontSize: 20, fontWeight: "bold" });//create and add Bat Text in app view
  txtBatType = loadText({ fill: "#a5b8bc", fontSize: 20, fontWeight: "bold" }, 'TOTAL BET');//create and add Bat Text in app view
  txtBalance.position.set(125, 3);//set text balance position 
  txtBat.position.set(450, 3);//set text bat position 
  txtBatType.position.set(330, 3);//set text bat position 
  txtDydnamic = loadText({
    dropShadow: true, dropShadowColor: 'rgba(0, 0, 0, 1)', dropShadowBlur: 2, dropShadowAngle: Math.PI / 4, dropShadowDistance: 2,
    fill: "#fafafa", fontSize: 21, fontWeight: "normal"
  });//create and add Dydnamic Text in app view
  txtbottomLeft = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomLeft.position.set(10, 1000);
  txtbottomLeft.text = 'Left Test';
  txtbottomRight = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });//create and add Dydnamic Text in app view
  txtbottomRight.position.set(400, 1000);
  txtbottomRight.text = 'txtbottomRight Test';

  toolowbase = loadSprite_2(basepath + "toolowbase.png", 455, 710, 1.2);
  txtWait4Next = loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" });
  txtWait4Next.position.set(400, 700);
  txtWait4Next.text = 'Balance too low';
  txtWait4Next.myCustomProperty = 1;
  txtWait4Next.visible = false;
  for (var i = 0; i < 6; i++) {
    txt_4_card.push(loadText({ fill: "#fafafa", fontSize: 15, fontWeight: "normal" }));//create and add text for card like "player","dealer","High card" in app view
    txt_4_card[i].visible = false;
  }

  setVisible(true);//set visiblity of coins and button
  resetValue();//call function for reset app related values
  //Calling play recursive for rendering 
  state = play;
  app.ticker.add(delta => gameLoop(delta));
  document.addEventListener('keydown', dealWithKeyboard);

  app.renderer.plugins.interaction.on('pointerdown', touchDown);//add tuch event for roulette table
  app.renderer.plugins.interaction.on('pointermove', touchMove);//add tuch event for roulette table
  app.renderer.plugins.interaction.on('pointerup', touchEvent);//add tuch event for roulette table
  setVisible(false);


  itsOval = true;
  // sprite_poker.visible = sprite_roullete.visible = true;
  // sprite_roullete_Oval.visible = false
  // setRollate(true);
  // resetValue();
  // APP_SCREEN = APP_ROULLETE;
  txtbottomLeft.visible = false;
  txtbottomRight.visible = false;
  txtBalance.visible = false;
  txtBat.visible = false;
  txtDydnamic.visible = false;
  mSicbo = new Sicbo();
  mSpeedBaccarat = new SpeedBaccarat();
  mDragonTiger = new DragonTiger();
  mDreamCatcher = new DreamCatcher();
  mHome = new Home();
  mSidemenu = new Menu();
  mPokerHelp = new PokerHelp();
  mRouletteHelp = new RouletteHelp();
  mDreamCatcherHelp = new DreamCatcherHelp();
  mDragonTigerHelp = new DragonTigerHelp();
  mSpeedBaccaratHelp = new SpeedBaccaratHelp();
  mSicBoHelp = new SicBoHelp();

}
function touchDown(event) {

  switch (APP_SCREEN) {
    case APP_POKER:
      mPokerHelp.onTuch(event, "down");
      break;
    case APP_ROULLETE:
      mRouletteHelp.onTuch(event, "down");
      break;
    case APP_DREAM_CATCHER:
      mDreamCatcherHelp.onTuch(event, "down");
      break;
    case APP_DRAGON_TIGER:
      mDragonTigerHelp.onTuch(event, "down");
      break;
    case APP_SPEED_BACCARAT:
      mSpeedBaccaratHelp.onTuch(event, "down");
      break;
    case APP_SIC_BO:
      mSicbo.onTuch(event, "down");
      mSicBoHelp.onTuch(event, "down");
      break;
  }
}
function touchMove(event) {
  // for (let i = 0; i < mSicbo.txtArrComic.length; i++) 
  // mSicbo.textStrcomic(i, "str", 0, 0, 20);
  switch (APP_SCREEN) {
    case APP_POKER:
      mPokerHelp.onTuch(event, "move");
      break;
    case APP_ROULLETE:
      mRouletteHelp.onTuch(event, "move");
      break;
    case APP_DREAM_CATCHER:
      mDreamCatcherHelp.onTuch(event, "move");
      break;
    case APP_DRAGON_TIGER:
      mDragonTigerHelp.onTuch(event, "move");
      break;
    case APP_SPEED_BACCARAT:
      mSpeedBaccaratHelp.onTuch(event, "move");
      break;
    case APP_SIC_BO:
      mSicbo.onTuch(event, "move");
      mSicBoHelp.onTuch(event, "move");
      break;
  }
}
function touchEvent(event) {

  switch (APP_SCREEN) {
    case APP_POKER:
      mPokerHelp.onTuch(event, "up");
      break;
    case APP_ROULLETE:
      mRouletteHelp.onTuch(event, "up");
      break;
    case APP_DREAM_CATCHER:
      mDreamCatcherHelp.onTuch(event, "up");
      break;
    case APP_DRAGON_TIGER:
      mDragonTigerHelp.onTuch(event, "up");
      break;
    case APP_SPEED_BACCARAT:
      mSpeedBaccaratHelp.onTuch(event, "up");
      break;
    case APP_SIC_BO:
      mSicbo.onTuch(event, "up");
      mSicBoHelp.onTuch(event, "up");
      break;
  }

  sprite_undo.down = 0;
  if (mSidemenu.graphics.x > 300 && !trans_Background.visible) {//Handle event at bet is on
    if (dynamicCounter > 0 && APP_SCREEN == APP_ROULLETE && (mRouletteHelp.mainContainer.x > 300)) {
      console.log("mSidemenu.graphics.x = " + mSidemenu.graphics.x);
      if (nowinRoullete == false) {
        nowinRoullete = true;
        return;
      }
      console.log("touchEvent " + itsOval);
      if (itsOval == true) {
        Handle_OvalTuch(event);//Handle event for Oval table
      } else {
        Handle_rectTuch(event);//Handle event for rect table
      }
      txtWait4Next.position.set(event.data.global.x, event.data.global.y - 50);
    } if (APP_SCREEN == APP_DRAGON_TIGER) {
      mDragonTiger.onClick(event);
    }
    if (APP_SCREEN == APP_SPEED_BACCARAT) {
      mSpeedBaccarat.onClick(event);
    }
    if (APP_SCREEN == APP_SIC_BO) {
      mSicbo.onClick(event);
    }
  }
  // if (APP_SCREEN == APP_POKER) {
  //   is2x_or_Fold(event);
  // }
  toggleFullScreen();
}
//Game rendring in loop
function gameLoop(delta) { state(delta); }

//load strip comman function
function loadSprite(str, tag, x, y, s) {
  let sprite = new Sprite(resources[str].texture);//create strip
  if (tag > -1) {
    sprite.interactive = true;//set interactive true for click event
    sprite.buttonMode = true;
    sprite.myCustomProperty = tag;//set tag for getting strip event
    sprite.on('pointerup', onButtonClick); // use for onclick event
  } else {
    sprite.myCustomProperty = 50;
  }
  sprite.x = x;
  sprite.y = y;
  sprite.scale.set(s, s);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.vx = Math.sin((tag) * 36 * (Math.PI / 180)) * speed;
  sprite.vy = Math.cos((tag) * 36 * (Math.PI / 180)) * speed;
  app.stage.addChild(sprite);
  sprite.visible = false;
  return sprite;
}

//load strip comman function
function loadSprite_2(str, x, y, s) {
  let sprite = new Sprite(resources[str].texture);
  sprite.position.set(x, y);
  sprite.scale.set(s, s);
  sprite.anchor.set(0.5, 0.5);
  app.stage.addChild(sprite);
  sprite.visible = false;
  return sprite;
}

function loadText(style_var, str) {
  var text = new PIXI.Text(str || '629.63 ', new PIXI.TextStyle(style_var));
  text.visible = false;
  app.stage.addChild(text);
  return text;
}
function addCoin(x, y, val) {
  // console.log(x+"<5 pink <10 red  <25 green <125 black < 500 purple <2500 yellow.");
  var col = 0;
  if (val < 5) col = 0;
  else if (val < 25) col = 1;
  else if (val < 125) col = 2;
  else if (val < 500) col = 3;
  else if (val < 2500) col = 4;
  else col = 5;
  val = val + "";
  if (val.includes('.') && val.length > 3) { //true
    val = Math.floor(val) + "+";
  }
  console.log(val.length + " val = " + val);
  var coinstrip = loadRolletSprite(basepath + "svg/a" + col + ".svg", x, y, SCALECOIN);
  var txt = loadRolletText({ fill: colorWhite, fontSize: 70 - val.length * 2, fontWeight: "bold" }, val);
  coinstrip.addChild(txt);
  txt.position.set(-txt.width * .5, -txt.height * .5);
  console.log(txt.width + "  ~~  " + txt.height);
  return coinstrip;
}
function addCoinScal(x, y, val) {
  // console.log(x+"<5 pink <10 red  <25 green <125 black < 500 purple <2500 yellow.");
  var col = 0;
  if (val < 5) col = 0;
  else if (val < 25) col = 1;
  else if (val < 125) col = 2;
  else if (val < 500) col = 3;
  else if (val < 2500) col = 4;
  else col = 5;
  val = (val + "");
  if (val.includes('.') && val.length > 3) { //true
    val = Math.floor(val) + "+";
  }
  console.log("val = " + val);
  var coinstrip = loadRolletSprite(basepath + "svg/a" + col + ".svg", x, y, SCALECOIN + .05);
  var txt = loadRolletText({ fill: colorWhite, fontSize: 70 - val.length * 2, fontWeight: "bold" }, val);
  coinstrip.addChild(txt);
  txt.position.set(-txt.width * .5, -txt.height * .5);
  console.log(txt.width + "  ~~  " + txt.height);
  return coinstrip;
}
function addCoin3d(x, y, val) {
  // console.log(x+"<5 pink <10 red  <25 green <125 black < 500 purple <2500 yellow.");
  console.log("addCoin3d = " + val);
  var col = 0;
  if (val < 5) col = 0;
  else if (val < 25) col = 1;
  else if (val < 125) col = 2;
  else if (val < 500) col = 3;
  else if (val < 2500) col = 4;
  else col = 5;
  val = (val + "");
  if (val.includes('.') && val.length > 3) { //true
    val = Math.floor(val) + "+";
  }
  var coinstrip = loadRolletSprite(basepath + "svg/3d" + col + ".svg", x, y, SCALECOIN + .16);
  var txt = loadRolletText({ fill: colorWhite, fontSize: 40 - val.length * 2, fontWeight: "bold" }, val);
  coinstrip.addChild(txt);
  txt.position.set(-txt.width * .5, -txt.height * .6);
  console.log(txt.width + "  ~addCoin3d~  " + txt.text);
  return coinstrip;
}
function onButtonDown(e) {
  sprite_undo.down = 1;
}
//callback function for onclick event
function onButtonClick(e) {
  sprite_undo.down = 0;
  console.log("e.target.myCustomProperty = " + e.target.myCustomProperty);
  if (goOut != 0 || mSidemenu.graphics.x < 300) {
    return;
  }
  switch (e.target.myCustomProperty) {
    case 122: case 121:
      is2x_or_Fold(e.target.myCustomProperty);
      return;
    case 120: case 119:
      itsOval = e.target.myCustomProperty == 119;
      setRollate(true);
      return;
    case 115: case 114: case 113:
      if (dynamicCounter < 0) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(210, 350);
        txtWait4Next.text = "Wait for next game";
      }
      return;//click for menu button
    case 112:
      undoValuse();
      return;//click for undo button
    case 111://click for reapeat button
      repeatValues();
      return;
    case 110: //click for menu button
      mSidemenu.open();
      return;

    case 101://click for bonus button
      if (mPokerHelp.mainContainer.x < 100)
        return;
      if (coinValue[selCoin] > balance) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(sprite_bonus.x, sprite_bonus.y - 50);
        txtWait4Next.text = 'Balance too low ';
      } else {
        sendCoinonTable([POKER_COIN_TYPE[1]], 170, 688, 130, 435, coinValue[selCoin]);
      }
      return;
    case 100://click for ANTE button
      if (mPokerHelp.mainContainer.x < 100)
        return;
      if (coinValue[selCoin] > balance) {
        txtWait4Next.myCustomProperty = 100;
        txtWait4Next.position.set(spriteAnte.x, spriteAnte.y - 50);
        txtWait4Next.text = 'Balance too low';
      } else {
        sendCoinonTable([POKER_COIN_TYPE[0]], 270, 840, 320, 458, coinValue[selCoin]);
        isAnteClicked = true;

      }
      return;
    default:// click for all coinArrayBig & coinArray coin
      if (coinArray[2].x > posx - 10) { //coin flying open animation start
        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].x = posx;
          coinArray[i].y = posy;
          coinArray[i].vx = -Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin open
          coinArray[i].vy = Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;//set verticle direction for flying coin open
        }
        for (let i = 0; i < coinArray.length; i++) {
          coinArrayBig[i].x = posx;
          coinArrayBig[i].y = posy;
        }
        goOut = -0.2;//set horizontal direction for flying coin and bigcoin
        count = 0;//set cont for flying animation
      } else { ////coin flying cloase animation start

        for (let i = 0; i < coinArray.length; i++) {
          coinArray[i].vx = Math.sin((5 - i) * 36 * (Math.PI / 180)) * speed;//set horizontal direction for flying coin close
          coinArray[i].vy = -Math.cos((5 - i) * 36 * (Math.PI / 180)) * speed;//set verticle direction for flying coin close
          if (e.target.myCustomProperty < 6) {// set selCoin coin when click on small coin condition
            coinArrayBig[i].visible = e.target.myCustomProperty == i;// set visible true of big coin when click on respective small coin
            selCoin = e.target.myCustomProperty;// set selCoin coin when click on small coin
            console.log(i + " txtWait4Next.y = " + txtWait4Next.y);
          }
        }
        goOut = 0.2;//set horizontal direction for flying coin and bigcoin
        count = 0;//set cont for flying animation
        if (coinValue[selCoin] > balance) {
          txtWait4Next.myCustomProperty = 100;
          txtWait4Next.position.set(400, coinArray[selCoin].y - 50);
          txtWait4Next.text = 'Too low balance';
        }
      }
      return;
  }
}

// recursive callback function  for rendring
function play(delta) {

  switch (APP_SCREEN) {
    case APP_HOME:
      mHome.drawHome();
      break;
    case APP_POKER:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      drawCards();// draw Card from form dynamicRect.js
      mPokerHelp.drawHelp();
      break;
    case APP_ROULLETE:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      drawRoullete();//Draw Roulette animation
      mRouletteHelp.drawHelp();
      break;
    case APP_DREAM_CATCHER:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      mDreamCatcher.drawDreamCatcher();
      mDreamCatcherHelp.drawHelp();
      break;
    case APP_DRAGON_TIGER:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      mDragonTiger.drawDragonTiger();
      mDragonTigerHelp.drawHelp();
      break;
    case APP_SPEED_BACCARAT:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      mSpeedBaccarat.drawSpeedBaccarat();
      mSpeedBaccaratHelp.drawHelp();
      break;
    case APP_SIC_BO:
      coinAnim();// draw coin animation form coinAnim.js
      DrawDynamicRect();// draw Rect form dynamicRect.js
      // coinAnim();// draw coin animation form coinAnim.js
      // DrawDynamicRect();// draw Rect form dynamicRect.js
      mSicbo.drawSicbo();
      mSicBoHelp.drawHelp();
      break;

  }
  mSidemenu.drawMenu();
  allcounter++;
}
//set timeout function for game dynamicCounter
function nextTurn() {
  clearTimeout(timeoutHandle);
  // console.log("dynamicCounter " + dynamicCounter);
  dynamicCounter--;
  timeoutHandle = setTimeout(nextTurn, 1000);//reset timeout function for game dynamicCounter
  if (dynamicCounter < 0)
    trans_Background.visible = false;
  switch (APP_SCREEN) {
    case APP_POKER: {//set timer for poker
      if (dynamicCounter == 0) {//call when bet is closed
        setVisible(false);
      }
      if (dynamicCounter == -20 && is2xfoldclicked == false) {
        txt_4_card[5].text = "Auto Folded";
        fold_now();
      }
      if (dynamicCounter < -35) {//end of the game
        dynamicCounter = 15;//restart dynamicCounter
        setVisible(true);//call when bet is oped
        resetValue();
      }
    }
      break;
    case APP_ROULLETE:
      rouletteTimer();
      break;
    case APP_DREAM_CATCHER:
      mDreamCatcher.onDreamCatcherTimer();
      break;
    case APP_DRAGON_TIGER:
      mDragonTiger.onDTigerTimer();
      break;
    case APP_SPEED_BACCARAT:
      mSpeedBaccarat.onSBTimer();
      break;
    case APP_SIC_BO:
      mSicbo.onTimer();
      break;
  }

}
function setVisible(isvisible) {//set visiblity of bat button and coin
  sprite_menu.visible = true;
  sprite_repeat.visible = isvisible;
  sprite_repeat.getChildAt(0).visible = true;
  sprite_repeat.getChildAt(1).visible = false;
  sprite_undo.visible = isvisible;
  coinArray.forEach(element => { element.visible = isvisible; });
  coinArrayBig.forEach(element => {
    element.visible = false;
  }); coinArrayBig[selCoin].visible = isvisible;//set visible big coin 
  spriteAnte.visible = isvisible;
  sprite_bonus.visible = isvisible;
  sprite_GlowAnte.visible = isvisible;
  trans_Background.visible = false;
  txtbottomLeft.visible = true;
  txtbottomRight.visible = true;
  txtBalance.visible = true;
  txtBat.visible = true;
  txtDydnamic.visible = true;
  while (selBigSprite.length > 0)
    app.stage.removeChild(selBigSprite.pop());
}
function resetValue() {//reset game valuse
  console.log("Reset Values");
  currentbat = 0;//reset bet of game
  txtBalance.text = "" + balance;//set balance text
  txtBat.text = "" + currentbat;//set Bat text
  while (selSprite.length > 0) {
    var sprite = selSprite.pop();
    app.stage.removeChild(sprite);
  }
  while (pokerchips.length > 0) {
    var sprite = pokerchips.pop();
    app.stage.removeChild(sprite);
  }
  while (value4undo.length) { value4undo.pop(); }//remove all bat from last game
  rolletCoin.removeCoins();//remove coin from roulette table
  isBatAccepted = "WAIT FOR NEXT GAME";
  for (let i = 0; i < coinArray.length; i++) {
    coinArray[i].x = posx;
    coinArray[i].y = posy;
    coinArrayBig[i].x = posx;
    coinArrayBig[i].y = posy;
  }
  sprite_2x_01.visible = false;
  sprite_2x_02.visible = false;
  isAnteClicked = false;
  switch (APP_SCREEN) {
    case APP_POKER:
      is2xfoldclicked = false;
      make_deck();//reset random values of 52 cards
      for (var i = 0; i < mSprit_Cards.length; i++) {
        app.stage.removeChild(mSprit_Cards[i]);//remove all cards that uses for player(2) dealer(5) and deal(5) 
      }
      mSprit_Cards.length = 0;
      for (var i = 0; i < 10; i++) {//asign all cards that uses for player(2) dealer(5) and deal(5) 
        mSprit_Cards.push(loadSprite_2(basepath + "cards/" + cards[i] + ".png", 100 + i * 34, 600, .25));
      }
      for (var i = 0; i < txt_4_card.length; i++) {
        txt_4_card[i].visible = false;//false visible text for card like "player","dealer","High card" in app view
      }
      mPokerHelp.check();
      break;
    case APP_DREAM_CATCHER:
      mDreamCatcher.resetValue();
      break;
    case APP_DRAGON_TIGER:
      mDragonTiger.resetValue();
      break;
    case APP_SPEED_BACCARAT:
      mSpeedBaccarat.resetValue();
      break;
    case APP_SIC_BO:
      mSicbo.resetValue();
      break;
  }




}
function make_deck() {//asign card valus
  var i;
  var j = 0;
  for (i = 2; i < 15; i++) {
    cards[j++] = "H" + i;
    cards[j++] = "D" + i;
    cards[j++] = "C" + i;
    cards[j++] = "S" + i;
  }
  shuffle();
}
function shuffle() {
  deck_index = 0;
  cards.sort(compRan);
}
function compRan() {
  return 0.5 - Math.random();
}
// resize screen as per secreen size
resize();
function resize() {
  var ratio = .53;
  if (window.innerWidth / window.innerHeight < .77) {
    ratio = window.innerWidth / window.innerHeight;
  }
  console.log("~~~" + (window.innerWidth / window.innerHeight));
  if (window.innerWidth / window.innerHeight >= ratio) {

    ancho = ~~(window.innerHeight * ratio);
    alto = window.innerHeight;
    app.view.style.position = 'absolute';
    app.view.style.width = ancho + 'px';
    app.view.style.height = alto + 'px';
    app.view.style.left = ~~((window.innerWidth - ancho) / 2) + 'px';
    app.view.style.top = '0px';

  } else {
    ancho = window.innerWidth;
    alto = ~~(window.innerWidth / ratio);
    app.view.style.position = 'absolute';
    app.view.style.width = ancho + 'px';
    app.view.style.height = alto + 'px';
    app.view.style.left = 0 + 'px';
    app.view.style.top = (window.innerWidth - (alto / 2)) + 'px';
  }
}
window.onresize = function (event) {
  console.log("ancho,alto");
  resize();
};
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    //document.documentElement.requestFullscreen();

  }
}

