export default {
  name: 'noteTodos',
  props: ['info', 'id'],
  template: `
      <section class="note-todos">
        <h3>{{info.label}}</h3>
        <ul>
          <li contenteditable="true" ref="txtPara" v-for="todo in info.todos" :class="{marked: todo.doneAt}" @keyup.enter="updateTxt">{{todo.txt}}</li>
        </ul>
      </section>

            
        `,
  data() {
    return {};
  },
  methods: {},
  computed: {
  },
  components: {},
};
