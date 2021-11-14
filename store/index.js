export const state = () => ({
  namespace: null,
  authenticated: false,
  user: null,
})

export const mutations = {
  setNamespace (state, namespace) {
    state.namespace = namespace
  },
  login (state, user) {
    state.user = user
    state.authenticated = true
  }
}
