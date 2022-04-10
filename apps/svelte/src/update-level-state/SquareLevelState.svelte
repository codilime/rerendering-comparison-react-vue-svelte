<script lang="ts">
  import 'common/css/styles.css';
  import { log, type SquareItem } from "common";
  import { afterUpdate } from 'svelte'

  export let item: SquareItem;

  afterUpdate(() => {
    log('[Render]', item.index);
  })

</script>

<div class="square" on:click>{item.value}</div>
