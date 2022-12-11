function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            move: 0,
            winner: null,
            battleLog: [],
        }
    },
    watch: {
        move() {
            if(this.move) this.attackPlayer();
        }
    },
    methods: {
        attackMonster(minDamage, maxDamage) {
            const randNumber = getRandomNumber(minDamage, maxDamage);
            this.monsterHealth -= randNumber;

            const log = {
                actor: 'You',
                action: 'Attack',
                count: randNumber,
            }
            this.battleLog.unshift(log);

            if(this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                this.winner = 'You';
            } else {
                this.move++;
            }
        },
        attackPlayer() {
            const randNumber = getRandomNumber(5, 15);
            this.playerHealth -= randNumber;

            const log = {
                actor: 'Monster',
                action: 'Attack',
                count: randNumber,
            }
            this.battleLog.unshift(log);

            if(this.playerHealth <= 0) {
                this.playerHealth = 0;
                this.winner = 'Monster'
            }
        },
        heal() {

            const randNumber = getRandomNumber(5, 15);
            this.playerHealth += randNumber;

            const log = {
                actor: 'You',
                action: 'Heal',
                count: randNumber,
            }
            this.battleLog.unshift(log);

            if(this.playerHealth > 100) this.playerHealth = 100;
            this.move++;
        },
        surrender() {
            this.winner = 'Monster';
        },
        rematch() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.move = 0;
            this.winner = null;
            this.battleLog = [];
        }
    }
});

app.mount('#app');