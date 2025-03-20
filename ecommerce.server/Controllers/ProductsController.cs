using ecommerce.data;
using ecommerce.data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet("all")]
        public ActionResult<List<Product>> GetAllProducts()
        {
            var AllProducts = ecommerce.data.ProductData.GetAllProducts();

            if (AllProducts == null)
            {
                return BadRequest();
            }

            return Ok(AllProducts);
        }

        [HttpGet("filter/page")]
        public ActionResult<List<Product>> GetProductsByFilterByPage([FromQuery] ProductsFilter filter)
        {
            var Products = ecommerce.data.ProductData.GetProductsByFiltersByPage(filter);

            if (Products == null)
            {
                return BadRequest();
            }

            return Ok(Products);
        }

        [HttpGet("count")]
        public ActionResult<int> GetMaxProductsCount()
        {
            int? MaxProductsCount = ecommerce.data.ProductData.GetMaxProductsCount();

            if (MaxProductsCount == null)
            {
                return BadRequest("Could not get products count");
            }

            return Ok(MaxProductsCount);
        }

        [HttpGet("id")]
        public ActionResult<Product> GetProductById([FromQuery] int id)
        {
            Product? ProductFromDB = ecommerce.data.ProductData.GetProductById(id);

            if (ProductFromDB == null)
            {
                return BadRequest($"No product with id {id}");
            }

            return Ok(ProductFromDB);
        }

        [HttpGet("ratings")]
        public ActionResult<List<Rating>> GetProductRatingsByProductId([FromQuery] int id)
        {
            List<Rating>? RatingsFromDB = ecommerce.data.ProductData.GetProductRatingsByProductId(id);

            if (RatingsFromDB == null)
            {
                return BadRequest($"Could not get ratings for product with id {id}");
            }

            return Ok(RatingsFromDB);
        }

        [Authorize]
        [HttpPost("comments")]
        public ActionResult<Product?> AddCommentToProduct([FromBody] CommentAddDTO commentAddDTO)
        {
            int RowsAffectedAfterAddingComment = ecommerce.data.ProductData.AddCommentToProduct(commentAddDTO);

            if (RowsAffectedAfterAddingComment == 0)
            {
                return BadRequest($"Could not add comment");
            }
            if (RowsAffectedAfterAddingComment > 1)
            {
                return BadRequest("Comment added, but there is unknown error happened");
            };

            Product? productAfterCommentAdding = ecommerce.data.ProductData.GetProductById(commentAddDTO.ProductId);

            if (productAfterCommentAdding == null)
            {
                return BadRequest("Comment added, but could not get the product");
            }

            return Ok(productAfterCommentAdding);
        }


        [Authorize]
        [HttpDelete("comments")]
        public ActionResult<Product?> DeleteComment([FromQuery] int id, [FromQuery] int productId)
        {
            int RowsAffectedAfterDeletingComment = ecommerce.data.ProductData.DeleteComment(id);

            if (RowsAffectedAfterDeletingComment == 0)
            {
                return BadRequest($"Could not delete comment");
            }
            if (RowsAffectedAfterDeletingComment > 1)
            {
                return BadRequest("Comment deleted, but there is unknown error happened");
            };

            Product? productAfterCommentDeleting = ecommerce.data.ProductData.GetProductById(productId);

            if (productAfterCommentDeleting == null)
            {
                return BadRequest("Comment deleted, but could not get the product");
            }

            return Ok(productAfterCommentDeleting);
        }

        [Authorize]
        [HttpPost("ratings")]
        public ActionResult<Product?> AddRatingToProduct([FromBody] RatingAddDTO ratingAddDTO)
        {
            int RowsAffectedAfterAddingRating = ecommerce.data.ProductData.AddRatingToProduct(ratingAddDTO);

            if (RowsAffectedAfterAddingRating == 0)
            {
                return BadRequest($"Could not add rating");
            }
            if (RowsAffectedAfterAddingRating > 1)
            {
                return BadRequest("Rating added, but there is unknown error happened");
            };

            int RowsAffectedAfterUpdatingRatingForProduct = ecommerce.data.ProductData.UpdateRatingForProduct(ratingAddDTO.ProductId);

            if (RowsAffectedAfterUpdatingRatingForProduct == 0)
            {
                return BadRequest($"Could not update rating");
            }
            if (RowsAffectedAfterUpdatingRatingForProduct > 1)
            {
                return BadRequest("Rating added, but there is unknown error happened could not update");
            };

            Product? productAfterRatingAdding = ecommerce.data.ProductData.GetProductById(ratingAddDTO.ProductId);

            if (productAfterRatingAdding == null)
            {
                return BadRequest("Ratings added and updated, but could not get the product");
            }

            return Ok(productAfterRatingAdding);
        }


        [Authorize]
        [HttpDelete("ratings")]
        public ActionResult<Product?> DeleteRating([FromQuery] int id, [FromQuery] int productId)
        {
            int RowsAffectedAfterDeletingRating = ecommerce.data.ProductData.DeleteRating(id);

            if (RowsAffectedAfterDeletingRating == 0)
            {
                return BadRequest($"Could not delete rating");
            }
            if (RowsAffectedAfterDeletingRating > 1)
            {
                return BadRequest("Rating deleted, but there is unknown error happened");
            };


            int RowsAffectedAfterUpdatingRatingForProduct = ecommerce.data.ProductData.UpdateRatingForProduct(productId);

            if (RowsAffectedAfterUpdatingRatingForProduct == 0)
            {
                return BadRequest($"Could not update rating");
            }
            if (RowsAffectedAfterUpdatingRatingForProduct > 1)
            {
                return BadRequest("Rating deleted, but there is unknown error happened could not update");
            };


            Product? productAfterRatingDeleting = ecommerce.data.ProductData.GetProductById(productId);

            if (productAfterRatingDeleting == null)
            {
                return BadRequest("Rating deleted, but could not get the product");
            }

            return Ok(productAfterRatingDeleting);
        }

        // [HttpPost]
        // public ActionResult AddProduct([FromBody] AdminProductAddDTO adminProductAddDTO)
        // {
        //     if (adminProductAddDTO.AdminPassword != Settings.GetAdminPassword())
        //     {
        //         return Unauthorized();
        //     }

        //     ProductAddDTO productAddDTO = new ProductAddDTO
        //     {
        //         CategoryId = adminProductAddDTO.CategoryId,
        //         Description = adminProductAddDTO.Description,
        //         Images = adminProductAddDTO.Images,
        //         Price = adminProductAddDTO.Price,
        //         Title = adminProductAddDTO.Title,
        //         CreatedByUserId = adminProductAddDTO.CreatedByUserId
        //     };

        //     int NewProductId = ecommerce.data.ProductData.AddProduct(productAddDTO);

        //     if (NewProductId == 0)
        //     {
        //         return BadRequest($"Could not add product");
        //     }
        //     else
        //     {
        //         return Ok();
        //     };

        // }


        // [HttpDelete]
        // public ActionResult DeleteProduct([FromQuery] int id)
        // {
        //     int RowsAffected = ecommerce.data.ProductData.DeleteProduct(id);

        //     if (RowsAffected == 0)
        //     {
        //         return BadRequest("Could not delete product");
        //     }
        //     else if (RowsAffected == -1)
        //     {
        //         return BadRequest("Product deleted but images not");
        //     }
        //     else
        //     {
        //         return Ok();
        //     };
        // }


    }
}
