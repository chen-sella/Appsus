export default {
  name: 'emailFilter',
  template: `
            <section class="email-filter-section flex">
              <input type="search" placeholder="Search mail" v-model="filterBy.strSearch" @input="searchByStr">
              <select  name="readSort" v-model="filterBy.readSearch" @change="sortByIsRead">
                <option selected value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </section>
        `,
  data() {
    return {
      filterBy: {
        strSearch: '',
        readSearch: 'all',
      },
    };
  },
  methods: {
    searchByStr() {
      this.$emit('strSortBy', this.filterBy.strSearch);
    },
    sortByIsRead() {
      console.log('Im sorting by:', this.filterBy.readSearch);
      this.$emit('readSortRead', this.filterBy.readSearch);
    },
  },
  computed: {},
  components: {},
};
