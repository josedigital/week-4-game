$(function() {

  // set global vars
  var $isUser = true,
      $playerprops,
      $user,
      $opponent,
      $numPlayer;
      

  

  var characters = 
        '<div class="Avatar">'
          + '<img src="assets/images/the-pirate.jpg" alt="the pirate" class="Avatar--round the-pirate" data-healthpoints="130" data-attackpower="8" data-counterattackpower="16" data-name="The Dread Pirate Roberts">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-albino.jpg" alt="the albino" class="Avatar--round the-albino" data-healthpoints="100" data-attackpower="5" data-counterattackpower="10" data-name="The Albino">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-count.jpeg" alt="the count" class="Avatar--round the-count" data-healthpoints="120" data-attackpower="12" data-counterattackpower="13" data-name="Count Rugen">'
        + '</div>'
        + '<div class="Avatar">'
          + '<img src="assets/images/the-prince.jpeg" alt="the prince" class="Avatar--round the-prince" data-healthpoints="160" data-attackpower="15" data-counterattackpower="12" data-name="Prince Humperdinck">'
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
    commentator: $('.Commentator'),



    // initialize game
    init: function() {

      // add list of characters to DOM
      this.characterSelector.html(characters).addClass('animated flipInX');

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
        $user.base_attack_power = $user.attack_power;
        $user.counter_attack_power = parseInt(img.data('counterattackpower'));


        // move item
        avatar.detach().prependTo(game.userContainer);

        // add 'Choose opponent' language
         game.characterSelector.prepend('<h4>Choose your Opponent</h4>');

        // create player properties html
        playerprops = '<h6><strong>' + $user.name + '</strong></h6>'
                      +'<p>Health: ' + $user.health_points + '</p>';

        // append player properties
        game.userPropsContainer.append(playerprops);

        // update instructions
        game.instructions.fadeOut('slow', function() {
          $(this).html('<p>Now choose your opponent...</p>').fadeIn('slow');
        });
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
          playerprops = '<h6><strong>' + $opponent.name + '</strong></h6>'
                        +'<p>Health: ' + $opponent.health_points + '</p>';

          // append player properties
          game.opponentPropsContainer.append(playerprops);

          

          // update instructions
          game.instructions.fadeOut('slow', function() {
            $(this).html('<p>Ready... Set...</p>').fadeIn('slow', function() {
              // show attack button
              game.attackButton.addClass('animated fadeInUp');
              // show comments
              game.commentator.addClass('animated fadeInUp');
            });
          });

          // stop ability to add more than 1 opponent
          $numPlayer = 0;

          // start the match
          this.fight($user, $opponent);
        }

      }


      
      


    }, // end selectUser



    fight: function() {
      
      this.attackButton.on('click', function() {
        
        /*------------- USER CALCULATIONS -------------------*/

        // user health = user health - oppenent attack
        $user.health_points = $user.health_points-=$opponent.attack_power;

        // create user properties html
        userprops = '<h6><strong>' + $user.name + '</strong></h6>'
                      +'<p>Health: ' + $user.health_points + '</p>';

        // append player properties
        game.userPropsContainer.html(userprops);






        /*------------- OPPONENT CALCULATIONS -------------------*/

        // opponent health = opponent health - user attack
        $opponent.health_points = $opponent.health_points-=$user.attack_power;


        // create player properties html
        opponentprops = '<h6><strong>' + $opponent.name + '</strong></h6>'
                      +'<p>Health: ' + $opponent.health_points + '</p>';

        // append player properties
        game.opponentPropsContainer.html(opponentprops);








        /*------------- COMMENTATOR -------------------*/
        comments = '<p>You hit ' + $opponent.name + ' with ' + $user.attack_power + ' points worth of damage.</p>'
                  +'<p>' + $opponent.name + ' hit you with ' + $opponent.attack_power + ' ponts worth of damage.</p>';
        // add comments to DOM
        game.commentator.html(comments);



        /*------------- USER ATTACK CALCULATION -------------------*/
        // user attack = user attack + user base attack -- has to be done after first click
        // so it is located at the end of the entire click event so that first hit is base_attack_power
        // otherwise the first hit will be attack_power + base_attack_power
        $user.attack_power+=$user.base_attack_power; 




        // check for win
        if($user.health_points > 0 && $opponent.health_points <= 0) {
          // user wins
          console.log('user wins!');
          game.win();
        }
        if($user.health_points <= 0 && $opponent.health_points > 0) {
          // opponent wins
          console.log('opponent wins!');
        }

        return false;
      });

    },


    win: function() {
      // user wins: select new opponent
      // remove old opponent
      this.opponentContainer.find('.Avatar').fadeOut('slow', function() {
        $(this).remove();
      });
      this.opponentPropsContainer.empty();
      console.log($isUser);
      $isUser = true;
      console.log($isUser);
      this.selectUser();

      
      
      /*------------- COMMENTATOR -------------------*/
        comments = '<p>You have bested ' + $opponent.name +'.</p>'
                  +'<p>Choose a new opponent to continue playing.</p>';
        // add comments to DOM
        game.commentator.html(comments);

    },

    lose: function() {
      // user loses: restart game
    }



  } // end game




  
  


  game.init();

});