export default {
    props: ['folders'],
    name: 'emailSideNav',
    template: `
            <nav class="email-side-nav-container flex column">
                <a v-for="folder in folders" class="nav-link" @click="setFilter(folder)">{{folder}}</a>
            </nav>
        `,
    data() {
      return {
      };
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
    created() {
    }
  };