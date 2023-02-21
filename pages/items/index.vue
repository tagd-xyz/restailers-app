<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>All items</template>
        <template v-slot:actions>
          <b-button size="sm" @click="addNewClicked"> Add new </b-button>
        </template>
      </page-heading>
      <hr />
      <items-table :isBusy="isBusy" :items="items" @itemClicked="itemClicked" />
    </b-container>
  </div>
</template>

<script>
import {
  // mapMutations,
  mapActions,
} from 'vuex';

// import page from '@/layout/SimplePage';

export default {
  name: 'ItemsIndexPage',
  layout: 'default',
  middleware: 'auth',
  // components: { page },

  data() {
    return {
      isBusy: false,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Items',
          href: '/items',
          active: true,
        },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.items.data;
    },
    actor() {
      return this.$store.state.actor;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    actor(after, before) {
      if (after) {
        this.isBusy = true;
        this.fetch().then(() => {
          this.isBusy = false;
        });
      }
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    itemClicked(item, index) {
      this.$router.push({ path: '/items/' + item.id });
    },
    addNewClicked() {
      this.$router.push({ path: '/items/add' });
    },
    ...mapActions({
      fetch: 'items/fetch',
    }),
  },
};
</script>
