

var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
  isMobile = true;
}
var WIDTH = window.innerWidth ,
    HEIGHT = window.innerHeight;
    
var headerText = "";
var bloomStrength = 1.5;
var bloomRadius = 0;
var bloomThreshold = 0.1;
var start = Date.now();
var colors = {"20": {"25": 0xff0000, "-15": 0xffa500}, "10": {"10": 0xffff00, "-30": 0xff0011}, "0": {"20": 0x0000ff, "-20": 0x0000ff}, "-10": {"30": 0xff0011, "-10": 0xffff00}, "-20": {"15": 0xffa500, "-25": 0xff0000}};

var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var objectDict = {};



var sphereMats = [];

var clock = new THREE.Clock();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateSphere(scene, rotation, sphereGeo, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1) {
  //geometry = new THREE.CubeGeometry(200,200,200);
    var sphereMat;
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

function generateOrbit(scene, planets,imageurl, rotation, radius, widthSegment=40, heightSegment=400, meshZ=-100, meshY, meshX, ambient=0x000000, opacity=1) {
  //geometry = new THREE.CubeGeometry(200,200,200);
  var sphereMat;
  var sphereGeo = new THREE.CircleGeometry(radius, 128, 0, 6.3);
  var point = THREE.GeometryUtils.randomPointsInGeometry(sphereGeo, 1);
  var geometry = new THREE.CircleGeometry(0.06, 32, 32);
  const myUrl = imageurl;

  const textureLoader = new THREE.TextureLoader();
  const myTexture = textureLoader.load(myUrl);
  var material = new THREE.MeshBasicMaterial( {map:myTexture, transparent: false, opacity: 1} );
  sphereMat = new THREE.LineBasicMaterial( { color: 0xFFFFFF, width: 10} );
  sphereGeo.vertices.shift();
  sphereGeo.rotateZ(THREE.Math.randFloatSpread(-Math.PI/1.3));
  sphereGeo.rotateX(THREE.Math.randFloatSpread(-Math.PI/1.3));
  sphereGeo.rotateY(THREE.Math.randFloatSpread(-Math.PI/1.3));
  var mesh = new THREE.Line( sphereGeo, sphereMat );
  mesh.position.z = meshZ;
  mesh.position.y = meshY;
  mesh.position.x = meshX;
  mesh.updateMatrixWorld();
  var positions = mesh.localToWorld(mesh.geometry.vertices[calculateRandomInt(129, 0)].clone());
  var testmesh = new THREE.Mesh( geometry, material );
  testmesh.position.x = positions.x;
  testmesh.position.y = positions.y;
  testmesh.position.z = positions.z;
  scene.add(mesh);
  planets.add( testmesh );
  return [testmesh, mesh];
  //               planetMaterial.shininess = 150;

  //
  //sphereMat.map = loader.load("https://ssajnani.github.io/webgl/sun2.jpg");
  // create a multimaterial

}

function generateText(scene, rotation, meshZ=-100, meshY, meshX, color, opacity, title, size, font, uuid=0){
    
      var options = {
        size: size,
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
      if (uuid != 0){
        objectDict[uuid] = text1;
      }
      if (meshX < -10 && ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
        text1.visible = true;
      }
      return text1;

}

function generateEndOfNames(scene, rotation, meshZ=-100, meshY, meshX, color, opacity, title, font){
    var options = {
      size: 6,
      weight: 'normal',
      font: font,
      style: 'normal',
      height: 0,
      curveSegments: 30
    };

    // the createMesh is the same function we saw earlier
    var text1 = new THREE.Mesh(new THREE.TextGeometry(title, options));
    text1.position.z = meshZ;
    text1.position.y = meshY;
    text1.position.x = meshX;
    text1.rotation = rotation;
    scene.add(text1);
    if (title == "ajnani" && ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
      text1.visible = false;
    }
    return text1;
}


function calculateStarRadius(max, min){
    return Math.random() * (max-min) + min;
}

function calculateRandomInt(max, min){
  return parseInt(Math.random() * (max-min) + min);
}

function createS (scene, positions, radius, zDistance, color=0x000000, opacity=1) {
  var sphereGeo = new THREE.SphereGeometry(calculateStarRadius(radius[0], radius[1]), 40, 400);
  for (var i = 0; i < 5; i++){
    generateSphere(scene, 5, sphereGeo, zDistance, positions[i][0], positions[i][1], color, opacity);
  }
}
function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function createText(scene, positions, zDistance, titles, font, color = 0xA9A9A9, opacity=1){
  var results = [];
  results.push(generateText(scene, 5, zDistance, positions[0][0], positions[0][1]-18, color, opacity, titles[0],2, font));
  results.push(generateText(scene, 5, zDistance, positions[1][0], positions[1][1]+10, color, opacity, titles[1],2, font))
  results.push(generateText(scene, 5, zDistance, positions[2][0], positions[2][1]-16, color, opacity, titles[2],2, font));
  results.push(generateText(scene, 5, zDistance, positions[3][0], positions[3][1]-18, color, opacity, titles[3],2, font));
  var offset = 10;
  if ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500)){
    offset = -13;
  }
  results.push(generateText(scene, 5, zDistance, positions[4][0], positions[4][1]+offset, color, opacity, titles[4],2, font));
  return results; 
}

