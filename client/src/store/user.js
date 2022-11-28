import { createSlice, configureStore } from '@reduxjs/toolkit';
import { getCookie } from '../utils/helper';
import { AuthenticateService } from '../utils/api';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    role: '',
    sessionId: null,
  },
  reducers: {
    setUserStore: (state, { type, payload = null }) => {
      state.name = payload.name;
      state.role = payload.role;
      state.sessionId = payload.sessionId;
    },
    clearUserStore: (state) => {
      state.name = '';
      state.role = '';
      state.sessionId = null;
    }
  }
});
export const store = configureStore({
  reducer: userSlice.reducer
});
export const { setUserStore, clearUserStore } = userSlice.actions;

export const checkSessionAlive = async () => {
  try {
    const { Name, Role, sessionId } = await AuthenticateService.getNameAndRoleFromSession();
    store.dispatch(setUserStore({
      name: Name,
      role: Role,
      sessionId
    }));
  } catch (err) {
    store.dispatch(clearUserStore());
  }
}

// Can still subscribe to the store
//store.subscribe(() => console.log(store.getState()))