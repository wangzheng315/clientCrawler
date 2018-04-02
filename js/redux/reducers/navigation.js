import MainStackNavigation from '../../navigation'

const initialState = MainStackNavigation.router.getStateForAction(MainStackNavigation.router.getActionForPathAndParams('Home'))

export default (state = initialState, action) => {
  const nextState = MainStackNavigation.router.getStateForAction(action, state)

  return nextState || state
}

