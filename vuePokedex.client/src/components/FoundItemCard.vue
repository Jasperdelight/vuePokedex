<template>
  <section class="row">
    <div class="col-12 fs-3 text-center" style="text-transform: capitalize;">{{ foundItem.name }}</div>
    <div class="d-flex justify-content-center">
      <img :src="foundItem.sprites.default" alt="itemIMG" class="" style="height: 50px; width: 50px;" >
    </div>
    <div class="col-6 text-center">Cost: {{ foundItem.cost }}</div>
    <div class="col-6 text-center">Category: {{ foundItem.category.name }}</div>
    <div class="col-12 text-center">{{ foundItem.flavorTextEntries[0].text }}</div>
    <div class="col-12 text-center">{{ foundItem.effectEntries[0].effect }}</div>
  </section>
</template>


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