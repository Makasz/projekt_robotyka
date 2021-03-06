var editor = ace.edit("editor");
var commandType=[];
var run=0;
commandType[1] = {name: ""};


var kod ="\nG1 X3 Y3 Z3 F1500\nG1 X3 Y6 Z3 F1500\nG1 X3 Y6 Z3 F1500\nG3 X6 Y6 I4.5 J3 F1000\nG1 X6 Y3 Z3 F1500\nG1 X6 Y3 Z6 F1500\nG1 Y6 X6 Z6 F1500\nG2 X3 Y6 I4.5 J3 F1000\nG1 X3 Y3 Z6 F1500\nG1 X3 Y3 Z3 F1500\nG1 X6 Y3 Z3 F1500\nG1 X9 Y3 Z3 F1500\nG1 X9 Y6 Z3 F1500\nG3 X12 Y6 I10.5 J4.5 F1500\nG1 X12 Y3 Z3 F1500\nG1 X12 Y3 Z6 F1500\nG1 X12 Y6 Z6 F1500\nG2 X9 Y6 I10.5 J4.5 F1500\nG1 X9 Y3 Z6 F1500\nG1 X9 Y3 Z3 F1500\nG420";

editor.setValue(localStorage['editorText'] || kod);


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

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getCommandType(element, index, array) {
    //console.log(index + " - " + element);
    if(element.search("G") != -1) commandType[index]={name: checkSpace(element[element.search("G")]) +  checkSpace(element[element.search("G")+1]) +  checkSpace(element[element.search("G")+2]) , x:"0", z:"0", y:"0", f:"", s:"", e:"", i:"", j:""}; //Tworzy obiekty z danymi poleceniami ze stringów z G-Codem
    if(element.search("M") != -1) commandType[index]={name:  checkSpace(element[element.search("M")]) +  checkSpace(element[element.search("M")+1]) +  checkSpace(element[element.search("M")+2]) , x:"0", z:"0", y:"0", f:"", s:"", e:"", i:"", j:""};
    if(element.search("X") != -1) commandType[index].x = checkSpaceFrom(element,"X",100);
    if(element.search("Y") != -1) commandType[index].y = checkSpaceFrom(element,"Y",100);
    if(element.search("Z") != -1) commandType[index].z = checkSpaceFrom(element,"Z",100);
    if(element.search("E") != -1) commandType[index].e = checkSpaceFrom(element,"E",100);
    if(element.search("F") != -1) commandType[index].f = checkSpaceFrom(element,"F",100);
    if(element.search("S") != -1) commandType[index].s = checkSpaceFrom(element,"S",100);
    if(element.search("I") != -1) commandType[index].i = checkSpaceFrom(element,"I",100);
    if(element.search("J") != -1) commandType[index].j = checkSpaceFrom(element,"J",100);

    //console.log(commandType[index]);

}
function save_file(){
  console.log("Saving file");
  parse();
  var textToSave = (editor.getValue());
  download("test.txt",textToSave);

}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    editor.setValue(contents);
  };
  reader.readAsText(file);
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);

function load_file(){
  console.log("Loading file");


}




function parse(){
       var editorRawText = editor.getValue(); //Pobiera wartość z edytora
       localStorage['editorText'] = editorRawText;
        var editorLinesText = editorRawText.split('\n'); //Dzieli na linie do tablicy
       editorLinesText.forEach(getCommandType);
       console.log(commandType);
}

   function start_stop(){
       if(run==0) run = 1;
       else run = 0;
       //console.log(run);
   }
