import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      list: [],
      single: null,
      is: {
        fetchingAll: false,
        fetchingSingle: false,
        adding: false,
        deleting: false,
      },
    };
  },
  getters: {
    isEmpty() {
      return 0 == this.list.length;
    },
    getList() {
      return this.list;
    },
  },
  actions: {
    fetchAll() {
      this.is.fetchingAll = true;
      api
        .get('items')
        .then((response) => {
          this.list = response.data.data;
        })
        .catch(() => {
          this.list = [];
        })
        .finally(() => {
          this.is.fetchingAll = false;
        });
    },
    fetch(id) {
      this.single = null;
      this.is.fetchingSingle = true;
      api
        .get('items/' + id)
        .then((response) => {
          this.single = response.data.data;
        })
        .catch(() => {
          this.single = null;
        })
        .finally(() => {
          this.is.fetchingSingle = false;
        });
    },
    add(payload) {
      return new Promise((resolve, reject) => {
        this.is.posting = true;
        api
          .post('items', payload)
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
    delete(id) {
      return new Promise((resolve, reject) => {
        this.is.deleting = true;
        api
          .delete('items/' + id)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.deleting = false;
          });
      });
    },
  },
});
