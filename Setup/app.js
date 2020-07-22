new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function(){//reset all base values
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){ // we need a win/lose check and to make this a helper function
            let damage = this.damageCalculation(10, 3);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage  + ' damage!',
            });
            if (this.victoryCheck()){
                return;
            }

            this.monsterAttacks();
        },
        
        specialAttack: function(){
            let damage = this.damageCalculation(20, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage  + ' damage!',
            });
            if (this.victoryCheck()){
                return;
            }

            this.monsterAttacks();
            this.victoryCheck();
        },

        monsterAttacks: function(){
            let damage=this.damageCalculation(12, 5);
            this.playerHealth-= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits the player for ' + damage + ' damage!',
            });
            this.victoryCheck();
        },

        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth+=10;
            }else{
                this.playerHealth=100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10 hit points!',
            });
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },

        victoryCheck: function(){
            if (this.monsterHealth <= 0){
                if (confirm('You won! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                }
                return true;
            } else if (this.playerHealth <=0){
                if (confirm('You lost! New Game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                }
                return true;
            }
            return false;
        },

        damageCalculation: function(inputMax, inputMin){
            return Math.max(Math.floor(Math.random() * inputMax) + 1, inputMin);
        },
    }
});

// victoryCheck: function(individual){
        //     if (individual == "monster"){
        //         if (this.playerHealth <= 0){
        //             if (confirm('You lost! New Game?')){
        //                 this.startGame;
        //             }
        //             else{
        //                 this.gameIsRunning = false;
        //             }
        //             return;
        //         }
        //     }
        //     else{
        //         if (this.monsterHealth <= 0){
        //             if (confirm('You won! New Game?')){
        //                 this.startGame;
        //             }
        //             else{
        //                 this.gameIsRunning = false;
        //             }
        //             return;
        //         }
        //     }
        // }, My Old (imo superior) way :(