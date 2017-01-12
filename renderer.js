window.addEventListener('DOMContentLoaded', function(){
   var canvas = document.getElementById('renderCanvas');
   var engine = new BABYLON.Engine(canvas, true);
   var circle, angle=0, sphere1, ground, cone1,chwytak,endflag=1,xPos,yPos, ending,lines,v1,v2,camera1,cnt = 0,x_axis,y_axis,z_axis,start=1,instructionNumber=0, startPos, endPos, deltaPos, end=0;
   var createScene = function(){
       var scene = new BABYLON.Scene(engine);
       camera1 = new BABYLON.ArcRotateCamera("camera1", 1, 0.8, 10, new BABYLON.Vector3(3, 3, 3), scene);
       camera1.setTarget(BABYLON.Vector3.Zero());
       camera1.attachControl(canvas, false);
       var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
       
      ending = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter: 0.1},scene);
      ending.position = new BABYLON.Vector3(0,0,0);
      v2 = ending.position;

      x_axis = BABYLON.Mesh.CreateLines("x_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1000,0,0)], scene);
      y_axis = BABYLON.Mesh.CreateLines("y_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,1000,0)], scene);
      z_axis = BABYLON.Mesh.CreateLines("z_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,0,1000)], scene);

      y_axis.color = new BABYLON.Color3(0,1,0);
      x_axis.color = new BABYLON.Color3(1,0,0);
      z_axis.color = new BABYLON.Color3(0,0,1);
      return scene;
   }

   

   var scene = createScene();
   engine.runRenderLoop(function(){
       scene.render();

       function toRound(toround){
           return Math.round(toround*10)/10;
       }

       if(run==1){
           if(typeof commandType[instructionNumber] !== "undefined"){
               //console.log(typeof commandType[instructionNumber]);
       if(commandType[instructionNumber].name == "G420");

       if(commandType[instructionNumber].name == "G1" || commandType[instructionNumber].name == "G0") {
           if(start == 1) {
                if(commandType[instructionNumber].x == "") commandType[instructionNumber].x = Math.round(100*ending.position.x)/100;
                if(commandType[instructionNumber].y == "") commandType[instructionNumber].y = Math.round(100*ending.position.y)/100;
                if(commandType[instructionNumber].z == "") commandType[instructionNumber].z = Math.round(100*ending.position.z)/100;
                if(commandType[instructionNumber].f == "") commandType[instructionNumber].f = 750;
                if(commandType[instructionNumber].f == "" && commandType[instructionNumber].name == "G0") commandType[instructionNumber].f = 1500;
                //console.log("Docelowe miejsce: ", commandType[instructionNumber]);
                startPos = ending.position;
                endPos = new BABYLON.Vector3(parseFloat(commandType[instructionNumber].x), parseFloat(commandType[instructionNumber].y), parseFloat(commandType[instructionNumber].z));
                deltaPos = new BABYLON.Vector3(endPos.x - startPos.x, endPos.y - startPos.y, endPos.z - startPos.z);           
               start=0;
           }

           if(toRound(ending.position.x) < endPos.x) {
               ending.position.x += 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.x);
               //console.log(ending.position.x);
           }
           if(toRound(ending.position.y) < endPos.y) {
               ending.position.y += 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.y);
               //console.log(ending.position.y);
           }
           if(toRound(ending.position.z) < endPos.z) {
               ending.position.z += 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.z);
               //console.log(ending.position.z);
           }

           if(toRound(ending.position.x) > endPos.x) {
               ending.position.x -= 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.x);
               //console.log(ending.position.x);
           }
           if(toRound(ending.position.y) > endPos.y) {
               ending.position.y -= 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.y);
               //console.log(ending.position.y);
           }
           if(toRound(ending.position.z) > endPos.z) {
               ending.position.z -= 0.01 * commandType[instructionNumber].f/1000 * Math.abs(deltaPos.z);
               //console.log(ending.position.z);
           }

           document.getElementById("console").innerHTML = 
           "X:" + ending.position.x + "<br>" +
           "Y:" + ending.position.y + "<br>" +
           "Z:" + ending.position.z + "<br>" +
           "Speed:" + commandType[instructionNumber].f + "<br>" + 
           "Line:" + instructionNumber + "<br>";
           //console.log("Delta", deltaPos);
           //console.log(Math.round(ending.position.x*10)/10, endPos.x, Math.round(ending.position.y*10)/10, endPos.y, Math.round(ending.position.z*10)/10, endPos.z)
           //console.log(ending.position, endPos, commandType[instructionNumber]);
           if( Math.round(ending.position.x*10)/10 == toRound(endPos.x) && Math.round(ending.position.y*10)/10 == toRound(endPos.y) && Math.round(ending.position.z*10)/10 == toRound(endPos.z)) {      
               start = 1;
               endflag=1;
               startPos = new BABYLON.Vector3.Zero;
               endPos = new BABYLON.Vector3.Zero;
               deltaPos = endPos;
               //ending.position = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
               instructionNumber++;
               //console.log("Końcowa pozycja:",ending.position);
               console.log(instructionNumber);
           }
        //    else if(toRound(deltaPos.x) <= 0 && toRound(deltaPos.y) <= 0 && toRound(deltaPos.z) <= 0 && Math.round(ending.position.x*100)/100 <= endPos.x && Math.round(ending.position.y*100)/100 <= endPos.y && Math.round(ending.position.z*100)/100 <= endPos.z) {      
        //        start = 1;
        //        startPos = new BABYLON.Vector3.Zero;
        //        endPos = startPos;
        //        deltaPos = endPos;
        //        instructionNumber++;
        //        console.log(ending.position);
        //        console.log(instructionNumber);
        //    }

       }
       if(typeof commandType[instructionNumber] !== "undefined")
       if(commandType[instructionNumber].name != "G2" && commandType[instructionNumber].name != "G3" && commandType[instructionNumber].name != "G1" && commandType[instructionNumber].name != "G0") instructionNumber++;
       if(typeof commandType[instructionNumber] !== "undefined")
       if(commandType[instructionNumber].name == "G2" || commandType[instructionNumber].name == "G3") {
           
           if(start == 1) {
                if(commandType[instructionNumber].x == "0") commandType[instructionNumber].x = ending.position.x;
                if(commandType[instructionNumber].y == "0") commandType[instructionNumber].y = ending.position.y;
                if(commandType[instructionNumber].z == "0") commandType[instructionNumber].z = ending.position.z;
                if(commandType[instructionNumber].f == "0") commandType[instructionNumber].f = 750;
                if(commandType[instructionNumber].f == "0" && commandType[instructionNumber].name == "G0") commandType[instructionNumber].f = 1500;
                //console.log(commandType[instructionNumber]);
                startPos = ending.position;
                endPos = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
                deltaPos = new BABYLON.Vector3(endPos.x - startPos.x, endPos.y - startPos.y, endPos.z - startPos.z);  

                circle = {centerX: commandType[instructionNumber].i , centerY:commandType[instructionNumber].j,
                          radius: Math.sqrt(Math.pow(commandType[instructionNumber].i - parseFloat(endPos.x),2) + Math.pow(commandType[instructionNumber].j - parseFloat(endPos.y),2) )}
                         // console.log(circle);   
                xPos = (ending.position.x - commandType[instructionNumber].i) * Math.PI *2;
                yPos = (ending.position.y - commandType[instructionNumber].j) * Math.PI *2;

                //if(parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle) == Math.round(ending.position.x*100)/100)
                angle=0;
                angle1 = Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2)))) + Math.PI;
                //console.log(angle1 - Math.PI);  

                if(toRound(ending.position.x) == toRound(parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle1)) &&
                toRound(ending.position.y) == toRound(parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle1)))
                {
                    angle = Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2)))) + Math.PI;
                    console.log("+PI");
                }
                


                // console.log(toRound(ending.position.x), toRound(parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle1)),
                // toRound(ending.position.y), toRound(parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle1)));
                angle1 = Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2))));

                if(toRound(ending.position.x) == Math.round(parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle1)) &&
                toRound(ending.position.y) ==  Math.round(parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle1))){
                    angle = Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2))));
                    console.log("+0");
                }


                angle1 = Math.PI - Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2))));
                if(Math.round(ending.position.x) == Math.round(parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle1)) &&
                Math.round(ending.position.y) ==  Math.round(parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle1))){
                    angle = Math.PI - Math.asin(yPos/(Math.sqrt(Math.pow(xPos,2) + Math.pow(yPos,2))));
                    console.log("+PI - angle");
                }
                
                console.log(angle, (ending.position.x), (parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle1)),
                Math.round(ending.position.y),  Math.round(parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle1)));

               start=0;
           }           
    
           document.getElementById("console").innerHTML = 
           "X:" + ending.position.x + "<br>" +
           "Y:" + ending.position.y + "<br>" +
           "Z:" + ending.position.z + "<br>" +
           "Speed:" + commandType[instructionNumber].f + "<br>" + 
           "Line:" + instructionNumber + "<br>";

           //if(ending.position.x > endPos.x-0.01 && ending.position.x < endPos.x+0.01 && ending.position.y > endPos.y-0.01 && ending.position.y < endPos.y+0.01) {
           if(1){   
               ending.position.x = parseFloat(circle.centerX) + parseFloat(circle.radius) * Math.cos(angle);
               ending.position.y = parseFloat(circle.centerY) + parseFloat(circle.radius) * Math.sin(angle);
               if(commandType[instructionNumber].name == "G2") angle += 0.01* commandType[instructionNumber].f/1000;
               if(commandType[instructionNumber].name == "G3") angle -= 0.01* commandType[instructionNumber].f/1000;
           }
           if(Math.round(ending.position.y*10)/10 == endPos.y && Math.round(ending.position.x*10)/10 == endPos.x) {
               console.log(circle);
               start=1;
               startPos = new BABYLON.Vector3.Zero;
               angle=0;
               endPos = startPos;
               deltaPos = endPos;
               //ending.position = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
               instructionNumber++;
              // console.log("Końcowa pozycja: ",ending.position);
               console.log(instructionNumber);
           }           
       }


       
       if(cnt == 5){ //rysowanie linii za końcówką
         v1 = v2;
         v2 = new BABYLON.Vector3(ending.absolutePosition.x,ending.absolutePosition.y,ending.absolutePosition.z);
         lines = BABYLON.Mesh.CreateLines("lines", [v1,v2], scene);
         cnt = 0;      
       }
       cnt++;} else instructionNumber++};
   });
   window.addEventListener('resize', function(){
       engine.resize();
   });
});
