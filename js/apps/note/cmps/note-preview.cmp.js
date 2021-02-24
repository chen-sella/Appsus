import noteTxt from '../cmps/note-types/note-txt.cmp.js'
import noteTodos from '../cmps/note-types/note-todos.cmp.js'
import noteImg from '../cmps/note-types/note-img.cmp.js'
import noteVideo from '../cmps/note-types/note-video.cmp.js'

export default {
  name: 'notePreview',
  props:['note'],
  template: `
        <section class="note-preview">
          <component :is="note.type" :info="note.info"></component>
        </section>
            
        `,
  data() {
    return {
    };
  },
  methods: {},
  computed: {},
  
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
  },
};
