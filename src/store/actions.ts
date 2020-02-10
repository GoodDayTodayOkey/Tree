import api from '../api/api';
import types from './types'
import { convertUserWithRemovedChildren, convertUpdatedUser } from './converters';

export const loadData = () => async (dispatch) => {
  const data = (await api.get({ url: '/users' })).data
  return dispatch({ type: types.loadData, payload: [...data] })
}

export const removeUser = (id) => (dispatch, getState) => {
  const users = getState().users.data;
  const updatedUsers = convertUserWithRemovedChildren({ users, id })
  debugger;
  return dispatch({ type: types.removeUser, payload: updatedUsers })
}


export const updateUser = ({ state, kind, parentId }) => (dispatch, getState) => {
  const users = getState().users.data;
  const updatedUsers = convertUpdatedUser({ users, state, parentId, kind })
  return dispatch({ type: types.updateUser, payload: updatedUsers })
}
