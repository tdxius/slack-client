<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="true"
      permanent
      fixed
      app
    >
      <v-list subheader>
        <v-subheader>
          Namespaces
        </v-subheader>

        <v-list-item
          v-for="(namespace, i) in $store.state.namespaces.list"
          :key="i"
          @click.stop="onNamespaceClicked(namespace)"
          :class="isNamespaceActive(namespace) ? 'v-list-item--active' : null"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ namespace.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="namespace.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>
          Rooms
        </v-subheader>

        <v-list-item
          v-for="(room, i) in $store.state.rooms.list"
          :key="i"
          :to="room.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ room.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="room.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt v-if="hasLoaded"/>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { io } from "socket.io-client";

export default {
  middleware: 'authenticated',
  data () {
    return {
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      title: 'Vuetify.js',
      hasLoaded: false,
      globalSocket: null,
      namespaceSocket: null,
    }
  },
  async mounted () {
    this.$nuxt.$on('message:send', (message) => {
      this.namespaceSocket.emit('message', { message, user: this.$store.state.user })
      console.log('message:send', { message, user: this.$store.state.user })
    })

    this.$nuxt.$on('room:join', (room) => {
      this.namespaceSocket.emit('room:join', room)
      console.log('room:join', room)
    })

    await this.connectToGlobalNamespace();

    const namespace = this.findActiveNamespace()
    if (!namespace) {
      this.hasLoaded = true
      return
    }

    await this.connectToNamespace(namespace)

    this.hasLoaded = true;
  },
  methods: {
    findActiveNamespace () {
      return this.$store.getters['namespaces/find'](this.$route.params.namespace)
    },
    findActiveRoom () {
      return this.$store.getters['rooms/find'](this.$route.params.room)
    },
    isNamespaceActive (namespace) {
      return this.$store.state.namespace && this.$store.state.namespace.endpoint === namespace.endpoint
    },
    async onNamespaceClicked (namespace) {
      await this.connectToNamespace(namespace)

      const rooms = this.$store.state.rooms.list
      await this.$router.push(`${namespace.endpoint}/${rooms[0].slug}`)
    },
    connectToGlobalNamespace () {
      this.globalSocket = io('http://localhost:3001/');

      return new Promise(resolve => {
        this.globalSocket.on('load:namespaces', async namespaces => {
          this.$store.commit('namespaces/update', namespaces)

          resolve();
        })
      })
    },
    async connectToNamespace (namespace) {
      this.namespaceSocket = io(`http://localhost:3001${namespace.endpoint}`)
      this.$store.commit('setNamespace', namespace)

      return new Promise((resolve) => {
        this.namespaceSocket.on('load:messages', messages => {
          const room = this.findActiveRoom()
          this.$store.commit('rooms/updateMessages', {
            roomSlug: room.slug,
            messages,
          })
          console.log('load:messages', messages)
        })
        this.namespaceSocket.on('load:rooms', rooms => {
          this.$store.commit('rooms/update', rooms.map(room => {
            // TODO: make this server-side
            return {
              ...room,
              to: `${namespace.endpoint}/${room.slug}`,
            }
          }))

          resolve();
        })
      })
    },
  },
}
</script>
