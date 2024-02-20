export const useNutrition = () => {
  const nutrition = shallowRef(undefined);

  const nutritionInfo = ref(undefined);

  const ingredients = ref(["ground beef", "red onion"]);

  const macros = ref(undefined);

  async function getNutritionData() {
    if (!nutrition.value) {
      const { data: nutrientData } = await useAsyncData("nutrition", () =>
        queryContent().find()
      );

      nutrition.value = nutrientData.value;
    }

    getNutritionInfo();
  }

  function getNutritionInfo() {
    console.log(nutrition.value);
    nutritionInfo.value = undefined;
    let totalFoodNutrients = undefined;

    for (const ingredient of ingredients.value) {
      let keyWords = ingredient.toLowerCase().match(/\w+/g);

      let results = nutrition.value[0].FoundationFoods.filter((array) => {
        return keyWords.every((word) =>
          array.description.toLowerCase().includes(word)
        );
      });
      let nutrients = results[0].foodNutrients.filter(
        (nutrient) =>
          nutrient.median > 0.1 ||
          nutrient.nutrient.name.toLowerCase().includes("energy")
      );

      let foodPortion = results[0].foodPortion;

      if (!totalFoodNutrients) {
        totalFoodNutrients = nutrients;
      } else {
        for (const nutrient of nutrients) {
          let matched = totalFoodNutrients.filter((foodNutrient) => {
            return foodNutrient.nutrient.id === nutrient.nutrient.id;
          });

          if (matched.length > 0) {
            let index = totalFoodNutrients.indexOf(matched[0]);

            if (nutrient.median) {
              let amt = nutrient.median + totalFoodNutrients[index].median;
              totalFoodNutrients[index].media = Math.round(amt);
            } else if (nutrient.amount) {
              let amt = nutrient.amount + totalFoodNutrients[index].amount;
              totalFoodNutrients[index].amount = Math.round(amt);
            }
          } else {
            totalFoodNutrients.push(nutrient);
          }
        }
      }
    }
    nutritionInfo.value = totalFoodNutrients;
  }

  function findNutrient(nutrient) {
    const result = nutritionInfo.value.filter((foodNutrient) => {

      return foodNutrient.nutrient.name
        .toLowerCase()
        .includes(nutrient.toLowerCase());
    });

    if (result.length > 0) {
      if (result[0].median) {
        return result[0].median;
      } else if (result[0].amount) {
        return result[0].amount;
      }
    } else {
      return 0;
    }
  }

  return {
    nutritionInfo,
    ingredients,
    getNutritionData,
    getNutritionInfo,
    findNutrient,
  };
};
