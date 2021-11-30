import API from ".";
import { DEFAULT_LIMIT } from "../config/constant";

export const PokemonService = {
  async getList(page) {
    const params = { limit: DEFAULT_LIMIT, offset: (page - 1) * DEFAULT_LIMIT };
    return await API.get(`/pokemon`, { params });
  },
};
