import noteList from '../cmps/note-list.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js';
import { noteService } from '../services/note.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import { utilService } from '../../../services/util.service.js';

export default {
  name: 'noteApp',
  template: `
      <section class="note-app main-container">
        <note-create @newNote="postNote"></note-create>
        <note-list v-if="noteList" :colors="colors" :notes="pinnedNoteList" @changeColor="changeColor" @pinned="pinnNote"></note-list>
        <note-list v-if="noteList" :colors="colors" :notes="noteList" @changeColor="changeColor" @pinned="pinnNote"></note-list>
      </section>
              
          `,
  data() {
    return {
      colors: null,
      noteList: null,
      pinnedNoteList: null,
    };
  },
  methods: {
    updateLists(notes) {
      console.log({notes});
      this.noteList = notes.filter((note) => {
        return !note.isPinned;
      });
      this.pinnedNoteList = notes.filter((note) => {
        return note.isPinned;
      });
      console.log('noteList', this.noteList);
      console.log('pinnedNoteList', this.pinnedNoteList);
    },
    changeColor(color, noteId) {
      noteService.updateColor(color, noteId).then((note) => {
        noteService.getNotes().then((notes) => this.updateLists(notes));
      });
    },
    postNote(note) {
      noteService.postNote(note).then((notes) => this.updateLists(notes));
    },
    deleteNote(noteId) {
      noteService.deleteNote(noteId).then((notes) => this.updateLists(notes));
    },
    pinnNote(noteId) {
      noteService.changePinnState(noteId).then((notes) => this.updateLists(notes));
    },
    updateTxt(note, noteId, type){
      noteService.updateTxt(note, noteId, type).then((notes)=>this.updateLists(notes));
    }
  },
  computed: {},
  created() {
    this.colors = utilService.getColors();
    noteService.getNotes().then((notes) => {
      this.updateLists(notes);
    });
  },
  mounted() {
    eventBus.$on('updateTxt', (txt, noteId)=>{
      console.log(txt);
      console.log(noteId);
      this.updateTxt(txt, noteId, 'noteTxt');
    })
    eventBus.$on('updateTodos', (noteTodos, noteId) =>{
      console.log(noteTodos.todos);
      console.log(noteTodos.title);
      this.updateTxt(noteTodos, noteId, 'noteTodos');
    })
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
