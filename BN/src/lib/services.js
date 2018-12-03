const IS_BROWSER = (module == null || module.exports == null);

import Config from '../commons/Config';
//import { WebRTC } from 'react-native-webrtc';
//import { socketIOClient } from 'socket.io-client';
 const WebRTC = require('react-native-webrtc');

let socket = null;
let onFriendLeftCallback = null;
let onFriendConnectedCallback = null;
let onDataChannelMessageCallback = null;

const socketIOClient = require('socket.io-client');
//socket = socketIOClient('https://webrct.herokuapp.com/', {transports: ['websocket'], jsonp: false});
socket = socketIOClient('http://35.238.126.42:443', {transports: ['websocket'], jsonp: false});

var configuration = {"iceServers": [
    {"url": "stun:stun.l.google.com:19302"},
    {
      "url": 'turn:35.187.252.124:2222?transport=tcp',
      "username": 'webrtc',
      "credential": 'WebRTC@123456'
    }
]};
var peerConnections = {}; //map of {socketId: socket.io id, RTCPeerConnection}
let localStream = null;
let friends = null; //list of {socketId, name}
let me = null; //{socketId, name}

function createPeerConnection(friend, isOffer, onDataChannelMessage) {
  let socketId = friend.socketId;
  var retVal = new WebRTC.RTCPeerConnection(configuration);

  peerConnections[socketId] = retVal;

  retVal.onicecandidate = function (event) {
    console.log('onicecandidate');
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate});
    }
  };

  function createOffer() {
    retVal.createOffer(function(desc) {
      console.log('createOffer', desc);
      retVal.setLocalDescription(desc, function () {
        console.log('setLocalDescription', retVal.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': retVal.localDescription });
      }, logError);
    }, logError);
  }

  retVal.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  retVal.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange');
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };

  retVal.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange');
  };

  retVal.onaddstream = function (event) {

    console.log('onaddstream');
    //var element = document.createElement('video');
    //element.id = "remoteView" + socketId;
    //element.autoplay = 'autoplay';
    //element.src = URL.createObjectURL(event.stream);
    //remoteViewContainer.appendChild(element);
    if(onFriendConnectedCallback != null) {
      onFriendConnectedCallback(socketId, event.stream);
    }
  };

  retVal.addStream(localStream);

  function createDataChannel() {
    if (retVal.textDataChannel) {
      return;
    }
    var dataChannel = retVal.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("nvTien - dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("nvTien - dataChannel.onmessage:", event.data);
      if(onDataChannelMessageCallback != null) {
        onDataChannelMessageCallback(JSON.parse(event.data));
      }
    };

    dataChannel.onopen = function () {
      console.log('nvTien - dataChannel.onopen');
    };

    dataChannel.onclose = function () {
      console.log("nvTien - dataChannel.onclose");
    };

    retVal.textDataChannel = dataChannel;
  }

  return retVal;
}

