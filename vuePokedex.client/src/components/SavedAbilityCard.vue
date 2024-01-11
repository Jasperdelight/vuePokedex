<template>
  <section class="row">
    <div class="col-12 fs-3 text-center" style="text-transform: capitalize;"> {{ foundAbility?.name }}</div>
    <div class="col-12 text-center">{{ foundAbility.generation[0]?.name }}</div>
    <div class="col-12 text-center">{{ foundAbility.effectEntries[0]?.effect }}</div>
    <div class="col-12 fs-3 text-center" style="text-transform: capitalize;"> {{ foundAbility.mainPokemon.name }}</div>
  </section>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      foundAbility: computed(() => AppState.foundAbility)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>