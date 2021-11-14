<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-form @submit.prevent="onFormSubmit">
              <v-card-text>
                <v-text-field
                  name="Username"
                  label="Username"
                  type="text"
                  v-model="username"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" width="100%">
                  Login
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      username: null,
    }
  },
  methods: {
    onFormSubmit () {
      this.$store.commit('login', this.username)
      this.$router.push('/')
    }
  }
}
</script>
