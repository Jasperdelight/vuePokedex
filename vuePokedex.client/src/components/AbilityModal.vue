<template>


    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ activeAbility?.name }}</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      <div class="modal-body">
        <p>
          {{activeAbility?.effectEntries[1].effect}}
        </p>
        <p>
          {{ activeAbility?.flavorTextEntries[1].flavor_text}}
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      activeAbility: computed(()=> AppState.activeAbility)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>