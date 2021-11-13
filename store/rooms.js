export const state = () => ({
  list: [],
})

export const mutations = {
  update(state, rooms) {
    state.list = rooms
  },
}

export const getters = {
  find: (state) => (slug = null) => {
    if (!slug) {
      return
    }

    return state.list.find(room => room.slug === slug)
  }
}
