using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class AdminProductAddDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        public List<Image>? Images { get; set; }
        public int CategoryId { get; set; }
        public int CreatedByUserId { get; set; }
        public string AdminPassword { get; set; } = string.Empty;
    }
}