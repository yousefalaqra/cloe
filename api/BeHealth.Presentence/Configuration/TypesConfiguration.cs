using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BeHealth.Presentence.Configuration
{
    public class TypesConfiguration
    {
        public TypesConfiguration(EntityTypeBuilder<TypesEntity> entity)
        {
            entity
                .HasIndex(type => new { type.Type })
                .IsUnique();

            entity.HasData(
                new TypesEntity { ID = 1, Type = "Breakfast", TypeCategory = CategoriesEnum.Meal },
                new TypesEntity { ID = 2, Type = "Lunch", TypeCategory = CategoriesEnum.Meal },
                new TypesEntity { ID = 3, Type = "Dinner", TypeCategory = CategoriesEnum.Meal },
                new TypesEntity { ID = 4, Type = "Snack", TypeCategory = CategoriesEnum.Meal },

                new TypesEntity { ID = 5, Type = "Vegetables", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 6, Type = "Legumes", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 7, Type = "Fruit", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 8, Type = "Grain", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 9, Type = "Starchy", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 10, Type = "Dairy", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 11, Type = "Protein", TypeCategory = CategoriesEnum.Item },
                new TypesEntity { ID = 12, Type = "Fat", TypeCategory = CategoriesEnum.Item }
                );
        }
    }
}
