<template>
  <b-form>
    <b-row>
      <b-col>
        <b-form-group
          id="input-group-name"
          label="Name & Description"
          label-for="input-name"
          description="i.e. LEATHER TOTE BAG"
        >
          <b-form-input
            id="input-name"
            v-model="form.name"
            @input="$emit('update', form)"
            placeholder="Enter the name of the item"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-desc"
          label=""
          label-for="input-desc"
          description="i.e. Leather tote bag with a crackled effect."
        >
          <b-form-textarea
            id="input-desc"
            v-model="form.desc"
            @input="$emit('update', form)"
            placeholder="Enter the description of the item"
            rows="3"
            required
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          id="input-group-type"
          label="Type"
          label-for="input-type"
          description="i.e. Fashion"
        >
          <b-form-select
            v-model="form.type"
            @input="$emit('update', form)"
            :options="types"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-brand"
          label="Brand"
          label-for="input-brand"
          description="i.e. Zara"
        >
          <b-form-input
            id="input-brand"
            v-model="form.brand"
            @input="$emit('update', form)"
            placeholder="Enter the brand of the item"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-model"
          label="Model"
          label-for="input-model"
          description="i.e. Leather Totem 2023 White"
        >
          <b-form-input
            id="input-model"
            v-model="form.model"
            @input="$emit('update', form)"
            placeholder="Enter the model of the item"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-size"
          label="Size"
          label-for="input-size"
          description="i.e. Medium"
        >
          <b-form-input
            id="input-size"
            v-model="form.size"
            @input="$emit('update', form)"
            placeholder="Enter the size of the item"
            required
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- <b-form-group
            id="input-group-consumer"
            label="Consumer"
            label-for="input-consumer"
            description="Select a consumer from the list"
          >
            <b-form-select
              id="input-consumer"
              v-model="form.consumer"
              @input="$emit('update', form)"
              :options="consumersAvailable"
              required
            >
            </b-form-select>
          </b-form-group> -->
    <b-form-group
      id="input-group-consumer"
      label="Consumer email"
      label-for="input-consumer"
      description="i.e. john@email.com"
    >
      <b-form-input
        id="input-consumer"
        v-model="form.consumer"
        @input="$emit('update', form)"
        placeholder="Enter the consumer email"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-transaction"
      label="Transaction Id"
      label-for="input-transaction"
      description="i.e. 4926687623010"
    >
      <b-form-input
        id="input-transaction"
        v-model="form.transaction"
        @input="$emit('update', form)"
        placeholder="Enter the transaction Id"
        required
      ></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  layout: 'default',
  emits: ['updated'],
  data() {
    return {
      form: {
        name: '',
        desc: '',
        type: '',
        brand: '',
        model: '',
        size: '',
        consumer: '',
        transaction: '',
      },
    };
  },
  computed: {
    types() {
      return [
        { value: 'Fashion', text: 'Fashion' },
        { value: 'Sneakers', text: 'Sneakers' },
      ];
    },
  },
  methods: {},
};
</script>
