using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class RatingAddDTO
    {
        public short RatingContent { get; set; }
        public int CreatedByUserId { get; set; }
        public int ProductId { get; set; }
    }
}