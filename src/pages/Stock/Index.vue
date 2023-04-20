<template>
  <q-table
    class="q-pa-lg"
    :loading="isLoading"
    :rows="list"
    :columns="columns"
    row-key="name"
    @row-click="onRowClicked"
    :pagination="{
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 50,
    }"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { date } from 'quasar';
import { useStockStore } from 'stores/stock';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStockStore();

const isLoading = computed(() => {
  return store.is.fetchingAll;
});

const list = computed(() => {
  return store.list;
});

function onRowClicked(evt, row) {
  router.push({ name: 'stock', id: row.id });
  router.push({
    name: 'stockShow',
    params: {
      id: row.id,
    },
  });
}

onMounted(() => {
  if (!isLoading.value) {
    store.fetchAll();
  }
});

const columns = [
  {
    name: 'createdAt',
    required: true,
    label: 'Created at',
    align: 'left',
    field: (row) => row.createdAt,
    format: (val) => date.formatDate(val, 'MMMM Do, YYYY H:m:s'),
    sortable: true,
  },
  {
    name: 'retailer',
    required: false,
    label: 'Retailer',
    align: 'left',
    field: (row) => row.retailer,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'item',
    required: false,
    label: 'Item',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'type',
    required: false,
    label: 'Type',
    align: 'left',
    field: (row) => row.type ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'brand',
    required: false,
    label: 'Brand',
    align: 'left',
    field: (row) => row.properties?.brand ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'model',
    required: false,
    label: 'Model',
    align: 'left',
    field: (row) => row.properties?.model ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'size',
    required: false,
    label: 'Size',
    align: 'left',
    field: (row) => row.properties?.size ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
];
</script>
