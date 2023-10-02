<template>
  <div>
    <q-uploader :disable="disable" flat no-thumbnails color="grey-7" class="full-width" method="PUT" label="Upload images"
      :sendRaw="true" @failed="onUploadFail" @uploaded="onUploadSuccess" :factory="factoryFn" ref="uploader" />

    <p class="text-negative">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStockStore } from 'stores/stock';

const stockStore = useStockStore();
const errorMessage = ref(null);
const uploader = ref(null);
const uploadDetails = ref({});

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  disable: {
    type: Boolean,
    default: null,
  },
  images: {
    type: Array,
    default: () => [],
  },
  stockId: {
    type: String,
    default: null,
  },
});

defineExpose({ reset });

const emit = defineEmits(['uploaded']);

function onUploadSuccess() {
  emit('uploaded', uploadDetails.value);
  uploader.value.reset();
  errorMessage.value = null;
}

function onUploadFail() {
  errorMessage.value =
    'Something went wrong. Try again or choose a different file';
}

async function factoryFn(files) {
  const fileName = files[0].name;

  const response = await stockStore.requestImageUpload(props.stockId, fileName);

  const { id, url } = response.data.data;

  uploadDetails.value = {
    id,
    fileName,
  };

  return {
    url: url,
  };

  // TODO: catch error
  //   errorMessage.value =
  //     'Something went wrong. Try again or choose a different file';
}

function reset() {
  errorMessage.value = null;
  uploadDetails.value = {};
  uploader.value.reset();
}
</script>
