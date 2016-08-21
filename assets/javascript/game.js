$(function() {

  // selection box
  var $selectionBox = $('.selection-box');
      

  

  var characters = 
        '<div class="Avatar">'
          + '<img src="assets/images/the-pirate.jpg" alt="the pirate" class="Avatar--round the-pirate" data-name="The Dread Pirate Roberts">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-albino.jpg" alt="the albino" class="Avatar--round the-albino" data-name="The Albino">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-count.jpeg" alt="the count" class="Avatar--round the-count" data-name="Count Rugen">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-prince.jpeg" alt="the prince" class="Avatar--round the-prince" data-name="Prince Humperdinck">'
        + '</div>';




  // player object
  var player = {
    name: '',
    health_points: 'default',
    attack_power: 'default',
    counter_attack_power: 'default'
  }






  // game object
  var game = {


    // set variables
    
    opponentSelector: $('.opponents'),
    characterSelector: $('.characters'),
    userSelector: $('.User'),
    



    // initialize game
    init: function() {

      // add list of characters to DOM
      $selectionBox.html(characters).addClass('animated flipInX');


      this.characterSelector.find('.Avatar').click(function() {
        game.selectUser($(this));
        // game.characterSelector.find('.Avatar').removeClass('Avatar').addClass('Avatar--opponent');
      });



    }, // end init



    selectUser: function(avatar) {

      var user = Object.create(player);
      
      // get image and data
      var img = avatar.find('img');

      // set user properties
      user.name = img.data('name');
      console.log(user);

      // replace characters class with opponents class
      $selectionBox.removeClass('characters').addClass('opponents');

      // move item
      img.detach().appendTo('.User');


    }



  } // end game




  
  


  game.init();

});