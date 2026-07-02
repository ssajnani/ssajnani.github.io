

var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
  isMobile = true;
}
var WIDTH = window.innerWidth ,
    HEIGHT = window.innerHeight;

var headerText = "";
var bloomStrength = 0.9
var bloomRadius = 0.1;
var bloomThreshold = 0.1;
var exposure = 1.5;
var start = Date.now();
var colors = {"20": {"25": 0xff0000, "-15": 0xffa500}, "10": {"10": 0xffff00, "-30": 0xff0011}, "0": {"20": 0x0000ff, "-20": 0x0000ff}, "-10": {"30": 0xff0011, "-10": 0xffff00}, "-20": {"15": 0xffa500, "-25": 0xff0000}};
var twinkle = true;
var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;

var objectDict = {};
var orbitPlanetPairs = [];



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
        sphereGeo = new THREE.CircleGeometry( 6, 32 );
        //sphereGeo.rotateY(Math.PI/4);
        transparent = true;
        sphereMat = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: opacity, transparent: transparent});
        var mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.z = meshZ;
        mesh.position.y = meshY;
        mesh.position.x = meshX;
        //mesh.rotation.y=rotation;
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
  myTexture.encoding = THREE.sRGBEncoding;
  var material = new THREE.MeshBasicMaterial( {map: myTexture, overdraw: true, transparent: false, opacity: 1} );

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
  var vertexIndex = calculateRandomInt(129, 0);
  var positions = mesh.localToWorld(mesh.geometry.vertices[vertexIndex].clone());
  var testmesh = new THREE.Mesh( geometry, material );
  testmesh.position.x = positions.x;
  testmesh.position.y = positions.y;
  testmesh.position.z = positions.z;
  scene.add(mesh);
  planets.add( testmesh );
  return [testmesh, mesh, vertexIndex];
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
        curveSegments: 10
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
      size: 8,
      weight: 'normal',
      font: font,
      style: 'normal',
      height: 0,
      curveSegments: 6
    };

    // the createMesh is the same function we saw earlier
    var text1 = new THREE.Mesh(new THREE.TextGeometry(title, options));
    text1.position.z = meshZ;
    text1.position.y = meshY;
    text1.position.x = meshX;
    text1.rotation = rotation;
    scene.add(text1);
    if (title == "aj" && ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
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
  var sphereGeo = new THREE.SphereGeometry(calculateStarRadius(radius[0], radius[1]), 8, 8);
  for (var i = 0; i < 5; i++){
    generateSphere(scene, 5, sphereGeo, zDistance, positions[i][0], positions[i][1], color, opacity);
  }
}

function writeS (scene, positions, radius, zDistance, color=0x000000, opacity=1) { 
  var material = new MeshLineMaterial( { color: new THREE.Color(0xffffff), linewidth: 3 } )
  curve = new THREE.CatmullRomCurve3([
    //new THREE.Vector3( positions[4][1], positions[4][0], zDistance),
    //new THREE.Vector3( positions[6][1], positions[6][0], zDistance),
    new THREE.Vector3( positions[0][1], positions[0][0], zDistance),
    new THREE.Vector3( positions[1][1], positions[1][0], zDistance),
    new THREE.Vector3( positions[2][1], positions[2][0], zDistance),
    new THREE.Vector3( positions[3][1], positions[3][0], zDistance),
    new THREE.Vector3( positions[4][1], positions[4][0], zDistance),
    //new THREE.Vector3( positions[7][1], positions[7][0], zDistance),
    //new THREE.Vector3( positions[8][1], positions[8][0], zDistance),
    //new THREE.Vector3( positions[9][1], positions[9][0], zDistance),
    //new THREE.Vector3( positions[10][1], positions[10][0], zDistance),
    //new THREE.Vector3( positions[11][1], positions[11][0], zDistance)
  ], false, "centripetal");
  var geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints(50);
  var meshLine = new MeshLine();
  meshLine.setGeometry(geometry,p => p > 0.5 ? 1.2 - p : p + 0.1);

  var line = new THREE.Mesh(meshLine.geometry, material);
  scene.add(line);
  return line;

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
  results.push(generateText(scene, 5, zDistance, positions[0][0], positions[0][1]-21, color, opacity, titles[0],2.2, font));
  results.push(generateText(scene, 5, zDistance, positions[1][0], positions[1][1]+10, color, opacity, titles[1],2.2, font))
  results.push(generateText(scene, 5, zDistance, positions[2][0], positions[2][1]-16, color, opacity, titles[2],2.2, font));
  results.push(generateText(scene, 5, zDistance, positions[3][0], positions[3][1]-18, color, opacity, titles[3],2.2, font));
  var offset = 10;
  if ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500)){
    offset = -13;
  }
  results.push(generateText(scene, 5, zDistance, positions[4][0], positions[4][1]+offset, color, opacity, titles[4],2.2, font));
  return results; 
}

