export default {
  props: ['txt', 'length'],
  template: `
        <section class="long-text">
            <p>Description: {{description}}<button @click="moreText">{{btnText}}</button></p>
        </section>
    `,
  data() {
    return {
      isLongText: false,
    };
  },
  methods: {
    moreText() {
      this.isLongText = !this.isLongText;
    },
  },
  computed: {
    description() {
      if (!this.isLongText) {
        return `${this.txt.substr(0, this.length)}...`;
      }
      return this.txt;
    },
    btnText() {
      return this.isLongText ? 'Read less' : 'Read more';
    },
  },
};
