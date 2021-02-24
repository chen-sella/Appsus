export default{
    props:['colors'],
    template:`
        <ul class="color-palette clean-list flex">
              <li v-for="color in colors" class="palette-color" :style="color" @click="colorPicked(color)"></li>
            </ul>
    `,
    methods:{
        colorPicked(color){
            this.$emit('pickedColor', color)
        }
    }
}