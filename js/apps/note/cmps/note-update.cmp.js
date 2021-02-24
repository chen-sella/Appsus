export default {
    props:['note'],
    name: 'noteUpdate',
    template: `
        <ul class="note-update-list clean-list flex">
          <li @click="pickColor" class="palette-icon">
            <i class="fas fa-palette"></i>
            <ul v-if="colorEdit" class="color-palette clean-list flex">
              <li v-for="color in colors" class="palette-color" :style="{backgroundColor: color}"></li>
            </ul>
          </li>
          <li><i class="far fa-image"></i></li>
          <li><i class="fas fa-trash"></i></li>

        </ul>
            
        `,
    data() {
      return {
        colorEdit :false,
        colors: ['#F28B83', '#FCBC02', '#FFF475', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8', '#E6C9A8', '#E8EAED'],
      };
    },
    methods: {
      pickColor(){
        this.colorEdit = true;
      }
    },
    computed: {},
    components: {},
  };
  