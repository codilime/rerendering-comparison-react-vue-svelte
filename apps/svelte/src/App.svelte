<script lang="ts">
  import { UPDATE_LEVEL } from "common";
  import GameBoardLevelValue from "./update-level-value/GameBoardLevelValue.svelte";
  import GameBoardLevelArray from "./update-level-array/GameBoardLevelArray.svelte";
  import GameBoardLevelState from "./update-level-state/GameBoardLevelState.svelte";
</script>

<div id="app">
    <h1>Svelte <span class="version">3.46.6</span></h1>
    {#if UPDATE_LEVEL === 'VALUE'}
        <GameBoardLevelValue/>
    {:else if UPDATE_LEVEL === 'ITEM'}
        <div class="not-possible">
            <a href="https://svelte.dev/tutorial/updating-arrays-and-objects" target="_blank" rel="noreferrer">
                Need to create new Array instance
            </a>
        </div>
    {:else if UPDATE_LEVEL === 'ARRAY'}
        <GameBoardLevelArray/>
    {:else if UPDATE_LEVEL === 'STATE'}
        <GameBoardLevelState/>
    {/if}
</div>

