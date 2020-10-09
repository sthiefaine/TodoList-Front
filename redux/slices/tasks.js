//! Redux Toolkit allows us to write "mutating" logic in reducers.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createSlice, current } from '@reduxjs/toolkit';
// import and use "current" for console.log
import NProgress from 'nprogress';
import axios from 'axios';

export const loadTasks = createAsyncThunk(
  'tasks/loadTasks',
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
  'tasks/createTask',
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

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3002/task/${payload.id}`, {
        method: 'put',
        headers: {
          Accept: '*',
        },
        data: {
          ...payload.data,
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
  'tasks/deleteTask',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3002/task/${payload.id}`, {
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

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setNewCheckBoxValue: (state, action) => {
      const getTaskDataIndex = state.tasksData.findIndex(item => item.id === Number(action.payload));
      state.tasksData[getTaskDataIndex].done = !state.tasksData[getTaskDataIndex].done;
    },
  },
  extraReducers: {
    [loadTasks.pending]: (state) => {
      NProgress.start();
      state.tasksData = []
      state.loading = 'loading'
    },
    [loadTasks.fulfilled]: (state, action) => {
      state.tasksData = action.payload
      state.loading = 'loaded'
      NProgress.done();
    },
    [loadTasks.rejected]: (state, action) => {
      state.tasksData = [{
        id: 404,
        label: 'Api non joignable',
        done: false,
      }]
      state.error = action.payload.error
      NProgress.done();
    },


    [createTask.pending]: (state) => {
      NProgress.start();
      state.loading = 'loading'
    },
    [createTask.fulfilled]: (state, action) => {
      state.tasksData.push(action.payload)
      state.loading = 'loaded'
      NProgress.done();
    },
    [createTask.rejected]: (state, action) => {
      state.error = action.payload.error
      NProgress.done();
    },


    [updateTask.pending]: (state) => {
      NProgress.start();
      state.loading = 'loading'
    },
    [updateTask.fulfilled]: (state, action) => {

      const getTaskDataIndex = state.tasksData.findIndex(item => item.id === Number(action.payload.id));
      state.tasksData[getTaskDataIndex].done = action.payload.done;
      state.loading = 'loaded'
      NProgress.done();
    },
    [updateTask.rejected]: (state, action) => {
      NProgress.done();
      state.error = action.payload.error
    },


    [deleteTask.pending]: (state) => {
      NProgress.start();
      state.loading = 'loading'
    },
    [deleteTask.fulfilled]: (state, action) => {
      const getOtherTasks = state.tasksData.filter(item => item.id !== Number(action.payload.id));
      state.tasksData = getOtherTasks;
      state.loading = 'loaded'
      NProgress.done();
    },
    [deleteTask.rejected]: (state, action) => {
      NProgress.done();
      state.error = action.payload.error
    },

  },
});

// The reducer
export default tasksSlice.reducer;

// The selector
export const tasksSelector = (state) => state.tasks;

// Actions generated from the slice
export const {
  saveTasks,
  setNewCheckBoxValue,
} = tasksSlice.actions;
