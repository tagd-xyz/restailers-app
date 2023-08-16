import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRefStore = defineStore('ref', {
  persist: true,
  state: () => {
    return {
      data: {
        itemTypes: [],
      },
      is: {
        fetching: false,
      },
    };
  },
  getters: {
  },
  actions: {
    fetchItemTypes() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('ref/item-types')
          .then((response) => {
            this.data.itemTypes = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
  },
});
