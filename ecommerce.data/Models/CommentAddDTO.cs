using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class CommentAddDTO
    {
        public string CommentContent { get; set; } = string.Empty;
        public int CreatedByUserId { get; set; }
        public int ProductId { get; set; }
    }
}