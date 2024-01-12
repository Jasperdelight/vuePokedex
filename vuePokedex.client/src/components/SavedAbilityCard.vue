<template>
  <section class="row">
    <div class="col-12 fs-3 text-center" style="text-transform: capitalize;"> {{ foundAbility?.name }}</div>
    <div class="col-12 text-center">{{ foundAbility.generation[0]?.name }}</div>
    <div class="col-12 text-center">{{ foundAbility.effectEntries[0]?.effect }}</div>
    <div class="col-12 fs-3 text-center" style="text-transform: capitalize;"> {{ foundAbility.mainPokemon.name }}</div>
    <section class="col-12 d-flex justify-content-center">
      <img :src="foundAbility.mainPokemon?.img" alt="" class="img-fluid">
    </section>
    <section class="col-4">
      <span class="fw-bold">Weight: </span>{{ foundAbility.mainPokemon.weight }}
    </section>
    <section class="col-4">
      <span class="fw-bold">Height: </span>{{ foundAbility.mainPokemon.height }}
    </section>
    <section class="col-4">
      <span class="fw-bold">ID: </span>{{ foundAbility.mainPokemon.id }}
    </section>
    <div class="col-12 fs-3">Base Stats</div>
    <section class="col-4" v-for="s in foundAbility.mainPokemon.stats" :key="s.stats">
      <span class="fw-bold" style="text-transform: capitalize;">{{ s?.stat?.name }}:</span> {{ s?.base_stat }}
    </section>
  </section>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import ActivePokemonCard from "./ActivePokemonCard.vue";

export default {
    setup() {
        return {
            foundAbility: computed(() => AppState.foundAbility)
        };
    },

}
</script>


<style lang="scss" scoped>

</style>