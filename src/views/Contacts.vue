<template>
  <div class="contacts-wrapper">
    <div class="contacts">
      <h2>Список контактов</h2>
      <v-btn class="addContactButton" @click="popupShow=true">Добавить пользователя</v-btn>
      <div
        class="contact"
        v-for="(contact, index) in contacts.contacts"
        :key="index"
        :data-index="index"
      >
        <div class="contact__name" @click="showFull">{{contact.name}}</div>
        <div class="contact__full" v-show="contactsShowValues[index].state">
          <v-avatar class="avatar" right size="80">
            <v-img :src="contact.avatar" alt />
          </v-avatar>
          <v-card-title>{{contact.name}}</v-card-title>
          <v-card-text>Телефон: {{contact.phone}}</v-card-text>
          <v-card-actions>
            <v-btn @click="deleteContact">Удалить</v-btn>
            <v-btn @click="openChangePopup">Изменить</v-btn>
          </v-card-actions>
        </div>
      </div>
    </div>
    <div class="messages">
      <p>Здесь могли бы быть сообщения или что-то еще</p>
    </div>
    <div class="add-contact-popup" v-if="popupShow">
      <h4>Создать аккаунт</h4>
      <v-text-field placeholder="Имя контакта" v-model="addContact" required></v-text-field>
      <v-text-field placeholder="Номер телефона" v-model="addPhone" required></v-text-field>
      <v-text-field placeholder="Аватар" type="url" v-model="addAvatar" required></v-text-field>
      <v-btn @click="createContact">Создать</v-btn>
      <v-icon class="close-button" @click="popupShow=false">close</v-icon>
    </div>
    <div class="change-contact" v-if="changePopupShow">
      <v-text-field v-model="changedName"></v-text-field>
      <v-text-field v-model="changedPhone"></v-text-field>
      <v-text-field v-model="changedAvatar"></v-text-field>
      <v-btn @click="changeContact">Именить</v-btn>
      <v-icon class="close-button" @click="changePopupShow=false">close</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addContact: null,
      addPhone: null,
      changedName: null,
      changedPhone: null,
      changedAvatar: null,
      addAvatar: null,
      popupShow: false,
      changePopupShow: false,
      contactsShowValues: [],
      formData: null,
      index: null,
    };
  },
  watch: {
    contacts: function () {
      this.showContacts();
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.USER_DATA;
    },
  },

  methods: {
    async createContact() {
      let newContact = {
        avatar:
          "https://sites.google.com/site/terebokololo/_/rsrc/1472848935355/home/myska-noruska/images%20%288%29.jpg",
        name: this.addContact,
        phone: this.addPhone,
      };

      await this.$store.commit("SET_NEW_CONTACT", newContact);
      let formData = JSON.parse(JSON.stringify(this.contacts));
      this.showContacts();
      await this.$store.dispatch("UPDATE_DATABASE", {
        userData: formData,
        id: this.contacts.id,
      });
      this.popupShow = false;
    },
    showContacts() {
      for (let i = 0; i < this.contacts.contacts.length; i++) {
        this.contactsShowValues.push({ state: false });
      }
    },
    openChangePopup() {
      this.changePopupShow = true;
      let index = event.target.closest(".contact").dataset.index;
      this.index = index;
      let formData = JSON.parse(JSON.stringify(this.contacts));
      this.changedName = formData.contacts[index].name;
      this.changedPhone = formData.contacts[index].phone;
      this.changedAvatar = formData.contacts[index].avatar;
      this.formData = formData;
    },

    async changeContact() {
      this.formData.contacts[this.index].name = this.changedName;
      this.formData.contacts[this.index].phone = this.changedPhone;
      this.formData.contacts[this.index].avatar = this.changedAvatar;
      await this.$store.dispatch("UPDATE_DATABASE", {
        userData: this.formData,
        id: this.contacts.id,
      });
      this.showContacts();
      this.changePopupShow = false;
    },
    async deleteContact() {
      let index = event.target.closest(".contact").dataset.index;
      let formData = JSON.parse(JSON.stringify(this.contacts));
      formData.contacts.splice(index, 1);
      await this.$store.dispatch("UPDATE_DATABASE", {
        userData: formData,
        id: this.contacts.id,
      });
      this.showContacts();
    },
    showFull() {
      let index = event.target.closest(".contact").dataset.index;
      this.contactsShowValues[index].state = !this.contactsShowValues[index]
        .state;
    },
  },
};
</script>

<style scoped>
.contacts-wrapper {
  position: relative;
  min-height: 80vh;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
.contacts {
  width: 40%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid rgba(58, 55, 55, 0.274);
  background: white;
  margin-bottom: auto;
}
.messages {
  display: flex;
  flex-direction: column;
  width: 55%;
  margin-bottom: auto;
  text-align: center;
  margin: 2em;
}
.contact {
  margin: 1em;
  width: 90%;
  background: white;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(54, 52, 52, 0.281);
  align-items: center;
  text-align: center;
}
.contact__name {
  cursor: pointer;
}
.contact__full {
  text-align: center;
}
.v-card__title {
  text-align: center;
  justify-content: center;
}
.v-avatar {
  margin: 1em auto;
}
.addContactButton {
  margin: 1em auto;
}
.add-contact-popup {
  padding: 1em;
  position: absolute;
  width: 40%;
  background: white;
  border: 5px solid rgba(0, 0, 0, 0.322);
}
.close-button {
  position: absolute;
  top: 5%;
  right: 5%;
}
.change-contact {
  padding: 1em;
  position: absolute;
  width: 40%;
  background: white;
  border: 5px solid rgba(0, 0, 0, 0.322);
}
</style>
