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
import { useTagdsStore } from 'stores/tagds';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useTagdsStore();

const isLoading = computed(() => {
  return store.is.fetching;
});

const list = computed(() => {
  return store.list;
});

function onRowClicked(evt, row) {
  router.push({ name: 'tags', id: row.id });
  router.push({
    name: 'tagsShow',
    params: {
      id: row.id,
    },
  });
}

onMounted(() => {
  if (!isLoading.value) {
    store.fetch();
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
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row) => row.status,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'tagdSlug',
    required: true,
    label: 'Tag ID',
    align: 'left',
    field: (row) => row.slug,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'retailer',
    required: false,
    label: 'Retailer',
    align: 'left',
    field: (row) => row.item.retailer,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'item',
    required: false,
    label: 'Item',
    align: 'left',
    field: (row) => row.item.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'type',
    required: false,
    label: 'Type',
    align: 'left',
    field: (row) => row.item.type ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'brand',
    required: false,
    label: 'Brand',
    align: 'left',
    field: (row) => row.item.properties?.brand ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'model',
    required: false,
    label: 'Model',
    align: 'left',
    field: (row) => row.item.properties?.model ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'size',
    required: false,
    label: 'Size',
    align: 'left',
    field: (row) => row.item.properties?.size ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
];
</script>
