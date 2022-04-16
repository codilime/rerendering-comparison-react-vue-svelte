<script lang="ts">
  import 'common/css/styles.css';
  import { afterUpdate } from 'svelte'
  import { BOARD_SIZE, log } from "common";
  import Square from "./SquareLevelArray.svelte";
  import { createGameStoreLevelArray } from "./game-board-level-array.store";

  const gameStore = createGameStoreLevelArray();
  const squares = gameStore.gameState.squares;

  afterUpdate(() => {
    log('[Render] GameBoard')
  })

  const onClick = (item) => {
    log('--- onSquareClick ---');
    gameStore.onClickItem(item);
  }


</script>

<div class="game-board"
     style:grid-template-columns={`repeat(${BOARD_SIZE}, 40px`}
     style:grid-template-rows={`repeat(${BOARD_SIZE}, 40px`}>
    {#each $squares as item}
        <Square {item} on:click={() => onClick(item)}/>
    {/each}

</div>