using System.Globalization;
using ecommerce.data.Models;
using System.Data;
using Microsoft.Data.SqlClient;
using System.ComponentModel;

namespace ecommerce.data
{
    public class ProductData
    {
        public static int? GetMaxProductsCount()
        {

            int? MaxProductsCount = null;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetMaxProductsCount", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                MaxProductsCount = reader.GetInt32(reader.GetOrdinal("MaxProductsCount"));
                            }
                            ;
                        }
                    }

                    return MaxProductsCount;

                }
            }
            catch
            {
                return null;
            }

        }
        public static List<Product>? GetAllProducts()
        {
            var ProductFromDB = new Product();
            var Products = new List<Product>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetAllProducts", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                short? ratingForProduct = null;

                                if (reader["Rating"] != DBNull.Value)
                                {
                                    ratingForProduct = (short)reader["Rating"];
                                }

                                ProductFromDB = new Product
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                                    CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Rating = ratingForProduct,
                                    Comments = new List<Comment>(),
                                    Images = new List<Image>()
                                };

                                Products.Add(ProductFromDB);
                            };
                        }

                        if (Products.Count != 0)
                        {
                            for (int i = 0; i < Products.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetProductImagesByProductId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@ProductId", Products[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Products[i].Images?.Add(
                                                    new Image
                                                    {
                                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                        ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                                                    }
                                                );
                                        };
                                    }
                                }
                            }

                            for (int i = 0; i < Products.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetProductCommentsByProductId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@ProductId", Products[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Products[i].Comments?.Add(
                                                    new Comment
                                                    {
                                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                        CommentContent = reader.GetString(reader.GetOrdinal("CommentContent")),
                                                        CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                                        CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                                        ProductId = reader.GetInt32(reader.GetOrdinal("ProductId"))
                                                    }
                                                );
                                        };
                                    }
                                }
                            }
                        }
                    }

                    return Products;

                }
            }
            catch
            {
                return null;
            }
        }

        public static Product? GetProductById(int Id)
        {
            var ProductFromDB = new Product { Id = 0 };

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetProductById", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                short? ratingForProduct = null;

                                if (reader["Rating"] != DBNull.Value)
                                {
                                    ratingForProduct = (short)reader["Rating"];
                                }

                                ProductFromDB = new Product
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                                    CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Rating = ratingForProduct,
                                    Comments = new List<Comment>(),
                                    Images = new List<Image>()
                                };
                            };
                        }

                        if (ProductFromDB.Id != 0)
                        {
                            using (SqlCommand cmd2 = new SqlCommand("SP_GetProductImagesByProductId", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@ProductId", ProductFromDB.Id);

                                using (var reader = cmd2.ExecuteReader())
                                {

                                    while (reader.Read())
                                    {
                                        ProductFromDB.Images?.Add(
                                                new Image
                                                {
                                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                                                }
                                            );
                                    };
                                }
                            }

                            using (SqlCommand cmd2 = new SqlCommand("SP_GetProductCommentsByProductId", conn))
                            {
                                cmd2.CommandType = CommandType.StoredProcedure;
                                cmd2.Parameters.AddWithValue("@ProductId", ProductFromDB.Id);

                                using (var reader = cmd2.ExecuteReader())
                                {

                                    while (reader.Read())
                                    {
                                        ProductFromDB.Comments?.Add(
                                                new Comment
                                                {
                                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                    CommentContent = reader.GetString(reader.GetOrdinal("CommentContent")),
                                                    CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                                    ProductId = reader.GetInt32(reader.GetOrdinal("ProductId"))
                                                }
                                            );
                                    };
                                }
                            }

                            return ProductFromDB;

                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch
            {
                return null;
            }
        }

        public static List<Rating>? GetProductRatingsByProductId(int Id)
        {
            var RatingFromDB = new Rating { Id = 0 };
            var RatingsList = new List<Rating>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetProductRatingsByProductId", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProductId", Id);

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                RatingFromDB = new Rating
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    RatingContent = reader.GetInt16(reader.GetOrdinal("RatingContent")),
                                    ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                                    CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                };

                                RatingsList.Add(RatingFromDB);
                            };
                        }

                    }

                    return RatingsList;
                }
            }
            catch
            {
                return null;
            }
        }

        public static List<Product>? GetProductsByFiltersByPage(ProductsFilter filter)
        {
            var ProductFromDB = new Product();
            var Products = new List<Product>();


            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    SqlCommand SP_GetProductsByFilterByCategoryIdByRatingByPage_Command = new SqlCommand("SP_GetProductsByFilterByCategoryIdByRatingByPage", conn);
                    SqlCommand SP_GetProductsByFilterByCategoryIdWithoutRatingByPage_Command = new SqlCommand("SP_GetProductsByFilterByCategoryIdWithoutRatingByPage", conn);
                    SqlCommand SP_GetProductsByFilterWithoutCategoryIdByRatingByPage_Command = new SqlCommand("SP_GetProductsByFilterWithoutCategoryIdByRatingByPage", conn);
                    SqlCommand SP_GetProductsByFilterWithoutCategoryIdWithoutRatingByPage_Command = new SqlCommand("SP_GetProductsByFilterWithoutCategoryIdWithoutRatingByPage", conn);

                    SqlCommand cmd;

                    if (filter.CategoryId == null)
                    {
                        if (filter.MinRating == null && filter.MaxRating == null)
                        {
                            cmd = SP_GetProductsByFilterWithoutCategoryIdWithoutRatingByPage_Command;
                        }
                        else
                        {
                            cmd = SP_GetProductsByFilterWithoutCategoryIdByRatingByPage_Command;
                        }
                    }
                    else
                    {
                        if (filter.MinRating == null && filter.MaxRating == null)
                        {
                            cmd = SP_GetProductsByFilterByCategoryIdWithoutRatingByPage_Command;
                        }
                        else
                        {
                            cmd = SP_GetProductsByFilterByCategoryIdByRatingByPage_Command;
                        }
                    }

                    using (cmd)
                    {
                        cmd.CommandType = CommandType.StoredProcedure;


                        if (filter.CategoryId == null)
                        {
                            if (filter.MinRating == null || filter.MaxRating == null)
                            { }
                            else
                            {
                                cmd.Parameters.AddWithValue("@MinRating", filter.MinRating);
                                cmd.Parameters.AddWithValue("@MaxRating", filter.MaxRating);
                            }
                        }
                        else
                        {
                            if (filter.MinRating == null || filter.MaxRating == null)
                            {
                                cmd.Parameters.AddWithValue("@CategoryId", filter.CategoryId);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@CategoryId", filter.CategoryId);
                                cmd.Parameters.AddWithValue("@MinRating", filter.MinRating);
                                cmd.Parameters.AddWithValue("@MaxRating", filter.MaxRating);
                            }
                        }

                        if (filter.Search == null)
                        {
                            cmd.Parameters.AddWithValue("@Search", "");
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@Search", filter.Search);
                        }


                        if (filter.MinPrice == null || filter.MaxPrice == null)
                        {
                            cmd.Parameters.AddWithValue("@MinPrice", 0);
                            cmd.Parameters.AddWithValue("@MaxPrice", int.MaxValue);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@MinPrice", filter.MinPrice);
                            cmd.Parameters.AddWithValue("@MaxPrice", filter.MaxPrice);
                        }

                        if (filter.PageNumber == null || filter.PageSize == null)
                        {
                            cmd.Parameters.AddWithValue("@PageNumber", 1);
                            cmd.Parameters.AddWithValue("@PageSize", 10);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@PageNumber", filter.PageNumber);
                            cmd.Parameters.AddWithValue("@PageSize", filter.PageSize);
                        }


                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                short? ratingForProduct = null;

                                if (reader["Rating"] != DBNull.Value)
                                {
                                    ratingForProduct = (short)reader["Rating"];
                                }

                                ProductFromDB = new Product
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Description = reader.GetString(reader.GetOrdinal("Description")),
                                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                                    CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                    CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Rating = ratingForProduct,
                                    Comments = new List<Comment>(),
                                    Images = new List<Image>()
                                };

                                Products.Add(ProductFromDB);
                            };
                        }

                        if (Products.Count != 0)
                        {
                            for (int i = 0; i < Products.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetProductImagesByProductId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@ProductId", Products[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Products[i].Images?.Add(
                                                    new Image
                                                    {
                                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                        ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
                                                    }
                                                );
                                        };
                                    }
                                }
                            }

                            for (int i = 0; i < Products.Count; i++)
                            {
                                using (SqlCommand cmd2 = new SqlCommand("SP_GetProductCommentsByProductId", conn))
                                {
                                    cmd2.CommandType = CommandType.StoredProcedure;
                                    cmd2.Parameters.AddWithValue("@ProductId", Products[i].Id);

                                    using (var reader = cmd2.ExecuteReader())
                                    {

                                        while (reader.Read())
                                        {
                                            Products[i].Comments?.Add(
                                                    new Comment
                                                    {
                                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                                        CommentContent = reader.GetString(reader.GetOrdinal("CommentContent")),
                                                        CreatedByUserId = reader.GetInt32(reader.GetOrdinal("CreatedByUserId")),
                                                        CreatedOn = reader.GetDateTime(reader.GetOrdinal("CreatedOn")),
                                                        ProductId = reader.GetInt32(reader.GetOrdinal("ProductId"))
                                                    }
                                                );
                                        };
                                    }
                                }
                            }
                        }
                    }

                    return Products;

                }
            }
            catch
            {
                return null;
            }
        }

        public static int AddCommentToProduct(CommentAddDTO commentAddDTO)
        {
            int RowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AddCommentToProduct", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@CommentContent", commentAddDTO.CommentContent);
                        cmd.Parameters.AddWithValue("@CreatedByUserId", commentAddDTO.CreatedByUserId);
                        cmd.Parameters.AddWithValue("@ProductId", commentAddDTO.ProductId);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }
        public static int DeleteComment(int id)
        {
            int RowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DeleteComment", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", id);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }

        public static int AddRatingToProduct(RatingAddDTO ratingAddDTO)
        {
            int RowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AddRatingToProduct", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@RatingContent", ratingAddDTO.RatingContent);
                        cmd.Parameters.AddWithValue("@CreatedByUserId", ratingAddDTO.CreatedByUserId);
                        cmd.Parameters.AddWithValue("@ProductId", ratingAddDTO.ProductId);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }
        public static int DeleteRating(int id)
        {
            int RowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DeleteRating", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", id);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }

        public static int UpdateRatingForProduct(int productId)
        {
            int RowsAffected = 0;

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateRatingForProduct", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ProductId", productId);

                        conn.Open();

                        RowsAffected = cmd.ExecuteNonQuery();
                    }
                }

                return RowsAffected;
            }
            catch
            {
                return 0;
            }
        }


        // public static int AddProduct(ProductAddDTO productAddDTO)
        // {
        //     int NewProductId = 0;

        //     try
        //     {
        //         using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
        //         {
        //             using (SqlCommand cmd = new SqlCommand("SP_AddProduct", conn))
        //             {
        //                 cmd.CommandType = CommandType.StoredProcedure;
        //                 cmd.Parameters.AddWithValue("@Title", productAddDTO.Title);
        //                 cmd.Parameters.AddWithValue("@Description", productAddDTO.Description);
        //                 cmd.Parameters.AddWithValue("@Price", productAddDTO.Price);
        //                 cmd.Parameters.AddWithValue("@CreatedByUserId", productAddDTO.CreatedByUserId);
        //                 cmd.Parameters.AddWithValue("@CategoryId", productAddDTO.CategoryId);

        //                 conn.Open();

        //                 using (SqlDataReader reader = cmd.ExecuteReader())
        //                 {
        //                     if (reader.Read())
        //                     {
        //                         NewProductId = reader.GetInt32(reader.GetOrdinal("Id"));
        //                     }
        //                 }
        //             }

        //             if (NewProductId > 0)
        //             {
        //                 if (productAddDTO.Images != null)
        //                 {
        //                     if (productAddDTO.Images.Count > 0)
        //                     {
        //                         List<int> ImagesIds = [];

        //                         for (int i = 0; i < productAddDTO.Images.Count; i++)
        //                         {
        //                             using (SqlCommand cmd2 = new SqlCommand("SP_AddImage", conn))
        //                             {
        //                                 cmd2.Parameters.AddWithValue("@ImageUrl", productAddDTO.Images[i].ImageUrl);

        //                                 using (SqlDataReader reader2 = cmd2.ExecuteReader())
        //                                 {
        //                                     if (reader2.Read())
        //                                     {
        //                                         ImagesIds.Add(reader2.GetInt32(reader2.GetOrdinal("Id")));
        //                                     }
        //                                 }

        //                             }

        //                             using (SqlCommand cmd3 = new SqlCommand("SP_AssignImageToProduct", conn))
        //                             {
        //                                 cmd3.Parameters.AddWithValue("@ImageId", ImagesIds[i]);
        //                                 cmd3.Parameters.AddWithValue("@ProductId", NewProductId);
        //                                 cmd3.ExecuteNonQuery();
        //                             }
        //                         }
        //                     }
        //                 }
        //             }

        //         }

        //         return NewProductId;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw ex;
        //     }
        // }
        // public static int DeleteProduct(int id)
        // {
        //     int RowsAffected = 0;
        //     List<Image> imagesForProduct = new List<Image>();

        //     try
        //     {
        //         using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
        //         {


        //             using (SqlCommand cmd2 = new SqlCommand("SP_GetProductImagesByProductId", conn))
        //             {
        //                 cmd2.CommandType = CommandType.StoredProcedure;
        //                 cmd2.Parameters.AddWithValue("@Id", id);

        //                 using (SqlDataReader reader = cmd2.ExecuteReader())
        //                 {
        //                     while (reader.Read())
        //                     {
        //                         imagesForProduct.Add(new Image
        //                         {
        //                             Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                             ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
        //                         });
        //                     }
        //                 }
        //             }

        //             if (imagesForProduct.Count > 0)
        //             {

        //                 for (int i = 0; i < imagesForProduct.Count; i++)
        //                 {
        //                     using (SqlCommand cmd3 = new SqlCommand("SP_DeleteImageByImageId", conn))
        //                     {
        //                         cmd3.CommandType = CommandType.StoredProcedure;
        //                         cmd3.Parameters.AddWithValue("@Id", imagesForProduct[i].Id);
        //                         cmd3.ExecuteNonQuery();
        //                     }
        //                 }

        //             }
        //             using (SqlCommand cmd = new SqlCommand("SP_DeleteProduct", conn))
        //             {
        //                 cmd.CommandType = CommandType.StoredProcedure;
        //                 cmd.Parameters.AddWithValue("@Id", id);

        //                 conn.Open();

        //                 RowsAffected = cmd.ExecuteNonQuery();
        //             }
        //         }

        //         return RowsAffected;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw ex;
        //     }
        // }


    }
}
