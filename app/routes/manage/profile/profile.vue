<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Parīkṣā</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/admin/dashboard">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/assessments">Assessments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/questions">Questions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Profile</a>
            </li>
          </ul>
          <button class="btn btn-outline-success">
              Logout
            </button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-2">
          <ul class="list-group col-md-3 col-sm-12 p-1">
            <button class="list-group-item list-group-item-action active" aria-current="true">My Profile</button>
            <button class="list-group-item list-group-item-action">Edit Personal Details</button>
            <button class="list-group-item list-group-item-action">Update Password</button>
          </ul>
          <div class="col-md-9 col-sm-12">
              <div class="shadow-lg p-3 m-1 bg-white rounded">
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone:</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "",
    };
  },
};
</script>
