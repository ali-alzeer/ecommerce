using ecommerce.data.Models;

namespace ecommerce.business
{
    public class ProductBusiness
    {
        public static List<Product>? GetAllProducts()
        {
            return ecommerce.data.ProductData.GetAllProducts();
        }
    }
}
