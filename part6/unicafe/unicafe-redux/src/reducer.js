const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const good = state.good + 1
      return {...state, good: good}
    case 'OK':
      const ok = state.ok + 1
      return {...state, ok: ok}
    case 'BAD':
      const bad = state.bad + 1
      return {...state, bad: bad}
    case 'ZERO':
      return state
    case 'RESET_STATS':
      return initialState
    default: return state
  }
  
}

export default counterReducer
