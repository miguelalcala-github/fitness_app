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
      @change="getMeals()"
      name="item-type"    >
      <option v-for="data in types" :key="data.id">{{data.type}}</option>
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

  <p v-if="itemType">
    <label for="item">{{itemType}} items</label>
    <select
      id="item"
      v-model="item"
      name="item"
    >
      <option v-for="meal in meals" :key="meal.id">{{meal.recipe}}</option>

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
        itemType: '',
        item: {},
        date: null,
        types: [],
        meals: [],
        types2: {
          'RGB': ['Red', 'Green', 'Blue'],
          'HSL': ['Hue', 'Saturation', 'Lightness'],
          'CMYK': ['Cyan', 'Magenta', 'Yellow', 'Black']
        }
      }
  },
  mounted () {
    this.getTypes();
  },
  computed: {
      getTypeId() {
        const index = this.types.findIndex(item => item.type === this.itemType) 
        return `${this.types[index].id}`
    },
  },
  methods: {
    async getTypes() {
      try {
        await db
          .collection("types")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              let data = doc.data();
              data.id = doc.id;
              this.types.push(data);
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } catch (error) {
        console.error(error);
      }
    },

    async getMeals() {
      const id = this.getTypeId;
      this.meals = []
      try {
        await db
          .collection("types").doc(id).collection("meals")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              let data = doc.data();
              data.id = doc.id;
              this.meals.push(data);
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } catch (error) {
        console.error(error);
      }
    },
    addItem: async function () {
      try {
        if(this.checkForm()) {
          const meal = this.meals.find(item => item.recipe === `${this.item}`)
          await db.collection('items').add({
            type: this.itemType,
            meal_id: meal.id,
            meal_recipe: meal.recipe,
            date: this.date,
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