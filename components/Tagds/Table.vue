<template>
  <div>
    <b-table striped hover borderless :fields="fields" :items="tagds">
      <template #cell(slug)="data">
        <tagds-slug :slug="data.item.slug" />
      </template>
      <template #cell(status)="data">
        <tagds-status :tagd="data.item" />
      </template>
      <template #cell(createdAt)="data">
        <support-date :date="data.item.createdAt" />
      </template>
    </b-table>
    <b-modal
      id="modal-select-consumer"
      title="Transfer to"
      @ok="transferConfirmed"
    >
      <b-form-select
        v-model="formTransfer.consumerId"
        :options="consumersAvailable"
      ></b-form-select>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TagdTable',
  props: {
    tagds: { type: Array },
    allowExpire: { type: Boolean },
    allowTransfer: { type: Boolean },
  },
  data() {
    return {
      formTransfer: {
        tagdId: null,
        consumerId: null,
      },
      columns: [
        {
          key: 'slug',
          label: 'Id',
          thStyle: { width: '12rem' },
        },
        {
          key: 'consumer',
          label: 'Consumer',
          formatter: (value, key, tagd) => {
            return tagd.consumer?.email || 'None';
          },
        },
        {
          key: 'reseller',
          label: 'Reseller',
          formatter: (value, key, tagd) => {
            return tagd.reseller?.name || 'None';
          },
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'transaction',
          label: 'Transaction',
          formatter: (value, key, tagd) => {
            return tagd.meta?.transaction || 'None';
          },
        },
        {
          key: 'createdAt',
          label: 'Created at',
        },
      ],
    };
  },
  computed: {
    fields() {
      return this.columns;
    },
    currentReseller() {
      return true;
      // const resellerId = this.$store.state.ui.resellers.navbar.current ?? null;
      // const resellers = this.$store.state.ui.resellers.navbar.available ?? [];
      // return resellers.find((reseller) => {
      //   return reseller.id === resellerId;
      // });
    },
    consumersAvailable() {
      return [{ value: 'test', text: 'test' }];
      // return this.$store.state.ui.consumers.navbar.available.map((consumer) => {
      //   return {
      //     value: consumer.id,
      //     text: consumer.name,
      //   };
      // });
    },
  },
};
</script>

<style></style>
