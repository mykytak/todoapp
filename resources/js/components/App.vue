<script setup>
  import TaskItem from "./TaskItem.vue";
</script>

<template>
    <div class="font-bold">Tasks page</div>
    <TaskItem
        :task="{id: 1, title: 'test task', description: 'description'}"
        @edit="(taskId) => console.log('marked for editing', taskId)"
    />
</template>

