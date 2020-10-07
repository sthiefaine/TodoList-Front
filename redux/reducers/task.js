import { createSlice } from '@reduxjs/toolkit';
// import { createSlice, current } from '@reduxjs/toolkit';
// import and use "current" for console.log

import TasksData from '../../data/task';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasksData: TasksData,
  },

  reducers: {
    setNewCheckBoxValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const getTaskDataIndex = state.tasksData.findIndex(item => item.id === Number(action.payload));
      state.tasksData[getTaskDataIndex].done = !state.tasksData[getTaskDataIndex].done;
    },
    saveNewTask: (state, action) => {

      state.tasksData.push({
        id: getMaxId(state.tasksData),
        label: action.payload.trim(),
        done: false,
      })

    },

    deleteTask: (state, action) => {
      const getOtherTasks = state.tasksData.filter(item => item.id !== Number(action.payload));
      state.tasksData = getOtherTasks;

    },
  },
});

export default taskSlice.reducer;

export const getMaxId = (items) => {
  const ids = items.map((item) => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
