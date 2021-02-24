import noteTxt from '../cmps/note-types/note-txt.cmp.js';
import noteTodos from '../cmps/note-types/note-todos.cmp.js';
import noteImg from '../cmps/note-types/note-img.cmp.js';
import noteVideo from '../cmps/note-types/note-video.cmp.js';

export default {
  name: 'notePreview',
  props: ['note'],
  template: `
        <section class="note-preview" :style="setColor">
          <component :is="note.type" :info="note.info"></component>
        </section>
            
        `,
  data() {
    return {};
  },
  methods: {},
  computed: {
    setColor() {
      if (this.note.style) {
        return {backgroundColor: this.note.style.backgroundColor, borderColor: this.note.style.backgroundColor};;
      }
      return {backgroundColor: 'white', borderColor: '#8080809e'};
    },
  },

  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
  },
};
