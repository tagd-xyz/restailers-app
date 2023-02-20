export const state = () => ({
  user: false,
  token: false,
});

export const mutations = {
  setAuth(state, { user, token }) {
    state.user = user;
    state.token = token;
  },
};

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (authUser) {
      const { uid, email, displayName } = authUser;
      commit('setAuth', {
        user: { uid, email, displayName },
        token: await authUser.getIdToken(),
      });
    } else {
      commit('setAuth', {
        user: false,
        token: false,
      });
    }
  },
};
