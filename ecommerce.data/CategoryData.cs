using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ecommerce.data.Models;
using Microsoft.Data.SqlClient;

namespace ecommerce.data
{
    public class CategoryData
    {
        public static List<Category>? GetAllCategories()
        {
            var CategoryFromDB = new Category();
            var Categories = new List<Category>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetAllCategories", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                CategoryFromDB = new Category
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                };

                                Categories.Add(CategoryFromDB);
                            };
                        }
                    }

                    return Categories;

                }
            }
            catch
            {
                return null;
            }
        }

    }
}