function createOrbitsProjects(scene, planets, desc, positions, zDistance, projects, color=0x000000, opacity=1) {
  var pLength = projects.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    projects = getRandom(projects, 5);
  }
  for (var i = 0; i < pLength; i++){
    var imageurl = "https://raw.githubusercontent.com/ssajnani/" + projects[i].name + "/master/images/va%402x.png"
    var result = generateOrbit(scene, planets, imageurl, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = projects[i].name + '///' + projects[i].description.replace('((Project))','') + '///' + projects[i].html_url;
    radius += 0.6;
  }
}

function createOrbitsEducation(scene, planets, desc, positions, zDistance, education, color=0x000000, opacity=1) {
  var pLength = education.length; 
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    education = getRandom(education, 5);
  }
  for (var i = 0; i < pLength; i++){
    var imageurl = "";
    if (education[i].school == "Western University"){
      imageurl = "./western_logo@3x.jpg";
    }
    var result = generateOrbit(scene, planets, imageurl, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = education[i].name + '///University: '+ education[i].school+' <br> Grade: ' + education[i].grade + '///' + education[i].url;
    radius += 0.6;
  }
}

function createOrbitsResearch(scene, planets, desc, positions, zDistance, research, research_description, color=0x000000, opacity=1) {
  var pLength = research.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    research = getRandom(research, 5);
  }
  for (var i = 0; i < pLength; i++){
    var imageurl = "";
    var name = research[i].name.replace('\.pdf', '');
    var description = research_description.find(o => o.name === name);
    if (description.school == "Western University"){
      imageurl = "./western_logo@3x.jpg";
    } else {
      imageurl = "./waterloo%403x.png";
    }
    var result = generateOrbit(scene, planets, imageurl, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = description.title + '///Description: ' + description.description +' <br> Supervisor: ' + description.supervisor + ' <br> University: '+ description.school+ '///' + research[i].html_url;
    radius += 0.6;
  }
}
function createOrbitsYoutube(scene, planets, desc, positions, zDistance, youtube, color=0x000000, opacity=1) {
  var pLength = youtube.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    youtube = getRandom(youtube, 5);
  }
  for (var i = 0; i < pLength; i++){
    var result = generateOrbit(scene, planets, "https://cors-anywhere.herokuapp.com/http://img.youtube.com/vi/"+youtube[i].id.videoId + '/0.jpg', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = youtube[i].snippet.title + '///Description: ' + youtube[i].snippet.description + '///https://www.youtube.com/watch?v=' + youtube[i].id.videoId;
    radius += 0.6;
  }
}


function createOrbitsWork(scene, planets, desc, positions, zDistance, work, color=0x000000, opacity=1) {
  work = work.Experience;
  var pLength = work.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    work = getRandom(work, 5);
  }
  for (var i = 0; i < pLength; i++){
    var imageurl = "";
    if (work[i].position.includes("IBM")){
      imageurl = "./ibm_logo%403x.png";
    } else {
      imageurl = "./western_logo@3x.jpg";
    }
    var result = generateOrbit(scene, planets, imageurl, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = work[i].position + '///'+work[i].bullets.replace(/\u2022/g, '<br>\u2022') + '///https://www.linkedin.com/in/samarsajnani/';
    radius += 0.6;
  }
}

