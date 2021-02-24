export default {
  name: 'noteTodos',
  props: ['info'],
  template: `
      <section class="note-todos">
        <h3>{{info.label}}</h3>
        <ul>
          <li v-for="todo in info.todos" :class="{marked: todo.doneAt}">{{todo.txt}}</li>
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
