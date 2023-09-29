<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Digital ID {{ tagd?.slug }}
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
              <div
                class="text"
                v-html="
                  tagd?.item?.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
                "
              />
            </q-card-section>
          </q-card>

          <q-card>
            <q-card-section>
              <div class="text-h6">Properties</div>
              <div>
                <strong>Type:</strong> {{ tagd?.item?.type?.name ?? 'Unknown' }}
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
              <div>
                <strong>Year of production:</strong>
                {{ tagd?.item?.properties.yearOfProduction ?? 'Unknown' }}
              </div>
              <div>
                <strong>Manufacturer's Serial Number:</strong>
                {{
                  tagd?.item?.properties.manufacturerSerialNumber ?? 'Unknown'
                }}
              </div>
              <div>
                <strong>Retailer Serial Number:</strong>
                {{ tagd?.item?.properties.retailerSerialNumber ?? 'Unknown' }}
              </div>
              <div>
                <strong>Recommended Retail Price:</strong>
                {{ tagd?.item?.properties.rrp ?? 'Unknown' }}
                {{ tagd?.item?.properties.currency ?? '' }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-h6">Transaction</div>
              <div class="text-subtitle2">Transaction ID {{ tagd?.meta?.transaction }}</div>
              <div class="text-subtitle2">
                sold to {{ tagd?.consumer?.email }}
              </div>
              <div class="text-subtitle2">
                on
                {{ date.formatDate(tagd?.createdAt, 'MMMM Do, YYYY HH:mm:ss') }}
              </div>
              <div v-if="tagd?.meta?.price">
            </div>
            <div v-else>Price Not available</div>
            <div v-if="tagd?.meta?.location">
              <div class="text-subtitle2">
                Location: {{ tagd.meta.location.city }},
                {{ findCountryByCode(tagd.meta.location.country)?.label }}
              </div>
              <div class="text-subtitle2">
                Price: {{ tagd?.meta?.price?.amount }}
                {{ tagd?.meta?.price?.currency }}
              </div>
            </div>
            <div v-else>Location Not available</div>
            </q-card-section>
          </q-card>

          <q-card>
            <q-card-section>
              <div class="text-h6">Images</div>
              <div class="row">
                <div
                  class="col-1"
                  v-for="image in tagd?.item?.images"
                  :key="image.id"
                >
                  <img :src="image.thumbnail" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator class="q-my-md" />

      <div class="column items-end">
        <div class="col q-gutter-sm">
          <q-btn
            v-if="!isActivateEnabled"
            label="Deactivate"
            type="button"
            color="warning"
            :loading="isDeactivating"
            :disabled="!isDeactivateEnabled"
            @click="onDeactivateClicked"
          />
          <q-btn
            v-else
            label="Activate"
            type="button"
            color="warning"
            :loading="isActivating"
            :disabled="!isActivateEnabled"
            @click="onActivateClicked"
          />
          <q-btn
            label="Return"
            type="button"
            color="warning"
            :loading="isReturning"
            :disabled="!isReturnEnabled"
            @click="onReturnClicked"
          />
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
import { useRoute, useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';
import { useRefStore } from 'stores/ref';

const router = useRouter();
const route = useRoute();

const tagdStore = useTagdStore();
const storeRef = useRefStore();

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

const isActivating = computed(() => {
  return tagdStore.is.activating;
});

const isDeactivating = computed(() => {
  return tagdStore.is.deactivating;
});

const isReturning = computed(() => {
  return false;
});

const isDeleteEnabled = computed(() => {
  return tagd.value?.status == 'inactive';
});

const isActivateEnabled = computed(() => {
  return tagd.value?.status == 'inactive';
});

const isDeactivateEnabled = computed(() => {
  return (
    tagd.value?.status == 'active' &&
    tagd.value?.childrenCount == 0 &&
    !tagd.value?.isReturned
  );
});

const isReturnEnabled = computed(() => {
  return tagd.value?.isActive;
});

const tagd = computed(() => {
  return tagdStore.data;
});

onMounted(() => {
  tagdStore.fetch(tagdId.value);
  storeRef.fetchCountries();
});

function onReturnClicked() {
  tagdStore
    .return(tagd.value.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item returned successfully',
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

function onDeleteClicked() {
  tagdStore
    .delete(tagd.value.id)
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

function onActivateClicked() {
  tagdStore
    .activate(tagd.value.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item activated successfully',
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

function onDeactivateClicked() {
  tagdStore
    .deactivate(tagd.value.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item deactivated successfully',
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

function findCountryByCode(code) {
  return countries.value.find((country) => {
    return country.value === code;
  });
}

const countries = computed(() => {
  return (
    storeRef.data.countries?.map((country) => {
      return {
        label: `${country.name}`,
        value: country.code,
      };
    }) ?? []
  );
});
</script>
