export const state = () => ({
  list: [],
})

export const mutations = {
  update(state, namespaces) {
    state.list = namespaces
  },
}

export const getters = {
  find: (state) => (slug = null) => {
    if (!slug) {
      return
    }

    return state.list.find(({ endpoint }) => endpoint === `/${slug}`)
  }
}
