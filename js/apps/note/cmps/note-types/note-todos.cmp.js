import { eventBus } from '../../../../services/event-bus.service.js';

export default {
  name: 'noteTodos',
  props: ['info', 'id'],
  template: `
      <section class="note-todos">
      <div class="saveEdits-container flex">
        <transition name="fade">
          <div v-if="saveEdits" class="saveEdits" @click="updateTxt">
          <i class="fas fa-check"></i>
          </div>
        </transition>
      </div>
        <h3 contenteditable="true" @click.stop="editNote" ref="txtTitle">{{info.title}}</h3>
        <ul>
          <li contenteditable="true" @click.stop="editNote" ref="txtList" v-for="todo in info.todos" :class="{marked: todo.doneAt}">{{todo.txt}}</li>
        </ul>
      </section>
        `,
  data() {
    return {
      saveEdits: null,
    };
  },
  methods: {
    updateTxt() {
      console.log(this.$refs.txtList);
      const todos = [];
      const title = this.$refs.txtTitle.innerText;
      this.$refs.txtList.forEach((element) => {
        console.log(element.innerText);
        todos.push({ txt: element.innerText });
      });
      console.log({ title, todos });
      eventBus.$emit('updateTodos', { title, todos }, this.id);
      this.saveEdits = null;
    },
    editNote() {
      console.log('editing!');
      this.saveEdits = true;
    },
  },
  computed: {},
  components: {},
};
