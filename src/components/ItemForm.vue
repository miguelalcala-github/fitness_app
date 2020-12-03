<template>
<form
  @submit.prevent="addItem"
>
  <p v-if="errors.length" class="errors">
    <b>Please check possible errors</b>
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="item-type">Item Type</label>
    <select
      id="item-type"
      v-model="itemType"
      name="item-type"    >
      <option>RGB</option>
      <option>HSL</option>
      <option>CMYK</option>
    </select>
  </p>

  <p>
    <label for="date">Date</label>
    <input
      id="date"
      v-model="date"
      type="date"
      name="date">
  </p>

  <p>
    <label for="item">{{itemType}} items</label>
    <select
      id="item"
      v-model="item"
      name="item"
    >
      <option v-for="type in types[itemType]" :key="type">{{type}}</option>

    </select>
  </p>

  <p>
    <input
      type="submit"
      value="Add"
    >
  </p>

</form>
</template>

<script>
import { db } from "../main";
  export default {
    data() {
      return {
        errors: [],
        itemType: null,
        item: null,
        date: null,
        types: {
          'RGB': ['Red', 'Green', 'Blue'],
          'HSL': ['Hue', 'Saturation', 'Lightness'],
          'CMYK': ['Cyan', 'Magenta', 'Yellow', 'Black']
        }
      }
  },
  methods: {
    addItem: async function () {
      try {
        ;
        if(this.checkForm()) {
          await db.collection('items').add({
            type: this.itemType,
            item: this.item,
            date: this.date
          })

          this.$emit("added")
        }
      } catch (error) {
        console.error(error)
      }
      },

    checkForm: function () {
      if (this.itemType && this.item && this.date) {
        return true;
      }

      this.errors = [];

      if (!this.itemType) {
        this.errors.push('Item type needed');
      }
      if (!this.item) {
        this.errors.push('Item needed');
      }
      if (!this.date) {
        this.errors.push('Date needed');
      }
    },

  }
    }
</script>