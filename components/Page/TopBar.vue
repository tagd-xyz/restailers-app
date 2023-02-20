<template>
  <div>
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="/">
        <page-logo variant="dark" />
        Retailers Portal
      </b-navbar-brand>
      <b-navbar-nav> </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/items">Items</b-nav-item>
        <b-nav-item-dropdown
          v-if="currentUser"
          :text="currentUser.displayName"
          right
        >
          <b-dropdown-item href="#" @click="signOut">
            Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  name: 'PageHeader',
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    // available() {
    //   return this.$store.state.ui.retailers.navbar.available
    // },
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut();
      window.location = '/signIn';
    },
    // ...mapMutations({
    //   setCurrent: 'ui/setRetailersNavbarCurrent',
    // }),
  },
};
</script>

<style></style>
