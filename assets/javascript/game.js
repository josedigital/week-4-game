$(function() {

  // selection box
  var $selectionBox = $('.selection-box'),
      $isUser = true,
      $playerprops;
      

  

  var characters = 
        '<div class="Avatar">'
          + '<img src="assets/images/the-pirate.jpg" alt="the pirate" class="Avatar--round the-pirate" data-healthpoints="150" data-attackpower="150" data-counterattackpower="150" data-name="The Dread Pirate Roberts">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-albino.jpg" alt="the albino" class="Avatar--round the-albino" data-healthpoints="150" data-attackpower="150" data-counterattackpower="150" data-name="The Albino">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-count.jpeg" alt="the count" class="Avatar--round the-count" data-healthpoints="150" data-attackpower="150" data-counterattackpower="150" data-name="Count Rugen">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-prince.jpeg" alt="the prince" class="Avatar--round the-prince" data-healthpoints="150" data-attackpower="150" data-counterattackpower="150" data-name="Prince Humperdinck">'
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
    userContainer: $('.User'),
    opponentContainer: $('.Opponent'),
    attackButton: $('.Attack__button'),



    // initialize game
    init: function() {

      // add list of characters to DOM
      $selectionBox.html(characters).addClass('animated flipInX');

      // empty user + opponent Containers
      this.userContainer.empty();
      this.opponentContainer.empty();

      
      // user selects their character
      this.characterSelector.find('.Avatar').click(function() {
        // send selection to selectUser function
        game.selectUser($(this));

        game.characterSelector.prepend('<h4>Choose your Opponent</h4>');

        // set isUser to false
        $isUser = false;
      });

      
      

    }, // end init



    selectUser: function(avatar) {

      // create user object
      var user = Object.create(player);
      
      // get image and data
      var img = avatar.find('img');
      

      // set user properties
      user.name = img.data('name');
      user.health_points = img.data('healthpoints');
      user.attack_power = img.data('attackpower');
      user.counter_attack_power = img.data('counterattackpower');
      

      if($isUser) {
        // move item
        avatar.detach().appendTo(game.userContainer);

        // create player properties html
        playerprops = '<p><strong>' + user.name + '</strong></p>'
                      +'<p>Health: ' + user.health_points + '</p>';

        // append player properties
        game.userContainer.append(playerprops);
      }
      else {
        // move item
        avatar.detach().appendTo(game.opponentContainer);

        // create player properties html
        playerprops = '<p><strong>' + user.name + '</strong></p>'
                      +'<p>Health: ' + user.health_points + '</p>';

        // append player properties
        game.opponentContainer.append(playerprops);

        // show attack button
        game.attackButton.addClass('animated fadeIn');
      }
      


    } // end selectUser



  } // end game




  
  


  game.init();

});