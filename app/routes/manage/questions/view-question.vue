<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ title }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
          </ul>
          <button class="btn btn-outline-success" type="submit">Logout</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row m-3">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: "",
      questions: []
    };
  },
};
</script>
