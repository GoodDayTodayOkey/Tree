import axios from 'axios'

export const types = {
  loadData: 'LOAD_DATA',
  removeUser: 'REMOVE_USER',
  updateUser: 'UPDATE_USER',
}

export const loadData = () => async (dispatch) => {
  const data = (await axios.get('http://localhost:8000/users')).data
  return dispatch({ type: types.loadData, payload: [...data] })
}

export const removeUser = (payload) => (dispatch, getState) => {
  const users = getState().users.data;
  let removedIds = [];
  const getRemovedUsersID = ({ id }) => {
    removedIds = [...removedIds, id];
    users.filter(user => user.id === id)[0].children.map(child => {
      return getRemovedUsersID({ id: child });
    })
  }
  getRemovedUsersID({ id: payload });
  const newUsers = users.filter(user => removedIds.every(removedId => user.id !== removedId));
  const newUsersWithoutRemovedChildren = newUsers.map(user => {
    return { ...user, children: user.children.filter(id => removedIds.every(removedId => removedId !== id)) }
  })
  return dispatch({ type: types.removeUser, payload: newUsersWithoutRemovedChildren })
}


export const updateUser = ({ state, kind, parentId }) => (dispatch, getState) => {
  const getUpdatedUsersWithChildren = () => {
    const currentState = state.map(item => ({ id: item.id, position: item.position }))
    const users = getState().users.data;
    const changedIds = currentState.map(user => user.id);
    const changedUsers = currentState.filter(user => users.some(item => item.id === user.id));
    const createdUsers = currentState.filter(user => users.every(item => item.id !== user.id)).map(createdUser => ({
      ...createdUser,
      attributes: {}, parent: parentId, children: [],
    }));
    const updatedUsers = users.map(user => {
      if (changedUsers.some(changedUser => changedUser.id === user.id)) {
        return { ...user, ...changedUsers.filter(changedUser => changedUser.id === user.id)[0] }
      }
      if (parentId === user.id) {
        return { ...user, children: changedIds }
      }
      return user
    })

    return [...updatedUsers, ...createdUsers];
  }

  const getUpdatedUsersWithAttributes = () => {
    const users = getState().users.data;
    const attributes = state.reduce((acc, item) => {
      const l = { ...acc, [item.name]: item.value }
      return { ...acc, [item.name]: item.value }
    }, {});
    const updatedUsers = users.map(user => parentId === user.id ? { ...user, attributes } : user)
    return updatedUsers;
  }
  const updatedUsers = kind === 'children' ? getUpdatedUsersWithChildren() : getUpdatedUsersWithAttributes();
  return dispatch({ type: types.updateUser, payload: updatedUsers })
}
