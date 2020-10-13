import { defaultNestedCardTree } from '@/data';

export const cards = function(state = { nestedTree: defaultNestedCardTree }, action) {
  switch (action.type) {
    default:
      return state;
  }
}

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

export const view = function(state = 'wide-view', action) {
  switch (action.type) {
    case 'change_page':
      return action.page;
    default:
      return state;
  }
}
