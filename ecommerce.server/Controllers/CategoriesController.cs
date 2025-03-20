using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce.data.Models;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        [HttpGet("all")]
        public ActionResult<List<Category>> GetAllCategories()
        {
            var AllCategories = ecommerce.data.CategoryData.GetAllCategories();

            if (AllCategories == null)
            {
                return BadRequest();
            }

            return Ok(AllCategories);
        }


    }
}