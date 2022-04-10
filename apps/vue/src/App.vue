<template>
  <div id="app">
    <GameBoard />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import GameBoard from './components/GameBoard.vue'

export default defineComponent({
  name: 'App',
  components: {
    GameBoard
  }
})
</script>
