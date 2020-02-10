
const convertUserWithRemovedChildren = ({ users, id }) => {
  let removedIds = [];
  const selectRemovedUsersId = ({ id }) => {
    removedIds = [...removedIds, id];
    users.filter(user => user.id === id)[0].children.map(child => {
      return selectRemovedUsersId({ id: child });
    })
  }
  selectRemovedUsersId({ id });
  const updatedUsers = users.filter(user => removedIds.every(removedId => user.id !== removedId));
  const updatedUsersWithRemovedChildren = updatedUsers.map(user => {
    return { ...user, children: user.children.filter(id => removedIds.every(removedId => removedId !== id)) }
  })
  return updatedUsersWithRemovedChildren;
}


const convertUpdatedUser = ({ users, state, parentId, kind }) => {
  const selectUpdatedUsersWithChildren = () => {
    debugger;
    const updatedState = state.map(item => ({ id: item.id, position: item.position }))
    const changedIds = updatedState.map(user => user.id);
    const changedUsers = updatedState.filter(user => users.some(item => item.id === user.id));
    const createdUsers = updatedState.filter(user => users.every(item => item.id !== user.id)).map(createdUser => ({
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

  const selectUpdatedUsersWithAttributes = () => {
    const attributes = state.reduce((acc, item) => {
      return { ...acc, [item.name]: item.value }
    }, {});
    const updatedUsers = users.map(user => parentId === user.id ? { ...user, attributes } : user)
    return updatedUsers;
  }
  const updatedUsers = kind === 'children' ? selectUpdatedUsersWithChildren() : selectUpdatedUsersWithAttributes();
  return updatedUsers
}

export { convertUserWithRemovedChildren, convertUpdatedUser } 
