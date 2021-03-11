<template>
    <div class="col-12">
        <table class="table" v-if="data.length > 0">
          <thead>
            <tr>
              <th scope="col" v-for="header in tableConfig.headers" :key="header">{{ header }}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tableItem in data" :key="tableItem._id">
              <td scope="col" v-for="tableKey in tableConfig.keys" :key="tableKey">
                  <span v-if="tableKey != '$$generic-options$$'">{{ tableItem[tableKey].toString() }}</span>
              </td>
              <td scope="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" v-bind:href="tableConfig.optionsBaseURL + tableItem._id">View</a></li>
                    <li><a class="dropdown-item" v-bind:href="tableConfig.optionsBaseURL + tableItem._id + '/edit'">Edit</a></li>
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal" v-on:click="callRemove(tableItem._id)">Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation" v-if="data.length > 0">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="[(currentPage == '1') ? 'disabled' : '']">
              <a class="page-link" :href="tableConfig.paginationBaseURL + '?page=' + (parseInt(currentPage) - 1) + '&count=' + itemsPerPage">Previous</a>
            </li>
            <li class="page-item" :class="[(currentPage == index) ? 'active' : '']" v-for="index in totalPages" :key="index">
              <a class="page-link" :href="tableConfig.paginationBaseURL + '?page=' + index + '&count=' + itemsPerPage">{{ index }}</a>
            </li>
            <li class="page-item" :class="[(currentPage == totalPages.toString()) ? 'disabled' : '']">
              <a class="page-link" :href="tableConfig.paginationBaseURL + '?page=' + (parseInt(currentPage) + 1) + '&count=' + itemsPerPage">Next</a>
            </li>
          </ul>
        </nav>
        <div class="row text-center justify-content-center" v-if="data.length == 0">
          <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_h59xofz0.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          <p class="lead">No Data Found.</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "generic-table",
  props: {
    data: Array,
    currentPage: Number,
    total: Number,
    tableConfig: Object,
    remove: Function
  },
  data: function () {
    return {
      itemsPerPage: 10,
    };
  },
  methods: {
    callRemove(value) {
      if (this.remove) {
        this.remove(value);
      }
      // this.$emit("created", value);
    },
  },
  computed: {
    totalPages: function () {
      console.log(Math.ceil(this.total / this.itemsPerPage) + " totalPages");
      return Math.ceil(this.total / this.itemsPerPage);
    },
  },
};
</script>

<style></style>