import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createSlice, current } from '@reduxjs/toolkit';
// import and use "current" for console.log

import axios from 'axios';

import { getMaxId } from '../../selectors/getMaxId';

export const loadTasks = createAsyncThunk(
  'task/loadTasks',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3002/tasks`, {
        method: 'get',
        headers: {
          Accept: '*',
        },
      })
      // return response.json()
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }

  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasksData: [],
    loading: 'idle',
  },

  reducers: {
    setNewCheckBoxValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
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
  extraReducers: {
    [loadTasks.pending]: (state) => {
      state.tasksData = []
      state.loading = 'loading'
    },
    [loadTasks.fulfilled]: (state, action) => {
      state.tasksData = action.payload
      state.loading = 'loaded'
    },
    [loadTasks.rejected]: (state, action) => {
      state.tasksData = [{
        id: 404,
        label: 'Api non joignable',
        done: false,
      }]
      state.error = action.payload.error
    },
  },
});

export default taskSlice.reducer;

export const {
  saveTasks,
  setNewCheckBoxValue,
  saveNewTask,
  deleteTask,
} = taskSlice.actions;
