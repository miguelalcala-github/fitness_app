<template>
  <div class="index">
    <h1>My fitness calendar</h1>
    <!-- modal to add a new item -->
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Add new Item</h3>
      <ItemForm slot="body" @added="newItemAdded" />
    </Modal>

    <Calendar>
      <button
        id="show-modal"
        slot="modal"
        class="btn"
        @click="showModal = true"
      >
        Add new item
      </button>
    </Calendar>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar/Calendar.vue";
import ItemForm from "@/components/ItemForm.vue";

// import { db } from "../main";

export default {
  name: "Index",
  components: {
    Calendar,
    ItemForm,
  },

  data() {
    return {
      showModal: false,
      refresh: false,
    };
  },

  methods: {
    // async getItems() {
    //   try {
    //     const itemsRef = await db.collection("items");
    //     // const snapshot = await db.collection("items").get();
    //     // const items = [];

    //     // snapshot.forEach((doc) => {
    //     //   let data = doc.data();
    //     //   data.id = doc.id;
    //     //   items.push(data);
    //     // });
    //     this.itemsRef = itemsRef;
    //     // this.items = items;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    newItemAdded() {
      this.showModal = false;
      // this.getItems();
    },

    formatDate(rawDate) {
      const miliseconds = rawDate.seconds * 1000;
      return new Date(miliseconds).toISOString().substr(0, 10);
    },
  },

  mounted() {
    // this.getItems();
  },
};
</script>

<style scoped>
.btn {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.btn:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>
