window.addEventListener('DOMContentLoaded', function(){
   var canvas = document.getElementById('renderCanvas');
   var engine = new BABYLON.Engine(canvas, true);
   var cone, sphere1, ground, cone1,chwytak, ending,lines,v1,v2;
   var createScene = function(){
       var scene = new BABYLON.Scene(engine);
       var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
       camera.setTarget(BABYLON.Vector3.Zero());
       camera.attachControl(canvas, false);
       var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);


        cone = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 0.4, tessellation: 40}, scene);
       cone.position.y = 1;

       sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 0.5},scene);
       sphere1.position.y = 2;
       cone1 = BABYLON.MeshBuilder.CreateCylinder("cone1", {diameter: .4, tessellation: 40}, scene);
       cone1.position.y = 1;
       cone1.parent = sphere1;

      sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 0.5},scene);
      sphere2.position.y = 1;
      cone2 = BABYLON.MeshBuilder.CreateCylinder("cone2", {diameterTop: 0, diameterBottom: 0.4, tessellation: 40}, scene);
      cone2.position.y = 1;
      cone2.parent = sphere2;

      ending = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter: 0.1},scene);
      ending.position.y = 2;
      ending.parent = sphere2;
      sphere1.rotation.x = 1;
      sphere2.parent = cone1;
      sphere2.rotation.x = 1.5;
      v2 = new BABYLON.Vector3(ending.absolutePosition.x,ending.absolutePosition.y,ending.absolutePosition.z);
      //ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
       return scene;
   }

   var scene = createScene();
   engine.runRenderLoop(function(){
       scene.render();
       v1 = v2

       sphere1.rotation.y += 0.01;

       sphere2.rotation.x = 1.5 + Math.sin(sphere1.rotation.y*5)/2;

       v2 = new BABYLON.Vector3(ending.absolutePosition.x,ending.absolutePosition.y,ending.absolutePosition.z);
       lines = BABYLON.Mesh.CreateLines("lines", [v1,v2], scene);
       console.log(v1 + "   " +v2);
   });
   window.addEventListener('resize', function(){
       engine.resize();
   });
});
