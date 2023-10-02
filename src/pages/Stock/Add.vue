<template>
  <div class="q-pa-lg">
    <q-form @submit.prevent="onSubmit">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <p class="text-h5">Item details</p>
          <q-input v-model="data.name" label="Name" hint="Enter the name of the item" placeholder="i.e. LEATHER TOTE BAG"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]" :disable="isPosting" />

          <q-input type="textarea" v-model="data.description" label="Description" hint="Enter the description of the item"
            placeholder="i.e. Leather tote bag with a crackled effect." :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]" :disable="isPosting" />

          <q-select v-model="data.type" :options="itemTypes" label="Type" hint="Enter the type of the item"
            placeholder="i.e. Fashion" :rules="[(val) => val || 'This field is required']"
            :disable="isPosting || storeRef.is.fetching" options-dense />

          <q-input v-model="data.brand" label="Brand" hint="Enter the brand of the item" placeholder="i.e. Zara"
            :disable="isPosting" />

          <q-input v-model="data.model" label="Model" hint="Enter the model of the item"
            placeholder="i.e. Leather Totem 2023 White" :disable="isPosting" />

          <q-input v-model="data.size" label="Size" hint="Enter the size of the item" placeholder="i.e. L"
            :disable="isPosting" />

          <q-input v-model="data.manufacturerSerialNumber" label="Manufacturer's Serial Number"
            hint="Enter the Manufacturer's Serial Number of the item" placeholder="i.e. 123-456" :disable="isPosting" />

          <q-input v-model="data.yearOfProduction" label="Year of Production"
            hint="Enter the year of production of the item" placeholder="i.e. 2000" :disable="isPosting" />

          <q-input v-model="data.rrp" label="Recommended Retail Price" hint="Enter the RRP of the item"
            placeholder="i.e. 1000.50" :disable="isPosting" />

          <q-select v-model="data.currency" :options="currencies" label="Currency" hint="Select a currency from list"
            :loading="isPosting" />
        </div>
      </div>

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn label="Submit" type="submit" color="primary" :loading="isPosting" :disabled="!isSubmitEnabled" />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStockStore } from 'stores/stock';
import { useRefStore } from 'stores/ref';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();

const store = useStockStore();

const storeRef = useRefStore();

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
  currency: '',
};

const data = ref(initialData);

// const itemTypeSelected = ref(null);

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
    type: data.value.type.value,
    properties: {
      brand: data.value.brand,
      model: data.value.model,
      size: data.value.size,
      manufacturerSerialNumber: data.value.manufacturerSerialNumber,
      yearOfProduction: data.value.yearOfProduction,
      rrp: data.value.rrp,
      currency: data.value.currency.value,
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

function processNodes(nodes, prefix = '') {
  const list = [];

  let label = '';

  nodes.forEach((node) => {
    label = `${prefix} / ${node.name}`;
    if ('' === prefix) {
      label = node.name;
    }
    list.push({
      label: label,
      value: node.id,
    });
    if (node.children) {
      processNodes(node.children, label).forEach((child) => {
        list.push(child);
      });
    }
  });

  return list;
}

const currencies = computed(() => {
  return storeRef.data.currencies.map((currency) => {
    return {
      label: `${currency.name} (${currency.symbol})`,
      value: currency.code,
    };
  });
});

watch(currencies, () => {
  const currency = currencies.value.find((currency) => {
    return currency.value === 'GBP';
  });
  data.value.currency = currency;
});

const itemTypes = computed(() => {
  return processNodes(storeRef.data.itemTypes);
});

onMounted(() => {
  if (!storeRef.is.fetching) {
    storeRef.fetchItemTypes();
    storeRef.fetchCurrencies();
  }
});
</script>
