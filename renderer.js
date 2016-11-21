window.addEventListener('DOMContentLoaded', function(){
   var canvas = document.getElementById('renderCanvas');
   var engine = new BABYLON.Engine(canvas, true);

   var cone, sphere1, ground, cone1;

   var createScene = function(){
       var scene = new BABYLON.Scene(engine);
       var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
       camera.setTarget(BABYLON.Vector3.Zero());
       camera.attachControl(canvas, false);
       var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);


        cone = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 1, tessellation: 40}, scene);
       cone.position.y = 1;

       sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 1.2},scene);
       sphere1.position.y = 2;
       cone1 = BABYLON.MeshBuilder.CreateCylinder("cone1", {diameterTop: 1, tessellation: 40}, scene);
       cone1.position.y = 1;
       cone1.parent = sphere1;

      sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 1.2},scene);
      sphere2.position.y = 1;
      cone2 = BABYLON.MeshBuilder.CreateCylinder("cone2", {diameterTop: 1, tessellation: 40}, scene);
      cone2.position.y = 1;
      cone2.parent = sphere2;

      sphere2.parent = cone1;


        ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
       return scene;
   }

   var scene = createScene();
   engine.runRenderLoop(function(){
       scene.render();

       sphere1.rotation.x = 0.8;
       sphere1.rotation.y += 0.01;

       sphere2.rotation.x = 0.8;
       sphere2.rotation.y += 0.01;
   });
   window.addEventListener('resize', function(){
       engine.resize();
   });
});
