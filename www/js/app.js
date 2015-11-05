angular.module('test', ['ionic'])

.controller('test', function($scope, $ionicPlatform, $ionicScrollDelegate) {
  $scope.myTitle = 'Template';
  $scope.data = {
    items : [],
    title : ''
  };

  var datas = {
    nbrOfImages: 7, // set le nombre d'images ici, je n'ai pas pris le temps d'aller chercher les images dans un dossier que tu aurai pu spécifier
    nbrOfAmbSounds: 4, // le nombre de sons ambiants
    nbrOfPonctSounds: 2, // le nombre de sons ponctuels
    ambSounds: [], // tableau contenant les sons ambiants (générés par initAmbSounds)
    ponctSounds: [] // tableau contenant les sons ponctuels (générés par initPonctSounds)
  }

  soundManager.setup({
    onready: function() {
      // une fois le sound manager prêt on initialise les sons
      initAmbSounds();
      initPonctSounds();
      console.log("Sounds Ready");
    }
  });


  initImgs();

  $scope.getScrollPosition = function(){
      console.log("Scroll pos from top: ", $ionicScrollDelegate.getScrollPosition().top);
      // ici la fonction playsoundatposy contient la position y en % de l'endroit ou tu veux jouer le son,
      // avec une marge d'erreur posVar en % en fonction de la taille d'une image
      // quel son doit on jouer avec which sound, et le numéro de l'image sur laquelle on se positionne
      playSoungAtPosY(25, {type: "amb", whichImg: 2, whichSound: 2, posVar: 10, playing: false});
  }

  // initialise les images, les sons de ta bd

  function initImgs(){
    for(var i = 1; i <= datas.nbrOfImages; i++) {
      // génère les images dans l'index.html
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

  // joue un son prédéfinie à une hauteur prédéfinie en % sur une image prédéfinie
  // avec une marge de positionnement définie en %
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

  // play et stop le son, simplement

  function LoopSound(sound, playStop, volume){
    if (sound.type == "amb") {
      if (playStop == "play") {
        datas.ambSounds[(sound.whichSound - 1)].play();
        return true;
      } else {
        datas.ambSounds[(sound.whichSound - 1)].stop();
        return false;
      }
    }
    else if (sound.type == "ponctu") {
      if (playStop == "play" && !sound.playing) {
        datas.ponctSounds[(sound.whichSound - 1)].play();
        return true;
      } else {
        datas.ponctSounds[(sound.whichSound - 1)].stop();
        return false;
      }
    }
  }
})
