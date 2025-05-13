import vikeReact from "vike-react/config";
import FoodMaster from "../domains/cats/FoodMaster";

export default {
  extends: [vikeReact],
  prerender: {
    routes: FoodMaster.map((food) => `/cat/calorie/food/${food.id}/`),
  },
};
