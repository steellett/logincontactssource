<template>
  <v-app>
    <v-main>
      <whitelayout>
        <router-view></router-view>
      </whitelayout>
    </v-main>
  </v-app>
</template>

<script>
import Whitelayout from "@/components/Whitelayout";
export default {
  name: "App",

  components: {
    Whitelayout,
  },

  data: () => ({
    //
  }),
};
</script>
