export default {
    name: 'emailSideNav',
    template: `
            <nav class="email-side-nav-container flex column">
                <a class="nav-link" @click="setFilter('inbox')">Inbox</a>
                <a class="nav-link" @click="setFilter('starred')">Starred</a>
                <a class="nav-link" @click="setFilter('sent')">Sent</a>
                <a class="nav-link" @click="setFilter('trash')">Trash</a>
            </nav>
        `,
    data() {
      return {};
    },
    methods: {
        setFilter(filterBy){
            this.$emit('filtered', filterBy);
            this.$emit('callCloseCompose');
        }
    },
    computed: {},
    components: {
    },
  };