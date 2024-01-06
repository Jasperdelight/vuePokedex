<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9rZW1vbiUyMGJhbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Item' }"   class="btn text-danger selectable text-uppercase">
            Items
          </router-link>
          <router-link :to="{ name: 'Ability' }"   class="btn text-danger selectable text-uppercase">
            Abilities
          </router-link>
          <router-link :to="{ name: 'Move' }"   class="btn text-danger selectable text-uppercase">
            Moves
          </router-link>
          <router-link :to="{ name: 'Pokemon' }" v-if="account.id" class="btn text-danger selectable text-uppercase">
            My Pokemon
          </router-link>
          
        </li>

<!-- SEARCH BAR -->
<!-- TODO refine searchbar -->
        <form @submit.prevent="searchFunction()" action="" class="d-flex align-items-center ms-4">
<select v-model="editableTwo" name="cars" id="cars" class="btn btn-secondary text-shadow">
  <option value="pokemon">Pokemon</option>
  <option value="move">Moves</option>
  <option value="ability">Abilities</option>
  <option value="item">Items</option>
</select>

  <label for="search"></label>
  <input v-model="editable" type="text" name="search" id="search" class="form-control">
  <button type="submit" class="btn btn-secondary text-shadow">Search</button>
</form>


      </ul>

      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>

  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import Login from './Login.vue';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { pokemonService } from "../services/PokemonService";
import { movesService } from "../services/MovesService";
import { abilitiesService } from "../services/AbilitiesService";
import { itemsService } from "../services/ItemsService";
export default {
  setup() {
    const editable = ref('')
    const editableTwo = ref('')
    return {
      account: computed(()=> AppState.account),
      editable,
      editableTwo,
      async searchFunction(){
        try{
            if(editableTwo.value == 'pokemon'){
              await this.findPokemon()
            } if (editableTwo.value == 'move') {
              await this.findMove()
            } if(editableTwo.value == 'ability'){
              await this.findAbility()
            } if (editableTwo.value == 'item') {
              await this.findItem()
            }
        } catch(error) {
            Pop.error(error.message);
        }
      },
      async findPokemon(){
        try{
          await pokemonService.getPokemonDetails(editable.value.toLowerCase())
            // logger.log(editable.value)
            editable.value = ""
        } catch(error) {
            Pop.error(error.message);
        }
      },
      async findMove(){
        try{
          
          await movesService.getMoveDetails(editable.value.toLowerCase())
            // logger.log(editable.value)
            editable.value = ""
        } catch(error) {
            Pop.error(error.message);
        }
      },
      async findAbility(){
        try{
            await abilitiesService.findAbility(editable.value.toLowerCase())
            editable.value = ""
        } catch(error) {
            Pop.error(error.message);
        }
      },
      async findItem(){
        try{
            await itemsService.findItems(editable.value.toLowerCase())
            editable.value = ""
        } catch(error) {
            Pop.error(error.message);
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
