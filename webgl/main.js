var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
var bloomStrength = 1.5;
var bloomRadius = 0;
var bloomThreshold = 0.1;
var start = Date.now();
var colors = {"20": {"25": 0xff0000, "-15": 0xffa500}, "10": {"10": 0xffff00, "-30": 0xff0011}, "0": {"20": 0x0000ff, "-20": 0x0000ff}, "-10": {"30": 0xff0011, "-10": 0xffff00}, "-20": {"15": 0xffa500, "-25": 0xff0000}};

var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

document.getElementById('holder').style.visibility = 'hidden';


var sphereMats = [];

var clock = new THREE.Clock();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateSphere(scene, rotation, radius, widthSegment=40, heightSegment=400, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1) {
  //geometry = new THREE.CubeGeometry(200,200,200);
    var sphereMat;
    var sphereGeo = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
    var transparent = false;
    if (opacity < 1) {
        transparent = true;
        sphereMat = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: opacity, transparent: transparent});
        var mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.z = meshZ;
        mesh.position.y = meshY;
        mesh.position.x = meshX;
        mesh.rotation.y=rotation;
        scene.add(mesh);
        return mesh;
    } else {

        sphereMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { // float initialized to 0
            type: "f",
            value: 0.0
          },
          colourType: {
            type: "i",
            value: getRandomInt(4)
          }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        opacity: opacity,
        transparent: transparent
        });
        sphereMats.push(sphereMat);
        var mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.z = meshZ;
        mesh.position.y = meshY;
        mesh.position.x = meshX;
        mesh.rotation.y=rotation;
        scene.add(mesh);
        return mesh;

    }


    //               planetMaterial.shininess = 150;

    //
    //sphereMat.map = loader.load("https://ssajnani.github.io/webgl/sun2.jpg");
    // create a multimaterial

}

function generateOrbit(scene, rotation, radius, widthSegment=40, heightSegment=400, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1) {
  //geometry = new THREE.CubeGeometry(200,200,200);
  var sphereMat;
  var sphereGeo = new THREE.CircleGeometry(radius, 128, 0, 6.3);
  sphereGeo.vertices.shift();
  sphereGeo.rotateZ(-Math.PI / 2);
  sphereMat = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
  var mesh = new THREE.Line( sphereGeo, sphereMat );
  mesh.position.z = meshZ;
  mesh.position.y = meshY;
  mesh.position.x = meshX;
  scene.add(mesh);
  return mesh;
  //               planetMaterial.shininess = 150;

  //
  //sphereMat.map = loader.load("https://ssajnani.github.io/webgl/sun2.jpg");
  // create a multimaterial

}

function generateText(scene, rotation, meshZ=-100, meshY, meshX, color, opacity, title){
    console.log(title);
    var loader = new THREE.FontLoader();
    loader.load( 'https://raw.githubusercontent.com/ssajnani/ssajnani.github.io/master/webgl/fonts/helvetiker_regular.typeface.json', function ( font ) {

      var options = {
        size: 2,
        weight: 'normal',
        font: font,
        style: 'normal',
        height: 0,
        curveSegments: 30
      };

      // the createMesh is the same function we saw earlier
      var text1 = new THREE.Mesh(new THREE.TextGeometry(title, options), new THREE.MeshBasicMaterial({
        color: color,
      }));
      text1.position.z = meshZ;
      text1.position.y = meshY;
      text1.position.x = meshX;
      text1.rotation = rotation;
      text1.visible = false;
      scene.add(text1);
    });

}


function calculateStarRadius(max, min){
    return Math.random() * (max-min) + min;
}

