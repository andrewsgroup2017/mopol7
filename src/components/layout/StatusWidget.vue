<template>
  <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn fab dark small color="green">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
  export default {
    name: 'Widget',
    data: () => {
      return {
        direction: 'left',
        fab: false,
        fling: false,
        hover: true,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-reverse-transition'
      }
    },
  }
</script>

<style>
.btn--bottom.btn--absolute {
  bottom: 27px;
}
/* This is for documentation purposes and will not be needed in your application */
#create .speed-dial {
  position: absolute;
}

#create .btn--floating {
  position: relative;
}
</style>
