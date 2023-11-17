<script setup>
  import { ref } from "vue";

  const props = defineProps({
    task: Object
  });

  const emit = defineEmits(["edit", "complete", "uncomplete", "delete"]);

  const showDetails = ref(false);
  const toggleMore = () => showDetails.value = !showDetails.value;

  const markForEdit = () => emit("edit", props.task.id);
  const markForCompletion = () => emit("complete", props.task.id);
  const markForUncompletion = () => emit("uncomplete", props.task.id);
  const markForRemoval = () => emit("delete", props.task.id);
</script>

<template>
  <div
      class="task-item"
      :class="{completed: task.completed}"
      :data-test-id="task.id"
    >
    <div class="head" @click="toggleMore">
      <div class="title">
        <i
            class="more fa-solid fa-chevron-up cursor-pointer"
            :class="{active: showDetails}"
          ></i>
        {{ props.task.title }}
      </div>
      <div class="actions">
        <a class="edit"
           @click.prevent.stop="markForEdit"
           href="javascript:void(0)"
           >
           <i class="fa-regular fa-pen-to-square"></i>
        </a>
        <a class="complete"
           v-if="!props.task.completed"
           @click.prevent.stop="markForCompletion"
           href="javascript:void(0)"
           >
           <i class="fa-solid fa-check"></i>
        </a>
        <a class="uncomplete"
           v-if="props.task.completed"
           @click.prevent.stop="markForUncompletion"
           href="javascript:void(0)"
           >
           <i class="fa-regular fa-circle-xmark"></i>
        </a>
        <a class="delete"
           @click.prevent.stop="markForRemoval"
           href="javascript:void(0)"
           >
           <i class="fa-solid fa-trash-can"></i>
        </a>
      </div>
    </div>

    <div v-if="showDetails" class="details">
      {{ props.task.description }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.task-item {
  .head {
    @apply flex gap-1 hover:bg-stone-300;
  }
  &.completed .head {
    @apply p-2 bg-emerald-200 hover:bg-emerald-300;
  }

  .more{
    @apply rotate-90;
    &.active { @apply rotate-180; }
  }

  .details {
    @apply p-2;
  }

  .actions {
    @apply ml-auto flex divide-x divide-neutral-500;

    &>* {
      @apply w-8 h-8 text-center hover:bg-stone-400
        flex justify-center items-center;
    }
  }
}
</style>

