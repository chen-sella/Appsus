import { eventBus } from "../../../../services/event-bus.service.js";

export default {
  name: 'noteTodos',
  props: ['info', 'id'],
  template: `
      <section class="note-todos">
        <h3 contenteditable="true" ref="txtTitle" @keyup.enter="updateTxt">{{info.title}}</h3>
        <ul>
          <li contenteditable="true" ref="txtList" v-for="todo in info.todos" :class="{marked: todo.doneAt}" @keyup.enter="updateTxt">{{todo.txt}}</li>
        </ul>
      </section>

            
        `,
  data() {
    return {};
  },
  methods: {
    updateTxt() {
      console.log(this.$refs.txtList);
      const todos =[];
      const title = this.$refs.txtTitle.innerText;
      this.$refs.txtList.forEach(element => {
        console.log(element.innerText);
        todos.push({txt: element.innerText})
      });
      console.log({title, todos});
      eventBus.$emit('updateTodos', {title, todos}, this.id);
    },
  },
  computed: {},
  components: {},
};
