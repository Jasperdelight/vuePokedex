<template>
  <div class="row">
    <section class="col-12 text-center">
      <!-- Active Pokemon -->
      <span class="fs-2" style="text-transform: capitalize;">
        {{ activePokemon?.name }}
      </span>
    </section>
    <section class="col-12 d-flex justify-content-center">
      <img :src="activePokemon?.img" alt="" class="img-fluid">
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
      <span class="fw-bold" style="text-transform: capitalize;">{{ s?.stat?.name }}:</span> {{ s?.base_stat }}
    </section>

    <div class="col-3 fs-3 mt-4">Abilities</div>
    <section  class="col-3 mt-4">
      <form @submit.prevent="getAbilityDetails()" class="d-flex">
        <select v-model="editable" name="moveSelect" id="moveSelect" class="btn btn-secondary text-shadow">

          <option v-for="a in activePokemon.abilities" :key="a.abilities" :value="a?.ability?.url">{{a?.ability?.name}}</option>
        </select>
        <button class="btn btn-danger text-white text-shadow" data-bs-toggle="modal" data-bs-target="#abilityModal" type="submit">Get Info</button>
      </form>
  </section>

  <div class="col-3 fs-3 mt-4">Moves</div>
    <section  class="col-3 mt-4">
      <form @submit.prevent="getMoveDetails()" class="d-flex">
        <select v-model="editableTwo" name="abilitySelect" id="abilitySelect"  class="btn btn-secondary text-shadow">

          <option v-for="m in activePokemon.moves" :key="m.moves" :value="m.move?.url">{{m.move?.name}}</option>
        </select>
        <button class="btn btn-danger text-white text-shadow" data-bs-toggle="modal" data-bs-target="#moveModal" type="submit">Get Info</button>
      </form>
      <button @click="getMyAbilities()">test</button>
    </section>
  </div>
  <!-- Ability Modal -->
  <AbilityModal id="abilityModal">
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
            <p class="col-4" v-if="activeMove?.power"> Power: {{ activeMove?.power }}</p>
            <p class="col-4" v-if="activeMove?.accuracy"> Accuracy: {{ activeMove?.accuracy }}</p>
            <p class="col-4"> PP: {{ activeMove?.pp }}</p>
            <p class="col-4"> Damage Class: {{ activeMove?.damageClass.name }} </p>
            <p class="col-4"> Type: {{ activeMove?.type.name }} </p>
            <p class="col-4"> Target: {{ activeMove?.target.name }} </p>
            <p class="col-12"> {{ activeMove?.flavorText[1].flavor_text }} </p>
            <p class="col-12"> {{ activeMove?.effectEntries[0].effect }} </p>
            <p v-if="activeMove?.effectChance" class="col-12"> Effect Chance: {{ activeMove?.effectChance }} %</p>
            
          </section>
        </div>
      </div>
    </template>
  </AbilityModal>

</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { Pokemon } from "../models/Pokemon";
import { abilitiesService } from "../services/AbilitiesService";
import { movesService } from "../services/MovesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import AbilityModal from "./AbilityModal.vue";
import { pokemonService } from "../services/PokemonService";

export default {
    props: {
        activePokemon: { type: Pokemon, required: true }
    },
    setup() {
      const editable = ref('')
      const editableTwo = ref('')
      return {
          activeAbility: computed(()=> AppState.activeAbility),
          activeMove: computed(()=> AppState.activeMove),
          myAbilities: computed(() => AppState.myAbilities),
          editable,
          editableTwo,
            async getAbilityDetails() {
                try {
                    // logger.log(editable.value)
                    await abilitiesService.getAbilityDetails(editable.value);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async getMoveDetails() {
                try {
                    // logger.log(editableTwo.value)
                    await movesService.setActiveMove(editableTwo.value);
                    
                    
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async getMyAbilities(){
              // logger.log('button pressed')
              await abilitiesService.getMyAbilities()
            }
        };
    },
    components: { AbilityModal }
}
</script>


<style lang="scss" scoped>

</style>