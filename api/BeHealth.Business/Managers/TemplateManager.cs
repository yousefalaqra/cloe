using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models.DietPlan;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Meals;
using BeHealth.Business.Models.FoodManamgnet.Templates;
using BeHealth.Business.Resources.DietPlan;
using BeHealth.Business.Resources.FoodManamgnet.Meals;
using BeHealth.Business.Resources.FoodManamgnet.Templates;
using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Meals;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface ITemplateManager
    {
        Task<List<TemplateResource>> GetAllTemplate(string key, bool clientId);
        Task<TemplateResource> GetDietByID(long id);

        Task<TemplateResource> CreateNewTemplate(TemplateModel model);

        Task<TemplateResource> UpdateTemplate(long id, TemplateModel model);

        Task<bool> RemoveTemplate(long id);

        Task AddTemplatePlan(long id, PlanModel planModel);

        Task<MealResource> AddPlanMeal(long planId, MealsModel model);

        Task<bool> UpdatePlanMeal(long mealId, MealsModel model);

        Task<bool> DeletePlanMeal(long mealId);

        Task<MealResource> AddMealRecipe(long mealId, long recipeId, RecipeModel model);
        Task<MealResource> DeleteMealRecipe(long mealId, long recipeId);

        Task<MealResource> AddMealFoodItem(long mealId, long foodItemId, FoodItemModel model);

        Task<MealResource> DeleteMealFoodItem(long mealId, long foodItemId);
        Task<MealResource> UpdateMealFoodItem(long mealId, long foodItemId, FoodItemModel model);

        Task<NutritionValueResource> GetNutritionValue(long templateId);

    }

    public class TemplateManager : ITemplateManager
    {
        private readonly IMapper _mapper;
        private readonly IRepository<TemplateEntity> _repository;
        private readonly IRepository<PlanEntity> _planRepository;
        private readonly IRepository<MealEntity> _mealRepository;
        private readonly IRepository<RecipeEntity> _recipeRepository;
        private readonly IRepository<MealRecipeEntity> _mealRecipeRepository;
        private readonly IRepository<FoodItemEntity> _foodItemRepository;
        private readonly IRepository<MealItemEntity> _mealItemRepository;

        public TemplateManager(
            IMapper mapper,
            IRepository<TemplateEntity> repository,
            IRepository<PlanEntity> planRepository,
            IRepository<MealEntity> mealRepository,
            IRepository<RecipeEntity> recipeRepository,
            IRepository<MealRecipeEntity> mealRecipeRepository,
            IRepository<FoodItemEntity> foodItemRepository,
            IRepository<MealItemEntity> mealItemRepository

            )
        {
            _mapper = mapper;
            _repository = repository;
            _planRepository = planRepository;
            _mealRepository = mealRepository;
            _recipeRepository = recipeRepository;
            _mealRecipeRepository = mealRecipeRepository;
            _foodItemRepository = foodItemRepository;
            _mealItemRepository = mealItemRepository;
        }

        public async Task<TemplateResource> CreateNewTemplate(TemplateModel model)
        {
            var entity = new TemplateEntity
            {
                CreatedBy = "Jo Aqra",
                Name = model.Name,
                UpdatedOn = DateTime.Now,
                CreatedAt = DateTime.Now,
                ClientId = model.ClientId
            };

            _repository.Add(entity);
            await _repository.SaveChangesAsync();

            foreach (var plan in model.Plans)
            {
                await AddTemplatePlan(entity.ID, plan);

            }

            return await EntityToResource(entity);
        }



        public async Task<List<TemplateResource>> GetAllTemplate(string key, bool clientId)
        {
            Expression<Func<TemplateEntity, bool>> predicate = null;

            if (!string.IsNullOrEmpty(key))
            {

                predicate = x => x.Name.Contains(key) && x.ClientId == null;
            }
            else
            {
                predicate = x => x.ClientId == null;
            }

            var entities = await _repository.GetAllAsync(predicate);

            var result = new List<TemplateResource>();

            foreach (var entity in entities)
            {
                result.Add(await EntityToResource(entity));
            }

            return result;
        }

        public async Task<TemplateResource> GetDietByID(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Template with ID {id} not found");


            return await EntityToResource(entity);

        }

        public async Task<TemplateResource> UpdateTemplate(long id, TemplateModel model)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Template with ID {id} not found");

            if (!string.IsNullOrEmpty(model.Name))
                entity.Name = model.Name;

            entity.UpdatedOn = DateTime.Now;

            _repository.Update(entity);
            await _repository.SaveChangesAsync();

            return await EntityToResource(entity);

        }

        public async Task<bool> RemoveTemplate(long id)
        {
            var entity = await _repository.FirstOrDefault(x => x.ID == id);

            if (entity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Template with ID {id} not found");

            _repository.Remove(entity);
            await _repository.SaveChangesAsync();

            return true;

        }


        public async Task AddTemplatePlan(long id, PlanModel planModel)
        {
            var days = new List<DayEntity>();
            var meals = new List<MealEntity>();

            foreach (var day in planModel.Days)
            {
                days.Add(new DayEntity { Day = day });
            }

            foreach (var meal in planModel.Meals)
            {
                meals.Add(
                    new MealEntity { Name = meal.Name, Time = meal.Time }
                    );
            }

            var planEntity = new PlanEntity
            {
                Days = days,
                MealsEntities = meals,
                TemplateId = id
            };

            _planRepository.Add(planEntity);
            await _planRepository.SaveChangesAsync();
        }

        private async Task<TemplateResource> EntityToResource(TemplateEntity entity)
        {
            var plans = new List<PlanResource>();

            var plansEntities = await _planRepository.GetAllAsync(x => x.TemplateId == entity.ID, null, "Days,MealsEntities");


            foreach (var plan in plansEntities)
            {
                var meals = new List<MealResource>();
                var days = new List<DayResource>();
                foreach (var mealEntity in plan.MealsEntities)
                {

                    meals.Add(await MealEntityToResource(mealEntity));
                }

                foreach (var dayEntity in plan.Days)
                {
                    var dayResource = new DayResource
                    {
                        ID = dayEntity.ID,
                        Day = dayEntity.Day
                    };

                    days.Add(dayResource);

                }

                plans.Add(new PlanResource
                {
                    ID = plan.ID,
                    Days = days,
                    Meals = meals
                });

            }


            var resource = new TemplateResource
            {
                Carbs = 10,
                CreatedAt = entity.CreatedAt,
                CreatedBy = entity.CreatedBy,
                Energy = 20,
                Fat = 5,
                ID = entity.ID,
                Name = entity.Name,
                Protien = 1,
                UpdatedBy = entity.UpdatedBy,
                UpdatedOn = entity.UpdatedOn,
                Plans = plans
            };

            return resource;
        }

        public async Task<MealResource> AddPlanMeal(long planId, MealsModel model)
        {

            var planEntity = await _planRepository.FirstOrDefault(x => x.ID == planId);

            if (planEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {planId} not found");

            var mealEntity = new MealEntity
            {
                Name = model.Name,
                PlanId = planEntity.ID,
                Time = model.Time
            };

            _mealRepository.Add(mealEntity);
            await _mealRepository.SaveChangesAsync();

            return new MealResource { ID = mealEntity.ID, Name = mealEntity.Name, Time = mealEntity.Time };
        }

        public async Task<bool> UpdatePlanMeal(long mealId, MealsModel model)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");

            mealEntity.Name = model.Name;
            mealEntity.Time = model.Time;

            _mealRepository.Update(mealEntity);
            await _mealRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletePlanMeal(long mealId)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");

            _mealRepository.Remove(mealEntity);
            await _mealRepository.SaveChangesAsync();

            return true;
        }

        public async Task<MealResource> AddMealRecipe(long mealId, long recipeId, RecipeModel model)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");


            var recipeEntity = await _recipeRepository.FirstOrDefault(x => x.ID == recipeId);

            if (recipeEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"recipeEntity with ID {recipeId} not found");


            var recipeMealEntity = new MealRecipeEntity
            {
                MealId = mealId,
                RecipeId = recipeId,
                Name = model.Name
            };

            _mealRecipeRepository.Add(recipeMealEntity);
            await _mealRecipeRepository.SaveChangesAsync();

            return await MealEntityToResource(mealEntity);

        }

        public async Task<MealResource> DeleteMealRecipe(long mealId, long recipeId)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");


            var recipeEntity = await _recipeRepository.FirstOrDefault(x => x.ID == recipeId);

            if (recipeEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"recipeEntity with ID {recipeId} not found");

            var recipeMealEntity = await _mealRecipeRepository.FirstOrDefault(x => x.MealId == mealId && x.RecipeId == recipeId);

            _mealRecipeRepository.Remove(recipeMealEntity);
            await _mealRecipeRepository.SaveChangesAsync();

            return await MealEntityToResource(mealEntity);

        }

        private async Task<MealResource> MealEntityToResource(MealEntity entity)
        {
            var includeMealEntity = await _mealRepository.FirstOrDefault(x => x.ID == entity.ID, "Recipes,Items");
            var mealRecipeResource = new List<RecipeResource>();
            var itemResources = new List<MealFoodItemResource>();

            double mealTotalFat = 0;
            double mealTotalEnergy = 0;
            double mealTotalProtien = 0;
            double mealTotalCarbs = 0;

            foreach (var mealRecipe in includeMealEntity.Recipes)
            {
                var recipeEntity = await _recipeRepository.FirstOrDefault(x => x.ID == mealRecipe.RecipeId, "Ingredients");
                var recipeResource = new RecipeResource { ID = recipeEntity.ID, Name = recipeEntity.Name };

                mealRecipeResource.Add(recipeResource);

                foreach (var ingredient in recipeEntity.Ingredients)
                {
                    var foodItemEntity = await _foodItemRepository.FirstOrDefault(x => x.ID == ingredient.FoodItemId);

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

                    mealTotalEnergy += newEnergy;
                    mealTotalCarbs += newCarbs;
                    mealTotalFat += newFat;
                    mealTotalProtien += newProtien;

                }
            }

            foreach (var item in includeMealEntity.Items)
            {
                var foodItemEntity = await _foodItemRepository.FirstOrDefault(x => x.ID == item.ItemId);

                var baseQunatity = foodItemEntity.BaseQuantity;
                var newQuantity = item.Quantity;

                var baseEnergy = foodItemEntity.Calories;
                var baseFat = foodItemEntity.Fat;
                var baseCarbs = foodItemEntity.Carbohydrates;
                var baseProtien = foodItemEntity.Protein;

                var newEnergy = (newQuantity * baseEnergy) / baseQunatity;
                var newFat = (newQuantity * baseFat) / baseQunatity;
                var newCarbs = (newQuantity * baseCarbs) / baseQunatity;
                var newProtien = (newQuantity * baseProtien) / baseQunatity;

                mealTotalEnergy += newEnergy;
                mealTotalCarbs += newCarbs;
                mealTotalFat += newFat;
                mealTotalProtien += newProtien;


                var mealIemResource = new MealFoodItemResource
                {
                    foodItemId = item.ItemId,
                    FoodItemName = item.Name,
                    Quantity = item.Quantity,
                    MealId = item.MealId,
                    UnitId = item.UnitId,
                };

                itemResources.Add(mealIemResource);
            }

            var mealResource = new MealResource
            {
                ID = entity.ID,
                Name = entity.Name,
                Time = entity.Time,
                Recipes = mealRecipeResource,
                Items = itemResources,
                Carbs = mealTotalCarbs,
                Energy = mealTotalEnergy,
                Fat = mealTotalFat,
                Protien = mealTotalProtien
            };

            return mealResource;
        }

        public async Task<MealResource> AddMealFoodItem(long mealId, long foodItemId, FoodItemModel model)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");


            var itemEntity = await _foodItemRepository.FirstOrDefault(x => x.ID == foodItemId);

            if (itemEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"recipeEntity with ID {foodItemId} not found");

            var mealItemEntity = new MealItemEntity
            {
                ItemId = foodItemId,
                MealId = mealId,
                Name = model.Name,
                Quantity = model.BaseQuantity,
                UnitId = model.UnitId
            };

            _mealItemRepository.Add(mealItemEntity);
            await _mealItemRepository.SaveChangesAsync();

            return await MealEntityToResource(mealEntity);
        }

        public async Task<MealResource> DeleteMealFoodItem(long mealId, long foodItemId)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");


            var itemEntity = await _foodItemRepository.FirstOrDefault(x => x.ID == foodItemId);

            if (itemEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"recipeEntity with ID {foodItemId} not found");

            var mealItemEntity = await _mealItemRepository.FirstOrDefault(x => x.ItemId == foodItemId && x.MealId == mealId);

            if (mealItemEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"mealItemEntity not found");

            _mealItemRepository.Remove(mealItemEntity);
            await _mealItemRepository.SaveChangesAsync();

            return await MealEntityToResource(mealEntity);

        }

        public async Task<MealResource> UpdateMealFoodItem(long mealId, long foodItemId, FoodItemModel model)
        {
            var mealEntity = await _mealRepository.FirstOrDefault(x => x.ID == mealId);

            if (mealEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Plan with ID {mealId} not found");


            var itemEntity = await _foodItemRepository.FirstOrDefault(x => x.ID == foodItemId);

            if (itemEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"recipeEntity with ID {foodItemId} not found");

            var mealItemEntity = await _mealItemRepository.FirstOrDefault(x => x.ItemId == foodItemId && x.MealId == mealId);

            if (mealItemEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"mealItemEntity not found");

            mealItemEntity.Quantity = model.BaseQuantity;
            mealItemEntity.UnitId = model.UnitId;

            _mealItemRepository.Update(mealItemEntity);
            await _mealItemRepository.SaveChangesAsync();

            return await MealEntityToResource(mealEntity);
        }

        public async Task<NutritionValueResource> GetNutritionValue(long templateId)
        {
            var templateEntity = await _repository.FirstOrDefault(x => x.ID == templateId, "TemplatePlansEntities");

            if (templateEntity == null)
                throw new HttpStatusException(HttpStatusCode.NotFound, $"templateEntity with ID {templateId} not found");

            var result = new NutritionValueResource();

            var plansEntities = await _planRepository.GetAllAsync(x => x.TemplateId == templateId, null, "MealsEntities");

            foreach (var planEntity in plansEntities)
            {
                foreach (var mealEntity in planEntity.MealsEntities)
                {
                    var mealResource = await MealEntityToResource(mealEntity);

                    result.TotalCalories += mealResource.Energy;
                    result.TotalCarbohydrates += mealResource.Carbs;
                    result.TotalFat += mealResource.Fat;
                    result.TotalProtein += mealResource.Protien;
                }
            }

            return result;
        }
    }
}
