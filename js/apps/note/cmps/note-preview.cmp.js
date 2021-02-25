import noteTxt from '../cmps/note-types/note-txt.cmp.js';
import noteTodos from '../cmps/note-types/note-todos.cmp.js';
import noteImg from '../cmps/note-types/note-img.cmp.js';
import noteVideo from '../cmps/note-types/note-video.cmp.js';
import noteControls from './note-controllers.cmp.js';

export default {
  name: 'notePreview',
  props: ['note', 'colors'],
  template: `
        <section class="note-preview" :style="theme" ref="previewContainer" :class="shapeClass">
          <component :is="note.type" :info="note.info"></component>
          <note-controls :note="note" :colors="colors" @colorPicked="changeColor" @uploadImg="uploadImg"></note-controls>
        </section>
        `,
  data() {
    return {
      shapeHeight: null,
      shapeWidth: null,
    };
  },
  methods: {
    changeColor(color) {
      this.$emit('changeColor', color, this.note.id);
    },
    uploadImg(ev) {
      this.$emit('uploadImg', ev);
    },
  },
  computed: {
    theme() {
      if (this.note.style) {
        return {
          backgroundColor: this.note.style.backgroundColor,
          borderColor: this.note.style.borderColor,
        };
      }
      return { backgroundColor: 'white', borderColor: '#8080809e' };
    },
    shapeClass() {
      if (this.shapeHeight > this.shapeWidth) return 'portrait';
      else return 'landscape';
    },
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteControls,
  },
  mounted() {
    this.shapeHeight = this.$refs.previewContainer.offsetHeight;
    this.shapeWidth = this.$refs.previewContainer.offsetWidth;
    console.log('height', this.shapeHeight);
    console.log(this.shapeWidth);
  },
};
