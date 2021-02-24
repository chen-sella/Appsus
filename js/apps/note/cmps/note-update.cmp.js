export default {
  props: ['note'],
  name: 'noteUpdate',
  template: `
        <ul class="note-update-list clean-list flex">
          <li @click="colorOptions" class="palette-icon">
            <i class="fas fa-palette"></i>
            <ul v-if="colorEdit" class="color-palette clean-list flex">
              <li v-for="color in colors" class="palette-color" :style="color" @click="pickColor(color)"></li>
            </ul>
          </li>
          <li><i class="far fa-image"></i></li>
          <li><i class="fas fa-trash"></i></li>
        </ul>
            
        `,
  data() {
    return {
      colorEdit: null,
      colors: [
        {backgroundColor: '#F28B83',borderColor: '#F28B83'},
        {backgroundColor: '#FCBC02', borderColor: '#FCBC02'},
        {backgroundColor: '#FFF475', borderColor: '#FFF475'},
        {backgroundColor: '#CCFF90', borderColor: '#CCFF90'},
        {backgroundColor: '#A7FFEB', borderColor: '#A7FFEB'},
        {backgroundColor: '#CBF0F8', borderColor: '#CBF0F8'},
        {backgroundColor: '#AECBFA', borderColor: '#AECBFA'},
        {backgroundColor: '#D7AEFB', borderColor: '#D7AEFB'},
        {backgroundColor: '#FDCFE8', borderColor: '#FDCFE8'},
        {backgroundColor: '#E6C9A8', borderColor: '#E6C9A8'},
        {backgroundColor: '#E8EAED', borderColor: '#E8EAED'},
        {backgroundColor: 'white', borderColor: '#8080809e'},
      ],
    };
  },
  methods: {
    colorOptions() {
      this.colorEdit = true;
    },
    pickColor(color) {
      this.colorEdit = null;
      this.$emit('colorPicked', color);
    },
  },
  computed: {},
  components: {},
};
