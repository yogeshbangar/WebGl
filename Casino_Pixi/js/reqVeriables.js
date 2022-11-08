let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

//set color used on game
var colorBat = 0x999999;
const colorRed = 0xb71e04;
const colorBlock = 0x19171a;
const colorGreen = 0x3c9247;
const colorPLACEGreen = 0x3c9247;
const colorLine = 0xaaaaaa;
const colorWhite = 0xfafafa;
const colorYellow = 0xd1c069;
const DYNAMICCOLOR = 0x777777;
const COLORGRAY = 0x999999;
const colorCream = 0xf1ebe2;//0x3c9247;//
const colorMidiamCream = 0xfeefd8;//0xfcefda;
const colorDarkCream = 0xacada3;//0x3c9247;//
const colorDarkBrown = 0xc3a43e;
const colorMidiamBrown = 0xffe58e;
const colorBrown = 0xc2b992;
// const colorBrown = 0xc2b992;
const colorDTRed = 0xFF0000;
const colorDTGreen = 0x00FF00;
const colorDTYellow = 0xffff00;
const colorSBBLUE = 0x296da3;
//set color used on Dream catcher game for number eclips
const color40 = 0xa14360;
const color20 = 0xab6052;
const color10 = 0x558161;
const color05 = 0x945ea9;
const color02 = 0x797aa4;
const color01 = 0xad9047;
const color7x = 0x997f18;
const color2x = 0xf2cd36;
var state;
var background, backRoulette;//poker and roulette background
var count = 100;//for flying animation count 
var goOut = 0;//for fluing animation horizontal movment
var selCoin = 0;//selected coin 
const posx = 500, posy = 680, menudis = 80;//flying coin init position
const speed = 10;//flying coin speed
var coinArray = Array(6);// object small coin for flying animation  
var coinArrayBig = Array(6);  // object big coin for flying animation  
var spriteAnte, sprite_bonus, sprite_GlowAnte; // button for ANTE and bouns

var txtBalance;//varible for showing balance text
var txtBatType;//varible for showing balance text
var txtBat;//varible for showing balance text
var txtDydnamic;//varible for showing balance text
var txt_4_card = [];//use for poker text 
var dynamicCounter = 15;//this is used by all games for maintaing time counter

var currentbat = 0;
var balance = 999999;

var allcounter = 0;//commont counter

var selSprite = Array();//coin object for coin to reach on table 
var selBigSprite = Array();//coin object for coin to place on ANTE 
var graphics = new PIXI.Graphics();//main graphics object mainging dynamic strip rect background
var colorDynamic = DYNAMICCOLOR;
//poker cards
var cards = new Array(52);
var mSprit_Cards = [];
var board = new Array(5);
var my_players = [
  new player("Player", "", ""),
  new player("Dealer", "", "")
];
//user for poker player and dealer
function player(name, carda, cardb) {
  this.name = name;
  this.bankroll = 1000;
  this.carda = carda;
  this.cardb = cardb;
  this.status = true;
  this.total_bet = 0;
  this.subtotal_bet = 0;
}

const coinValue = [2.5, 5, 25, 125, 500, 2500];//coins valuse that uses for bat values
var sprite_menu, sprite_repeat, sprite_undo; // button for menu, undo and repeat
var value4undo = [];//poker bet array for managing undo
var txtbottomLeft;//varible for showing balance text
var txtbottomRight;//varible for showing balance text
var trans_Background;
var txtWait4Next, toolowbase;
var tableBonus, tablePlay, tableANTE;
var sprite_poker, sprite_roullete, sprite_roullete_Oval;
var sprite_ovalselect, sprite_deselect, sprite_winning;
var isBatAccepted = "WAIT FOR NEXT GAME";

var APP_SCREEN = 'Home';
const APP_HOME = 'Home';
const APP_POKER = 'Poker';
const APP_ROULLETE = 'Roulette';
const APP_DREAM_CATCHER = 'Dream Catcher';
const APP_DRAGON_TIGER = 'Dragon Tiger';
const APP_SPEED_BACCARAT = 'Speed Baccarat';
const APP_SIC_BO = 'Sic Bo';
var mSidemenu;
var mHome;
var mDreamCatcher;
var mDragonTiger = null;
var mSpeedBaccarat = null;
var mSicbo = null;
var nowinRoullete = false;
const rect_zero = [["0", "3"], ["12", "15"], ["26"], ["32", "35"]];//4(0-3,12-15,26,32-35)5*4=20
const rect_voisins = [["0", "2", "3"], ["4", "7"], ["12", "15"], ["18", "21"], ["19", "22"], ["25", "26", "28", "29"], ["32", "35"]];//7(0-2-3, 4-7, 12-15,  18-21, 19-22, 25-26-28-29,  32-35)(10+5+5+5+5+10+5)
const rect_orph = [["1"], ["6", "9"], ["14", "17"], ["17", "21"], ["31", "34"]];//4(1, 6-9, 14-17,  17-21, 31-34)5*5
const rect_tier = [["5", "8"], ["10", "11"], ["13", "16"], ["23", "24"], ["27", "30", "33", "36"]];//4(5-8, 10-11, 13-16,  23-24, 27-30,33-36)5*6
const POKER_COIN_TYPE = ["ANTE", "BONUS", "2x"];

const DC40 = 'dc_40';
const DC20 = 'dc_20';
const DC10 = 'dc_10';
const DC05 = 'dc_5';
const DC02 = 'dc_2';
const DC01 = 'dc_1';
const DC7x = 'dc_70';
const DC2x = 'dc_2x';
const BATONALL = 'batonAll';


const DTDRAGON = 'DRAGON';
const DTTIGER = 'TIGER';
const DTTIE = 'TIE';
const DTSUITETIE = 'SUITE TIE';

const SBPLAYER = 'PLAYER';
const SBBANKER = 'BANKER';
const SBTIE = 'TIE';
const SBPTIE = 'P TIE';
const SBBTIE = 'B TIE';



var pokerchips = [];
const SCALECOIN = .2;
var timeoutHandle;
let ovalTable;
var is2xfoldclicked;
var sprite_2x_01, sprite_2x_02;
var isAnteClicked = false;