function createOrbitsProjects(scene, planets, desc, positions, zDistance, projects, color=0x000000, opacity=1) {
  var pLength = projects.length;
  var radius = 0.6;
  if (pLength > 5){
    // Always pin the first project (System Design) — randomise the rest.
    var pinned = projects[0];
    var rest = getRandom(projects.slice(1), 4);
    projects = [pinned].concat(rest);
    pLength = 5;
  }
  for (var i = 0; i < pLength; i++){
    // Use a solid-white placeholder texture for now — the old github-repo-image URLs
    // often 404 and just make requests fail noisily in devtools.
    var imageurl = './va@2x.png';
    var result = generateOrbit(scene, planets, imageurl, 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = projects[i].name + '///' + (projects[i].description || '').replace('((Project))','') + '///' + projects[i].html_url;
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
    radius += 0.6;
  }
}

function createOrbitsTalks(scene, planets, desc, positions, zDistance, talks, color=0x000000, opacity=1) {
  var pLength = talks.length;
  var radius = 0.6;
  if (pLength > 5) { pLength = 5; talks = getRandom(talks, 5); }
  for (var i = 0; i < pLength; i++){
    var result = generateOrbit(scene, planets, '', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = talks[i].title + '///' + (talks[i].venue || '') + (talks[i].date ? ' • ' + talks[i].date : '') + '///' + (talks[i].url || 'https://linkedin.com/in/samarsajnani');
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
    radius += 0.6;
  }
}

// Generic orbit creator for Impact / Leadership / Writing / Now — content items with {title, desc, url}.
function createOrbitsGeneric(scene, planets, desc, positions, zDistance, items, color=0x000000, opacity=1) {
  var pLength = items.length;
  var radius = 0.6;
  if (pLength > 5) { pLength = 5; items = getRandom(items, 5); }
  for (var i = 0; i < pLength; i++){
    var it = items[i];
    var result = generateOrbit(scene, planets, '', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = it.title + '///' + (it.desc || '') + '///' + (it.url || '#');
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
    radius += 0.6;
  }
}

// Decisions: click opens the decision modal instead of a new tab.
function createOrbitsDecisions(scene, planets, desc, positions, zDistance, decisions, color=0x000000, opacity=1) {
  var pLength = decisions.length;
  var radius = 0.6;
  if (pLength > 5) { pLength = 5; decisions = getRandom(decisions, 5); }
  for (var i = 0; i < pLength; i++){
    var d = decisions[i];
    var result = generateOrbit(scene, planets, '', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    // URL uses a sentinel scheme the click handler intercepts.
    objectDict[result[0].uuid] = d.title + '///' + d.label + '///decision://' + d.id;
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    var result = generateOrbit(scene, planets, '', 5, radius, 40, 400, zDistance, positions[0], positions[1], color, opacity);
    objectDict[result[0].uuid] = tweeter + '///'+ tweet + '///' + tweetURL;
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
    orbitPlanetPairs.push({ planet: result[0], orbit: result[1], vertexIndex: result[2] });
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
var sceneS = new THREE.Scene();
var sceneStars = new THREE.Scene();
var sceneBG = new THREE.Scene();
var sceneSolarOutline = new THREE.Scene();
var sceneText = new THREE.Scene();
var sceneTextName = new THREE.Scene();
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
webGLRenderer.toneMappingExposure = Math.pow(exposure, 4.0 );

var firstSPos = [[20, 17], [10, 5], [0,15], [-10,25], [-20,10], [-20, 0], [15,22], [-8, 7], [-6, 7], [-4, 8], [-20, 23.5], [-19.75, 24.5]];
var textFPos = [[20, 17], [10,5], [0,15], [-10,25], [-20,10]];
var workTitles = ['Projects', 'Education', 'Research', 'Talks', 'Work'];
var secondSPos = [[20,-45], [10, -60], [0,-50], [-10,-40], [-20,-55], [-20, -65], [15,-40], [-8, -62], [-6, -62], [-4, -60], [-20, -41.5], [-19.75, -40.5]];
var textSPos = [[20,-40], [10, -58], [0,-53], [-10,-40], [-20,-55]];
var hobbyTitles = ['Impact', 'Leadership', 'Decisions', 'Writing', 'Now'];
var firstText, secondText, sajnani, samar, s1, s2;
(function initScene(){
  var data = window.PORTFOLIO || {};

createS(sceneConstellations, firstSPos, [0.3, 0.2], -100, 0xffffff);
s1 = writeS(sceneS, firstSPos, [0.3, 0.2], -99.5, 0xffffff);
createOrbitsProjects(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[0], -100, data.projects || [], 0xffffff);
createOrbitsEducation(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[1], -100, data.education || [], 0xffffff);
createOrbitsResearch(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[2], -100, (data.research || []).map(function(r){return {name:r.name, html_url:r.html_url};}), data.research || [], 0xffffff);
createOrbitsTalks(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[3], -100, data.talks || [], 0xffffff);
createOrbitsWork(sceneOrbits, scenePlanets, sceneDescriptions, secondSPos[4], -100, { Experience: (data.work || []).map(function(w){return {position:w.position, bullets:w.bullets + ' • ' + w.dates};}) }, 0xffffff);
createS(sceneSolarOutline, firstSPos, [6, 6], -100, 0x000000, 0.1);
createS(sceneConstellations, secondSPos, [0.3, 0.2], -100, 0xffffff);
s2 = writeS(sceneS, secondSPos, [0.3, 0.2], -99.5, 0xffffff);
createOrbitsGeneric(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[0], -100, data.impact || [], 0xffffff);
createOrbitsGeneric(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[1], -100, data.leadership || [], 0xffffff);
createOrbitsDecisions(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[2], -100, data.decisions || [], 0xffffff);
createOrbitsGeneric(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[3], -100, data.writing || [], 0xffffff);
createOrbitsGeneric(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[4], -100, (data.now && data.now.focus || []).map(function(text, i){return {title:'Now ' + (i+1), desc:text, url:'#now-panel'};}), 0xffffff);
createS(sceneSolarOutline, secondSPos, [6, 6], -100, 0x000000, 0.1);

// Constellation draw-in: MeshLine has a "visibility" uniform (0..1) that draws the
// stroke progressively — so the constellation *materialises* line-by-line rather
// than a naive opacity fade. Falls back to opacity if the uniform isn't present.
if (s1 && s1.material && s1.material.uniforms) {
    var u1 = s1.material.uniforms, u2 = s2.material.uniforms;
    var startVal = 'visibility' in u1 ? 0 : 0;
    if ('visibility' in u1) { u1.visibility.value = 0; u2.visibility.value = 0; }
    if ('opacity' in u1)    { u1.opacity.value = 0;    u2.opacity.value = 0;    }
    setTimeout(function() {
        var op = { v: 0 };
        new TWEEN.Tween(op).to({ v: 1 }, 2600).easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function() {
                if (u1.visibility) u1.visibility.value = op.v;
                if (u2.visibility) u2.visibility.value = op.v;
                if (u1.opacity)    u1.opacity.value = op.v;
                if (u2.opacity)    u2.opacity.value = op.v;
            }).start();
    }, 1200);
}

hideLoadingScreen();
var loader = new THREE.FontLoader();
loader.load( './fonts/helvetiker_regular.typeface.json', function ( font ) {
  secondText = createText(sceneText, textFPos, -100, hobbyTitles, font);
  firstText = createText(sceneText, textSPos, -100, workTitles, font);
});
var loader = new THREE.FontLoader();
loader.load( './fonts/sigreg.json', function ( font ) {
  sajnani = generateEndOfNames(sceneTextName, 5, -100, textFPos[4][0], textFPos[4][1]+15, 0xA9A9A9, 1, 'aj', font);
  console.log(sajnani);
  samar = generateEndOfNames(sceneTextName, 5, -100, textSPos[4][0], textSPos[4][1]+15, 0xA9A9A9, 1, 'am', font);
});

sceneOrbits.traverse( function ( object ) { object.visible = false; } );

//This will add a starfield to the background of a scene
var starCount = 8000;
var starPositions = new Float32Array(starCount * 3);
for (var i = 0; i < starCount; i++) {
    starPositions[i * 3]     = THREE.Math.randFloatSpread(5000);
    starPositions[i * 3 + 1] = THREE.Math.randFloatSpread(5000);
    starPositions[i * 3 + 2] = THREE.Math.randFloat(-350, -450);
}
var starsGeometry = new THREE.BufferGeometry();
starsGeometry.addAttribute('position', new THREE.BufferAttribute(starPositions, 3));
var starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
var starField = new THREE.Points(starsGeometry, starsMaterial);
sceneStars.add(starField);

// Nebula colour clouds — layered coloured point clusters for atmosphere
(function() {
    var nebulaClusters = [
        { color: 0x3322bb, count: 2500, spread: 1200, cx: -200, cy: 100 },
        { color: 0x8811aa, count: 2000, spread: 900,  cx: 150,  cy: -80 },
        { color: 0xcc2244, count: 1500, spread: 700,  cx: -50,  cy: 60  },
        { color: 0x114488, count: 1800, spread: 1000, cx: 200,  cy: 200 },
        { color: 0x441166, count: 1200, spread: 600,  cx: -150, cy: -150 }
    ];
    nebulaClusters.forEach(function(nc) {
        var pos = new Float32Array(nc.count * 3);
        for (var i = 0; i < nc.count; i++) {
            pos[i*3]   = THREE.Math.randFloatSpread(nc.spread) + nc.cx;
            pos[i*3+1] = THREE.Math.randFloatSpread(nc.spread) + nc.cy;
            pos[i*3+2] = THREE.Math.randFloat(-390, -450);
        }
        var geo = new THREE.BufferGeometry();
        geo.addAttribute('position', new THREE.BufferAttribute(pos, 3));
        var mat = new THREE.PointsMaterial({ color: nc.color, size: 1.4, opacity: 0.35, transparent: true });
        sceneStars.add(new THREE.Points(geo, mat));
    });
})();



camera.lookAt(new THREE.Vector3(0, 0, 0));



var light = new THREE.PointLight(0xFFFFFF, 0.5, 0);
light.position.z = -95;
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
var diamond_children = sceneConstellations.children;

var composer = preRender();
dynamicallyResize();
var is_tweening = false;
var current_size = 1;
var children = [];
var buildUp = function () {
    return new TWEEN.Tween({
        scale: 1
    }).to ({
        scale : 2
    }, 125).easing(TWEEN.Easing.Elastic.Out)
      .onStart(function(){
        current_size = Math.min(getRandomInt(3), sceneConstellations.children.length);
        children = current_size > 0 ? getRandom(sceneConstellations.children, current_size) : [];
      })
      .onUpdate(function (test) {
        for (var i = 0; i < current_size; i ++){
          //console.log(children[i]);
          children[i].scale.set(test.scale,test.scale,test.scale);
        } 
  }).onComplete(function () {
      buildDown().start();
  });
};
var buildDown = function () {
    return new TWEEN.Tween({
        scale: 2
    }).to ({
        scale : 1
    }, 125).onUpdate(function (test) {

        for (var i = 0; i < current_size; i ++){
          //console.log(children[i]);
          children[i].scale.set(test.scale,test.scale,test.scale);
        } 
    }).onComplete(function () {
        if (twinkle == true) {
          buildUp().start();
        }
    });
};

console.log(sceneConstellations.children);
buildUp().start();

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
    var renderPass5 = new THREE.RenderPass(sceneTextName, camera);
    renderPass5.clear = false;
    var renderPass6 = new THREE.RenderPass(sceneOrbits, camera);
    renderPass6.clear = false;
    var renderPass7 = new THREE.RenderPass(scenePlanets, camera);
    renderPass7.clear = false;
    var renderPass8 = new THREE.RenderPass(sceneDescriptions, camera);
    renderPass8.clear = false;
    var renderPass9 = new THREE.RenderPass(sceneS, camera);
    renderPass9.clear = false;



    var starMask = new THREE.MaskPass(sceneS, camera);
    var clearMask = new THREE.ClearMaskPass();
    var starMask = new THREE.MaskPass(sceneConstellations, camera);
    var clearMask = new THREE.ClearMaskPass();

    var copyShader = new THREE.ShaderPass(THREE.CopyShader);
    copyShader.renderToScreen = true;

    // Film-grain + subtle vignette pass — cinematic finish over the bloom.
    var grainPass = new THREE.ShaderPass({
        uniforms: {
            tDiffuse: { value: null },
            time: { value: 0.0 },
            intensity: { value: 0.055 },
            vignette: { value: 0.85 }
        },
        vertexShader: [
            'varying vec2 vUv;',
            'void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }'
        ].join('\n'),
        fragmentShader: [
            'uniform sampler2D tDiffuse;',
            'uniform float time;',
            'uniform float intensity;',
            'uniform float vignette;',
            'varying vec2 vUv;',
            'float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }',
            'void main(){',
            '  vec4 c = texture2D(tDiffuse, vUv);',
            '  float g = rand(vUv + time) - 0.5;',
            '  c.rgb += g * intensity;',
            '  vec2 uv = vUv - 0.5;',
            '  float vig = 1.0 - dot(uv, uv) * vignette;',
            '  c.rgb *= clamp(vig, 0.0, 1.0);',
            '  gl_FragColor = c;',
            '}'
        ].join('\n')
    });
    window._grainPass = grainPass;

    var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth , window.innerHeight), 			bloomStrength, bloomRadius, bloomThreshold);
    window._bloomPass = bloomPass;

    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;


    composer.setSize( window.innerWidth , window.innerHeight);

    composer.addPass(renderPass);
    composer.addPass(renderPass2);
    composer.addPass(renderPass3);
    composer.addPass(renderPass4);
    composer.addPass(renderPass5);
    composer.addPass(renderPass9);
    composer.addPass(renderPass6);
    composer.addPass(bloomPass);
    composer.addPass(renderPass7);
    composer.addPass(renderPass8);
    composer.addPass(grainPass);
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
        if (window._grainPass) {
          window._grainPass.uniforms.time.value = (Date.now() - start) * 0.001;
        }
        // Audio-reactive: modulate bloom strength if the mic is live.
        if (window._audioAnalyser && window._bloomPass) {
          var buf = window._audioBuffer;
          window._audioAnalyser.getByteFrequencyData(buf);
          var sum = 0; for (var b = 0; b < buf.length; b++) sum += buf[b];
          var avg = sum / buf.length / 255; // 0..1
          window._bloomPass.strength = bloomStrength + avg * 2.4;
        }


        // render using requestAnimationFrame
        //            webGLRenderer.render(scene, camera);\


        requestAnimationFrame(animate);
        delta += clock.getDelta();
        if (delta  > interval) {
          // Slowly rotate orbit rings to make the solar system feel alive
          sceneOrbits.children.forEach(function(obj) {
            if (obj.isLine) {
              obj.rotation.z += 0.0008;
              obj.rotation.x += 0.0004;
            }
          });

          // Move each planet to its current position on its orbit ring
          for (var pi = 0; pi < orbitPlanetPairs.length; pi++) {
            var pair = orbitPlanetPairs[pi];
            pair.orbit.updateMatrixWorld();
            var lp = pair.orbit.geometry.vertices[pair.vertexIndex].clone();
            pair.planet.position.copy(pair.orbit.localToWorld(lp));
          }

          composer.reset();
          composer.render();

          TWEEN.update(time);

          delta = delta % interval;
        }
}


// ── Shooting Stars ──────────────────────────────────────────────────
function spawnShootingStar() {
    var sx = THREE.Math.randFloatSpread(300) - 50;
    var sy = THREE.Math.randFloat(10, 40);
    var sz = -200;
    var dx = sx + THREE.Math.randFloat(40, 100);
    var dy = sy - THREE.Math.randFloat(25, 60);
    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array([sx, sy, sz, sx, sy, sz]);
    geo.addAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, transparent: true });
    var line = new THREE.Line(geo, mat);
    sceneStars.add(line);
    var prog = { t: 0 };
    new TWEEN.Tween(prog).to({ t: 1 }, THREE.Math.randFloat(600, 1000))
        .onUpdate(function() {
            var t = prog.t;
            var hx = sx + (dx - sx) * t, hy = sy + (dy - sy) * t;
            var tx = sx + (dx - sx) * Math.max(0, t - 0.28);
            var ty = sy + (dy - sy) * Math.max(0, t - 0.28);
            var a = geo.attributes.position.array;
            a[0]=tx; a[1]=ty; a[2]=sz; a[3]=hx; a[4]=hy; a[5]=sz;
            geo.attributes.position.needsUpdate = true;
            mat.opacity = t < 0.75 ? 1 : 1 - (t - 0.75) / 0.25;
        })
        .onComplete(function() { sceneStars.remove(line); })
        .start();
}
function scheduleShootingStar() {
    setTimeout(function() { spawnShootingStar(); scheduleShootingStar(); },
               THREE.Math.randFloat(3000, 9000));
}
scheduleShootingStar();

// ── Chatbot: Ollama /api/chat ────────────────────────────────────────
// Swap CHAT_ENDPOINT for your Ollama base URL. Assumes /api/chat on the same host.
var CHAT_ENDPOINT = '<YOUR_URL_HERE>';   // e.g. 'https://server.samar.pw' or 'http://localhost:11434'
var CHAT_MODEL    = 'llama3.1:8b';       // whichever model you have `ollama pull`ed
var CHAT_HISTORY  = [];                  // rolling turn buffer

function buildSystemPrompt() {
    var p = window.PORTFOLIO || {};
    var lines = [
        "You are the portfolio AI for Samar Sajnani, an Engineering Manager and former Team Lead.",
        "Answer in a warm, direct, terse voice — like Samar would. Prefer concrete numbers over adjectives.",
        "If asked about something you don't have context for, say so and suggest a related section of the site.",
        "Never invent employers, dates, or metrics. Anything you don't know is a {{TODO}}.",
        "",
        "=== WORK ==="
    ];
    (p.work || []).forEach(function(w){ lines.push('- ' + w.position + ' (' + w.dates + '): ' + w.bullets); });
    lines.push('', '=== IMPACT ===');
    (p.impact || []).forEach(function(i){ lines.push('- ' + i.title + ': ' + i.desc); });
    lines.push('', '=== LEADERSHIP PRINCIPLES ===');
    (p.leadership || []).forEach(function(i){ lines.push('- ' + i.title + ': ' + i.desc); });
    lines.push('', '=== KEY DECISIONS (Context/Options/Chose/Result) ===');
    (p.decisions || []).forEach(function(d){
        lines.push('* ' + d.title);
        lines.push('  Context: ' + d.context);
        lines.push('  Chose: ' + d.chose);
        lines.push('  Result: ' + d.result);
        lines.push('  Lesson: ' + d.lesson);
    });
    lines.push('', '=== EDUCATION ===');
    (p.education || []).forEach(function(e){ lines.push('- ' + e.name + ' @ ' + e.school + ' (' + e.grade + ')'); });
    lines.push('', '=== RESEARCH ===');
    (p.research || []).forEach(function(r){ lines.push('- ' + r.title + ' (' + r.school + '): ' + r.description); });
    lines.push('', '=== PROJECTS ===');
    (p.projects || []).forEach(function(pr){ lines.push('- ' + pr.name + ': ' + pr.description); });
    lines.push('', 'Contact: samar.sajnani@live.com · linkedin.com/in/samarsajnani · github.com/ssajnani');
    return lines.join('\n');
}

// Fallback if the Ollama endpoint is unreachable (config’d wrong, offline demo, etc.).
function fallbackChat(q) {
    q = (q || '').toLowerCase();
    var p = window.PORTFOLIO || {};
    if (/lead|manage|team|em\b|report/.test(q))
        return 'I run on a local Llama on Samar’s server — but the endpoint isn’t reachable right now. Try the <b>Leadership</b> or <b>Decisions</b> stars on the right constellation for his philosophy and real decision writeups.';
    if (/impact|number|metric|result/.test(q))
        return 'Endpoint is offline — open the <b>Impact</b> star (right constellation) for the concrete metrics.';
    if (/contact|email|hire|reach/.test(q))
        return 'samar.sajnani@live.com · linkedin.com/in/samarsajnani';
    return 'The local Llama server isn’t responding. Explore the constellation directly — <b>Impact</b>, <b>Leadership</b>, <b>Decisions</b>, and <b>Work</b> have everything I would’ve told you.';
}

async function askLlama(userMsg) {
    if (!CHAT_ENDPOINT || CHAT_ENDPOINT.indexOf('<YOUR_URL_HERE>') !== -1) {
        return fallbackChat(userMsg);
    }
    var systemPrompt = buildSystemPrompt();
    CHAT_HISTORY.push({ role: 'user', content: userMsg });
    // Keep last 8 turns of history.
    if (CHAT_HISTORY.length > 8) CHAT_HISTORY = CHAT_HISTORY.slice(-8);
    var body = {
        model: CHAT_MODEL,
        stream: false,
        messages: [{ role: 'system', content: systemPrompt }].concat(CHAT_HISTORY),
        options: { temperature: 0.4, num_predict: 400 }
    };
    try {
        var res = await fetch(CHAT_ENDPOINT.replace(/\/$/, '') + '/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('Ollama returned ' + res.status);
        var data = await res.json();
        var reply = (data && data.message && data.message.content) || fallbackChat(userMsg);
        CHAT_HISTORY.push({ role: 'assistant', content: reply });
        // Minimal markdown → HTML (bold, italic, line breaks).
        return reply
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
            .replace(/\*([^*]+)\*/g, '<i>$1</i>')
            .replace(/\n/g, '<br>');
    } catch (err) {
        console.warn('Ollama call failed:', err);
        return fallbackChat(userMsg);
    }
}

function addChatMessage(text, role) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    div.innerHTML = text;
    document.getElementById('chat-messages').appendChild(div);
    document.getElementById('chat-messages').scrollTop = 9999;
    return div;
}

document.getElementById('chatbot-toggle').addEventListener('click', function() {
    document.getElementById('chatbot-panel').classList.toggle('open');
});

// ── Audio-reactive toggle ────────────────────────────────────────────
document.getElementById('audio-toggle').addEventListener('click', async function() {
    var btn = this;
    if (window._audioAnalyser) {
        // Turn it off.
        if (window._audioStream) window._audioStream.getTracks().forEach(function(t){ t.stop(); });
        window._audioAnalyser = null;
        window._audioBuffer = null;
        window._audioStream = null;
        btn.classList.remove('on');
        if (window._bloomPass) window._bloomPass.strength = bloomStrength;
        return;
    }
    try {
        var stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var src = ctx.createMediaStreamSource(stream);
        var analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        src.connect(analyser);
        window._audioAnalyser = analyser;
        window._audioBuffer = new Uint8Array(analyser.frequencyBinCount);
        window._audioStream = stream;
        btn.classList.add('on');
    } catch(err) {
        console.warn('Mic denied:', err);
        addChatMessage('Mic permission was denied — audio-reactive mode needs mic access.', 'bot');
        document.getElementById('chatbot-panel').classList.add('open');
    }
});
document.getElementById('chat-close').addEventListener('click', function() {
    document.getElementById('chatbot-panel').classList.remove('open');
});
async function submitChat() {
    var input = document.getElementById('chat-input');
    var q = input.value.trim();
    if (!q) return;
    addChatMessage(q, 'user');
    input.value = '';
    var thinking = addChatMessage('<i>thinking&hellip;</i>', 'bot');
    var reply = await askLlama(q);
    thinking.innerHTML = reply;
    document.getElementById('chat-messages').scrollTop = 9999;
}
document.getElementById('chat-send').addEventListener('click', submitChat);
document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') submitChat();
});

