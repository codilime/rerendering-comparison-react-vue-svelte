<script lang="ts">
  import 'common/css/styles.css';
  import { afterUpdate, getContext } from 'svelte'
  import { BOARD_SIZE, log, UPDATE_LEVEL } from "common";
  import Square from "./SquareLevelState.svelte";
  import { createGameStoreLevelState } from "./game-board-level-state.store";

  const gameStore = createGameStoreLevelState();
  const state = gameStore.state;

  afterUpdate(()=>{
    log('[Render] GameBoard')
  })

  const onClick = (item)=> {
    log('--- onSquareClick ---');
    gameStore.onClickItem(item);
  }


</script>

<section>
    <div class="game-board"
         style:grid-template-columns={`repeat(${BOARD_SIZE}, 40px`}
         style:grid-template-rows={`repeat(${BOARD_SIZE}, 40px`}>
        {#each $state.squares as item}
            <Square {item} on:click={() => onClick(item)} />
        {/each}

    </div>
</section>