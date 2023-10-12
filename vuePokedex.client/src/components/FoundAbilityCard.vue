<template>
<section class="row">
<div class="col-12 fs-3 text-center" style="text-transform: capitalize;">{{ foundAbility.name }}</div>
<div class="col-12 text-center" style="text-transform: capitalize;">{{ foundAbility.flavorTextEntries[0]?.flavor_text }}</div>
<div class="col-12 text-center">{{ foundAbility.generation.name }}</div>
<div class="col-12 text-center">{{ foundAbility.effectEntries[1]?.effect }}</div>
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