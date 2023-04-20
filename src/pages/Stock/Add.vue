<template>
  <div class="q-pa-lg">
    <q-form @submit.prevent="onSubmit">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <p class="text-h5">Item details</p>
          <q-input
            v-model="data.name"
            label="Name"
            hint="Enter the name of the item"
            placeholder="i.e. LEATHER TOTE BAG"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-input
            type="textarea"
            v-model="data.description"
            label="Description"
            hint="Enter the description of the item"
            placeholder="i.e. Leather tote bag with a crackled effect."
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-select
            v-model="data.type"
            :options="['fashion', 'sneakers']"
            label="Type"
            hint="Enter the type of the item"
            placeholder="i.e. Fashion"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-input
            v-model="data.brand"
            label="Brand"
            hint="Enter the brand of the item"
            placeholder="i.e. Zara"
            :disable="isPosting"
          />

          <q-input
            v-model="data.model"
            label="Model"
            hint="Enter the model of the item"
            placeholder="i.e. Leather Totem 2023 White"
            :disable="isPosting"
          />

          <q-input
            v-model="data.size"
            label="Size"
            hint="Enter the size of the item"
            placeholder="i.e. L"
            :disable="isPosting"
          />
        </div>
      </div>

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            :loading="isPosting"
            :disabled="!isSubmitEnabled"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStockStore } from 'stores/stock';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();

const store = useStockStore();

const $q = useQuasar();

const initialData = {
  name: '',
  description: '',
  type: '',
  brand: '',
  model: '',
  size: '',
};

const data = ref(initialData);

const isSubmitEnabled = computed(() => {
  return data.value.name && data.value.description && data.value.type;
});

const isPosting = computed(() => {
  return store.isPosting;
});

async function onSubmit() {
  const payload = {
    // retailer: this.currentRetailer,
    name: data.value.name,
    description: data.value.description,
    type: data.value.type,
    properties: {
      brand: data.value.brand,
      model: data.value.model,
      size: data.value.size,
    },
  };

  store
    .add(payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Stock item added successfully',
      });
      router.push({ name: 'stock' });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}
</script>
