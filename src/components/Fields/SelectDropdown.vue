<template>
  <div>
    <select
      v-model="selectedValue"
      @change="selectItem($event.target.value)"
      :placeholder="placeholder"
      class="form-select"
    >
      <option v-for="item in itemArray" :key="item" :value="item">
        {{ displayKey ? item[displayKey] : item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: Array, // Array of items for the dropdown
    placeholder: String, // Placeholder for the input
    initialSelectedValue: String, // Initial value for the input
    displayKey: String,
  },
  beforeMount() {
    console.log(this.items);
    if (this.items) {
      this.itemArray = this.items;
      console.log(this.initialSelectedValue);
    }
    if (this.initialSelectedValue) {
      console.log(this.initialSelectedValue);
    }
  },
  data() {
    return {
      itemArray: [],
      isOpen: false,
      selectedValue: this.initialSelectedValue || this.items[0],
    };
  },
  watch: {
    initialSelectedValue(value, oldvalue) {
      console.log(value, oldvalue);
      this.selectedValue = value;
      this.moveItemToTop(value);
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      // this.isOpen = false;
    },
    selectItem(item) {
      // this.selectedValue = item;
      // console.log(this.selectedValue, item);
      this.isOpen = false;
      this.moveItemToTop(this.selectedValue);
      this.$emit("onSelectValue", this.selectedValue);
    },
    moveItemToTop(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.itemArray.splice(index, 1);
        this.itemArray.unshift(item);
      }
    },
  },
};
</script>
