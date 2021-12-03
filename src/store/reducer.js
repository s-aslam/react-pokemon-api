import { PokemonService } from "../services/pokemon.service";
import {
  GET_POKEMON_LIST,
  HIDE_FORM,
  ON_DELETE,
  ON_FORM_SUBMIT,
  SET_CURRENT_PAGE,
  SET_EDIT_FORM,
  SET_SHOWLOADER,
  SET_SHOW_ADD_FORM,
} from "./action";

const initialState = {
  items: [],
  showLoader: false,
  currentPage: 1,
  totalCounts: 0,
  showAddForm: false,
  currentEditIndex: null,
};

export const reducer = (state = initialState, action) => {
  const { currentEditIndex, items } = state;
  switch (action.type) {
    case HIDE_FORM:
      return {
        ...state,
        showAddForm: null,
        currentEditIndex: null,
      };
    case SET_SHOW_ADD_FORM:
      return {
        ...state,
        showAddForm: true,
        currentEditIndex: null,
      };
    case SET_EDIT_FORM:
      return {
        ...state,
        showAddForm: true,
        currentEditIndex: action.value,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.value,
      };
    case SET_SHOWLOADER:
      return {
        ...state,
        showLoader: !state.showLoader,
      };
    case GET_POKEMON_LIST:
      const { results, count } = action.value;
      return {
        ...state,
        showAddForm: null,
        currentEditIndex: null,
        items: results || [],
        showLoader: false,
        totalCounts: count || 0,
      };
    case ON_FORM_SUBMIT:
      const { name } = action.value;
      if (currentEditIndex !== null) {
        items[currentEditIndex].name = name;
      } else {
        items.unshift({ name });
      }
      return {
        ...state,
        showAddForm: null,
        currentEditIndex: null,
        items: items,
      };
    case ON_DELETE:
      items.splice(action.value, 1);
      return {
        ...state,
        showAddForm: null,
        currentEditIndex: null,
        items: items,
      };
    default: {
      return state;
    }
  }
};

// Thunk function
export const fetchList = async (dispatch, getState) => {
  const { currentPage } = getState();
  dispatch({ type: SET_SHOWLOADER });
  const { data } = await PokemonService.getList(currentPage);
  dispatch({ type: GET_POKEMON_LIST, value: data });
};
