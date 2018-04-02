import types from '../../Constants/actionTypes'

export function setList(data) {
  return {
    type: types.GET_LIST_SUCCESS,
    payload: data,
  }
}
