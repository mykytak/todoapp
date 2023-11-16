<script setup>
  import { ref } from "vue";

  const { task, errors } = defineProps({
    task: Object,
    errors: Object
  });

  const editedTask = ref(task);

  const emit = defineEmits(["updated", "cancel"]);

  const save = () => emit("updated", editedTask.value);
  const cancel = () => emit("cancel");
</script>

<template>
  <div class="backdrop"></div>
  <div class="task-edit" v-if="task">
    <form>
      <label for="title" :class="{withErrors: errors && errors.title}">
        <input v-model="task.title" name="title"/>
      </label>
      <div v-if="errors && errors.title">
        <div class="error" v-for="error in errors.title">
          {{ error }}
        </div>
      </div>

      <label for="description">
        <input v-model="task.description" name="description"/>
      </label>

      <button
          type="submit"
          class="save"
          @click.prevent="save"
        >
          Save
      </button>
      <button
          type="cancel"
          class="cancel"
          @click.prevent="cancel"
        >
          Cancel
      </button>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
</style>

