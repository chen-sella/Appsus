export default {
    name: 'emailFilter',
    template: `
            <section class="email-filter-section flex">
              <input type="search" placeholder="Search mail" v-model="strSearch" @change="searchByStr">
              <select name="readSort" v-model="readSearch" @change="sortByIsRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </section>
        `,
    data() {
      return {
        strSearch: '',
        readSearch: '',
      };
    },
    methods: {
      searchByStr(strSearch) {
        this.$emit('strSortBy', strSearch);
      },
      sortByIsRead(readSearch) {
        this.$emit('readSortBy', readSearch);
      }
    },
    computed: {},
    components: {},
  };
  