function createS (scene, positions, radius, zDistance, color=0x000000, opacity=1) {
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[0][0], positions[0][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[1][0], positions[1][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[2][0], positions[2][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[3][0], positions[3][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[4][0], positions[4][1], color, opacity);
}

function createText(scene, positions, zDistance, titles, color = 0xA9A9A9, opacity=1){
    console.log(titles[0]);
  generateText(scene, 5, zDistance, positions[0][0], positions[0][1]-18, color, opacity, titles[0]);
  generateText(scene, 5, zDistance, positions[1][0], positions[1][1]+7, color, opacity, titles[1]);
  generateText(scene, 5, zDistance, positions[2][0], positions[2][1]-16, color, opacity, titles[2]);
  generateText(scene, 5, zDistance, positions[3][0], positions[3][1]-18, color, opacity, titles[3]);
  generateText(scene, 5, zDistance, positions[4][0], positions[4][1]+7, color, opacity, titles[4]);
}

function createOrbits(scene, positions, radius, zDistance, color=0x000000, opacity=1) {
    generateOrbit(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[0][0], positions[0][1], color, opacity);
    generateOrbit(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[1][0], positions[1][1], color, opacity);
    generateOrbit(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[2][0], positions[2][1], color, opacity);
    generateOrbit(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[3][0], positions[3][1], color, opacity);
    generateOrbit(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[4][0], positions[4][1], color, opacity);
}

// var geometry = new THREE.CircleGeometry(1, 128);
// geometry.vertices.shift();
// geometry.rotateZ(-Math.PI / 2);
// var material = new THREE.LineBasicMaterial( { color: 0xCC0000 } );
// var mesh = new THREE.Line( geometry, material );
// var orbit = new THREE.Group();
// orbit.add(mesh);



// create a scene, that will hold all our elements such as objects, cameras and lights.
var sceneConstellations = new THREE.Scene();
var sceneStars = new THREE.Scene();
var sceneBG = new THREE.Scene();
var sceneSolarOutline = new THREE.Scene();
var sceneText = new THREE.Scene();
var sceneOrbits = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

// create a render and set the size
var webGLRenderer = new THREE.WebGLRenderer({antialiasing : true, alpha: true});
webGLRenderer.setClearColor(0x000, 0.0);
webGLRenderer.setPixelRatio(window.devicePixelRatio);
webGLRenderer.autoClear = true;
webGLRenderer.setSize(WIDTH, HEIGHT);
webGLRenderer.toneMapping = THREE.LinearToneMapping;

var firstSPos = [[20, 22], [10, 10], [0,20], [-10,30], [-20,15]];
var textFPos = [[20, 25], [10, 10], [0,20], [-10,30], [-20,15]];
var workTitles = ['Projects', 'Education', 'Resume', 'Youtube', 'Research'];
var secondSPos = [[20,-15], [10, -30], [0,-20], [-10,-10], [-20,-25]];
var textSPos = [[20,-15], [10, -30], [0,-20], [-10,-10], [-20,-25]];
var hobbyTitles = ['Blog', 'Photography', 'Dance', 'Music', 'Twitter'];


createS(sceneConstellations, firstSPos, [0.2, 0.1], -100, 0xffffff);
createOrbits(sceneOrbits, firstSPos, [0.4, 0.5], -100, 0xffffff);
createOrbits(sceneOrbits, firstSPos, [0.6, 0.6], -100, 0xffffff);
createS(sceneSolarOutline, firstSPos, [6, 6], -100, 0x000000, 0.2);
createText(sceneText, textFPos, -100, hobbyTitles);
//createLineTrace(scene, firstSPos, 0.1);
createS(sceneConstellations, secondSPos, [0.2, 0.1], -100, 0xffffff);
createOrbits(sceneOrbits, secondSPos, [0.4, 0.5], -100, 0xffffff);
createOrbits(sceneOrbits, secondSPos, [0.6, 0.6], -100, 0xffffff);
createS(sceneSolarOutline, secondSPos, [6, 6], -100, 0x000000, 0.2);
createText(sceneText, textSPos, -100, workTitles);

sceneOrbits.traverse( function ( object ) { object.visible = false; } );

//This will add a starfield to the background of a scene
var starsGeometry = new THREE.Geometry();

for ( var i = 0; i < 100000; i ++ ) {

    var star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 5000 );
    star.y = THREE.Math.randFloatSpread( 5000 );
    star.z = THREE.Math.randFloat(-350, -450 );
    // starsGeometry.filter(.vertices[0].x);

    starsGeometry.vertices.push( star );

}
var starsMaterial = new THREE.PointsMaterial( { color: 0xffffff } );

var starField = new THREE.Points( starsGeometry, starsMaterial );

sceneStars.add( starField );


camera.lookAt(new THREE.Vector3(-100, 0, 0));



var light = new THREE.PointLight(0xFFFFFF, 0.5, 0);
light.position.z = -100;
light.position.x = 0;
light.position.y = 0;
var light2 = new THREE.PointLight(0xFFFFFF, 3, 0);
light2.position.z = -100;
light2.position.x = 0;
light2.position.y = 0;
sceneConstellations.add(light2);
sceneSolarOutline.add(light);

var materialColor = new THREE.MeshBasicMaterial({ depthTest: false, color: 0xFFFFFF});
var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
bgPlane.position.z = -2000;
bgPlane.scale.set(window.innerWidth, window.innerHeight, 1);
sceneBG.add(bgPlane);

// add the output of the renderer to the html element
document.getElementById('container').append(webGLRenderer.domElement);
dynamicallyResize();
let delta = 0;
// 30 fps
let interval = 1 / 30;

var composer = preRender();
animate();



function preRender(){
    var composer = new THREE.EffectComposer(webGLRenderer);
    composer.autoClear = true;



    var renderPass = new THREE.RenderPass(sceneConstellations, camera);
    renderPass.clear = false;
    var renderPass2 = new THREE.RenderPass(sceneStars, camera);
    renderPass2.clear = false;
    var renderPass3 = new THREE.RenderPass(sceneSolarOutline, camera);
    renderPass3.clear = false;
    var renderPass4 = new THREE.RenderPass(sceneText, camera);
    renderPass4.clear = false;
    var renderPass5 = new THREE.RenderPass(sceneOrbits, camera);
    renderPass5.clear = false;
  composer.autoClear = false;



    var starMask = new THREE.MaskPass(sceneConstellations, camera);
    var clearMask = new THREE.ClearMaskPass();

    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );
    var copyShader = new THREE.ShaderPass(THREE.CopyShader);
    copyShader.renderToScreen = true;


    var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 			bloomStrength, bloomRadius, bloomThreshold);

    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;


    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(renderPass3);
    composer.addPass(renderPass4);
    composer.addPass(renderPass5);
    composer.addPass(starMask);
    composer.addPass(effectFXAA);
    composer.addPass(clearMask);
    composer.addPass(effectFXAA);
    composer.addPass(bloomPass);
    composer.addPass(copyShader);




    return composer;
}

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;




