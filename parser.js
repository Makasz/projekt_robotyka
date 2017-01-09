var editor = ace.edit("editor");
var commandType=[];
commandType[1] = {name: ""};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkSpaceFrom(array=[], character, places) { //Wycina ze stringa array podstring o długości places od miejsca character
    var strVal="";
    for(var i=0;i<places;i++){
        if(typeof array[array.search(character)+i] !== "undefined"){
            if(array[array.search(character)+i] == ";" || array[array.search(character)+i] == " ") return strVal.replace(/[^\d.-]/g, '');           
            strVal += checkSpace(array[array.search(character)+i]);
        }
    };
    return strVal.replace(/[^\d.-]/g, '');         
}

function checkSpace(character) { //Sprawdza czy znak to spacja
    if(character==" ") return "";
    return character;
}

function getCommandType(element, index, array) {
    //console.log(index + " - " + element);
    if(element.search("G") != -1) commandType[index]={name: checkSpace(element[element.search("G")]) +  checkSpace(element[element.search("G")+1]) +  checkSpace(element[element.search("G")+2]) , x:"0", z:"0", y:"0", f:"", s:"", e:""}; //Tworzy obiekty z danymi poleceniami ze stringów z G-Codem
    if(element.search("M") != -1) commandType[index]={name:  checkSpace(element[element.search("M")]) +  checkSpace(element[element.search("M")+1]) +  checkSpace(element[element.search("M")+2]) , x:"0", z:"0", y:"0", f:"", s:"", e:""};
    if(element.search("X") != -1) commandType[index].x = checkSpaceFrom(element,"X",100);
    if(element.search("Y") != -1) commandType[index].y = checkSpaceFrom(element,"Y",100);
    if(element.search("Z") != -1) commandType[index].z = checkSpaceFrom(element,"Z",100);
    if(element.search("E") != -1) commandType[index].e = checkSpaceFrom(element,"E",100);
    if(element.search("F") != -1) commandType[index].f = checkSpaceFrom(element,"F",100);
    if(element.search("S") != -1) commandType[index].s = checkSpaceFrom(element,"S",100);

    //console.log(commandType[index]);
    
}

var editorRawText = editor.getValue(); //Pobiera wartość z edytora
var editorLinesText = editorRawText.split('\n'); //Dzieli na linie do tablicy

editorLinesText.forEach(getCommandType);