function createOrbitsTwitter(scene, planets, desc, positions, zDistance, tweets, color=0x000000, opacity=1) {
  var pLength = tweets.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    tweets = getRandom(tweets, 5);
  }
  for (var i = 0; i < pLength; i++){
    var tweeterWTags = tweets[i].match(/<p class="user">([.\u0000-\uFFFF]*?)<\/p>/g);
    var tweeter = tweeterWTags[0].replace('<\/p>', '').replace('<p class="user">', '').trim().replace(/\s+/g, ' ');
    var tweetWTags = tweets[i].match(/<p class="tweet">([.\u0000-\uFFFF]*?)<\/p>/g);
    var tweet = tweetWTags[0].replace('<\/p>', '').replace('<p class="tweet">', '').trim().replace(/\s+/g, ' ');
    var tweetURL = "https://twitter.com/anyuse/status/" + tweets[i].match(/tweet_id=([.\u0000-\uFFFF]*?)"/g)[0].replace("tweet_id=", '').replace('"', '');
    var user_id = tweeter.split('@')[1];
    console.log();
    var result = generateOrbit(scene, planets, 'https://cors-anywhere.herokuapp.com/https://twitter.com/'+ user_id + '/profile_image?size=original', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = tweeter + '///'+ tweet + '///' + tweetURL;
    radius += 0.6;
  }
}

function createOrbitsInsta(scene, planets, desc, positions, zDistance, instagram, color=0x000000, opacity=1) {
  var pLength = instagram.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    instagram = getRandom(instagram, 5);
  }
  for (var i = 0; i < pLength; i++){
    var result = generateOrbit(scene, planets, instagram[i].url, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = instagram[i].desc + '/// ///https://www.instagram.com/p/' + instagram[i].code;
    radius += 0.6;
  }
}

function createOrbitsSpotify(scene, planets, desc, positions, zDistance, spotify, color=0x000000, opacity=1) {
  var pLength = spotify.length;
  var radius = 0.6;
  if (pLength > 5){
    pLength = 5;
    spotify = getRandom(spotify, 5);
  }
  for (var i = 0; i < pLength; i++){
    console.log(spotify[i].track_info);
    var result = generateOrbit(scene, planets, spotify[i].images[0].url, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    var tracks = spotify[i].track_info.items;
    var tLength = tracks.length;
    if (tLength > 5){
      tLength = 5;
      tracks = getRandom(tracks, 5);
    }
    var track_desc = "";
    for (var j=0; j< tLength; j++){
      track_desc += tracks[j].track.name + " ~ " + tracks[j].track.artists[0].name + "<br>";
    }
    objectDict[result[0].uuid] = spotify[i].name + '///'+track_desc+'///' + spotify[i].external_urls.spotify;
    radius += 0.6;
  }
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
var scenePlanets = new THREE.Scene();
var sceneDescriptions = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.x = 0;
camera.position.y = 1000;
camera.position.z = 0;

// create a render and set the size
var webGLRenderer = new THREE.WebGLRenderer({antialiasing : true, alpha: true});
webGLRenderer.setClearColor(0x000, 0.0);
webGLRenderer.setPixelRatio(window.devicePixelRatio);
webGLRenderer.autoClear = true;
webGLRenderer.setSize(WIDTH, HEIGHT);
webGLRenderer.toneMapping = THREE.LinearToneMapping;

var firstSPos = [[20, 17], [10, 5], [0,15], [-10,25], [-20,10]];
var textFPos = [[20, 17], [10,5], [0,15], [-10,25], [-20,10]];
var workTitles = ['Projects', 'Education', 'Research', 'Youtube', 'Work'];
var secondSPos = [[20,-40], [10, -60], [0,-50], [-10,-40], [-20,-55]];
var textSPos = [[20,-40], [10, -58], [0,-53], [-10,-40], [-20,-55]];
var hobbyTitles = ['Twitter', 'Photography', 'Dance', 'Music', 'Blog'];
var firstText, secondText, sajnani, samar;
getInfo(function(){
  $.getJSON('https://fastack.herokuapp.com/gatheredFacts', function(data){

 

createS(sceneConstellations, firstSPos, [0.3, 0.2], -100, 0xffffff);
createOrbitsProjects(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[0], -100, data.projects, 0xffffff);
createOrbitsEducation(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[1], -100, data.education, 0xffffff);
createOrbitsResearch(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[2], -100, data.research, data.research_description, 0xffffff);
createOrbitsYoutube(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[3], -100, data.itVideos, 0xffffff);
createOrbitsWork(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[4], -100, data.resume, 0xffffff);
createS(sceneSolarOutline, firstSPos, [6, 6], -100, 0x000000, 0.3);
createS(sceneConstellations, secondSPos, [0.3, 0.2], -100, 0xffffff);
createOrbitsTwitter(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[0], -100, tweets, 0xffffff);
createOrbitsInsta(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[1], -100, data.instagram_pics, 0xffffff);
createOrbitsSpotify(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[3], -100, data.spotify_playlists, 0xffffff);
createS(sceneSolarOutline, secondSPos, [6, 6], -100, 0x000000, 0.3);
var loader = new THREE.FontLoader();
loader.load( './fonts/Pacifico_Regular.json', function ( font ) {
  secondText = createText(sceneText, textFPos, -100, hobbyTitles, font);
  firstText = createText(sceneText, textSPos, -100, workTitles, font);
});
var loader = new THREE.FontLoader();
loader.load( './fonts/sigreg.json', function ( font ) {
  sajnani = generateEndOfNames(sceneText, 5, -100, textFPos[4][0], textFPos[4][1]+15, 0xA9A9A9, 1, 'ajnani', font);
  samar = generateEndOfNames(sceneText, 5, -100, textSPos[4][0], textSPos[4][1]+15, 0xA9A9A9, 1, 'amar', font);
});
});

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


camera.lookAt(new THREE.Vector3(0, 0, 0));



var light = new THREE.PointLight(0xFFFFFF, 0.5, 0);
light.position.z = -100;
light.position.x = -10;
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
bgPlane.scale.set( window.innerWidth , window.innerHeight, 1);
sceneBG.add(bgPlane);

// add the output of the renderer to the html element
document.getElementById('container').append(webGLRenderer.domElement);

let delta = 0;
// 30 fps
let interval = 1 / 30;


var composer = preRender();
dynamicallyResize();
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
    var renderPass6 = new THREE.RenderPass(scenePlanets, camera);
    renderPass6.clear = false;
    var renderPass7 = new THREE.RenderPass(sceneDescriptions, camera);
    renderPass7.clear = false;



    var starMask = new THREE.MaskPass(sceneConstellations, camera);
    var clearMask = new THREE.ClearMaskPass();

    var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth , 1 / window.innerHeight );
    var copyShader = new THREE.ShaderPass(THREE.CopyShader);
    copyShader.renderToScreen = true;


    var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth , window.innerHeight), 			bloomStrength, bloomRadius, bloomThreshold);

    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;


    composer.setSize( window.innerWidth , window.innerHeight);
    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(renderPass3);
    composer.addPass(renderPass4);
    composer.addPass(renderPass5);
    composer.addPass(bloomPass);
    composer.addPass(renderPass6);
    composer.addPass(renderPass7);
    // composer.addPass(effectFXAA);
    composer.addPass(copyShader);
    



    return composer;
}

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;




function animate(time) {
    // Put your drawing code here
        var smLength = sphereMats.length;
        for (var num=0; num < smLength; num ++){
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



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



var lastMove = Date.now();
document.addEventListener( 'mousemove', onDocumentMouseMove);
document.addEventListener( 'click', onDocumentMouseClick);

// Execute a function when the user releases a key on the keyboard
document.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 8 || event.keyCode === 46 ){

  }
});

