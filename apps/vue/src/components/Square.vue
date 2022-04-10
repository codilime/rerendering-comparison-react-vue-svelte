<script lang="ts">
import { defineComponent, h } from 'vue';
import { log, SquareItem } from 'common';

export default defineComponent({
  props: {
    item: Object as () => SquareItem,
  },

  render() {
    log('[Render]', this.item?.index);
    return h('div', {
      class: 'square',
      onClick: () => {
        this.$emit('square-click', this.item);
      },
    }, this.item?.value);
  },
});
</script>
