import longText from '../../../cmps/long-text.cmp.js';
export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
            <section class="email-preview-container flex space-between" :class="toggleBcg">
              <div class="flex align-center">
                <div class="name-circle flex align-center justify-center" :style="setBackground">{{nameInitials}}</div>
                <div class="email-preview-details flex column space-between">
                  <h4 :class="toggleBold">{{email.sender}}</h4>
                  <h4 :class="toggleBold">{{email.subject}}</h4>
                  <p v-if="!isLongText">{{email.body}}</p>
                  <long-text v-else-if="isLongText" :txt="email.body" :length="length"/>
                </div>
              </div>
              <div class="flex column space-between align-center">
              <p class="email-time" :class="toggleBold">{{formattedTime}}</p>
              <img :src="changeStar" class="star-img" @click="sendStarEvent">
              </div>
            </section>
        `,
    data() {
      return {
        isLongText: false,
        length: 40,
        folderToToggle: null,
      };
    },
    methods: {
      checkTxtLength() {
        this.isLongText = (this.email.body.length > this.length) ? true : false;
      },
      sendStarEvent() {
        this.folderToToggle = 'starred';
        this.$emit('sendStarEvent', this.email.id, this.folderToToggle)
      },
    },
    computed: {
      formattedTime() {
        return new Date(this.email.sentAt).toLocaleTimeString().replace(/:\d+ /, ' ');
      },
      toggleBold() {
        return {'bold': this.email.isRead };
      },
      toggleBcg() {
        return { 'showBcg': this.email.isRead };
      },
      setBackground() {
        return {backgroundColor: this.email.color};
      },
      nameInitials() {
        const name = this.email.sender;
        const firstNameLetter = name.charAt(0).toUpperCase();
        if (!name.includes(' ')) return firstNameLetter;
        else {const lastNameLetter = name.substr(name.indexOf(' ')+1, 1).toUpperCase();
        return `${firstNameLetter}${lastNameLetter}`};
      },
      changeStar() {
        if (this.email.folders.includes('starred')) {
          return '../../../../img/star-full.png'
        } else {
          return '../../../../img/star-empty.png'
        } 
      },
    },
    created() {
      this.checkTxtLength();
    },
    components: {
      longText,
    },
  };
  