# jquery rpg

1. select a player from list of players.
  - user will assume the player avatar for duration of game
2. move the non-selected/enemies/opponents avatars to a different part of the game
3. user selects an opponent from the list
4. attack button appears 
5. 





Character/Avatar
  - health points
  - attack power
  - counter attack power
  



div.player
div.opponent

div.characters 
  - list all characters in the game, ready to select your player
  - click on character to select
  - character gets removed and attached to div.player
  - this div, remove class characters, add class opponents

div.opponents
  - same div as character with new class of opponents
  - list remaining characters, ready to select opponent
  - click on character to select
  - character gets removed and attached to div.opponent
  - add a class like ".now-2" and do a click to select using (".now-2 img").on('click')
    > so that only those images become eligible

attack.button displays between player and opponent




player {
  Health Points: '',
  Attack Power: '',
  Counter Attack Power: ''
}

base_attack_power = constant        // only user
counter_attack_power = constant     // only opponent
counter_attack_power = counter_attack_power + base_attack_power       // only user




game
  init
    set characters
    set default player properties for each player
    set wins to 0
    set losses to 0
    
