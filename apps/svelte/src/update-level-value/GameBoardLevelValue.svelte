<script lang="ts">
  import 'common/css/styles.css';
  import { afterUpdate } from 'svelte'
  import { BOARD_SIZE, log } from "common";
  import Square from "./SquareLevelValue.svelte";
  import { createGameStoreLevelValue } from "./game-board-level-value.store";

  const gameStore = createGameStoreLevelValue();

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
    {#each gameStore.gameState.squares as item}
        <Square {item} on:click={() => onClick(item)}/>
    {/each}

</div>