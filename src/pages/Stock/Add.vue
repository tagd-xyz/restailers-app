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

          <q-input
            v-model="data.manufacturerSerialNumber"
            label="Manufacturer's Serial Number"
            hint="Enter the Manufacturer's Serial Number of the item"
            placeholder="i.e. 123-456"
            :disable="isPosting"
          />

          <q-input
            v-model="data.yearOfProduction"
            label="Year of Production"
            hint="Enter the year of production of the item"
            placeholder="i.e. 2000"
            :disable="isPosting"
          />

          <q-input
            v-model="data.rrp"
            label="Recommended Retail Price"
            hint="Enter the RRP of the item"
            placeholder="i.e. 1000.50"
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
  manufacturerSerialNumber: '',
  yearOfProduction: '',
  rrp: '',
};

const data = ref(initialData);

const isSubmitEnabled = computed(() => {
  return data.value.name && data.value.description && data.value.type;
});

const isPosting = computed(() => {
  return store.isPosting;
});

const payload = computed(() => {
  return {
    name: data.value.name,
    description: data.value.description,
    type: data.value.type,
    properties: {
      brand: data.value.brand,
      model: data.value.model,
      size: data.value.size,
      manufacturerSerialNumber: data.value.manufacturerSerialNumber,
      yearOfProduction: data.value.yearOfProduction,
      rrp: data.value.rrp,
    },
  };
});

async function onSubmit() {
  store
    .add(payload.value)
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
