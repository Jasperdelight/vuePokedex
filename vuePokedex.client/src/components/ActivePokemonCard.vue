<template>
  <div class="row">
    <section class="col-12 text-center">
      <span class="fs-2" style="text-transform: capitalize;">
        {{ activePokemon?.name }}
      </span>
    </section>
    <section class="col-12 d-flex justify-content-center">
      <img :src="activePokemon?.img" alt="">
    </section>
    <section class="col-4">
      <span class="fw-bold">Weight: </span>{{ activePokemon.weight }}
    </section>
    <section class="col-4">
      <span class="fw-bold">Height: </span>{{ activePokemon.height }}
    </section>
    <section class="col-4">
      <span class="fw-bold">ID: </span>{{ activePokemon.id }}
    </section>
    <div class="col-12 fs-3">Base Stats</div>
    <section class="col-4" v-for="s in activePokemon.stats" :key="s.stats">
    <span class="fw-bold" style="text-transform: capitalize;">
      {{ s.stat.name }}:
    </span>
    {{ s.base_stat }}
    </section>
    <div class="col-12 fs-3">Abilities</div>
    <section v-for="a in activePokemon.abilities" :key="a.abilities" class="col-3">
    <button style="text-transform: capitalize;" class="btn btn-danger text-white text-shadow" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getAbilityDetails(a.ability.url)">
      {{ a.ability.name }}
    </button>
  </section>
  <div class="fs-3">Moves</div>
  <section v-for="m in activePokemon.moves" :key="m.moves" class="col-3 mt-2 d-flex justify-content-center">
  <button  class="btn btn-secondary text-black text-shadow-light" data-bs-toggle="modal" data-bs-target="#moveModal" @click="getMoveDetails(m.move.url)" style="width: 100%; text-transform: capitalize;"> {{ m.move.name }}</button>
  </section>
  </div>
  <!-- Ability Modal -->
  <AbilityModal id="exampleModal">
    <template #modalHeader>
      <h5 class="modal-title" id="exampleModalLabel">{{ activeAbility?.name }}</h5>
    </template>
    <template #modalBody>
      <div class="modal-body">
        <p>{{ activeAbility?.flavorTextEntries[1].flavor_text}}</p>
        <p>{{activeAbility?.effectEntries[1].effect}}</p>
      </div>
    </template>
  </AbilityModal>
  <!-- Move Modal -->
  <AbilityModal id="moveModal">
    <template #modalHeader>
      <h5 class="modal-title" id="exampleModalLabel">{{ activeMove?.name }}</h5>
    </template>
    <template #modalBody>
      <div class="modal-body">
        <div class="container">
          <section class="row">
            <p class="col-4"> Power: {{ activeMove?.power }}</p>
            <p class="col-4"> Accuracy: {{ activeMove?.accuracy }}</p>
            <p class="col-4"> PP: {{ activeMove?.pp }}</p>
            <p class="col-4"> Damage Class: {{ activeMove?.damageClass.name }} </p>
            <p class="col-4"> Type: {{ activeMove?.type.name }} </p>
            <p class="col-4"> Target: {{ activeMove?.target.name }} </p>
            <p class="col-12"> {{ activeMove?.flavorText[1].flavor_text }} </p>
            <p class="col-12"> {{ activeMove?.effectEntries[0].effect }} </p>
            <p class="col-12"> Effect Chance: {{ activeMove?.effectChance }} %</p>
          </section>
        </div>
      </div>
    </template>
  </AbilityModal>

</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { Pokemon } from "../models/Pokemon";
import { abilitiesService } from "../services/AbilitiesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import AbilityModal from "./AbilityModal.vue";
import { pokemonService } from "../services/PokemonService";

export default {
    props: {
        activePokemon: { type: Pokemon, required: true }
    },
    setup() {
        return {
          activeAbility: computed(()=> AppState.activeAbility),
          activeMove: computed(()=> AppState.activeMove),
            async getAbilityDetails(ability) {
                try {
                    // logger.log(ability)
                    await abilitiesService.getAbilityDetails(ability);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async getMoveDetails(move) {
                try {
                    // logger.log(ability)
                    await abilitiesService.getMoveDetails(move);
                    
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
        };
    },
    components: { AbilityModal }
}
</script>


<style lang="scss" scoped>

</style>