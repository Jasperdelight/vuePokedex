<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>


</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import AbilityModal from "./components/AbilityModal.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
.text-shadow{
text-shadow: 1px 1px 2px black;
}
.text-shadow-light{
text-shadow: white 1px 0 10px;
}
</style>
