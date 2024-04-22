var workTitles = ['Projects', 'Education', 'Research', 'Youtube', 'Resume'];
var hobbyTitles = ['Twitter', 'Photography', 'Dance', 'Music', 'Blog'];

var GITHUB_URL = "https://api.github.com/users/ssajnani/repos";
var GITHUB_EDUCATION_JSON = "https://raw.githubusercontent.com/ssajnani/ssajnani.github.io/master/education.json";
var GITHUB_RESUME_JSON = "https://raw.githubusercontent.com/ssajnani/ssajnani.github.io/master/resume.json";
var GITHUB_RESEARCH = "https://api.github.com/repos/ssajnani/ResearchPapers/contents/";
var GITHUB_RESEARCH_INFO = "https://raw.githubusercontent.com/ssajnani/ResearchPapers/master/readme.json";
var YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search?";
var YOUTUBE_KEY = "key=AIzaSyBQGbkPx4FmwCAf_0vfGL4Mf3bZ2R2O1C4";
var YOUTUBE_CHANNEL_ID = "channelId=UCquU_YuZYEk-sMMyHPTBd0A";
var YOUTUBE_OPTIONS = "part=snippet,id&order=date&maxResults=20";
var INSTAGRAM = "https://www.instagram.com/samarsajnani/?__a=1";
var RESUME_DETAILS = "";
var SPOTIFY_ID_KEY = "2c31d0d4d1aa40849dd5ee49becbd6d1:c9f891d2e2604a129f016ede0e04bb35";
var resume = "";


var projects = [];
var education = [];
var research_description = [];
var research = [];
var resume = {};
var itVideos = [];
var tweets = [];
var instagram_pics = [];
var spotify_playlists = [];

// $.ajaxSetup({
//     async: false
// });

function gatherProjects(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", GITHUB_URL, false ); 
    xmlHttp.send( null );
    var json = JSON.parse(xmlHttp.responseText);
    var xml_length = json.length;
    for (var i = 0; i < xml_length; i++){
        var desc = json[i].description;
        if (desc != null && desc.search("\(\(Project\)\)") != -1) {
            projects.push(json[i]);
        }
    }
    return callback();
}

function gatherEducationMilestones(callback){
    $.getJSON(GITHUB_EDUCATION_JSON, function( data ) {
        education = data;
        return callback();
     });
}

// var workTitles = ['Projects', 'Education', 'Research', 'Youtube', 'Resume'];
// var hobbyTitles = ['Twitter', 'Photography', 'Dance', 'Music', 'Blog'];

function gatherResearchPapers(callback){
    $.getJSON(GITHUB_RESEARCH, function(data){
        
        research = data.filter(function(item){
            if (item.name != "readme.json"){
                return item;
            }
        });
        $.getJSON(GITHUB_RESEARCH_INFO, function(data){
            research_description = data;
            return callback();
        })
    });
}

function gatherITVideoInfo(callback){
    $.getJSON(YOUTUBE_API+"&"+YOUTUBE_KEY+"&"+YOUTUBE_CHANNEL_ID+"&"+YOUTUBE_OPTIONS, function(data){
        var result_arr = data.items;
        result_arr.pop();
        itVideos = result_arr;
        return callback();
    });
}
function getResume(callback){
    $.getJSON(GITHUB_RESUME_JSON, function(data) {
        resume = data;
        return callback();
     });
}

function getTweets(callback){
    var configProfile = {
        "profile": {"screenName": 'samar_sajnani'},
        "domId": '',
        "maxTweets": 5,
        "enableLinks": false,
        "showUser": true,
        "showTime": true,
        "dateFunction": '',
        "customCallback": callback
      };
      twitterFetcher.fetch(configProfile);
}

// function handleTweets(twts){
//     tweets = twts;
//     createOrbitsTwitter(sceneOrbits, scenePlanets, sceneDescriptions, firstSPos[0], -100, tweets, 0xffffff);
// }

function getInstagramInfo(callback){
    $.getJSON(INSTAGRAM, function(data) {
        var edges = data.graphql.user.edge_owner_to_timeline_media.edges;
        var picLength = edges.length;
        for (var i = 0; i < picLength; i++){
            instagram_pics.push({"url": edges[i].node.display_url, "code":edges[i].node.shortcode, "desc": edges[i].node.edge_media_to_caption.edges[0].node.text});
        }
        return callback();
     });
}

var MyRequestsCompleted = (function() {
    var numRequestToComplete, requestsCompleted, callBacks, singleCallBack;

    return function(options) {
        if (!options) options = {};

        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];
        var fireCallbacks = function() {
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        this.addCallbackToQueue = function(isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function(isComplete) {
            if (isComplete) requestsCompleted++;
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function(callback) {
            callBacks.push(callBack);
        };
    };
})();

function gatherMusic(callback){
    $.get("https://server.samar.pw:3000/spotify/authenticate").done(function (data) {
        $.ajax({
            url: "https://api.spotify.com/v1/users/samar.sajnani/playlists",
            type: 'GET',
            headers: {
                'Authorization': "Bearer " + data.access_token
            },
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                spotify_playlists = result.items;
                var spot_length = spotify_playlists.length;
                var requestCallback = new MyRequestsCompleted({
                    numRequest: 4,
                    singleCallback: function(){
                        return callback();
                    }
                });
                
                for (var i = 0; i < spot_length; i++){
                    (function(i){
                        $.ajax({
                            url: "https://api.spotify.com/v1/playlists/" + spotify_playlists[i].id + '/tracks',
                            type: 'GET',
                            headers: {
                                'Authorization': "Bearer " + data.access_token
                            },
                            contentType: 'application/json; charset=utf-8',
                            success: function (result) {
                                spotify_playlists[i]['track_info'] = result;
                                requestCallback.requestComplete(true);
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    })(i);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
}

function ig_media_preview(base64data) {
	var jpegtpl = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsaGikdKUEmJkFCLy8vQkc/Pj4/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHSkpNCY0PygoP0c/NT9HR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//AABEIABQAKgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AA==",
		t = atob(base64data),
		p = t.slice(3).split(""),
		o = t.substring(0, 3).split("").map(function(e) {
			return e.charCodeAt(0)
		}),
		c = atob(jpegtpl).split("");
	c[162] = String.fromCharCode(o[1]);
	c[160] = String.fromCharCode(o[2]);
	return base64data ? "data:image/jpeg;base64," + btoa(c.concat(p).join("")) : null
};
      
// $(function(){
//     toDataUrl("https://instagram.fybz2-2.fna.fbcdn.net/vp/a10c2e7ea7c9df7e65ab601084fe1020/5D8DBF70/t51.2885-15/e35/14533460_223401458092722_4541944713137094656_n.jpg?_nc_ht=instagram.fybz2-2.fna.fbcdn.net", function(myBase64) {
//         var image = new Image();
//         image.src = myBase64
//         document.body.appendChild(image);
//     });
    
// });

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

// toDataUrl("https://instagram.fybz2-2.fna.fbcdn.net/vp/a10c2e7ea7c9df7e65ab601084fe1020/5D8DBF70/t51.2885-15/e35/14533460_223401458092722_4541944713137094656_n.jpg?_nc_ht=instagram.fybz2-2.fna.fbcdn.net", function(myBase64) {
//     console.log(myBase64); // myBase64 is the base64 string
// });

function getInfo(callback){
    //getTweets(function(twts){
    //    console.log(twts);
    //	tweets = twts;
    //    return callback();
    //});
    tweets = [];
    return callback();
}
