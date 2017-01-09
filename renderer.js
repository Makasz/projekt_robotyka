window.addEventListener('DOMContentLoaded', function(){
   var canvas = document.getElementById('renderCanvas');
   var engine = new BABYLON.Engine(canvas, true);
   var cone, sphere1, ground, cone1,chwytak, ending,lines,v1,v2,camera1,cnt=0,x_axis,y_axis,z_axis,start=1,instructionNumber=1, startPos, endPos, deltaPos, end=0;
   var createScene = function(){
       var scene = new BABYLON.Scene(engine);
       camera1 = new BABYLON.ArcRotateCamera("camera1", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
       camera1.setTarget(BABYLON.Vector3.Zero());
       camera1.attachControl(canvas, false);
       var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
       
      ending = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter: 0.1},scene);
      v2 = new BABYLON.Vector3(ending.absolutePosition.x,ending.absolutePosition.y,ending.absolutePosition.z);

      x_axis = BABYLON.Mesh.CreateLines("x_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(10,0,0)], scene);
      y_axis = BABYLON.Mesh.CreateLines("y_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,10,0)], scene);
      z_axis = BABYLON.Mesh.CreateLines("z_axis", [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,0,10)], scene);

      return scene;
   }

   var scene = createScene();
   engine.runRenderLoop(function(){
       scene.render();

       if(commandType[instructionNumber].name == "G420") {
           
       }

       if(commandType[instructionNumber].name == "G1") {
           
           if(start == 1) {
                if(commandType[instructionNumber].x == "0") commandType[instructionNumber].x = Math.round(100*ending.position.x)/100;
                if(commandType[instructionNumber].y == "0") commandType[instructionNumber].y = Math.round(100*ending.position.y)/100;
                if(commandType[instructionNumber].z == "0") commandType[instructionNumber].z = Math.round(100*ending.position.z)/100;
                console.log(commandType[instructionNumber]);
                startPos = ending.position;
                endPos = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
                deltaPos = new BABYLON.Vector3(endPos.x - startPos.x, endPos.y - startPos.y, endPos.z - startPos.z);           
               start=0;
           }

           if(deltaPos.x > 0 && ending.position.x < endPos.x) {
               ending.position.x += 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.x);
           }
           if(deltaPos.y > 0 && ending.position.y < endPos.y) {
               ending.position.y += 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.y);
           }
           if(ending.position.z < endPos.z) {
               ending.position.z += 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.z);
           }

           if(deltaPos.x < 0 && ending.position.x > endPos.x) {
               ending.position.x -= 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.x);
           }
           if(deltaPos.y < 0 && ending.position.y > endPos.y) {
               ending.position.y -= 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.y);
           }
           if(ending.position.z > endPos.z) {
               ending.position.z -= 0.01 * commandType[instructionNumber].f/1000;
               //console.log(ending.position.z);
           }

           document.getElementById("console").innerHTML = 
           "X:" + ending.position.x + "<br>" +
           "Y:" + ending.position.y + "<br>" +
           "Z:" + ending.position.z + "<br>" +
           "Speed:" + commandType[instructionNumber].f + "<br>" + 
           "Line:" + instructionNumber + "<br>";

           if(deltaPos.x > 0 && deltaPos.y > 0 && deltaPos.z > 0 && ending.position.x >= endPos.x && ending.position.y >= endPos.y && Math.round(ending.position.z*100)/100 >= endPos.z) {      
               start = 1;
               startPos = new BABYLON.Vector3.Zero;
               endPos = startPos;
               deltaPos = endPos;
               //ending.position = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
               instructionNumber++;
               console.log(ending.position);
               console.log(instructionNumber);
           }
           if(deltaPos.x < 0 && deltaPos.y < 0 && deltaPos.z < 0 && ending.position.x <= endPos.x && ending.position.y <= endPos.y && Math.round(ending.position.z*100)/100 <= endPos.z) {      
               start = 1;
               startPos = new BABYLON.Vector3.Zero;
               endPos = startPos;
               deltaPos = endPos;
               //ending.position = new BABYLON.Vector3(commandType[instructionNumber].x, commandType[instructionNumber].y, commandType[instructionNumber].z);
               instructionNumber++;
               console.log(ending.position);
               console.log(instructionNumber);
           }

       }
       camera1.setTarget(ending.position);

       //if(ending.position.z < 2) ending.position.z = ending.position.z + 0.01;
       //console.log(ending.position.z );

       if(cnt == 10){ //rysowanie linii za końcówką
         v1 = v2;
         v2 = new BABYLON.Vector3(ending.absolutePosition.x,ending.absolutePosition.y,ending.absolutePosition.z);
         lines = BABYLON.Mesh.CreateLines("lines", [v1,v2], scene);
         cnt = 0;      
       }
       cnt++;
   });
   window.addEventListener('resize', function(){
       engine.resize();
   });
});
