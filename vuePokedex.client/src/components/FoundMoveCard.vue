<template>
  <section class="row">
    <div class="col-12 text-center fs-3" style="text-transform: capitalize;">{{ foundMove.name }}</div>
    <div class="col-12 text-center">Damage Class: {{ foundMove.damageClass.name }}</div>
    <div class="col-12 text-center">{{ foundMove.flavorText[0].flavor_text }}</div>
    <div class="col-4">Accuracy: {{ foundMove.accuracy }}</div>
    <div class="col-4">Power: {{ foundMove.power }}</div>
    <div class="col-4">PP: {{ foundMove.pp }}</div>
  </section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      foundMove: computed(()=> AppState.foundMove)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>