import { PokemonService } from "../services/pokemon.service";
import { GET_POKEMON_LIST, SET_CURRENT_PAGE, SET_SHOWLOADER } from "./action";

const initialState = {
  items: [],
  showLoader: false,
  currentPage: 1,
  totalCounts: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        items: results || [],
        showLoader: false,
        totalCounts: count || 0,
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
