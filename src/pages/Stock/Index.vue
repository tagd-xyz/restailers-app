<template>
  <q-table
    class="q-pa-lg"
    :loading="isLoading"
    :rows="list"
    :columns="columns"
    row-key="name"
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
    <template v-slot:body="props">
      <q-tr @click="onRowClicked(props.row)">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <q-img
            v-if="col.name == 'thumbnail'"
            :src="col.value"
            spinner-color="white"
            style="height: 2rem; max-width: 2rem"
            fit="cover"
          />
          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
        <!-- <q-td key="thumbnail" :props="props">
          {{ props.row.name }}
        </q-td> -->
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';
import { useStockStore } from 'stores/stock';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStockStore();

const filter = ref('');

const isLoading = computed(() => {
  return store.is.fetchingAll;
});

const list = computed(() => {
  return store.list
    .filter((item) => {
      const keyword = filter.value.toLowerCase();
      return (
        item.retailer.toLowerCase().includes(keyword) ||
        item.properties?.brand
          .toLowerCase()
          .includes(keyword) ||
        item.properties?.model
          .toLowerCase()
          .includes(keyword) ||
        item.type.name.toLowerCase().includes(keyword) ||
        item.retailer.toLowerCase().includes(keyword)
      );
    })
    .map((item) => {
      return {
        ...item,
        thumbnail: item.images[0]?.thumbnail ?? null,
      };
    });
});

function onRowClicked(row) {
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
    format: (val) => date.formatDate(val, 'MMMM Do, YYYY HH:mm:ss'),
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
    name: 'type',
    required: false,
    label: 'Type',
    align: 'left',
    field: (row) => row.type.name ?? 'Unknown',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: false,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
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
  // {
  //   name: 'item',
  //   required: false,
  //   label: 'Item',
  //   align: 'left',
  //   field: (row) => row.name,
  //   format: (val) => `${val}`,
  //   sortable: true,
  // },
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
  {
    name: 'rrp',
    required: false,
    label: 'RRP',
    align: 'right',
    field: (row) =>
      (new Intl.NumberFormat().format(row.properties?.rrp) ?? 'Unknown')
      + (' ' + (row.properties?.currency ?? '')),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'thumbnail',
    required: false,
    label: 'Thumbnail',
    align: 'center',
    field: (row) => row.thumbnail,
    sortable: true,
  },
];
</script>
