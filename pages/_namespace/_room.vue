<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      This is a room: {{ $route.params.namespace }}/{{ $route.params.room }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
  },
  mounted () {
    // const rooms = this.loadRooms()

    // this.$store.commit('rooms/update', rooms)
    //
    // this.$router.push(rooms[0].to)
  }
}
</script>
