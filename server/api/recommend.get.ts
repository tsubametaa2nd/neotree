import foods from "../data/foods.json";

interface Food {
  id: number;
  name: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const targetCalories = query.calories ? Number(query.calories) : 2000;

  const validFoods = (foods as Food[]).filter(
    (food) =>
      food.nutrition.calories >= 30 &&
      food.nutrition.calories <= 600 &&
      food.nutrition.calories > 0,
  );

  const shuffled = [...validFoods].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 100);
});
