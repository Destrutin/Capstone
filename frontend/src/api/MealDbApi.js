import axios from "axios";

const BASE_URL = "http://localhost:5000";

class MealDbApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${MealDbApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      console.log("response:", response);
      console.log("data:", response.data);
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res.user;
  }

  static async getUserId(username) {
    let res = await this.request(`users/${username}/id`);
    return res.userId;
  }

  static async saveChanges(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async getMeals() {
    return await this.request(`meals`);
  }

  static async searchMealsByName(name) {
    return await this.request(`meals/search`, { name });
  }

  static async listMealsByFirstLetter(letter) {
    return await this.request(`meals/list-by-first-letter`, { letter });
  }

  static async getMealById(id) {
    return await this.request(`meals/lookup`, { id });
  }

  static async getRandomMeal() {
    return await this.request(`meals/random`);
  }

  static async listMealCategories() {
    return await this.request(`meals/categories`);
  }

  static async listFilter(filter) {
    return await this.request(`meals/list-all`, { filter });
  }

  static async filterMealsByCategory(category) {
    return await this.request(`meals/filter-by-category`, { category });
  }

  static async filterMealsByArea(area) {
    return await this.request(`meals/filter-by-area`, { area });
  }

  static async filterMealsByIngredient(ingredient) {
    return await this.request(`meals/filter-by-ingredient`, { ingredient });
  }

  static async listIngredients() {
    return await this.request(`list.php?i=list`);
  }

  static async addToFavorites(recipeId, data) {
    return await this.request(`favorites/${recipeId}`, data, "post");
  }

  static async removeFromFavorites(recipeId, userId) {
    return await this.request(`favorites/${recipeId}`, { userId }, "delete");
  }

  static async getFavoriteStatus(recipeId, userId) {
    return await this.request(`favorites/${recipeId}/status`, { userId });
  }

  static async getFavoriteRecipes(userId) {
    return await this.request(`favorites`, { userId });
  }

  static async getRecipeDetails(recipeId) {
    return await this.request(`recipes/${recipeId}`);
  }
}

export default MealDbApi;

MealDbApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlc3RydXRpbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTM5MDQ5MH0.iLSQzv_yW0mrdYhcajVsruOn5pi5GupLwAiUO_NMEIM";
