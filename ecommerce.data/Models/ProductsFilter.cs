using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class ProductsFilter
    {

        public int? CategoryId { get; set; }
        public string? Search { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
        public int? MinRating { get; set; }
        public int? MaxRating { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}