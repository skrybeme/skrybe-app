export const settings = function(state = { theme: 'purple' }, action) {
  switch (action.type) {
    case 'set_theme':
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};
