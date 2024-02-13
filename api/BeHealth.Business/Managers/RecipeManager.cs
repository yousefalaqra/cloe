using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Meals;
using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using BeHealth.Business.Resources.FoodManamgnet.Meals;
using BeHealth.Business.Resources.FoodManamgnet.Nutrition;
using BeHealth.Business.Resources.FoodManamgnet.Recipes;
using BeHealth.Business.Resources.Settings;
using BeHealth.Presentence.Entities.FoodManamgnet.Recipes;
using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Meals;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;
using NutritionValueResource = BeHealth.Business.Resources.FoodManamgnet.Meals.NutritionValueResource;

namespace BeHealth.Business.Managers
{
    public interface IRecipeManager
    {
        Task<List<RecipeResource>> GetAllRecipes(string name);

        Task<RecipeResource> GetRecipe(long id);

        Task<RecipeResource> CreateRecipe(RecipeModel model);

        Task<NutritionValueResource> GetRecipeNutritionValue(long id);

        Task<RecipeResource> AddRecipeCategory(long recipeId, string category);
        Task<RecipeResource> RemoveRecipeCategory(long recipeId, long category);

        Task<RecipeResource> AddRecipeItem(long recipeId, long itemId, FoodItemModel model);

        Task<RecipeResource> RemoveRecipeItem(long recipeId, long itemId);

        Task<RecipeResource> UpdateRecipeItem(long recipeId, long itemId, FoodItemModel model);

        Task<RecipeResource> UpdateRecipe(long id, RecipeModel model);

        Task<RecipeResource> AddRecipeStep(long id, string step);
        Task<RecipeResource> UpdateRecipeStep(long id, long stepdid, string step);
        Task<RecipeResource> RemvoeRecipeStep(long id, long stepdId);

        Task<bool> DeleteRecipe(long id);

    }

    public class RecipeManager : IRecipeManager
    {
        private readonly IRepository<RecipeEntity> _repository;
        private readonly IRepository<FoodItemEntity> _itemRepository;
        private readonly IRepository<RecipeCategoriesEntity> _recipeCategoryRespository;
        private readonly IRepository<RecipeIngredientEntity> _recipeIngredientRespository;
        private readonly IRepository<RecipeStepsEntity> _recipeStepsRespository;

        private readonly string includes = "RecipeCategoires,Steps,Ingredients";

        private readonly IRepository<UnitEntity> _unitRespository;
        private readonly IMapper _mapper;

        public RecipeManager(
            IRepository<RecipeEntity> repository,
            IRepository<FoodItemEntity> itemRepository,
            IRepository<RecipeCategoriesEntity> recipeCategoryRespository,
            IRepository<RecipeIngredientEntity> recipeIngredientRespository,
            IRepository<RecipeStepsEntity> recipeStepsRespository,
            IRepository<UnitEntity> unitRespository,
            IMapper mapper
            )
        {
            _repository = repository;
            _itemRepository = itemRepository;
            _recipeCategoryRespository = recipeCategoryRespository;
            _recipeIngredientRespository = recipeIngredientRespository;
            _recipeStepsRespository = recipeStepsRespository;
            _unitRespository = unitRespository;
            _mapper = mapper;
        }


        public async Task<RecipeResource> CreateRecipe(RecipeModel model)
        {
            var entity = new RecipeEntity
            {
                Name = model.Name,
                Description = model.Description,
                CreatedBy = "JoAqra",
                CreatedAt = DateTime.Now,
                PreparationTime = model.PreparationTime
            };


            var createdEntity = _repository.Add(entity);
            await _repository.SaveChangesAsync();



            return await RecipeEntityToResource(createdEntity);
        }

        public async Task<List<RecipeResource>> GetAllRecipes(string name)
        {
            Expression<Func<RecipeEntity, bool>> predicate = null;

            if (!string.IsNullOrEmpty(name))
                predicate = x => x.Name.Contains(name);

            var entities = await _repository.GetAllAsync(predicate);

            List<RecipeResource> resources = new List<RecipeResource>();

            foreach (var entity in entities)
            {
                var nutrtionValue = await GetRecipeNutritionValue(entity.ID);
                resources.Add(await RecipeEntityToResource(entity, nutrtionValue));

            }
            return resources;

        }

        public async Task<RecipeResource> GetRecipe(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id, includes);
            var nutValue = await GetRecipeNutritionValue(id);
            var resource = await RecipeEntityToResource(entity, nutValue);

            return resource;
        }

