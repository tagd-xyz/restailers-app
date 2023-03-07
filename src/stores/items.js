import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useItemsStore = defineStore('items', {
  persist: true,
  state: () => {
    return {
      is: {
        posting: false,
        deleting: false,
      },
    };
  },
  actions: {
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
    delete(itemId) {
      return new Promise((resolve, reject) => {
        this.is.deleting = true;
        api
          .delete('items/' + itemId)
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
