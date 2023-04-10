<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Tag ID {{ tagd?.slug }}
      <q-badge outline color="primary" :label="tagd?.status" />
      <q-spinner v-if="isFetching" color="black" />
    </p>
    <div v-if="!isFetching">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                {{ tagd?.item?.name }}
              </div>
              <div class="text-subtitle2">
                sold by {{ tagd?.item?.retailer ?? 'Unknown' }}
              </div>
              <q-separator class="q-my-md" />
              <div class="text">{{ tagd?.item?.description }}</div>
            </q-card-section>
          </q-card>

          <q-card>
            <q-card-section>
              <div class="text-h6">Properties</div>
              <div>
                <strong>Type:</strong> {{ tagd?.item?.type ?? 'Unknown' }}
              </div>
              <div>
                <strong>Brand:</strong>
                {{ tagd?.item?.properties.brand ?? 'Unknown' }}
              </div>
              <div>
                <strong>Model:</strong>
                {{ tagd?.item?.properties.model ?? 'Unknown' }}
              </div>
              <div>
                <strong>Size:</strong>
                {{ tagd?.item?.properties.size ?? 'Unknown' }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-h6">Transaction</div>
              <div class="text-subtitle2">ID {{ tagd?.meta?.transaction }}</div>
              <div class="text-subtitle2">
                sold to {{ tagd?.consumer?.email }}
              </div>
              <div class="text-subtitle2">
                on {{ date.formatDate(tagd?.createdAt, 'MMMM Do, YYYY H:m:s') }}
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
            :disabled="!isDeleteEnabled"
            @click="onDeleteClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTagdStore } from 'stores/tagd';
import { useItemsStore } from 'stores/items';
import { useRoute, useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();

const tagdStore = useTagdStore();
const itemsStore = useItemsStore();

const $q = useQuasar();

const tagdId = computed(() => {
  return route.params.id;
});

const isFetching = computed(() => {
  return tagdStore.is.fetching;
});

const isDeleting = computed(() => {
  return tagdStore.is.deleting;
});

const isDeleteEnabled = computed(() => {
  return tagd.value?.status == 'inactive';
});

const tagd = computed(() => {
  return tagdStore.data;
});

onMounted(() => {
  tagdStore.fetch(tagdId.value);
});

function onDeleteClicked() {
  itemsStore
    .delete(tagd.value.item.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item deleted successfully',
      });
      router.push({ name: 'tags' });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}
</script>
