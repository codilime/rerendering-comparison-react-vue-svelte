<script lang="ts">
import { defineComponent } from 'vue'
import Square from '@/components/Square.vue'
import { BOARD_SIZE, INITIAL_STATE, log, SquareItem, UPDATE_LEVEL } from 'common'

export default defineComponent({
  components: {
    Square
  },

  data () {
    return {
      BOARD_SIZE,
      gameState: INITIAL_STATE
    }
  },

  methods: {
    onSquareClick (clickedSquare: SquareItem) {
      log('--- onSquareClick ---')

      const gameState = this.gameState;

      switch (UPDATE_LEVEL) {
        case 'VALUE': {
          clickedSquare.value = gameState.nextPlayer;
          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'ITEM': {
          const clickedSquareArrayIndex = gameState.squares
              .findIndex(square => square.index === clickedSquare.index);

          gameState.squares[clickedSquareArrayIndex] = {
            index: clickedSquare.index,
            value: gameState.nextPlayer,
          };

          // or
          // gameState.squares.splice(clickedSquareArrayIndex, 1, {
          //   index: clickedSquare.index,
          //   value: gameState.nextPlayer,
          // });

          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'ARRAY': {
          gameState.squares = gameState.squares.map(square =>
              square === clickedSquare
                  ? { ...square, value: gameState.nextPlayer }
                  : square
          );
          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'STATE': {
          this.gameState = {
            squares: gameState.squares.map(square =>
                square === clickedSquare
                    ? { ...square, value: gameState.nextPlayer }
                    : square
            ),
            nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O',
          };
          break;
        }
      }
    }
  },
  created () {
    log('[Render] GameBoard')
  },

  beforeUpdate () {
    log('[Render] GameBoard')
  }
})

</script>

<template>
  <div class="game-board"
       :style="{
             gridTemplateColumns: `repeat(${BOARD_SIZE}, 40px)`,
             gridTemplateRows: `repeat(${BOARD_SIZE}, 40px)`
         }">
    <Square v-for="item in gameState.squares"
            :key="item.index"
            :item="item"
            @square-click="onSquareClick"
    />
  </div>
</template>

<style src="common/css/styles.css" />
