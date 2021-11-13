export const state = () => ({
  list: [],
})

export const mutations = {
  update(state, namespaces) {
    state.list = namespaces
  },
}
