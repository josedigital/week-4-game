# week-4-game

##TODO:

- fix/reset attack_power: either my math is wrong or my programming is wrong, probably both.
- redo the player object -> abstract to function e.g. createPlayer(avatar)
  - noticed that calculations are correct but when a new opponent is chosen, the first button click
    is ran twice. trying to figure out why.
  - when restarting game with reset button, user properties remain. need to check if the same for opponent properties.
    - see if player object abstraction will help

- abstract reset/play again to it's own method