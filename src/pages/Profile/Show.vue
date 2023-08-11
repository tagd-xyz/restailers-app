<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      My Profile
      <q-spinner v-if="isFetching" color="black" />
    </p>
    <q-form @submit.prevent="onSubmit">
      <q-input
        v-model="data.name"
        label="Name"
        hint="Enter the name of the retailer"
        placeholder="i.e. eBay"
        :rules="[(val) => (val && val.length > 0) || 'This field is required']"
        :disable="isFetching"
      />

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn
            label="Update"
            type="submit"
            color="primary"
            :loading="isFetching"
            :disabled="!isSubmitEnabled"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMeStore } from 'stores/me';
// import { useItemsStore } from 'stores/items';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute();

// const store = useItemsStore();
const storeMe = useMeStore();

const $q = useQuasar();

const initialData = {
  name: '',
};

const data = ref(initialData);

const isSubmitEnabled = computed(() => {
  return data.value.name;
});

const isFetching = computed(() => {
  return storeMe.is.fetching;
  // return store.isFetching;
});

const actorId = computed(() => {
  return route.params.id;
});

onMounted(() => {
  storeMe.fetch().then(() => {
    const actor = storeMe.data.actors.find(
      (actor) => actor.id == actorId.value
    );
    data.value.name = actor.name;
  });
});

async function onSubmit() {
  const payload = {
    // retailer: this.currentRetailer,
    name: data.value.name,
  };

  storeMe
    .update(actorId.value, payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Profile updated successfully',
      });
      storeMe.fetch();
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}
</script>
