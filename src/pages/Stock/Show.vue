<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Stock item: {{ stock?.name }}
      <q-spinner v-if="isFetching" color="black" />
    </p>
    <div v-if="!isFetching">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <q-card flat>
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

          <q-card flat>
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

      <div class="text-h6 q-mt-sm text-grey-9">Images</div>
      <p class="text-grey-7" v-if="isFilesPending">
        {{ uploadDetails.length }} image(s) uploaded. Click update to confirm
        changes.
      </p>

      <div class="row">
        <div class="col-1" v-for="image in stock?.images" :key="image.id">
          <img :src="image.thumbnail" />
        </div>
        <div class="col-2">
          <files-upload
            :stockId="stockId"
            :images="stock?.images"
            @uploaded="onUpload"
            :disable="isFetching"
            ref="uploader"
          />
        </div>
      </div>

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col q-gutter-sm">
          <q-btn
            label="Update"
            type="button"
            color="secondary"
            :loading="isUpdating"
            :disable="!isFilesPending"
            @click="onUpdateClick"
          />
          <q-btn
            label="Delete"
            type="button"
            color="negative"
            :loading="isDeleting"
            @click="onDeleteClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStockStore } from 'stores/stock';
import { useRoute, useRouter } from 'vue-router';
// import { date } from 'quasar';
import { useQuasar } from 'quasar';
import FilesUpload from './components/FilesUpload.vue';

const router = useRouter();
const route = useRoute();

const store = useStockStore();

const $q = useQuasar();

// const uploadFailMessage = ref('');
const uploader = ref(null);

const uploadDetails = ref([]);

function onUpload(details) {
  uploadDetails.value.push(details);
  uploader.value.reset();
}

const isFilesPending = computed(() => {
  return uploadDetails.value.length > 0;
});

const stockId = computed(() => {
  return route.params.id;
});

const isFetching = computed(() => {
  return store.is.fetchingSingle;
});

const isDeleting = computed(() => {
  return store.is.deleting;
});

const isUpdating = computed(() => {
  return store.is.updating;
});

const stock = computed(() => {
  return store.data;
});

function fetch() {
  store.fetchSingle(stockId.value);
}

onMounted(() => {
  fetch();
});

function onUpdateClick() {
  const payload = {
    imageUploads: uploadDetails.value.map(function (details) {
      return details.id;
    }),
  };
  store
    .update(stockId.value, payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item updated successfully',
      });
      uploadDetails.value = [];
      fetch();
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}

function onDeleteClick() {
  store
    .delete(stockId.value)
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
