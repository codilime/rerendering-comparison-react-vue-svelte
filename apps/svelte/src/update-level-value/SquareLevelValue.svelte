<script lang="ts">
  import 'common/css/styles.css';
  import { log, type SquareItem } from "common";
  import { afterUpdate } from 'svelte'
  import type { Writable } from "svelte/store";

  export let item: Writable<SquareItem>;
  $: index = $item.index;

  afterUpdate(() => {
    log('[Render]', index);
  })

</script>

<div class="square" on:click>{$item.value}</div>
