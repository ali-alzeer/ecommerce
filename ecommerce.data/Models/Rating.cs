using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public short RatingContent { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ProductId { get; set; }
    }
}
