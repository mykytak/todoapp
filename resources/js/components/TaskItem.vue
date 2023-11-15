<script setup>
  import { ref } from "vue";

  const { task } = defineProps({
    task: Object
  });

  const emit = defineEmits(["edit", "complete", "uncomplete", "delete"]);

  const showDetails = ref(false);
  const toggleMore = () => showDetails.value = !showDetails.value;

  const markForEdit = () => emit("edit", task.id);
  const markForCompletion = () => emit("complete", task.id);
  const markForUncompletion = () => emit("uncomplete", task.id);
  const markForRemoval = () => emit("delete", task.id);
</script>

<template>
  <div class="task-item">
    <div class="head" @click="toggleMore">
      <div class="title">
        <i
            class="more fa-solid fa-chevron-up cursor-pointer"
            :class="{active: showDetails}"
          ></i>
        {{ task.title }}
      </div>
      <div class="actions">
        <a class="edit"
           @click.prevent="markForEdit"
           href="javascript:void(0)"
           >
           <i class="fa-regular fa-pen-to-square"></i>
        </a>
        <a class="complete"
           v-if="!task.completed"
           @click.prevent="markForCompletion"
           href="javascript:void(0)"
           >
           <i class="fa-solid fa-check"></i>
        </a>
        <a class="uncomplete"
           v-if="task.completed"
           @click.prevent="markForUncompletion"
           href="javascript:void(0)"
           >
           <i class="fa-regular fa-circle-xmark"></i>
        </a>
        <a class="delete"
           @click.prevent="markForRemoval"
           href="javascript:void(0)"
           >
           <i class="fa-solid fa-trash-can"></i>
        </a>
      </div>
    </div>

    <div v-if="showDetails" class="details">
      {{ task.description }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.task-item {
  .head {
    @apply flex gap-1 p-2 hover:bg-stone-300;
  }

  .more{
    @apply rotate-90;
    &.active { @apply rotate-180; }
  }

  .details {
    @apply p-2;
  }

  .actions {
    @apply ml-auto flex gap-1;
  }
}
</style>