// ── Loading Screen + Cinematic Intro ─────────────────────────────────
var introSkipped = false;
function playIntroFlythrough() {
    if (introSkipped) return;
    var isMobileView = ( window.innerWidth <= window.innerHeight || ( window.innerWidth < 700 || window.innerHeight < 500));
    if (isMobileView) return; // mobile view is already pushed back — flythrough looks off

    // Start far back in the nebula, then fly forward to the constellation view.
    var startZ = 420;
    var endZ = camera.position.z; // whatever dynamicallyResize picked
    camera.position.z = startZ;

    // Big field-of-view at the start → normalise on arrival (dolly-in feel).
    var startFov = 65;
    var endFov = angle;
    camera.fov = startFov;
    camera.updateProjectionMatrix();

    var s = { p: 0 };
    var tween = new TWEEN.Tween(s).to({ p: 1 }, 3500)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function() {
            if (introSkipped) return;
            camera.position.z = startZ + (endZ - startZ) * s.p;
            camera.fov = startFov + (endFov - startFov) * s.p;
            camera.updateProjectionMatrix();
        })
        .onComplete(function() {
            camera.position.z = endZ;
            camera.fov = endFov;
            camera.updateProjectionMatrix();
        })
        .start();
    window._introTween = tween;
}

function skipIntro() {
    introSkipped = true;
    if (window._introTween) window._introTween.stop();
    // Snap camera back to intended resting position.
    var isMobileView = ( window.innerWidth <= window.innerHeight || ( window.innerWidth < 700 || window.innerHeight < 500));
    if (!isMobileView) {
        camera.position.set(0, 0, 0);
        camera.lookAt(new THREE.Vector3(0, 0, -100));
    }
    camera.fov = angle;
    camera.updateProjectionMatrix();
    var s = document.getElementById('skip-intro');
    if (s) s.style.display = 'none';
}

