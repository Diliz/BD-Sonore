angular.module('test', ['ionic'])

.controller('test', function($scope, $ionicPlatform, $ionicScrollDelegate) {
  $scope.myTitle = 'Template';
  $scope.data = {
    items : [],
    title : ''
  };

  var datas = {
    nbrOfImages: 7,
    nbrOfAmbSounds: 4,
    nbrOfPonctSounds: 2,
    ambSounds: [],
    ponctSounds: []
  }

  soundManager.setup({
    onready: function() {
      initAmbSounds();
      initPonctSounds();
      console.log("Sounds Ready");
    }
  });


  initImgs();

  $scope.getScrollPosition = function(){
      console.log("Scroll pos from top: ", $ionicScrollDelegate.getScrollPosition().top);

      playSoungAtPosY(25, {type: "amb", whichImg: 2, whichSound: 2, posVar: 10, playing: false});
  }

  function initImgs(){
    for(var i = 1; i <= datas.nbrOfImages; i++) {
      $scope.data.items.push({src: "img/bd/Case" + i + ".jpg"});
    }
  }

  function initAmbSounds(){
    for(var i = 1; i <= datas.nbrOfPonctSounds; i++) {
      datas.ambSounds.push(
        soundManager.createSound({
          id: "Amb" + i,
          url: "sounds/Amb" + i + ".wav"
        }));
    }
  }

  function initPonctSounds(){
    for(var i = 1; i <= datas.nbrOfAmbSounds; i++) {
      datas.ponctSounds.push(
        soundManager.createSound({
          id: "Ponctu" + i,
          url: "sounds/Ponctu" + i + ".wav"
        }));
    }
  }

  function playSoungAtPosY(y, sound){
      var posY = (($('.scroll').height() / datas.nbrOfImages) / 100) * sound.whichImg * y;
      var posVar = (($('.scroll').height() / datas.nbrOfImages) / 100) * sound.posVar;
      var position = ((($ionicScrollDelegate.getScrollPosition().top / $('.scroll').height()) * (100 * datas.nbrOfImages)) + ($('.scroll').height() / (100 * datas.nbrOfImages) * 2));
      if (posY < (position + posVar) && posY > (position - posVar) && sound.playing == false) {
        sound.playing = LoopSound(sound, "play", 50);
      }
      else {
        sound.playing = LoopSound(sound, "stop", 50);
      }
      console.log("sound.playing: " + sound.playing);
      console.log("pos: " + position + "   posY: " + posY + "   jeu: " + posVar);
  }

  function LoopSound(sound, playStop, volume){
    if (sound.type == "amb") {
      if (playStop == "play") {
        datas.ambSounds[(sound.whichSound - 1)].play();
        return true;
      } else {
        datas.ambSounds[(sound.whichSound - 1)].stop;
        return false;
      }
    }
    else if (sound.type == "ponctu") {
      if (playStop == "play" && !sound.playing) {
        datas.ponctSounds[(sound.whichSound - 1)].play();
        return true;
      } else {
        datas.ponctSounds[(sound.whichSound - 1)].stop;
        return false;
      }
    }
  }
})
