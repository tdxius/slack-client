export const state = () => ({
  namespace: null,
})

export const mutations = {
  setNamespace (state, namespace) {
    state.namespace = namespace
  },
}
