using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Settings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Presentence.Respositories
{
    public interface IItemRepository
    {
        Task<List<FoodItemEntity>> GetAllAsync(Expression<Func<FoodItemEntity, bool>> predicate = null);


        ValueTask<FoodItemEntity> GetItemById(long itemId);

        Task<FoodItemEntity> FirstOrDefaultAsync(Expression<Func<FoodItemEntity, bool>> filter);

        FoodItemEntity AddItem(FoodItemEntity itemEntity);


        void UpdateItem(FoodItemEntity itemEntity);

        void RemoveItem(FoodItemEntity itemEntity);


        Task<int> SaveChangesAsync();
    }
    public class ItemRepository : IItemRepository
    {
        private readonly BeHealthDBContext _context;
        public ItemRepository(BeHealthDBContext context)
        {
            _context = context;
        }
        public Task<List<FoodItemEntity>> GetAllAsync(Expression<Func<FoodItemEntity, bool>> predicate = null)
        {
            var items = _context.FoodItems.AsQueryable();

            if (predicate != null)
               items =  items.Where(predicate);

            items.Include(x => x.UnitEntity);

           items =  items
                .OrderBy(item => item.Calories);

            return items.ToListAsync();
        }
        public ValueTask<FoodItemEntity> GetItemById(long itemId)
        {
            return _context.FoodItems.FindAsync(itemId);
        }

        public Task<FoodItemEntity> FirstOrDefaultAsync(Expression<Func<FoodItemEntity, bool>> filter)
        {
            return _context.FoodItems
                .FirstOrDefaultAsync(filter);
        }

        public FoodItemEntity AddItem(FoodItemEntity itemEntity)
        {
            _context.FoodItems.Add(itemEntity);
            return itemEntity;
        }


        public void UpdateItem(FoodItemEntity itemEntity)
        {
            _context.FoodItems.Update(itemEntity);
        }

        public void RemoveItem(FoodItemEntity itemEntity)
        {
            _context.FoodItems.Remove(itemEntity);
        }


        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
