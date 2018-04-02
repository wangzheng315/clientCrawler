import types from '../../Constants/actionTypes'

const initialState = {
  data: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
      state.data = action.payload
      return state
    default:
      return state
  }
}