var UUID = "";
var otherID = "";

$('#nextS').click(function(){
  $('#nextS').hide();
  var constChildren = sceneConstellations.children;
  var planetChildren = scenePlanets.children;
  var const2 = sceneSolarOutline.children;
  camera.position.x = 35;
  camera.position.y = 0;
  camera.position.z = 90;
  camera.lookAt(new THREE.Vector3(35, 0, -100));
  if (sajnani != undefined){
    sajnani.visible = true;
  }
  if (samar != undefined){
    samar.visible = false;
  }
  if (secondText != undefined){
    var stLength = secondText.length;
    for (var i=0; i < stLength; i++){
      if (secondText[i] != undefined){
        secondText[i].visible = true;
      }
    }
  }
  if (firstText != undefined){
    var ftLength = firstText.length;
    for (var i=0; i < ftLength; i++){
      if (firstText[i] != undefined){
        firstText[i].visible = false;
      }
    }
  }
  var ccLength = constChildren.length;
  for (var j=0; j < ccLength; j ++){
      if (constChildren[j].position.x < -10){
        constChildren[j].visible = false;
        var cLength = const2.length;
          for (var i = 0; i < cLength; i ++){
              if (const2[i].position.x === constChildren[j].position.x){
                  const2[i].visible = false;
              }
          }
      } else {
        constChildren[j].visible = true;
        var cLength = const2.length;
          for (var i = 0; i < cLength; i ++){
              if (const2[i].position.x === constChildren[j].position.x){
                  const2[i].visible = true;
              }
          }
      }
  }
  $('#back').show();
  $('#back').click(function(){
    $('#back').hide();
    $('#nextS').show();
    var constChildren = sceneConstellations.children;
    var planetChildren = scenePlanets.children;
    var const2 = sceneSolarOutline.children;
    camera.position.x = -35;
    camera.position.y = 0;
    camera.position.z = 60;
    camera.lookAt(new THREE.Vector3(-35, 0, -100));
    if (samar != undefined){
      samar.visible = true;
    }
    if (sajnani != undefined){
      sajnani.visible = false;
    }
    if (secondText != undefined){
      var stLength = secondText.length;
      for (var i=0; i < stLength; i++){
        if (secondText[i] != undefined){
          secondText[i].visible = false;
        }
      }
    }
    if (firstText != undefined){
      var ftLength = firstText.length;
      for (var i=0; i < ftLength; i++){
        if (firstText[i] != undefined){
          firstText[i].visible = true;
        }
      }
    }
    var ccLength = constChildren.length;
    for (var j=0; j < ccLength; j ++){
        if (constChildren[j].position.x < -10){
          constChildren[j].visible = true;
          var cLength = const2.length;
            for (var i = 0; i < cLength; i ++){
                if (const2[i].position.x === constChildren[j].position.x){
                    const2[i].visible = true;
                }
            }
        } else {
          constChildren[j].visible = false;
          var cLength = const2.length;
            for (var i = 0; i < cLength; i ++){
                if (const2[i].position.x === constChildren[j].position.x){
                    const2[i].visible = false;
                }
            }
        }
    }
  })
})

