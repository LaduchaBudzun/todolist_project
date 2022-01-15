export default {
  actions: {
    addTask({ commit, getters }, textTask) {
      const tasks = getters.getTasks;

      let idOfNewTask;

      if (!tasks.length) {
        idOfNewTask = 1;
      } else {
        idOfNewTask = tasks[tasks.length - 1].id + 1;
      }

      const newTask = {
        id: idOfNewTask,
        text: textTask,
        completed: false,
      };

      commit("addTask", newTask);
    },
  },
  mutations: {
    updateTasks(state, newTasks) {
      state.tasks = newTasks;
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => task.completed == false);
    },
    filterChange(state, newFilter) {
      state.filter = newFilter;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    // changeStatusTask(state, idTask) {
    //   const task = state.tasks.find((task) => task.id === idTask);
    //   task.completed = !task.completed;
    // },
  },
  state: {
    tasks: [{ id: 1, text: "Первый таск", completed: true }],
    filter: "All",
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    filter(state) {
      return state.filter;
    },
    filteredTasks(state) {
      if (state.filter == "All") {
        return state.tasks;
      } else if (state.filter == "Active") {
        return state.tasks.filter((task) => task.completed == false);
      } else if (state.filter == "Completed") {
        return state.tasks.filter((task) => task.completed == true);
      }
    },
  },
};
