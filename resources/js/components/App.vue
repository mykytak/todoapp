<script setup>
  import TaskItem from "./TaskItem.vue";
  import TaskEdit from "./TaskEdit.vue";

  const task = {
    id: 1,
    title: 'test task',
    description: 'description'
  };
</script>

<template>
    <div class="font-bold">Tasks page</div>
    <TaskItem
        :task="task"
        @edit="(taskId) => console.log('marked for editing', taskId)"
    />
    <TaskEdit
        :task="task"
        />
</template>

