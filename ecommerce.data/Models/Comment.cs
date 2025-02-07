using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ecommerce.data.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentContent { get; set; } = string.Empty;
        public int CreatedByUserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ProductId { get; set; }
    }
}