function hideLoadingScreen() {
    var ls = document.getElementById('loading-screen');
    ls.style.opacity = '0';
    setTimeout(function() { ls.style.display = 'none'; }, 850);
    // HUD + top-right controls fade in near the end of the flythrough.
    setTimeout(function(){
        document.getElementById('hud').style.display = 'flex';
        document.getElementById('top-right-controls').style.display = 'flex';
    }, 2400);
    playIntroFlythrough();
}

// Skip button binding.
document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('skip-intro');
    if (btn) btn.addEventListener('click', function(e){ e.stopPropagation(); skipIntro(); });
});

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

// Warp between constellations — re-uses the existing #holder warp overlay
// (no ship element). Fades in, mutates the scene mid-warp, fades out.
function warpBetweenConstellations(mutator) {
  $('#holder').css('visibility','visible').css('opacity', 1).fadeIn(400);
  mouseActive = true;
  setTimeout(function(){
    mutator();
    setTimeout(function(){
      $('#holder').fadeTo(700, 0);
      setTimeout(function(){ mouseActive = false; }, 500);
    }, 300);
  }, 550);
}

$('#nextS').click(function(){
  $('#nextS').hide();
  warpBetweenConstellations(function(){
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
    warpBetweenConstellations(function(){
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
    }); // close warpBetweenConstellations for #back
  })
  }); // close warpBetweenConstellations for #nextS
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



