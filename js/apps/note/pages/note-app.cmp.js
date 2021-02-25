import noteList from '../cmps/note-list.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: 'noteApp',
  template: `
      <section class="note-app main-container">
        <note-create @newNote="postNote"></note-create>
        <note-list v-if="noteList" :colors="colors" :notes="noteList" @changeColor="changeColor"></note-list>

      </section>
              
          `,
  data() {
    return {
      noteList: null,
      colors: null,
    };
  },
  methods: {
    changeColor(color, noteId) {
      noteService.updateColor(color, noteId).then((note) => {
        noteService.getNotes().then((notes) => (this.noteList = notes));
      });
    },
    postNote(note) {
      noteService.postNote(note).then((notes) => {
        console.log(notes);
        this.noteList = notes;
      });
    },
    deleteNote(noteId) {
      noteService.deleteNote(noteId).then((notes) => {
        this.noteList = notes;
      });
    },
  },
  computed: {},
  created() {
    this.colors = noteService.getColors();
    noteService.getNotes().then((notes) => {
      this.noteList = notes;
    });
  },
  mounted() {
    eventBus.$on('makeAction', () => {
      console.log('msg was heard!');
      this.deleteNote(this.$route.params.noteId);
    });
  },
  components: {
    noteList,
    noteCreate,
  },
};
