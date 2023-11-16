<script setup>
  import { ref, reactive } from "vue";
  import { useTaskAPI, setCsrf } from "../api/tasks";

  import TaskItem from "./TaskItem.vue";
  import TaskEdit from "./TaskEdit.vue";

  const taskAPI = useTaskAPI();

  const emptyTask = {
    title: "",
    description: "",
    completed: false
  };
  const tasks = reactive([]);
  const taskForEdit = ref({});

  const editorShows = ref(false);
  const enterEditMode = () => editorShows.value = true;
  const exitEditMode  = () => editorShows.value = false;

  const createNewTask = () => {
    taskForEdit.value = structuredClone(emptyTask);
    enterEditMode();
  }

  const startTaskEditing = (task) => {
    taskForEdit.value = task;
    enterEditMode();
  };

  const completeTask = (task) => {
    const newTask = {
      ...task,
      completed: true
    }

    saveTask(newTask);
  };

  const uncompleteTask = (task) => {
    const newTask = {
      ...task,
      completed: false
    }

    saveTask(newTask);
  };

  const saveTask = (task) => {
    const isEdit = !!task.id
    const call = isEdit ? taskAPI.put(task.id, task)
                        : taskAPI.post(task);
    call
      .then(data => {
        const index = tasks.findIndex((old) => old.id == task.id);
        tasks.splice(index, isEdit ? 1 : 0, data.task)
        exitEditMode();
      });
  }

  const deleteTask = (taskId) => {
    taskAPI
      .delete(taskId)
      .then(() => {
        const index = tasks.findIndex(old => old.id == taskId);
        tasks.splice(index, 1);
      })
  };


  //init
  taskAPI.all()
    .then(data => tasks.splice(0, 0, ...data.tasks))
    .catch(err => console.log("error loading tasks: ", err));

</script>

<template>
  <div class="tasks-container">
    <button class="new-task" @click="createNewTask">
      New task
    </button>
    <template v-if="tasks.length">
      <template v-for="task in tasks" :key="task.id">
        <TaskItem
            :task="task"
            @edit="startTaskEditing(task)"
            @complete="completeTask(task)"
            @uncomplete="uncompleteTask(task)"
            @delete="deleteTask"
          />
      </template>
    </template>
    <template v-else>
      No tasks found
    </template>
  </div>


  <TaskEdit
      v-if="editorShows"
      :task="taskForEdit"

      @updated="saveTask"
      @cancel="exitEditMode"
      />
</template>

