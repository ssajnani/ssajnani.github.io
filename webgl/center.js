
var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;

var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var container = document.getElementById('container');

var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.set(0, 0, 0);
var scene = new THREE.Scene();

var light = new THREE.PointLight(0xFFFFFF, 1, 0);
light.position.set(-100, 0, 0);
scene.add(light);

function generateSphere(scene, rotation, radius, widthSegment=40, heightSegment=400, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1){
    var sphereGeo = new THREE.SphereGeometry (radius, widthSegment, heightSegment),
        sphereMat = new THREE.MeshPhongMaterial({ambient: ambient, opacity: opacity, transparent: true});
    var loader = new THREE.TextureLoader();
    sphereMat.map = loader.load("https://ssajnani.github.io/webgl/sun2.jpg");
    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(meshZ, meshY, meshX);
    sphereMesh.rotation.y=rotation;
    scene.add(sphereMesh);
    return sphereMesh

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
    var intersects = raycaster.intersectObjects( scene.children );


    if ( intersects.length > 0 ) {

        console.log(intersects);

    }

}



function calculateStarRadius(max, min){
    return Math.random() * (max-min) + min;
}

function createS (positions, radius, zDistance, color=0x000000, opacity=1) {
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[0][0], positions[0][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[1][0], positions[1][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[2][0], positions[2][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[3][0], positions[3][1], color, opacity);
    generateSphere(scene, 5, calculateStarRadius(radius[0], radius[1]), 40, 400, zDistance, positions[4][0], positions[4][1], color, opacity);
}

function createLineTrace(scene, positions, lineWidth){
    var material = new MeshLineMaterial({
        opacity: 0.1,
        lineWidth: lineWidth
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( -100, positions[0][0], positions[0][1] ),
        new THREE.Vector3( -100, positions[1][0], positions[1][1]),
        new THREE.Vector3( -100, positions[2][0], positions[2][1] ),
        new THREE.Vector3( -100, positions[3][0], positions[3][1]),
        new THREE.Vector3( -100, positions[4][0], positions[4][1] )
    );
    var line = new MeshLine();
    line.setGeometry( geometry );

    var comp = new THREE.Mesh( line.geometry, material );
    scene.add( comp );
}

var firstSPos = [[20, 15], [10, 30], [0,20], [-10,10], [-20,25]];
var secondSPos = [[20,-25], [10, -10], [0,-20], [-10,-30], [-20,-15]];

createS(firstSPos, [0.5, 0.3], -100, 0xffffff);
createS(firstSPos, [6, 6], -100, 0x000000, 0.1);
//createLineTrace(scene, firstSPos, 0.1);
createS(secondSPos, [0.5, 0.3], -100, 0xffffff);
createS(secondSPos, [6, 6], -100, 0x000000, 0.1);
//createLineTrace(scene, secondSPos, 0.1);


document.addEventListener( 'mousemove', onDocumentMouseMove);

var UUID = "";

function onDocumentMouseMove( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var children = scene.children;

    var intersects = raycaster.intersectObjects( children );
    var newUUID = "";
    loop1:
    for (var i = 0; i < intersects.length; i ++){
        if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && intersects[i].object.geometry.type === "SphereGeometry"){
    loop2:
            for (var j=0; j < children.length; j ++){
                if (intersects[i].object.position.x === children[j].position.x && intersects[i].object.position.y === children[j].position.y && intersects[i].object.position.z === children[j].position.z && children[j].geometry.boundingSphere.radius <= 0.5 && UUID !== children[j].uuid){
                    newUUID = children[j].uuid;
                    var radius = children[j].geometry.parameters.radius;
                    var scale = radius * 20; // adjust the multiplier to whatever
                    children[j].scale.set(scale, scale, scale);
                    renderer.render(scene, camera);
                    break loop1
                } else if (UUID === children[j].uuid) {
                    return
                }
            }
        }
    }
    console.log("newUUID:" + newUUID);
    for (var bac=0; bac < children.length; bac ++){
        if (UUID === children[bac].uuid){
            console.log("old UUID:" + UUID);
            UUID = newUUID;
            console.log(children[bac]);
            children[bac].scale.set(1, 1, 1);
            renderer.render(scene, camera);
        }
    }
    if (UUID === ""){
        UUID = newUUID
    }
}

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

scene.add( starField );


camera.lookAt( new THREE.Vector3(-100, 0, 0) );

//Renderer code. We'll get to this in a moment
var renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);
renderer.domElement.style.position = 'relative';

container.appendChild(renderer.domElement);
renderer.autoClear = false;
renderer.shadowMapEnabled = true;

function render () {
    renderer.render(scene, camera);
}
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

}

render();
