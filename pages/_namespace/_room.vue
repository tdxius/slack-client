<template>
  <v-row>
    <v-col cols="12">
      <h2>
        {{ $route.params.namespace }}/{{ $route.params.room }}
      </h2>

      <v-timeline
        align-top
        dense
        v-if="room && room.messages"
      >
        <v-timeline-item
          color="pink"
          small
          v-for="message in room.messages"
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>
                {{ message.user }}
              </strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
              <div class="text-caption">
                {{ message.content }}
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>

      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      room: null,
    }
  },
  methods: {},
  mounted () {
    this.room = this.$store.getters['rooms/find'](this.$route.params.room)
    console.log(this.$store.state.sockets)
  }
}
</script>
