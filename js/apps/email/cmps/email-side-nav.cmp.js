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
        setFilter(folder){
            this.$emit('filtered', folder);
            this.$emit('callCloseCompose');
            this.$router.push(`/email/${folder}`);
            this.$route.params.folder = folder;
            this.$emit('getFolder', folder);
            console.log('folder',folder);
        }
    },
    computed: {},
    components: {
    },
    created() {
    }
  };