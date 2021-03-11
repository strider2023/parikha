<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">{{ modalConfig.header }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ modalConfig.body }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" v-on:click="callRemoveAPI()">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "delete-modal",
  props: ['modalConfig', 'itemId'],
  methods: {
    callRemoveAPI: function() {
      axios.delete( this.modalConfig.baseURL + this.itemId).then(result => {
        console.log('called');
        Notiflix.Notify.Success(result.data.message);
        window.location.reload();
      })
      .catch(error => {
        console.error(error.response.data);
        Notiflix.Notify.Failure(error.response.data.message);
      });
    }
  },
};
</script>

<style></style>