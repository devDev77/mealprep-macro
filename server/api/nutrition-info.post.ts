export default defineEventHandler(async (event) => {

  const {ingredient} = await readBody(event)
  
  const uri = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.NUXT_FOODCENTRAL_API_KEY}&query=${ingredient}&dataType=Foundation`;

  try {
    const response = await $fetch(uri);

    console.log(response)

    let ingredient = response.foods[0]

    const idealResponse = {
      foodNutrients: ingredient.foodNutrients,
    }
    const data = idealResponse

    return data

  } catch (error) {
    console.log(error)
  }

});

