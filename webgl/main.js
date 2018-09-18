var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;
var bloomStrength = 2;
var bloomRadius = 0;
var bloomThreshold = 0.1;
var start = Date.now();
var colors = {"20": {"25": 0xff0000, "-15": 0xffa500}, "10": {"10": 0xffff00, "-30": 0xff0011}, "0": {"20": 0x0000ff, "-20": 0x0000ff}, "-10": {"30": 0xff0011, "-10": 0xffff00}, "-20": {"15": 0xffa500, "-25": 0xff0000}};

var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var sphereMats = [];

function generateSphere(scene, rotation, radius, widthSegment=40, heightSegment=400, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1) {
  //geometry = new THREE.CubeGeometry(200,200,200);
    var sphereMat;
    var sphereGeo = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
    var transparent = false;
    if (opacity < 1) {
        transparent = true;
        sphereMat = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: opacity, transparent: transparent});
    } else {
        var loader = new THREE.TextureLoader();
        sphereMat = new THREE.ShaderMaterial({
          uniforms: {
            tExplosion: {
              type: "t",
              value: loader.load('https://ssajnani.github.io/webgl/explosion.png')
            },
            time: { // float initialized to 0
              type: "f",
              value: 0.0
            }
          },
          vertexShader: document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent,
          opacity: opacity,
          transparent: transparent
        });
        sphereMats.push(sphereMat);
    }


    //               planetMaterial.shininess = 150;

    //
    //sphereMat.map = loader.load("https://ssajnani.github.io/webgl/sun2.jpg");
    // create a multimaterial
    var mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.z = meshZ;
    mesh.position.y = meshY;
    mesh.position.x = meshX;
    mesh.rotation.y=rotation;
    scene.add(mesh);
    return mesh;
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






// create a scene, that will hold all our elements such as objects, cameras and lights.
var sceneConstellations = new THREE.Scene();
var sceneStars = new THREE.Scene();
var sceneBG = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

// create a render and set the size
var webGLRenderer = new THREE.WebGLRenderer({antialiasing : true, alpha: true});
webGLRenderer.setClearColor(0x000, 0.0);
webGLRenderer.setSize(WIDTH, HEIGHT);
webGLRenderer.toneMapping = THREE.LinearToneMapping;


var firstSPos = [[20, 25], [10, 10], [0,20], [-10,30], [-20,15]];
var secondSPos = [[20,-15], [10, -30], [0,-20], [-10,-10], [-20,-25]];

createS(sceneConstellations, firstSPos, [0.1, 0.05], -100, 0xffffff);
createS(sceneStars, firstSPos, [6, 6], -100, 0x000000, 0.01);
//createLineTrace(scene, firstSPos, 0.1);
createS(sceneConstellations, secondSPos, [0.1, 0.05], -100, 0xffffff);
createS(sceneStars, secondSPos, [6, 6], -100, 0x000000, 0.01);

//This will add a starfield to the background of a scene
var starsGeometry = new THREE.Geometry();

for ( var i = 0; i < 10000; i ++ ) {

    var star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 2000 );
    star.y = THREE.Math.randFloatSpread( 2000 );
    star.z = THREE.Math.randFloatSpread( 2000 );

    starsGeometry.vertices.push( star );

}
var starsMaterial = new THREE.PointsMaterial( { color: 0xffffff } );

var starField = new THREE.Points( starsGeometry, starsMaterial );

sceneStars.add( starField );


camera.lookAt(new THREE.Vector3(-100, 0, 0));

var orbitControls = new THREE.OrbitControls(camera, webGLRenderer.domElement);


var light = new THREE.PointLight(0xFFFFFF, 0.5, 0);
light.position.z = -100;
light.position.x = 0;
light.position.y = 0;
var light2 = new THREE.PointLight(0xFFFFFF, 3, 0);
light2.position.z = -100;
light2.position.x = 0;
light2.position.y = 0;
sceneConstellations.add(light2);
sceneStars.add(light);

var materialColor = new THREE.MeshBasicMaterial({ depthTest: false, color: 0xFFFFFF});
var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
bgPlane.position.z = -2000;
bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
sceneBG.add(bgPlane);

// add the output of the renderer to the html element
document.getElementById('container').append(webGLRenderer.domElement);

preRender();
render();


function preRender(){
    var renderPass = new THREE.RenderPass(sceneConstellations, camera);
    renderPass.clear = false;
    var renderPass2 = new THREE.RenderPass(sceneStars, camera);
    renderPass2.clear = false;



    var starMask = new THREE.MaskPass(sceneConstellations, camera);
    var clearMask = new THREE.ClearMaskPass();

    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );

    var copyShader = new THREE.ShaderPass(THREE.CopyShader);
    copyShader.renderToScreen = true;


    var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 			bloomStrength, bloomRadius, bloomThreshold);

    composer = new THREE.EffectComposer(webGLRenderer);
    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;

    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(starMask);
    composer.addPass(effectFXAA);
    composer.addPass(effectFXAA);
    composer.addPass(clearMask);
    composer.addPass(bloomPass);
    composer.addPass(copyShader);
}

function render() {



    for (var num=0; num < sphereMats.length; num ++){
      sphereMats[num].uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    }

    // render using requestAnimationFrame
//            webGLRenderer.render(scene, camera);\
    composer.render();
    requestAnimationFrame(render);
}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( sceneStars.children );


    if ( intersects.length > 0 ) {

        console.log(intersects);

    }

}

document.addEventListener( 'mousemove', onDocumentMouseMove);

var UUID = "";

function onDocumentMouseMove( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var children = sceneStars.children;
    var constChildren = sceneConstellations.children;

    var intersects = raycaster.intersectObjects( children );
    var newUUID = "";
    loop1:
        for (var i = 0; i < intersects.length; i ++){
            if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && intersects[i].object.geometry.type === "SphereGeometry"){
                loop2:
                    for (var j=0; j < constChildren.length; j ++){
                        if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.boundingSphere.radius <= 0.5 && UUID !== constChildren[j].uuid){
                            newUUID = constChildren[j].uuid;
                            var radius = constChildren[j].geometry.parameters.radius;
                            var scale = radius * 100; // adjust the multiplier to whatever
                            constChildren[j].scale.set(scale, scale, scale);
                            //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                            preRender();
                            render();
                            break loop1
                        } else if (UUID === constChildren[j].uuid) {
                            return
                        }
                    }
            }
        }
    console.log("newUUID:" + newUUID);
    for (var bac=0; bac < constChildren.length; bac ++){
        if (UUID === constChildren[bac].uuid){
            console.log("old UUID:" + UUID);
            UUID = newUUID;
            console.log(constChildren[bac]);
            constChildren[bac].scale.set(1, 1, 1);
            //constChildren[bac].material.color.set(0xffffff);
            preRender();
            render();
        }
    }
    if (UUID === ""){
        UUID = newUUID
    }
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);

}