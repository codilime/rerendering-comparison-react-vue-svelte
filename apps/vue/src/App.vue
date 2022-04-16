<template>
  <div id="app">
    <section>
      <h1>Vue  <span className="version">3.2.31</span></h1>
      <GameBoard />
    </section>
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
