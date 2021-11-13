export const state = () => ({
  list: [],
})

export const mutations = {
  update(state, rooms) {
    state.list = rooms
  },
}