// Route planet clicks. External URL → new tab. Sentinel scheme → modal.
function openPlanetTarget(textVals) {
    var url = textVals[2] || '';
    if (url.indexOf('decision://') === 0) {
        openDecisionModal(url.replace('decision://', ''));
        return;
    }
    if (url.indexOf('arch://') === 0) {
        openArchModal(url.replace('arch://', ''));
        return;
    }
    if (url === '#now-panel') {
        toggleNowPanel(true);
        return;
    }
    if (url === '#') {
        // No target — flash the description overlay instead of opening a blank tab.
        $('#text').css('visibility','visible').hide().fadeIn('slow');
        $('#header1').html(textVals[0] || '');
        $('#para').html(textVals[1] || '');
        return;
    }
    window.open(url, '_blank', 'noopener');
}

function openDecisionModal(id) {
    var p = (window.PORTFOLIO && window.PORTFOLIO.decisions) || [];
    var d = p.filter(function(x){ return x.id === id; })[0];
    if (!d) return;
    document.getElementById('decision-title').textContent = d.title;
    var body = document.getElementById('decision-body');
    var opts = (d.options || []).map(function(o){ return '<li>' + o + '</li>'; }).join('');
    body.innerHTML =
        '<h3>Context</h3><p>' + d.context + '</p>' +
        '<h3>Options considered</h3><ul>' + opts + '</ul>' +
        '<h3>What I chose</h3><p>' + d.chose + '</p>' +
        '<h3>Result</h3><p>' + d.result + '</p>' +
        '<h3>Lesson</h3><p><i>' + d.lesson + '</i></p>';
    document.getElementById('decision-modal').style.display = 'flex';
}

