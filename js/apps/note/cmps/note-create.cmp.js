import { noteService } from '../services/note.service.js';

export default {
  name: '',
  template: `
        <section class="note-create flex space-between">
          <input type="text" :placeholder="flaceHolder" v-model="txt" @keyup.enter="fillInfo">
          <ul class="type-controllers clean-list flex">
            <li @click="setType('noteTxt')"><i class="fas fa-font"></i></li>
            <li @click="setType('noteImg')"><i class="fas fa-image"></i>
            <input name="upload-file" type="file" ref="fileInput" @change="uploadImg($event)"></li>
            <li @click="setType('noteTodos')"><i class="fas fa-list"></i></li>
          </ul>
        </section>
            
        `,
  data() {
    return {
      type: null,
      note: null,
      txt: null,
    };
  },
  methods: {
    setType(type) {
      this.type = type;
      this.note = noteService.newNote(this.type);
      if (type === "noteImg") this.inputClick();
      console.log(this.type);
      console.log(this.note);
    },
    inputClick(){
      this.$refs.fileInput.click();
    },
    fillInfo() {
      if (this.type === 'noteTxt') {
        this.note.info.txt = this.txt;
      }
      if (this.type === 'noteTodos') {
        const todos = this.txt.split(',');
        this.note.info.label = todos[0];
        todos.shift();
        todos.forEach((todo) => {
          this.note.info.todos.push({ txt: todo, doneAt: null });
        });
      }
      console.log(this.note);
      this.$emit('newNote', this.note);
    },
  },
  computed: {
    flaceHolder() {
      if (!this.type) return 'Take a note...';
      if (this.type === 'noteTxt') return 'Enter text...';
      if (this.type === 'noteImg') return 'Enter Img...';
      if (this.type === 'noteTodos') return 'Enter comma separeted list...';
    },
  },
  components: {},
};
