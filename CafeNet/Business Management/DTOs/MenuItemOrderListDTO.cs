using CafeNet.Data.Models;

namespace CafeNet.Business_Management.DTOs
{
    public class MenuItemOrderListDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; }
        public long TaxId { get; set; }
        public uint Version { get; set; }
        public Tax Tax { get; set; }
    }
}
