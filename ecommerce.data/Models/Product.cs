using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        public short? Rating { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Image>? Images { get; set; }
        public int CategoryId { get; set; }
    }
}
