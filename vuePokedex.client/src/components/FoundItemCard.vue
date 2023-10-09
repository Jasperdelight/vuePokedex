<template>{{ foundItem.name }}</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      foundItem: computed(() => AppState.foundItem)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>