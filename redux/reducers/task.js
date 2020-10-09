//! Redux Toolkit allows us to write "mutating" logic in reducers.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createSlice, current } from '@reduxjs/toolkit';
// import and use "current" for console.log

import axios from 'axios';


export const loadTasks = createAsyncThunk(
  'task/loadTasks',
  async (payload, thunkAPI) => {
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
);


export const createTask = createAsyncThunk(
  'task/createTask',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3002/task`, {
        method: 'post',
        headers: {
          Accept: '*',
        },
        data: {
          label: payload,
        }
      })
      // return response.json()
      return response.data

    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }

  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3002/task/${payload}`, {
        method: 'delete',
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
);


const initialState = {
  tasksData: [],
  loading: 'idle',
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setNewCheckBoxValue: (state, action) => {
      const getTaskDataIndex = state.tasksData.findIndex(item => item.id === Number(action.payload));
      state.tasksData[getTaskDataIndex].done = !state.tasksData[getTaskDataIndex].done;
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


    [createTask.pending]: (state) => {
      state.loading = 'loading'
    },
    [createTask.fulfilled]: (state, action) => {
      state.tasksData.push(action.payload)
      state.loading = 'loaded'
    },
    [createTask.rejected]: (state, action) => {
      state.error = action.payload.error
    },


    [deleteTask.pending]: (state) => {
      state.loading = 'loading'
    },
    [deleteTask.fulfilled]: (state, action) => {
      const getOtherTasks = state.tasksData.filter(item => item.id !== Number(action.payload.id));
      state.tasksData = getOtherTasks;
      state.loading = 'loaded'
    },
    [deleteTask.rejected]: (state, action) => {
      state.error = action.payload.error
    },

  },
});

export default taskSlice.reducer;

//
export const tasksSelector = state => state.task;

export const {
  saveTasks,
  setNewCheckBoxValue,
} = taskSlice.actions;