function dynamicallyResize(){
    var constChildren = sceneConstellations.children;
    var planetChildren = scenePlanets.children;
    var const2 = sceneSolarOutline.children;
    if ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500)){
        composer.setSize(window.innerWidth/2, window.innerHeight);
        $('#nextS').show();
        if (camera.position.z == 0){
          camera.position.x = -35;
          camera.position.y = 0;
          camera.position.z = 60;
          camera.lookAt(new THREE.Vector3(-35, 0, -100));
        }
        if (sajnani != undefined){
          sajnani.visible = false;
        }
        if (samar != undefined){
          samar.visible = true;
        }
        var plLength = planetChildren.length;
        for (var l =0; l < plLength; l++){
          planetChildren[l].scale.set(2, 2, 2);
        }
        
        if (firstText != undefined){
          var ftLength = firstText.length;
          for (var i=0; i < ftLength; i++){
            if (firstText[i] != undefined){
              firstText[i].visible = true;
            }
          }
        }
        var ccLength = constChildren.length;
        for (var j=0; j < ccLength; j ++){
            if (constChildren[j].position.x > -10){
              constChildren[j].visible = false;
              var cLength = const2.length;
                for (var i = 0; i < cLength; i ++){
                    if (const2[i].position.x === constChildren[j].position.x){
                        const2[i].visible = false;
                    }
                }
            }
        }
    } else {
        $('#nextS').hide();
        composer.setSize(window.innerWidth, window.innerHeight);
        if (camera.position.z == 0){
          $('#back').hide();
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 0;
          camera.lookAt(new THREE.Vector3(0, 0, -100));
        }
        
        if (sajnani != undefined){
          sajnani.visible = true;
        }
        if (firstText != undefined){
          var ftLength = firstText.length;
          for (var i=0; i < ftLength; i++){
            if (firstText[i] != undefined){
              firstText[i].visible = false;
            }
          }
        }
        var constChildren = sceneConstellations.children;
        var ccLength = constChildren.length;
        
        for (var j=0; j < ccLength; j ++){
            if (constChildren[j].position.x > -10){
            constChildren[j].visible = true;
            var cLength = const2.length;
                for (var i = 0; i < cLength; i ++){
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
    if (!( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){

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
    var orbitChildren = sceneOrbits.children;
    var planetChildren = scenePlanets.children;

    var intersects = raycaster.intersectObjects( children );
    var planets = raycaster.intersectObjects(planetChildren);
    var orbits = raycaster.intersectObjects(orbitChildren);
    intersects.push(planets);
    if (intersects.length == 1){
      var ccLength = constChildren.length;
      for (var j=0; j < ccLength; j ++){
        constChildren[j].scale.set(1, 1, 1);
      }
      var pcLength = planetChildren.length;
      for (var j=0; j < pcLength; j ++){
        planetChildren[j].scale.set(1, 1, 1);
      }
      document.getElementById('text').style.display = 'none';
    }
    var iLength = intersects.length;
    for (var i = 0; i < iLength; i ++){
        if (Array.isArray(intersects[i]) && intersects[i].length > 0){
          var temp = intersects[i][0];
          intersects[i]=temp;
        }
        if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && (intersects[i].object.geometry.type === "SphereGeometry" || intersects[i].object.geometry.type === "CircleGeometry")){
          var ccLength = constChildren.length;  
          for (var j=0; j < ccLength; j ++){
                if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.boundingSphere.radius <= 0.5 && UUID !== constChildren[j].uuid){

                    UUID = constChildren[j].uuid;
                    
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 25 && child.position.y === constChildren[j].position.y);
                    var endFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) == 15 && child.position.y === constChildren[j].position.y);
                    if (!( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
                      if (textFilter !== undefined && textFilter.length != 0) {
                        textFilter[0].visible = true;
                      }
                      if (endFilter !== undefined && endFilter.length != 0) {
                        endFilter[0].visible = false;
                      }
                    }
                    
                    var radius = constChildren[j].geometry.parameters.radius;
                    var scale = radius * 30;
                    constChildren[j].scale.set(scale, scale, scale);

                    //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                } else {
                    UUID = "";
                    otherID = "";
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 25 && child.position.y === constChildren[j].position.y);
                    var endFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) == 15 && child.position.y === constChildren[j].position.y);
                    if (!( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
                      if (textFilter !== undefined && textFilter.length != 0) {
                        textFilter[0].visible = false;
                      }
                      if (endFilter !== undefined && endFilter.length != 0) {
                        endFilter[0].visible = true;
                      }
                    }
                    constChildren[j].scale.set(1, 1, 1);
                    //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                }
            }
            //  ||(intersects[i].object.position.x === orbitChildren[j].position.x && intersects[i].object.position.y === orbitChildren[j].position.y && intersects[i].object.position.z === orbitChildren[j].position.z && otherID !== orbitChildren[j].uuid)
            var pcLength = planetChildren.length;
            for (var j=0; j < pcLength; j++){
              if (intersects[i].object.position.x === planetChildren[j].position.x && intersects[i].object.position.y === planetChildren[j].position.y && intersects[i].object.position.z === planetChildren[j].position.z && otherID !== planetChildren[j].uuid) {
                otherID = planetChildren[j].uuid;
                var textVals = objectDict[otherID].split('///');
                $('#text').css('visibility','visible').hide().fadeIn("slow");
                $('#header1').html(textVals[0]);
                $('#para').html(textVals[1]);
                // var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 18 && child.position.y === constChildren[j].position.y);
                var endFilter = planetChildren.filter(child => planetChildren[j].position.x != 0 && planetChildren[j].position.x == child.position.x && child.position.y === planetChildren[j].position.y);
                var radius = planetChildren[j].geometry.parameters.radius;
                var scale = radius * 200;
                planetChildren[j].scale.set(scale, scale, scale);
                // if (textFilter !== undefined && textFilter.length != 0) {
                //   textFilter[0].visible = true;
                // }
                // if (endFilter !== undefined && endFilter.length != 0) {
                //   endFilter[0].visible = false;
                // }
                // var radius = constChildren[j].geometry.parameters.radius;
                // var scale = radius * 150;
                // constChildren[j].scale.set(scale, scale, scale);
            
              } else {
                otherID = "";
                planetChildren[j].scale.set(1, 1, 1);
                //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
              }
          }
        } 
    }
  }
}
const sleep = (milliseconds, j) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds, j))
};
//keep this outside of the event-handler
var lookAtPosition = new THREE.Vector3(0, 0, -100);
if ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500)) {
  lookAtPosition.x = -20
}
var lookAtTween = new TWEEN.Tween(lookAtPosition);

