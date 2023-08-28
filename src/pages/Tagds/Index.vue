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
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';
import { useTagdsStore } from 'stores/tagds';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useTagdsStore();

const filter = ref('');

const isLoading = computed(() => {
  return store.is.fetching;
});

const list = computed(() => {
  return store.list.filter((tagd) => {
    const keyword = filter.value.trim().toLowerCase();
    if (keyword.length === '') {
      return true;
    }

    return tagd.item.name.toLowerCase().includes(keyword)
      || tagd.item.properties?.model?.toLowerCase().includes(keyword)
      || tagd.status.toLowerCase().includes(keyword);
  });
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
    format: (val) => date.formatDate(val, 'MMMM Do, YYYY HH:mm:ss'),
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
    field: (row) => row.item.type.name ?? 'Unknown',
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