function exchange(data) {
  var fromId = data.from;
  var pc;
  if (fromId in peerConnections) {
    pc = peerConnections[fromId];
  } else {
    let friend = friends.filter((friend) => friend.socketId == fromId)[0];
    if(friend == null) {
      friend = {
        socketId: fromId,
        name: ""
      }
    }
    pc = createPeerConnection(friend, false);
  }

  if (data.sdp) {
    //console.log('exchange sdp', data);
    pc.setRemoteDescription(new WebRTC.RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
      pc.createAnswer(function(desc) {
        //console.log('createAnswer', desc);
        pc.setLocalDescription(desc, function () {
          //console.log('setLocalDescription', pc.localDescription);
          socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
        }, logError);
      }, logError);
    }, logError);
  } else {
    //console.log('exchange candidate', data);
    pc.addIceCandidate(new WebRTC.RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('nvTien - leave', socketId);
  var pc = peerConnections[socketId];
  if(pc != null){
    pc.close();
  }
  if(pc != undefined){
    delete peerConnections[socketId];
  }
  if(onFriendLeftCallback != null) {
    onFriendLeftCallback(socketId);
  }

}

socket.on('exchange', function(data){
  exchange(data);
});

socket.on('leave', function(socketId){
  leave(socketId);
});

socket.on('connect', function(data) {
  console.log('nvTien - connect');
});

socket.on("join", function(friend) {
  //new friend:
  friends.push(friend);
  console.log("nvTien - New friend joint conversation: ", friend);
});

function logError(error) {
  console.log("nvTien - logError", error);
}

//------------------------------------------------------------------------------
//  Utils

//------------------------------------------------------------------------------
// Services
function countFriends(roomId, callback) {
  socket.emit("count", roomId, (count) => {
    console.log("nvTien - Count friends result: ", count);
    callback(count);
  });
}

// function loadLocalStream2(muted) {
//   navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
//     localStream = stream;
//     var selfView = document.getElementById("selfView");
//     selfView.src = URL.createObjectURL(stream);
//     selfView.muted = muted;
//   }, logError);
// }
//
// function getLocalStream(isFront, callback) {
//   WebRTC.MediaStreamTrack.getSources(sourceInfos => {
//     console.log(sourceInfos);
//     let videoSourceId;
//     for (const i = 0; i < sourceInfos.length; i++) {
//       const sourceInfo = sourceInfos[i];
//       if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
//         videoSourceId = sourceInfo.id;
//       }
//     }
//     WebRTC.getUserMedia({
//       audio: true,
//       video: {
//         mandatory: {
//           minWidth: 500, // Provide your own width, height and frame rate here
//           minHeight: 300,
//           minFrameRate: 30
//         },
//         facingMode: (isFront ? "user" : "environment"),
//         optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
//       }
//     }, function (stream) {
//       localStream = stream;
//       console.log("Got Local Stream");
//       callback(stream);
//     }, (error) => {
//       console.log("Get LocalStream Fail: ", error);
//     });
//   });
// }

function broadcastMessage(message) {
  for (var key in peerConnections) {
    var pc = peerConnections[key];
    pc.textDataChannel.send(JSON.stringify(message));
  }
}

function getLocalStream(isFront, callback) {
  WebRTC.MediaStreamTrack.getSources(sourceInfos => {
    console.log("nvTien - " + sourceInfos);
    let videoSourceId;
    sourceInfos.forEach((sourceInfo) => {
      if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
        videoSourceId = sourceInfo.id;
      }
    });

    WebRTC.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 300, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30
        },
        facingMode: (isFront ? "user" : "environment"),
        optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
      }
    }, function (stream) {
      localStream = stream;
      console.log('nvTien - Got Stream: ', stream);
      callback(stream);
    }, (error) => {
        // alert('error getUserMedia')
      console.log("nvTien - Error: ", error);
    });
  });
}


/**
 *
 * callbacks: {
 *    joined: function of () => {},
 *    friendConnected: (socketId, stream) => {},
 *    friendLeft: (socketId) => {},
 *    dataChannelMessage: (message) => {}
 * }
 *
 */
function join(roomId, name, callbacks) {
  onFriendLeftCallback = callbacks.friendLeft;
  onFriendConnectedCallback = callbacks.friendConnected;
  onDataChannelMessageCallback = callbacks.dataChannelMessage;
  console.log('nvTien - Call Join...roomID ' + roomId + " name: " + name );
  socket.emit('join', {roomId, name}, function(result){
    friends = result;
    console.log('nvTien - Joins'+ friends);
    friends.forEach((friend) => {
      createPeerConnection(friend, true);
    });
    if(callbacks.joined != null) {
      me = {
        socketId: socket.id,
        name: name
      }
      console.log('nvTien - Joined...');
      callbacks.joined();
    }
  });
}
//------------------------------------------------------------------------------
// Exports
module.exports = {
  getLocalStream,
  join,
  countFriends,
  broadcastMessage
}
