const ingredients = ref([
  {
    name: "ground beef",
    portion: 100,
  },
]);

const totalFoodNutrients = ref([]);
const nutritionInfo = ref(undefined);
const portionInfo = ref([]);

const macros = ref({});
const recipe = ref(`

2g KYS
3g WOW

`)

const bulkImport = ref(true)

export const useNutrition = () => {
  const isLoading = ref(false);
  const nutrition = shallowRef(undefined);

  function reset() {
    totalFoodNutrients.value = [];
    nutritionInfo.value = undefined;
    portionInfo.value = [];
    macros.value = {};
  }

  async function getNutritionData() {
    isLoading.value = true;
    console.log(isLoading.value);

    const { data: nutrientData } = await useAsyncData("nutrition", () =>
      queryContent().find()
    );

    nutrition.value = nutrientData.value;

    getNutritionInfo();
  }


  function getNutritionInfo() {
    nutritionInfo.value = undefined;
    totalFoodNutrients.value = [];
    portionInfo.value = [];
    const ingredientList = [];

    for (const ingredient of ingredients.value) {
      const keyWords = ingredient.name.toLowerCase().match(/\w+/g);
      const results = nutrition.value[0].FoundationFoods.filter((array) => {
        return keyWords.every((word) =>
          array.description.toLowerCase().includes(word)
        );
      });

      console.log(results[0])


      if (results.length > 0) {
        let nutrients = results[0].foodNutrients.filter(
          (nutrient) => nutrient.amount > 0.1
        );

        let actualName = results[0].description;

        let portionMultiplier = ingredient.portion / 100;

        for (const nutrient of nutrients) {
          nutrient.amount = Math.round(nutrient.amount * portionMultiplier, 1);
        }

        ingredientList.push({
          id: results[0].fdcId,
          name: results[0].description,
          foodNutrients: nutrients,
        });

        portionInfo.value.push({
          name: ingredient,
          foodPortion: ingredient.portion,
          measureUnit: "g",
          actualName: actualName,
        });
      }
    }

    const foodCopy = ingredientList.map((o) => ({ ...o }));
    for (const food of foodCopy) {
      if (foodCopy.indexOf(food) === 0) {
        totalFoodNutrients.value = food.foodNutrients;
      } else {
        for (const nutrient of food.foodNutrients) {
          let matched = totalFoodNutrients.value.filter((foodNutrient) => {
            return foodNutrient.nutrient.id === nutrient.nutrient.id;
          });

          if (matched.length > 0) {
            let index = totalFoodNutrients.value.indexOf(matched[0]);

            let amt = totalFoodNutrients.value[index].amount + nutrient.amount;
            totalFoodNutrients.value[index].amount = Math.round(amt);
          } else {
            totalFoodNutrients.value.push(nutrient);
          }
        }
      }
    }

    let duplicateCalories = totalFoodNutrients.value.filter((foodNutrient) => {
      return foodNutrient.nutrient.id === 1062;
    });
    totalFoodNutrients.value.splice(
      totalFoodNutrients.value.indexOf(duplicateCalories[0]),
      1
    );

    let calories = totalFoodNutrients.value.filter((foodNutrient) => {
      return (
        foodNutrient.nutrient.id === 1008 || foodNutrient.nutrient.id === 2047
      );
    });

    if (calories.length > 1) {
      console.log(calories);
      let index = totalFoodNutrients.value.indexOf(calories[0]);

      totalFoodNutrients.value[index].amount += calories[1].amount;
    }

    nutritionInfo.value = totalFoodNutrients.value;

    isLoading.value = false;
    getMacros();
  }

  // REG EX to parse through recipe
  const measurementKey = ['g', 'lbs', 'tbsp', 'tsp']
  function parseRecipe() {

    const ingredientLines = recipe.value.match(/[^\r\n]+/g);
    let ingredientIndex = 0
    for (const ingredient of ingredientLines) {
      const amt = ingredient.match(/\d+/g)
      const name = ingredient.match(/[a-zA-Z]+/g)
      const measurement = name.filter((word) => {
        for (const keyWord of measurementKey) {
          if (word === keyWord) {
            return word === keyWord;
          }
        }
      })
      for (let i of measurement) {
        const index = name.indexOf(i)
        name?.splice(index, 1)
      }

      console.log(name)
      
      const ingredientName = name?.join(' ')
      console.log(ingredientName)
      
      console.log(amt[0], measurement[0])
      bulkImport.value = false

      if (!ingredients.value[ingredientIndex]) {
        add()
      } 

      const selected = ingredients.value[ingredientIndex]
      selected.name = ingredientName
      selected.portion = amt[0]

      ingredientIndex++
    }
  }


  function findNutrient(nutrient) {
    const result = nutritionInfo.value.filter((foodNutrient) => {
      return foodNutrient.nutrient.name
        .toLowerCase()
        .includes(nutrient.toLowerCase());
    });

    if (result.length > 0) {
      if (result[0].amount) {
        return result[0].amount;
      }
    } else {
      return 0;
    }
  }

  function getMacros() {
    const calories = findNutrient("energy");
    const protein = findNutrient("protein");
    const carbo = findNutrient("carb");
    const fat = findNutrient("fat");

    macros.value = {
      calories: calories,
      protein: protein,
      carbo: carbo,
      fat: fat,
    };
  }

  // Small Functions for Front End Display

  function add() {
    ingredients.value.push({
      name: "",
      portion: 100,
    });

    reset();
  }

  function deleteIngredient(index) {
    ingredients.value.splice(index, 1);
    reset();
  }

  function findPortion(name) {
    const result = portionInfo.value.filter((ingredient) => {
      return name === ingredient.name;
    });

    return `${result[0].foodPortion}${result[0].measureUnit} ${result[0].actualName}`;
  }

  return {
    nutritionInfo,
    totalFoodNutrients,
    portionInfo,
    ingredients,
    macros,
    isLoading,
    recipe,
    bulkImport,
    parseRecipe,
    getNutritionData,
    getNutritionInfo,
    findNutrient,
    add,
    deleteIngredient,
    findPortion,
    reset,
  };
};
