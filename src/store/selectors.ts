const selectTree = state => state.tabs.data.tree;
const selectModal = state => state.tabs.data.modal;
const selectUsers = state => state.users.data;
const selectModalContent = parentId => state => ({
  attributes: state.users.data.find(user => user.id === parentId).attributes,
  children: state.users.data.find(user => user.id === parentId).children,
  data: state.users.data,
});

export { selectTree, selectUsers, selectModal, selectModalContent };