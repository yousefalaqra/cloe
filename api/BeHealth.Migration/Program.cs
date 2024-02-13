using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Nutrition;
using IronXL;
using Newtonsoft.Json;

namespace BeHealth.Migration
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            var file = @"C:\dev\jointech\docs\items.xlsx";
            await GetDataTableFromExcel(file);

            Console.ReadLine();
        }

        private static async Task GetDataTableFromExcel(string path, bool hasHeader = true)
        {
            WorkBook wb = WorkBook.Load(path);
            WorkSheet ws = wb.GetWorkSheet("Sheet1");
            //colmus 0-10

            int successfulRecords = 0;
            int faildRecords = 0;
            for (int i = 1; i <= 100; i++)
            {
                var itemRow = ws.Rows[i].ToList();
                string itemNameTobeInserted = itemRow[2].ToString();
                try
                {
                    double fat = double.Parse(itemRow[9].ToString());
                    double carbs = double.Parse(itemRow[8].ToString());
                    double protien = double.Parse(itemRow[7].ToString());
                    double calories = double.Parse(string.Format("{0:0.00}", (fat * 9) + (carbs * 4) + (protien * 4)));
                    

                    string unitEN = itemRow[6].ToString();
                    string unitAR = "";
                    switch (unitEN)
                    {
                        case "gram":
                            unitAR = "غرام";
                            break;

                        case "cup":
                            unitAR = "كوب";
                            break;

                        case "spoon":
                            unitAR = "ملعقة";
                            break;

                        case "ml":
                            unitAR = "مل";
                            break;

                        case "oz":
                            unitAR = "أوز";
                            break;

                        case "piece":
                            unitAR = "قطعة";
                            break;

                        default:
                            break;
                    }

                    var categories = itemRow[4].ToString();
                    IList<long> categoriesIds = new List<long>();
                    foreach (var categoryId in categories.Split("."))
                    {
                        categoriesIds.Add(long.Parse(categoryId));
                    }


                    var itemNutritionalValue = new NutritionValueModel
                    {
                        BaseQuantity = double.Parse(itemRow[5].ToString()),
                        Calories = calories,
                        Carbohydrates = carbs,
                        Fat = fat,
                        Protein = protien,
                        UnitId = 1
                    };

                    var itemModel = new FoodItemModel
                    {
                        Name = itemRow[2].ToString(),
                        Note = itemRow[11].ToString(),


                    };

                    string json = JsonConvert.SerializeObject(itemModel);


                    var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync("https://behealthapi.azurewebsites.net/api/Item", httpContent);
                    if (response.StatusCode == HttpStatusCode.Created)
                    {
                        ++successfulRecords;
                        Console.WriteLine($"Item with naem {itemNameTobeInserted}, has been inserted successfuly!");
                    }
                }
                catch (Exception ex)
                {

                    Console.WriteLine($"faild to insert record with name {itemNameTobeInserted} because: {ex.Message}");
                    ++faildRecords;
                }

                Console.WriteLine("==========================================");
                Console.WriteLine($"Number of inserted records: {successfulRecords}");
                Console.WriteLine($"Number of faild records: {faildRecords}");
                Console.WriteLine("==========================================");

            }
        }
    }
}
