using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using BeHealth.Business.Resources.FoodManamgnet.Nutrition;
using BeHealth.Business.Resources.Settings;
using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface IItemManager
    {
        Task<IEnumerable<FoodItemResource>> GetAllItems(string name);

        Task<FoodItemResource> GetItemById(long id);

        Task<FoodItemResource> CreateNewItem(FoodItemModel model);

        Task<FoodItemResource> UpdateItem(long id, FoodItemModel model);

        Task<bool> DeleteItem(long id);


        //Task<bool> UpdateItemCategoires(long item, IList<long> categoriesIds);

    }

    public class ItemManager : IItemManager
    {
        private readonly IRepository<FoodItemEntity> _itemRepository;
        private readonly IMapper _mapper;

        public ItemManager(
            IRepository<FoodItemEntity> itemRepository,
            IMapper mapper
            )
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FoodItemResource>> GetAllItems(string name)
        {
            Expression<Func<FoodItemEntity, bool>> predicate = null;

            if (!string.IsNullOrEmpty(name))
                predicate = x => x.Name.Contains(name);

            var entities = await _itemRepository.GetAllAsync(predicate, null, "UnitEntity");

            IList<FoodItemResource> resources = new List<FoodItemResource>();

            foreach (var entity in entities)
            {

                resources.Add(EntityToResource(entity));
            }

            return resources;
        }

        public async Task<FoodItemResource> GetItemById(long id)
        {
            var entity = await _itemRepository.FirstOrDefault(x => x.ID == id, "UnitEntity");

            var resource = _mapper.Map<FoodItemResource>(entity);

            return resource;
        }


        public async Task<FoodItemResource> CreateNewItem(FoodItemModel model)
        {
            var entity = new FoodItemEntity
            {
                Fat = model.Fat,
                Group = model.Group,
                Name = model.Name,
                BaseQuantity = model.BaseQuantity,
                Calories = model.Calories,
                Carbohydrates = model.Carbohydrates,
                CreatedAt = DateTime.Now,
                CreatedBy = "Develoepr",
                Protein = model.Protein,
                UnitId = model.UnitId,

            };


            var createdItem = _itemRepository.Add(entity);
            await _itemRepository.SaveChangesAsync();

            var entityReturn = await _itemRepository.FirstOrDefault(item => item.ID == createdItem.ID, "UnitEntity");


            return EntityToResource(entityReturn);
        }

        public async Task<FoodItemResource> UpdateItem(long id, FoodItemModel model)
        {
            var entity = await _itemRepository.FirstOrDefault(item => item.ID == id, "UnitEntity");

            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Item with ID {id} not found");
            }

            entity.Name = model.Name;

            entity.Group = model.Group;

            entity.Protein = model.Protein;
            entity.Fat = model.Fat;
            entity.Calories = model.Calories;
            entity.BaseQuantity = model.BaseQuantity;
            entity.Carbohydrates = model.Carbohydrates;

            entity.UnitId = model.UnitId;

            _itemRepository.Update(entity);
            await _itemRepository.SaveChangesAsync();

            var entityReturn = await _itemRepository.FirstOrDefault(item => item.ID == id, "UnitEntity");

            return EntityToResource(entityReturn);
        }

        public async Task<bool> DeleteItem(long id)
        {
            var entity = await _itemRepository.FirstOrDefault(item => item.ID == id);


            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.NotFound, $"Item with ID {id} not found");
            }

            _itemRepository.Remove(entity);
            await _itemRepository.SaveChangesAsync();

            return true;
        }



        //public async Task<bool> UpdateItemCategoires(long itemId, IList<long> categoriesIds)
        //{
        //    var entities = _categoriesItemsRepository.GetAll(x => x.ItemId == itemId);

        //    foreach (var entitiy in entities)
        //    {
        //        _categoriesItemsRepository.Remove(entitiy);
        //    }

        //    await _categoriesItemsRepository.SaveChangesAsync();

        //    await AttachItemCategories(itemId, categoriesIds);

        //    return true;
        //}


        public FoodItemResource EntityToResource(FoodItemEntity entity)
        {

            var resource = new FoodItemResource
            {
                ID = entity.ID,
                Name = entity.Name,
                Group = entity.Group,
                BaseQuantity = entity.BaseQuantity,
                Calories = entity.Calories,
                Carbohydrates = entity.Carbohydrates,
                Fat = entity.Fat,
                Protein = entity.Protein,
                Unit = new UnitResource
                {
                    ID = entity.UnitEntity.ID,
                    Code = entity.UnitEntity.Code,
                    GramsRatio = entity.UnitEntity.GramsRatio,
                    IsLiquid = entity.UnitEntity.IsLiquid,

                }
            };

            return resource;
        }
    }
}
