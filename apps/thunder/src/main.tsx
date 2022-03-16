import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { Root } from '@v-thomas/libs/thunder/shell';
import './globals.css';

import {
  AUTH_FEATURE_KEY,
  authReducer,
  USER_FEATURE_KEY,
  userReducer,
  GROUPS_FEATURE_KEY,
  groupsReducer,
  MOVIES_FEATURE_KEY,
  moviesReducer,
  INVITE_FEATURE_KEY,
  inviteReducer
} from '@v-thomas/libs/thunder/data-access';

import { INVITES_FEATURE_KEY, invitesReducer } from '@v-thomas/libs/thunder/data-access';

const store = configureStore({
  reducer: {
    [INVITES_FEATURE_KEY]: invitesReducer,
    [INVITE_FEATURE_KEY]: inviteReducer,
    [USER_FEATURE_KEY]: userReducer,
    [MOVIES_FEATURE_KEY]: moviesReducer,
    [GROUPS_FEATURE_KEY]: groupsReducer,
    [AUTH_FEATURE_KEY]: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
  enhancers: []
});

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);