// as lookAt is not a property we can assign to we need to
// call it every time the tween was updated:
lookAtTween.onUpdate(function() {
  camera.lookAt(lookAtPosition);
});


var planetID = "";
function onDocumentMouseClick( event ) {


  event.preventDefault();
  if (Date.now() - lastMove < 80) { // 32 frames a second
    return;
  } else {
    lastMove = Date.now();
  }
  mouse.x = ( event.clientX / window.innerWidth  ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var children = sceneSolarOutline.children;
  var constChildren = sceneConstellations.children;
  var textChildren = sceneText.children;
  var planetChildren = scenePlanets.children;
  var planets = raycaster.intersectObjects(planetChildren);

  var intersects = raycaster.intersectObjects( children );
  intersects.push(planets);
  var iLength = intersects.length;
  for (var i = 0; i < iLength; i ++){
    if (Array.isArray(intersects[i]) && intersects[i].length > 0){
      var temp = intersects[i][0];
      intersects[i]=temp;
    }
    if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && (intersects[i].object.geometry.type === "SphereGeometry" || intersects[i].object.geometry.type === "CircleGeometry")){
      var ccLength = constChildren.length;
      for (var j=0; j < ccLength; j ++){
        if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.boundingSphere.radius <= 0.5){
          // document.removeEventListener('mousemove', onDocumentMouseMove);

          UUID = constChildren[j].uuid;
          for (var l = 0; l < 5; l++){
            if (constChildren[j].position.x == secondSPos[l][1] && constChildren[j].position.y == secondSPos[l][0]){
              headerText = workTitles[l];
            } else if (constChildren[j].position.x == firstSPos[l][1] && constChildren[j].position.y == firstSPos[l][0]){
              headerText = hobbyTitles[l];
            }
          }
          $('#nextS').hide();
          lookAtTween
            .stop() // just in case it's still animating
            .to(constChildren[j].position, 1000) // set destination and duration
            .start(); // start the tween
          var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 25 && child.position.y === constChildren[j].position.y);
          constChildren[j].scale.set(1, 1, 1);
          sceneSolarOutline.traverse( function ( object ) { object.visible = false; } );
          adjustCameraAndInitiateWarp(constChildren, j, textFilter)
        }
      }
      var pcLength = planetChildren.length;
      for (var j=0; j < pcLength; j++){
          if (intersects[i].object.position.x === planetChildren[j].position.x && intersects[i].object.position.y === planetChildren[j].position.y && intersects[i].object.position.z === planetChildren[j].position.z) {
            var textVals = objectDict[planetChildren[j].uuid].split('///');
            if (( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
              if (planetID == planetChildren[j].uuid){
                window.open(textVals[2], '_blank');    
              } else {
                var radius = planetChildren[j].geometry.parameters.radius;
                var scale = radius * 100;
                planetChildren[j].scale.set(scale, scale, scale);
                $('#text').css('visibility','visible').hide().fadeIn("slow");
                $('#header1').html(textVals[0]);
                $('#para').html(textVals[1]);
              }
            } else {
              window.open(textVals[2], '_blank');    
            }
            planetID = planetChildren[j].uuid;
          } else {
            if (( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
                planetChildren[j].scale.set(2, 2, 2);
            } else {
              planetChildren[j].scale.set(1,1,1); 
            }
                       
          }
      }
    }
  }
  
}

