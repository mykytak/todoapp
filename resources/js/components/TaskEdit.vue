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
      <div class="container">
        <label for="title" class="element" :class="{withErrors: errors && errors.title}">
          <span>Title:</span>
          <input id="title" v-model="task.title" name="title"/>
          <div v-if="errors && errors.title">
            <div class="error" v-for="error in errors.title">
              {{ error }}
            </div>
          </div>
        </label>

        <label for="description" class="element">
          <span>Description:</span>
          <input id="description" v-model="task.description" name="description"/>
        </label>

        <div class="actions">
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
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.backdrop {
  @apply absolute w-full h-full top-0 left-0 bg-neutral-600 opacity-70;
}
.task-edit {
  @apply absolute w-full h-full top-0 left-0
    flex justify-center items-center;

  .container {
    @apply flex flex-col gap-5 bg-zinc-200 px-5 pt-10 pb-3 rounded;

    .element {
      @apply flex justify-between items-center gap-2;

      input {
        @apply rounded px-2 h-8;
      }
    }

    .actions {
      @apply flex justify-center gap-2;

      button {
        @apply rounded w-32 h-10;
      }
      .save { @apply bg-green-400 }
      .cancel { @apply bg-amber-400 }
    }
  }
}
</style>

