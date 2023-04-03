<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Stock item: {{ stock?.name }}
      <q-spinner v-if="isFetching" color="black" />
    </p>
    <div v-if="!isFetching">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-subtitle2">ID {{ stock?.id }}</div>
              <div class="text-subtitle2">
                from Retailer {{ stock?.retailer ?? 'Unknown' }}
              </div>
              <q-separator class="q-my-sm" />
              <strong>Description:</strong>
              <div class="text">{{ stock?.description }}</div>
            </q-card-section>
          </q-card>

          <q-card>
            <q-card-section>
              <div><strong>Type:</strong> {{ stock?.type ?? 'Unknown' }}</div>
              <div>
                <strong>Brand:</strong>
                {{ stock?.properties.brand ?? 'Unknown' }}
              </div>
              <div>
                <strong>Model:</strong>
                {{ stock?.properties.model ?? 'Unknown' }}
              </div>
              <div>
                <strong>Size:</strong>
                {{ stock?.properties.size ?? 'Unknown' }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator class="q-my-md" />

      <div class="column items-end">
        <div class="col q-gutter-sm">
          <q-btn
            label="Delete"
            type="button"
            color="negative"
            :loading="isDeleting"
            @click="onDeleteClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStockStore } from 'stores/stock';
import { useRoute, useRouter } from 'vue-router';
// import { date } from 'quasar';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();

const store = useStockStore();

const $q = useQuasar();

const stockId = computed(() => {
  return route.params.id;
});

const isFetching = computed(() => {
  return store.is.fetchingSingle;
});

const isDeleting = computed(() => {
  return store.is.deleting;
});

const stock = computed(() => {
  return store.data;
});

onMounted(() => {
  store.fetchSingle(stockId.value);
});

function onDeleteClicked() {
  console.log('will delete');
  store
    .delete(stock.value.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item deleted successfully',
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
