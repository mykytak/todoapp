<script setup>
  import TaskPage from "./TaskPage.vue";
  import { setCsrf } from "../api/tasks";

  const csrf = document.head.querySelector("meta[name=csrf]").content;
  setCsrf(csrf);
</script>

<template>
  <TaskPage />
</template>


