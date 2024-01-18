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
    <div class="col-4">
      
      <button class="btn btn-secondary" @click="saveItem(foundItem)" v-for="pokemon in caughtPokemon" :key="pokemon.name">Give to {{ pokemon.name }}</button>
      <!-- TODO add backend to support saving items -->
    </div>
  </section>
</template>


<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { itemsService } from "../services/ItemsService";

export default {
  setup(){
    const editable = ref('')
    return {
      foundItem: computed(() => AppState.foundItem),
      caughtPokemon: computed(() => AppState.caughtPokemon),
      editable,
      async saveItem(foundItem){
        try{
          logger.log(foundItem)
            await itemsService.saveItem(foundItem)
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