import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useStockStore = defineStore('stock', {
  persist: true,
  state: () => {
    return {
      list: [],
      data: null,
      is: {
        fetchingAll: false,
        fetchingSingle: false,
        deleting: false,
        posting: false,
      },
    };
  },
  actions: {
    fetchAll() {
      return new Promise((resolve, reject) => {
        this.is.fetchingAll = true;
        api
          .get('stock')
          .then((response) => {
            this.list = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.list = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetchingAll = false;
          });
      });
    },
    fetchSingle(stockId) {
      return new Promise((resolve, reject) => {
        this.is.fetchingSingle = true;
        api
          .get('stock/' + stockId)
          .then((response) => {
            this.data = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.fetchingSingle = false;
          });
      });
    },
    add(payload) {
      return new Promise((resolve, reject) => {
        this.is.posting = true;
        api
          .post('stock', payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.posting = false;
          });
      });
    },
    delete(stockId) {
      return new Promise((resolve, reject) => {
        this.is.deleting = true;
        api
          .delete('stock/' + stockId)
          .then((response) => {
            this.list = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.list = [];
            reject(error);
          })
          .finally(() => {
            this.is.deleting = false;
          });
      });
    },
  },
});
