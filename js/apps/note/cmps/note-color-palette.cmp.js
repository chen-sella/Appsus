import { eventBus } from '../../../services/event-bus.service.js';

export default {
  props: ['colors'],
  template: `
        <ul class="color-palette clean-list flex">
              <li v-for="color in colors" class="palette-color" :style="color" @click.stop="colorPicked(color)"></li>
            </ul>
    `,
  methods: {
    colorPicked(color) {
      this.$emit('pickedColor', color);
      const msg = {
        txt: 'color changed succesfully',
        type: 'success',
      };
      eventBus.$emit('show-msg', msg);
    },
  },
};