function animate(time) {
    // Put your drawing code here
        for (var num=0; num < sphereMats.length; num ++){
          sphereMats[num].uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
        }

        // render using requestAnimationFrame
        //            webGLRenderer.render(scene, camera);\


        requestAnimationFrame(animate);
        delta += clock.getDelta();
        if (delta  > interval) {
          // The draw or time dependent code are here
          composer.reset();
          composer.render();
          TWEEN.update(time);


          delta = delta % interval;
        }







}


document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener("touch", touchHandler, false);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( sceneSolarOutline.children );


    if ( intersects.length > 0 ) {

        console.log(intersects);

    }

}

var lastMove = Date.now();
document.addEventListener( 'mousemove', onDocumentMouseMove);
document.addEventListener( 'click', onDocumentMouseClick);

var UUID = "";

function dynamicallyResize(){
    var constChildren = sceneConstellations.children;
    var const2 = sceneStars.children;
    console.log(window);
    if (window.innerWidth <= window.innerHeight || (window.innerWidth < 700 || window.innerHeight < 500)){
        canvas.setAttribute( 'width', canvasWidth );
        canvas.setAttribute( 'height', canvasHeight );
        camera.position.x = -20;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.lookAt(new THREE.Vector3(-20, 0, -100));
        for (var j=0; j < constChildren.length; j ++){
            if (constChildren[j].position.x > 0){
            constChildren[j].visible = false;
                for (var i = 0; i < const2.length; i ++){
                    if (const2[i].position.x === constChildren[j].position.x){
                        const2[i].visible = false;
                    }
                }
            }
        }
    } else {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.lookAt(new THREE.Vector3(0, 0, -100));
        var constChildren = sceneConstellations.children;
        for (var j=0; j < constChildren.length; j ++){
            if (constChildren[j].position.x > 0){
            constChildren[j].visible = true;
                for (var i = 0; i < const2.length; i ++){
                    if (const2[i].position.x === constChildren[j].position.x){
                        const2[i].visible = true;
                    }
                }
            }
        }
    }
}

function onDocumentMouseMove( event ) {

    event.preventDefault();
    if (Date.now() - lastMove < 120) { // 32 frames a secon
        return;
    } else {
        lastMove = Date.now();
    }
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var children = sceneSolarOutline.children;
    var constChildren = sceneConstellations.children;
    var textChildren = sceneText.children;

    var intersects = raycaster.intersectObjects( children );

    for (var i = 0; i < intersects.length; i ++){
        if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && intersects[i].object.geometry.type === "SphereGeometry"){
            for (var j=0; j < constChildren.length; j ++){
                if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.boundingSphere.radius <= 0.5 && UUID !== constChildren[j].uuid){

                    UUID = constChildren[j].uuid;
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 18 && child.position.y === constChildren[j].position.y);
                    if (textFilter !== undefined && textFilter.length != 0) {

                      textFilter[0].visible = true;
                    }
                    var radius = constChildren[j].geometry.parameters.radius;
                    var scale = radius * 150;
                    constChildren[j].scale.set(scale, scale, scale);

                    //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                } else {
                    UUID = "";
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 18 && child.position.y === constChildren[j].position.y);
                    if (textFilter !== undefined && textFilter.length != 0) {
                      textFilter[0].visible = false;
                    }
                    constChildren[j].scale.set(1, 1, 1);
                    //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                }
            }
        }
    }
}
const sleep = (milliseconds, j) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds, j))
};
// keep this outside of the event-handler
var lookAtPosition = new THREE.Vector3(0, 0, -100);
var lookAtTween = new TWEEN.Tween(lookAtPosition);

