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
    <section v-for="a in activePokemon.abilities" :key="a.abilities" class="col-6">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getAbilityDetails(a.ability.url)">
      {{ a.ability.name }}
    </button>
  </section>
  </div>

</template>


<script>
import { Pokemon } from "../models/Pokemon";
import { abilitiesService } from "../services/AbilitiesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props:{
    activePokemon: {type: Pokemon, required: true}
  },
  setup(){
    return {
      async getAbilityDetails(ability){
        try{
          // logger.log(ability)
            await abilitiesService.getAbilityDetails(ability)
        } catch(error) {
            Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>