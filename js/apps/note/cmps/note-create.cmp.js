import { noteService } from '../services/note.service.js';

export default {
  name: '',
  template: `
        <section class="note-create flex space-between">
          <div class="input-container flex column">
            <input type="text" v-if="type" v-model="title" @keyup.enter="fillInfo" placeholder="Enter title...">
            <input type="text" :placeholder="flaceHolder" v-model="txt" @keyup.enter="fillInfo">
          </div>
          <ul class="type-controllers clean-list flex">
            <li @click="setType('noteTxt')"><i class="fas fa-font"></i></li>
            <li @click="setType('noteImg')"><i class="fas fa-image"></i>
            <!-- <input name="upload-file" type="file" ref="fileInput" @change="uploadImg($event)"></li> -->
            <li @click="setType('noteTodos')"><i class="fas fa-list"></i></li>
          </ul>
        </section>
            
        `,
  data() {
    return {
      type: null,
      note: null,
      txt: null,
      title: null,
    };
  },
  methods: {
    setType(type) {
      this.type = type;
      this.note = noteService.newNote(this.type);
      console.log(this.type);
      console.log(this.note);
    },
    // inputClick() {
    //   this.$refs.fileInput.click();
    // },
    fillInfo() {
      if (this.type === 'noteTxt') {
        this.note.info.txt = this.txt;
        this.note.info.title = this.title;
      }
      if (this.type === 'noteTodos') {
        const todos = this.txt.split(',');
        this.note.info.title = this.title;
        todos.forEach((todo) => {
          this.note.info.todos.push({ txt: todo, doneAt: null });
        });
      }
      if (this.type === 'noteImg') {
        console.log(this.imgUrl);
        this.note.info.url = this.txt;
        this.note.info.title = this.title;
      }
      console.log(this.note);
      this.$emit('newNote', this.note);
      this.txt = null;
      this.title = null,
      this.type = null;
    },
    // uploadImg(ev) {
    //   const url = noteService.onImgInput(ev);
    //   console.log(url);
    // },
  },
  computed: {
    flaceHolder() {
      if (!this.type) return 'Take a note...';
      if (this.type === 'noteTxt') return 'Enter text...';
      if (this.type === 'noteImg') return 'Enter image URL...';
      if (this.type === 'noteTodos') return 'Enter comma separeted list...';
    },
  },
  components: {},
};