function openArchModal(key) {
    var a = window.PORTFOLIO && window.PORTFOLIO.architectures && window.PORTFOLIO.architectures[key];
    if (!a) return;
    document.getElementById('arch-title').textContent = a.title;
    var el = document.getElementById('arch-diagram');
    el.removeAttribute('data-processed');
    el.textContent = a.mermaid;
    document.getElementById('arch-notes').innerHTML = a.notes || '';
    document.getElementById('arch-modal').style.display = 'flex';
    if (window.mermaid) {
        try { window.mermaid.run({ nodes: [el] }); } catch(e) { console.warn(e); }
    }
}

function toggleNowPanel(force) {
    var el = document.getElementById('now-panel');
    var open = force === undefined ? el.style.display !== 'flex' : force;
    if (open) {
        var n = (window.PORTFOLIO && window.PORTFOLIO.now) || { updated: '', focus: [] };
        var items = (n.focus || []).map(function(x){ return '<li>' + x + '</li>'; }).join('');
        document.getElementById('now-body').innerHTML =
            '<div style="opacity:0.55;font-size:0.85em;margin-bottom:8px;">Updated ' + (n.updated || '{{TODO}}') + '</div>' +
            '<ul>' + items + '</ul>';
        el.style.display = 'flex';
    } else {
        el.style.display = 'none';
    }
}

