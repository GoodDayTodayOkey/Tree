import types from './types'

const initialTabsState = {
  data: {
    tree: ['explorer', 'json'],
    modal: ['children', 'attributes'],
  }
}

const initialUsersState = {
  data: null
}

const users = (state = initialUsersState, action) => {
  switch (action.type) {
    case types.loadData:
      return {
        ...state,
        data: [...action.payload]
      }
    case types.removeUser:
      return {
        data: [...action.payload]
      }
    case types.updateUser:
      return {
        data: [...action.payload]
      }
    default:
      return state
  }
}

const tabs = (state = initialTabsState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export { tabs, users }

