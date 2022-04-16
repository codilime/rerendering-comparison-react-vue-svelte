<script lang="ts">
  import 'common/css/styles.css';
  import { afterUpdate } from 'svelte'
  import { BOARD_SIZE, log } from "common";
  import Square from "./SquareLevelState.svelte";
  import { createGameStoreLevelState } from "./game-board-level-state.store";

  const gameStore = createGameStoreLevelState();
  const gameState = gameStore.gameState;

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
    {#each $gameState.squares as item}
        <Square {item} on:click={() => onClick(item)}/>
    {/each}

</div>