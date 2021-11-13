export const state = () => ({
  namespace: null,
  namespaceSocket: null,
  globalSocket: null,
})

export const mutations = {
  setNamespace (state, namespace) {
    state.namespace = namespace
  },
  setNamespaceSocket (state, socket) {
    console.log(socket)
    // state.namespaceSocket = socket
  },
  setGlobalSocket (state, socket) {
    state.globalSocket = socket
  },
}
