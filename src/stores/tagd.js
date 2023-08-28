import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useTagdStore = defineStore('tagd', {
  persist: true,
  state: () => {
    return {
      data: null,
      is: {
        fetching: false,
        deleting: false,
        returning: false,
        deactivating: false,
        activating: false,
        returnint: false,
      },
    };
  },
  actions: {
    fetch(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('tagds/' + tagdId)
          .then((response) => {
            this.data = response.data.data;
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
    delete(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.deleting = true;
        api
          .delete('tagds/' + tagdId)
          .then((response) => {
            this.data = null;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.deleting = false;
          });
      });
    },
    return(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.returning = true;
        api
          .post('tagds/' + tagdId + '/return')
          .then((response) => {
            this.data = null;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.returning = false;
          });
      });
    },
    activate(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.activating = true;
        api
          .post('tagds/' + tagdId + '/activate')
          .then((response) => {
            this.data = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.activating = false;
          });
      });
    },
    deactivate(tagdId) {
      return new Promise((resolve, reject) => {
        this.is.deactivating = true;
        api
          .post('tagds/' + tagdId + '/deactivate')
          .then((response) => {
            this.data = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.deactivating = false;
          });
      });
    },
  },
});
