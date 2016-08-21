$(function() {

  // selection box
  var $selectionBox = $('.selection-box'),
      $isUser = true,
      $playerprops,
      $user,
      $opponent;
      

  

  var characters = 
        '<div class="Avatar">'
          + '<img src="assets/images/the-pirate.jpg" alt="the pirate" class="Avatar--round the-pirate" data-healthpoints="150" data-attackpower="150" data-baseattackpower="150" data-counterattackpower="150" data-name="The Dread Pirate Roberts">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-albino.jpg" alt="the albino" class="Avatar--round the-albino" data-healthpoints="150" data-attackpower="150" data-baseattackpower="150" data-counterattackpower="150" data-name="The Albino">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-count.jpeg" alt="the count" class="Avatar--round the-count" data-healthpoints="150" data-attackpower="150" data-baseattackpower="150" data-counterattackpower="150" data-name="Count Rugen">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-prince.jpeg" alt="the prince" class="Avatar--round the-prince" data-healthpoints="150" data-attackpower="150" data-baseattackpower="150" data-counterattackpower="150" data-name="Prince Humperdinck">'
        + '</div>';










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

        // set isUser to false
        $isUser = false;
      });

      
      

    }, // end init



    player: {
        name: '',
        health_points: '',
        attack_power: '',
        base_attack_power: '',
        counter_attack_power: ''
    },



    selectUser: function(avatar) {


      // get image to get data
      var img = avatar.find('img');
      

      if($isUser) {

        // create user object
        user = Object.create(this.player);
        
        

        // set user properties
        user.name = img.data('name');
        user.health_points = img.data('healthpoints');
        user.attack_power = img.data('attackpower');
        user.base_attack_power = img.data('baseattackpower');
        user.counter_attack_power = img.data('counterattackpower');



        // move item
        avatar.detach().appendTo(game.userContainer);

        // add 'Choose opponent' language
         game.characterSelector.prepend('<h4>Choose your Opponent</h4>');

        // create player properties html
        playerprops = '<p><strong>' + user.name + '</strong></p>'
                      +'<p>Health: ' + user.health_points + '</p>';

        // append player properties
        game.userContainer.append(playerprops);
      }
      else {

        // create opponent object
        opponent = Object.create(this.player);  

        // set opponent properties
        opponent.name = img.data('name');
        opponent.health_points = img.data('healthpoints');
        opponent.attack_power = img.data('attackpower');
        opponent.counter_attack_power = img.data('counterattackpower');


        // move item
        avatar.detach().appendTo(game.opponentContainer);

        // create player properties html
        playerprops = '<p><strong>' + opponent.name + '</strong></p>'
                      +'<p>Health: ' + opponent.health_points + '</p>';

        // append player properties
        game.opponentContainer.append(playerprops);

        // show attack button
        game.attackButton.addClass('animated fadeIn');


        this.fight(user, opponent);

      }


      
      


    }, // end selectUser



    fight: function() {
      
      this.attackButton.on('click', function() {
        
        user.base_attack_power = parseInt(user.base_attack_power)
        user.attack_power = parseInt(user.attack_power);
        console.log(user.attack_power+=user.base_attack_power);

        

        return false;
      });

    }



  } // end game




  
  


  game.init();

});