function adjustCameraAndInitiateWarp(constChildren, position, textFilter){
  sleep(1500, position).then((j)=> {
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

      sleep(500, position).then((j) => {
        $('#holder').css('visibility','visible').css('opacity', 1).fadeIn("slow");
        textFilter[0].visible = false;
        mouseActive = true;
        deactivateWarp(constChildren, position, textFilter);
      })
    
  });
}

function deactivateWarp(constChildren,position,textFilter){
  sleep(2000).then((j) => {
    mouseActive = false;
    zoomToStar(constChildren, position, textFilter);
  });
}

function zoomToStar(constChildren, position, textFilter){
  sleep(1000, position).then((j) => {
    $('#holder').fadeTo("slow", 0);
    $('#topHeader').text(headerText);
    $('#topHeader').show();
    $('#back').show();
      
    
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
    sceneOrbits.visible = true;
    sceneOrbits.traverse( function ( object ) {
      if (object.position.x === constChildren[j].position.x && object.position.y === constChildren[j].position.y && object.position.z === constChildren[j].position.z) {
        object.visible = true;
      }
    });
    $('#back').click(function(){
      var const2 = sceneSolarOutline.children;
      if ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500)){
        camera.position.x = -35;
        camera.position.y = 0;
        camera.position.z = 60;
        camera.lookAt(new THREE.Vector3(-35, 0, -100));
      } else {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.lookAt(new THREE.Vector3(0, 0, -100));
      }
      sceneSolarOutline.traverse( function ( object ) { object.visible = true; } );
      $('#back').hide();
      $('#topHeader').hide();
      $('#text').hide();
      sceneOrbits.traverse( function ( object ) {
        object.visible = false;
      });
      if (samar != undefined){
        samar.visible = true;
      }
      if (sajnani != undefined){
        sajnani.visible = false;
      }
      if (secondText != undefined){
        var stLength = secondText.length;
        for (var i=0; i < stLength; i++){
          if (secondText[i] != undefined){
            secondText[i].visible = false;
          }
        }
      }
      if (firstText != undefined){
        var ftLength = firstText.length;
        for (var i=0; i < ftLength; i++){
          if (firstText[i] != undefined){
            firstText[i].visible = true;
          }
        }
      }
      var ccLength = constChildren.length;
      for (var j=0; j < ccLength; j ++){
          if (constChildren[j].position.x < -10){
            constChildren[j].visible = true;
            var cLength = const2.length;
              for (var i = 0; i < cLength; i ++){
                  if (const2[i].position.x === constChildren[j].position.x){
                      const2[i].visible = true;
                  }
              }
          } else {
            constChildren[j].visible = false;
            var cLength = const2.length;
              for (var i = 0; i < cLength; i ++){
                  if (const2[i].position.x === constChildren[j].position.x){
                      const2[i].visible = false;
                  }
              }
          }
      }
      textFilter[0].visible = true;
      dynamicallyResize();
    })

  });
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    dynamicallyResize();

    webGLRenderer.setSize(window.innerWidth , window.innerHeight);
    composer.setSize( window.innerWidth , window.innerHeight);
    var constChildren = sceneConstellations.children;
    var textChildren = sceneText.children;
    var ccLength = constChildren.length;
    for (var j=0; j < ccLength; j ++){
        constChildren[j].scale.set(1,1,1);
    }
    var tcLength = textChildren.length;
    for (var j=0; j < tcLength; j ++){
        textChildren[j].visible = false;
    }

}

});
