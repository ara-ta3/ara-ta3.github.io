import FoodMaster from "../../../../domains/cats/FoodMaster";

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const ids = FoodMaster.map((food) => food.id);
  return ids.map((id) => `/cat/calorie/food/${id}`);
}