// as lookAt is not a property we can assign to we need to
// call it every time the tween was updated:
lookAtTween.onUpdate(function() {
  camera.lookAt(lookAtPosition);
});

function touchHandler(event){
  if(event.touches.length > 1){
    //the event is multi-touch
    //you can then prevent the behavior
    event.preventDefault()
  }
}



function onDocumentMouseClick( event ) {


  event.preventDefault();
  if (Date.now() - lastMove < 80) { // 32 frames a second
    return;
  } else {
    lastMove = Date.now();
  }
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var children = sceneSolarOutline.children;
  var constChildren = sceneConstellations.children;
  var textChildren = sceneText.children;

  var intersects = raycaster.intersectObjects( children );

  for (var i = 0; i < intersects.length; i ++){
    if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && intersects[i].object.geometry.type === "SphereGeometry"){
      for (var j=0; j < constChildren.length; j ++){
        if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.boundingSphere.radius <= 0.5 && UUID !== constChildren[j].uuid){
          document.removeEventListener('mousemove', onDocumentMouseMove);

          UUID = constChildren[j].uuid;
          lookAtTween
            .stop() // just in case it's still animating
            .to(constChildren[j].position, 1000) // set destination and duration
            .start(); // start the tween
          var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 18 && child.position.y === constChildren[j].position.y);
          if (textFilter !== undefined && textFilter.length != 0) {
            textFilter[0].visible = false;
          }
          constChildren[j].scale.set(1, 1, 1);
          sceneSolarOutline.traverse( function ( object ) { object.visible = false; } );
          sleep(1500,j).then((j)=> {
            // document.getElementsByClassName('fixedContainer')[0].style.visibility = 'visible';
            // document.getElementsByClassName('fixedContainer')[1].style.visibility = 'visible';
            // document.getElementById('speedAdjFactor').setAttribute('value', '0.7');
            // document.getElementById('density').setAttribute('value', '100');
            // document.getElementById('starSize').setAttribute('value', '0.7');
            // keep this outside of the event-handler
            var prePosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
            var preTween = new TWEEN.Tween(prePosition);

// as lookAt is not a property we can assign to we need to
// call it every time the tween was updated:
            preTween.onUpdate(function() {
              camera.position.x = prePosition.x;
              camera.position.y = prePosition.y;
              camera.position.z = prePosition.z + 20;
              camera.lookAt(constChildren[j].position);
            });

            var newPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
            newPos.z = newPos.z -100 ;
            preTween
              .stop() // just in case it's still animating
              .to(newPos, 1000) // set destination and duration
              .start(); // start the tween


            $('#holder').css('visibility','visible').hide().fadeIn("slow");
            mouseActive = true;
            sleep(2000, j).then((j) => {
              mouseActive = false;
              sleep(1000, j).then((j) => {

                $('#holder').fadeTo("slow", 0);
                console.log(constChildren[j]);
                camera.position.x = constChildren[j].position.x;
                camera.position.y = constChildren[j].position.y;
                camera.position.z = constChildren[j].position.z + 20;
                camera.lookAt(constChildren[j].position);
                var currentPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
                var currentTween = new TWEEN.Tween(currentPosition);
                currentTween.onUpdate(function() {
                  camera.position.z = currentPosition.z;
                });
                var newPosition = new THREE.Vector3(camera.position);
                newPosition.z = newPosition.z -92 ;
                currentTween
                  .stop() // just in case it's still animating
                  .to(newPosition, 1000) // set destination and duration
                  .start(); // start the tween
                console.log("ChildOut:" + constChildren[j].position.x + ", " + constChildren[j].position.y + ", " + constChildren[j].position.z );
                sceneOrbits.visible = true;
                sceneOrbits.traverse( function ( object ) {
                  if (object.position.x === constChildren[j].position.x && object.position.y === constChildren[j].position.y && object.position.z === constChildren[j].position.z) {
                    console.log(object);
                    object.visible = true;
                  }
                });

              });

            });
          });
        }
      }
    }
  }
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    dynamicallyResize();

    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    var constChildren = sceneConstellations.children;
    var textChildren = sceneText.children;
    for (var j=0; j < constChildren.length; j ++){
        constChildren[j].scale.set(1,1,1);
    }
    for (var j=0; j < textChildren.length; j ++){
        textChildren[j].visible = false;
    }

}