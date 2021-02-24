import {noteService} from '../services/note.service.js'

export default {
  name: '',
  template: `
        <section v-if="noteList" class="note-preview">
          <component></component>
        </section>
            
        `,
  data() {
    return {
      noteList: null,
    };
  },
  methods: {},
  computed: {},
  created() {
    this.noteList = noteService.getNotes();
    console.log(this.noteList);
  },
  components: {},
};
