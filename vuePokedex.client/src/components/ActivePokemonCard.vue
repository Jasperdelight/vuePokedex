<template>
  <div class="row">
    <section class="col-12">
      {{ activePokemon?.name }}
    </section>
    <section class="col-12">
      <img :src="activePokemon?.img" alt="">
    </section>
    <section class="col-4">
      Weight: {{ activePokemon.weight }}
    </section>
    <section class="col-4">
      Height: {{ activePokemon.height }}
    </section>
    <section class="col-4">
      ID: {{ activePokemon.id }}
    </section>
    <div class="col-12 fs-3">Abilities</div>
    <!-- <section v-for="a in activePokemon.abilities" :key="a.abilities" class="col-6">
    {{ a.ability.name }}</section> -->
  </div>

</template>


<script>
import { Pokemon } from "../models/Pokemon";

export default {
  props:{
    activePokemon: {type: Pokemon, required: true}
  },
  setup(){
    return {
      
    }
  }
}
</script>


<style lang="scss" scoped>

</style>