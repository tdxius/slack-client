export const state = () => ({
  namespace: null,
})

export const mutations = {
  setNamespace(state, namespace) {
    console.log("NAMESPACE SET")
    state.namespace = namespace
  },
}
