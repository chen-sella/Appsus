import colorPalette from './note-color-palette.cmp.js';

export default {
  props: ['note', 'colors'],
  name: 'noteControls',
  template: `
        <ul class="note-update-list clean-list flex">
          <li @click="colorOptions" class="palette-icon">
            <i class="fas fa-palette"></i>
            <color-palette v-if="colorEdit" :colors="colors" @pickedColor="pickColor"></color-palette>
          </li>
          <li @click="deleteNote">
            <i class="fas fa-trash"></i>
          </li>
        </ul>
            
        `,
  data() {
    return {
      colorEdit: false,
    };
  },
  methods: {
    colorOptions() {
      this.colorEdit = !this.colorEdit;
    },
    pickColor(color) {
      this.$emit('colorPicked', color);
      this.colorEdit = false;
      console.log('colorEdit:', this.colorEdit);
    },
    deleteNote() {
      console.log('deleting');
    },
  },
  computed: {},
  components: {
    colorPalette,
  },
};