// Modal close bindings (any element with data-close attribute).
document.addEventListener('click', function(e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute('data-close')) {
        var id = t.getAttribute('data-close');
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        ['decision-modal','arch-modal','now-panel'].forEach(function(id){
            var el = document.getElementById(id); if (el) el.style.display = 'none';
        });
    }
});

// HUD "Now" link.
var nowLink = document.getElementById('hud-now-link');
if (nowLink) nowLink.addEventListener('click', function(e){ e.preventDefault(); toggleNowPanel(); });

function onDocumentMouseMove( event ) {

    event.preventDefault();
    if (mouseActive) return; // warp in progress — don't fight the tween
    if (!( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){

    if (Date.now() - lastMove < 120) { // 32 frames a secon
        return;
    } else {
        lastMove = Date.now();
    }
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // Parallax: gently shift the star field against mouse movement
    starField.position.x = -mouse.x * 8;
    starField.position.y = -mouse.y * 8;
    // Cursor gravity: slight camera tilt toward the cursor for depth cue.
    // Kept small so it doesn't fight the raycaster.
    if (typeof introSkipped !== 'undefined' && introSkipped) {
        // no-op during-intro-skip protection
    }
    sceneStars.rotation.z = mouse.x * 0.02;
    sceneStars.rotation.x = -mouse.y * 0.02;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var children = sceneSolarOutline.children;
    var constChildren = sceneConstellations.children;
    var textChildren = sceneText.children;
    var textChildrenName = sceneTextName.children;
    var ss = sceneS.children;
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
    var check = false;
    var iLength = intersects.length;
    console.log(camera.position.z);
    for (var i = 0; i < iLength; i ++){
        if (Array.isArray(intersects[i]) && intersects[i].length > 0){
          var temp = intersects[i][0];
          intersects[i]=temp;
        }
        if ("object" in intersects[i] && "geometry" in intersects[i].object && "type" in intersects[i].object.geometry && (intersects[i].object.geometry.type === "SphereGeometry" || intersects[i].object.geometry.type === "CircleGeometry")){
          var ccLength = constChildren.length;  
          for (var j=0; j < ccLength; j ++){
                if (camera.position.x === 0 && intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.parameters.radius <= 0.5 && UUID !== constChildren[j].uuid){
                
                    UUID = constChildren[j].uuid;
                    
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 30 && child.position.y === constChildren[j].position.y);
                    var endFilter = textChildrenName.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) == 15 && child.position.y === constChildren[j].position.y);
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
                    check = true;

                    //constChildren[j].material.color.setHex(colors[constChildren[j].position.y.toString()][constChildren[j].position.x.toString()]);
                } else {
                    UUID = "";
                    otherID = "";
                    var textFilter = textChildren.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) <= 30 && child.position.y === constChildren[j].position.y);
                    var endFilter = textChildrenName.filter(child => constChildren[j].position.x != 0 && Math.abs(constChildren[j].position.x - child.position.x) == 15 && child.position.y === constChildren[j].position.y);
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
      if (check == true) {
              sceneS.traverse( function ( object ) { object.position.z = -1; } );               
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
  var textChildrenName = sceneTextName.children;
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
        if (intersects[i].object.position.x === constChildren[j].position.x && intersects[i].object.position.y === constChildren[j].position.y && intersects[i].object.position.z === constChildren[j].position.z && constChildren[j].geometry.parameters.radius <= 0.5){
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
          sceneS.traverse( function ( object ) { object.visible = false; } );
          twinkle = false;
          adjustCameraAndInitiateWarp(constChildren, j, textFilter)
        }
      }
      var pcLength = planetChildren.length;
      for (var j=0; j < pcLength; j++){
          if (intersects[i].object.position.x === planetChildren[j].position.x && intersects[i].object.position.y === planetChildren[j].position.y && intersects[i].object.position.z === planetChildren[j].position.z) {
            var textVals = objectDict[planetChildren[j].uuid].split('///');
            if (( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500))){
              if (planetID == planetChildren[j].uuid){
                openPlanetTarget(textVals);
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

// mouseActive gates the mouse-move raycaster during the warp so the picker
// doesn't fight the camera tween. Restored per user request — the split
// with deactivateWarp is intentional, not a leftover.
var mouseActive = false;

function adjustCameraAndInitiateWarp(constChildren, position, textFilter){
  sleep(1500, position).then((j)=> {
    var prePosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    var preTween = new TWEEN.Tween(prePosition);
    preTween.onUpdate(function() {
      camera.position.x = prePosition.x;
      camera.position.y = prePosition.y;
      camera.position.z = prePosition.z + 20;
      camera.lookAt(constChildren[j].position);
    });
    var newPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    newPos.z = newPos.z - 100;
    preTween
      .stop() // just in case it's still animating
      .to(newPos, 1000) // set destination and duration
      .start(); // start the tween

    sleep(500, position).then((j) => {
      $('#holder').css('visibility','visible').css('opacity', 1).fadeIn("slow");
      textFilter[0].visible = false;
      mouseActive = true;
      deactivateWarp(constChildren, position, textFilter);
    });
  });
}

function deactivateWarp(constChildren, position, textFilter){
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
      var isMobileView = ( window.innerWidth  <= window.innerHeight || ( window.innerWidth  < 700 || window.innerHeight < 500));
      var backTarget = isMobileView ? { x: -35, y: 0, z: 60 } : { x: 0, y: 0, z: 0 };
      var backLook = isMobileView ? new THREE.Vector3(-35, 0, -100) : new THREE.Vector3(0, 0, -100);
      var fromPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
      new TWEEN.Tween(fromPos).to(backTarget, 1100)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onUpdate(function() {
              camera.position.set(fromPos.x, fromPos.y, fromPos.z);
              camera.lookAt(backLook);
          })
          .start();
      sceneS.traverse( function ( object ) { object.visible = true; } );
      twinkle = true;
      buildUp().start();
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

})();
