import noteTxt from '../cmps/note-types/note-txt.cmp.js';
import noteTodos from '../cmps/note-types/note-todos.cmp.js';
import noteImg from '../cmps/note-types/note-img.cmp.js';
import noteVideo from '../cmps/note-types/note-video.cmp.js';
import noteUpdate from '../cmps/note-update.cmp.js';

export default {
  name: 'notePreview',
  props: ['note'],
  template: `
        <section class="note-preview" :style="theme">
          <component :is="note.type" :info="note.info"></component>
          <note-update :note="note" @colorPicked="changeColor"></note-update>
        </section>
            
        `,
  data() {
    return {};
  },
  methods: {
    changeColor(color) {
      this.$emit('changeColor', color, this.note.id );
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
  },

  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteUpdate,
  },
};
