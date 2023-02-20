export default function ({ $axios, store }) {
  if (process.client) {
    const token = store.state.token;
    if (token) {
      $axios.setToken(token, 'Bearer');
    }
  }
}
