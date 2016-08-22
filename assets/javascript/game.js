$(function() {

  // selection box
  var $selectionBox = $('.selection-box'),
      $isUser = true,
      $playerprops,
      $user,
      $opponent,
      $numPlayer;
      

  

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
    userPropsContainer: $('.User__properties'),
    opponentContainer: $('.Opponent'),
    opponentPropsContainer: $('.Opponent__properties'),
    attackButton: $('.Attack__button'),
    instructions: $('.Instructions'),



    // initialize game
    init: function() {

      // add list of characters to DOM
      $selectionBox.html(characters).addClass('animated flipInX');

      // empty user + opponent Containers
      this.userContainer.find('.Avatar').remove();
      this.opponentContainer.find('.Avatar').remove();

      
      // user selects their character
      this.characterSelector.find('.Avatar').on('click', function() {
        // send selection to selectUser function
        game.selectUser($(this));

        // set isUser to false
        $isUser = false;
      });


      // set numPlayer to 1 so we can select one opponent
      $numPlayer = 1;
      
      

    }, // end init


    // player object class
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
        $user = Object.create(this.player);
        

        // set $user properties
        $user.name = img.data('name');
        $user.health_points = parseInt(img.data('healthpoints'));
        $user.attack_power = parseInt(img.data('attackpower'));
        $user.base_attack_power = parseInt(img.data('baseattackpower'));
        $user.counter_attack_power = parseInt(img.data('counterattackpower'));


        // move item
        avatar.detach().prependTo(game.userContainer);

        // add 'Choose opponent' language
         game.characterSelector.prepend('<h4>Choose your Opponent</h4>');

        // create player properties html
        playerprops = '<p><strong>' + $user.name + '</strong></p>'
                      +'<p>Health: ' + $user.health_points + '</p>';

        // append player properties
        game.userPropsContainer.append(playerprops);

        // update instructions
        game.instructions.fadeOut('slow', function() {
          $(this).html('<p>Now choose your opponent...</p>').fadeIn('slow');
        })
      }
      else {
        
        if($numPlayer > 0) {

          // create opponent object
          $opponent = Object.create(this.player);  

          // set $opponent properties
          $opponent.name = img.data('name');
          $opponent.health_points = parseInt(img.data('healthpoints'));
          $opponent.attack_power = parseInt(img.data('attackpower'));
          $opponent.counter_attack_power = parseInt(img.data('counterattackpower'));

          // move item
          avatar.detach().prependTo(game.opponentContainer);

          // create player properties html
          playerprops = '<p><strong>' + $opponent.name + '</strong></p>'
                        +'<p>Health: ' + $opponent.health_points + '</p>';

          // append player properties
          game.opponentPropsContainer.append(playerprops);

          // show attack button
          game.attackButton.addClass('animated fadeIn');

          // stop ability to add more than 1 opponent
          $numPlayer = 0;

          // start the match
          this.fight($user, $opponent);
        }

      }


      
      


    }, // end selectUser



    fight: function() {
      
      this.attackButton.on('click', function() {
        
        $user.base_attack_power = $user.base_attack_power
        $user.attack_power = $user.attack_power;
        console.log($user.attack_power+=$user.base_attack_power);
        $user.current_health = $user.attack_power+=$user.base_attack_power;

        // create player properties html
        playerprops = '<p><strong>' + $user.name + '</strong></p>'
                      +'<p>Health: ' + $user.current_health + '</p>';

        // append player properties
        game.userPropsContainer.html(playerprops);


        

        return false;
      });

    }



  } // end game




  
  


  game.init();

});