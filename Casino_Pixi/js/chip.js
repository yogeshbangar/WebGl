
//Class for bet detail
class BatValuse{
    constructor(type,chip){
        this.type = type;// type of bit like zero number or multiple number in array list of type
        this.chip = chip;// coin spend
    }
}

//Get Chip for roulette VAlue for like zero number or multiple number
function getChipValueOn(type,array){
    var total = 0;
    array.forEach(element => {
        if(arraysMatch(type,element.type)){
            total += element.chip;
        }

        //Get bet chip if req type is in Zero like 0-3,12-15,26,32-35 any one
        if(element.type[0] == val_OvalCenter[3]){//zero
            rect_zero.forEach(zerotype => {
                if(arraysMatch(type,zerotype)){
                    total += element.chip/4;
                }
            });
        }
        //Get bet chip if req type is in vision like 0-3,12-15,26,32-35 any one
        if(element.type[0] == val_OvalCenter[2]){//vision
            rect_voisins.forEach(voisinstype => {
                if(arraysMatch(type,voisinstype)){
                    if(type[0]==0||type[0]==25)
                        total += element.chip/9;    
                    total += element.chip/9;
                }
            });
        }
        //Get bet chip if req type is in vision like 0-2-3, 4-7, 12-15,  18-21, 19-22, 25-26-28-29,  32-35 any one
        if(element.type[0] == val_OvalCenter[1]){//orph
            rect_orph.forEach(orphtype => {
                if(arraysMatch(type,orphtype)){
                    total += element.chip/5;    
                }
            });
        }
        //Get bet chip if req type is in vision like 1, 6-9, 14-17,  17-21, 31-34any one
        if(element.type[0] == val_OvalCenter[0]){//tier
            rect_tier.forEach(tiertype => {
                if(arraysMatch(type,tiertype)){
                    var valo = parseFloat( (element.chip/6).toFixed(1) );//element.chip*.1667;
                    total += valo;
                    // console.log("total = "+total,type,element);
                }
            });
        }
    });
    return total;
}

//Get Chip for roulette VAlue for bonus or ANTE
function  getChipValue4Poker(type,array){
    var total = 0;
    array.forEach(element => {
        if(arraysMatch(type,element.type)){
            total += element.chip;
        }
    });
    return total;
}
//Get Chip for DreamCatcher VAlue for all cards (1,2,5,10,20,40)
function  getChipValue4DreamCatcher(type,array){
    var total = 0;
    array.forEach(element => {
        if(type == element.type){
            total += element.chip;
        }
        if('batonAll' == element.type){
            total += element.chip/6;
        }
    });
    return total;
}

//Get Chip for DragonTiger VAlue for all cards (1,2,5,10,20,40)
function  getChipValue(type,array){
    var total = 0;
    array.forEach(element => {
        if(type == element.type){
            total += element.chip;
        }
    });
    return total;
}
//Get Chip for Sicbo VAlue for all cards (1,2,5,10,20,40)
function  getChipSicbo(type,array){
    var total = 0;
    array.forEach(element => {
        if(type == element.type){
            total += element.chip;
        }
    });
    
    return total;
}

var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};