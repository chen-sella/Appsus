import colorPalette from './note-color-palette.cmp.js';

export default {
  props: ['note', 'colors'],
  name: 'noteUpdate',
  template: `
        <ul class="note-update-list clean-list flex">
          <li @click="colorOptions" class="palette-icon">
            <i class="fas fa-palette"></i>
            <color-palette v-if="colorEdit" :colors="colors" @pickedColor="pickColor"></color-palette>
          </li>
          <li @click="inputClick">
            <i class="far fa-image"></i>
            <input name="upload-file" type="file" ref="fileInput" @change="uploadImg($event)">
          </li>
          <li @click="deleteNote"><i class="fas fa-trash"></i></li>
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
    inputClick(){
      this.$refs.fileInput.click();
    },
    pickColor(color) {
      this.$emit('colorPicked', color);
      this.colorEdit = false;
      console.log('colorEdit:', this.colorEdit);
    },
    uploadImg(ev) {
      console.log(ev);
      this.$emit('uploadImg', ev);
    },
    deleteNote(){
      console.log('deleting');
    }
  },
  computed: {},
  components: {
    colorPalette,
  },
};