        public async Task<RecipeResource> UpdateRecipe(long id, RecipeModel model)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Item with ID {id} not found");
            }

            if (!string.IsNullOrEmpty(model.Name))
                entity.Name = model.Name;

            if (!string.IsNullOrEmpty(model.Description))
                entity.Description = model.Description;

            if (model.PreparationTime != null)
                entity.PreparationTime = model.PreparationTime;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(id);

            return await RecipeEntityToResource(entity, nutValue);
        }

        public async Task<bool> DeleteRecipe(long id)
        {
            var entity = await _repository.GetById(id);

            if (entity.Equals(null))
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe with ID {id} not found");
            }

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;
        }

        public async Task<NutritionValueResource> GetRecipeNutritionValue(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id, "Ingredients");
            var result = new NutritionValueResource
            {
                TotalCalories = 0,
                TotalCarbohydrates = 0,
                TotalFat = 0,
                TotalProtein = 0,
            };
            foreach (var ingredient in entity.Ingredients)
            {
                var foodItemEntity = await _itemRepository.FirstOrDefault(x => x.ID == ingredient.FoodItemId);

                var baseQunatity = foodItemEntity.BaseQuantity;
                var newQuantity = ingredient.Quantity;

                var baseEnergy = foodItemEntity.Calories;
                var baseFat = foodItemEntity.Fat;
                var baseCarbs = foodItemEntity.Carbohydrates;
                var baseProtien = foodItemEntity.Protein;

                var newEnergy = (newQuantity * baseEnergy) / baseQunatity;
                var newFat = (newQuantity * baseFat) / baseQunatity;
                var newCarbs = (newQuantity * baseCarbs) / baseQunatity;
                var newProtien = (newQuantity * baseProtien) / baseQunatity;

                result.TotalCalories += newEnergy;
                result.TotalCarbohydrates += newCarbs;
                result.TotalFat += newFat;
                result.TotalProtein += newProtien;

            }

            return result;
        }


        public async Task<RecipeResource> AddRecipeCategory(long recipeId, string category)
        {
            var entity = new RecipeCategoriesEntity
            {
                Category = category,
                RecipeId = recipeId,
            };

            _recipeCategoryRespository.Add(entity);
            await _recipeCategoryRespository.SaveChangesAsync();

            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == recipeId, includes);

            var nutValue = await GetRecipeNutritionValue(recipeId);

            return await RecipeEntityToResource(recipeEntity, nutValue);

        }

        public async Task<RecipeResource> RemoveRecipeCategory(long recipeId, long categoryId)
        {
            var entity = await _recipeCategoryRespository.FirstOrDefault(x => x.ID == categoryId && x.RecipeId == recipeId);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {recipeId} not found");


            _recipeCategoryRespository.Remove(entity);
            await _recipeCategoryRespository.SaveChangesAsync();

            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == recipeId, includes);

            var nutValue = await GetRecipeNutritionValue(recipeId);

            return await RecipeEntityToResource(recipeEntity, nutValue);

        }

        public async Task<RecipeResource> AddRecipeItem(long recipeId, long itemId, FoodItemModel model)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == recipeId, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {recipeId} not found");
            }

            var foodItemEntity = await _itemRepository.FirstOrDefault(x => x.ID == itemId);

            if (foodItemEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Food Item with ID {recipeId} not found");
            }


            var recipeIngredientEntity = new RecipeIngredientEntity
            {
                FoodItemId = itemId,
                Quantity = model.BaseQuantity,
                UnitId = model.UnitId,
                RecipeId = recipeId,
            };

            _recipeIngredientRespository.Add(recipeIngredientEntity);
            await _recipeIngredientRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(recipeId);

            return await RecipeEntityToResource(recipeEntity, nutValue);


        }

        public async Task<RecipeResource> RemoveRecipeItem(long recipeId, long itemId)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == recipeId, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {recipeId} not found");
            }

            var foodItemEntity = await _itemRepository.FirstOrDefault(x => x.ID == itemId);

            if (foodItemEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Food Item with ID {recipeId} not found");
            }

            var foodRecipeEntity = await _recipeIngredientRespository.FirstOrDefault(x => x.FoodItemId == itemId && x.RecipeId == recipeId);

            _recipeIngredientRespository.Remove(foodRecipeEntity);
            await _recipeIngredientRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(recipeId);

            return await RecipeEntityToResource(recipeEntity, nutValue);


        }

        public async Task<RecipeResource> UpdateRecipeItem(long recipeId, long itemId, FoodItemModel model)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == recipeId, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {recipeId} not found");
            }

            var foodItemEntity = await _itemRepository.FirstOrDefault(x => x.ID == itemId);

            if (foodItemEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Food Item with ID {recipeId} not found");
            }


            var foodRecipeEntity = await _recipeIngredientRespository.FirstOrDefault(x => x.FoodItemId == itemId && x.RecipeId == recipeId);

            if (model.BaseQuantity != 0)
                foodRecipeEntity.Quantity = model.BaseQuantity;

            if (model.UnitId != 0)
                foodRecipeEntity.UnitId = model.UnitId;


            _recipeIngredientRespository.Update(foodRecipeEntity);
            await _recipeIngredientRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(recipeId);

            return await RecipeEntityToResource(recipeEntity, nutValue);


        }

        private async Task<RecipeResource> RecipeEntityToResource(RecipeEntity recipeEntity, NutritionValueResource nutritionValue = null)
        {
            var stepsResources = new List<RecipeStepsResource>();
            var categoriesResources = new List<RecipeCategoryResource>();
            var recipeIngredientResources = new List<RecipeIngredientResource>();

            var resource = new RecipeResource
            {
                CreatedAt = recipeEntity.CreatedAt,
                PreparationTime = recipeEntity.PreparationTime,
                CreatedBy = recipeEntity.CreatedBy,
                Description = recipeEntity.Description,
                ID = recipeEntity.ID,
                Name = recipeEntity.Name,
                UpdatedBy = recipeEntity.UpdatedBy,
                UpdatedOn = recipeEntity.UpdatedOn
            };

            if (nutritionValue != null)
            {
                resource.Protien = nutritionValue.TotalProtein;
                resource.Carbs = nutritionValue.TotalCarbohydrates;
                resource.Fat = nutritionValue.TotalFat;
                resource.Energy = nutritionValue.TotalCalories;

            }

            if (recipeEntity.Steps != null)
                foreach (var step in recipeEntity.Steps)
                {
                    var stepResource = new RecipeStepsResource
                    {
                        ID = step.ID,
                        description = step.description
                    };

                    stepsResources.Add(stepResource);
                }

            if (recipeEntity.RecipeCategoires != null)
                foreach (var category in recipeEntity.RecipeCategoires)
                {
                    var categoryResource = new RecipeCategoryResource
                    {
                        ID = category.ID,
                        Categroy = category.Category
                    };

                    categoriesResources.Add(categoryResource);
                }

            if (recipeEntity.Ingredients != null)
            {
                foreach (var ingredient in recipeEntity.Ingredients)
                {
                    var foodItemEntity = await _itemRepository.FirstOrDefault(x => x.ID == ingredient.FoodItemId, "UnitEntity");

                    var recipeIngredientResource = new RecipeIngredientResource
                    {
                        foodItemId = ingredient.FoodItemId,
                        FoodItemName = foodItemEntity.Name,
                        Quantity = ingredient.Quantity,
                        UnitId = ingredient.UnitId,
                        RecipeId = ingredient.RecipeId

                    };

                    recipeIngredientResources.Add(recipeIngredientResource);
                }
            }

            resource.Ingredients = recipeIngredientResources;
            resource.Steps = stepsResources;
            resource.Categories = categoriesResources;


            return resource;
        }

        public async Task<RecipeResource> AddRecipeStep(long id, string step)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == id, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {id} not found");
            }

            var recipeStepEntity = new RecipeStepsEntity
            {
                description = step,
                RecipeId = id
            };

            _recipeStepsRespository.Add(recipeStepEntity);
            await _recipeStepsRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(id);

            return await RecipeEntityToResource(recipeEntity, nutValue);
        }

        public async Task<RecipeResource> UpdateRecipeStep(long id, long stepdid, string step)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == id, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {id} not found");
            }

            var recipeStepEntity = await _recipeStepsRespository.FirstOrDefault(x => x.ID == stepdid);

            if (recipeStepEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {id} not found");
            }


            recipeStepEntity.description = step;

            _recipeStepsRespository.Update(recipeStepEntity);
            await _recipeStepsRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(id);

            return await RecipeEntityToResource(recipeEntity, nutValue);
        }

        public async Task<RecipeResource> RemvoeRecipeStep(long id, long stepdId)
        {
            var recipeEntity = await _repository.FirstOrDefault(x => x.ID == id, includes);

            if (recipeEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {id} not found");
            }

            var recipeStepEntity = await _recipeStepsRespository.FirstOrDefault(x => x.ID == stepdId);

            if (recipeStepEntity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Recipe category with ID {id} not found");
            }


            _recipeStepsRespository.Remove(recipeStepEntity);
            await _recipeStepsRespository.SaveChangesAsync();

            var nutValue = await GetRecipeNutritionValue(id);

            return await RecipeEntityToResource(recipeEntity, nutValue);
        }
    }
}
