using CafeNet.Business_Management.DTOs;
using CafeNet.Data.Models;

namespace CafeNet.Data.Mappers
{
    public static class MenuItemMapper
    {
        public static MenuItem ToMenuItem(this CreateMenuItemRequest request) {
            return new() {
                Title = request.Title,
                Price = request.Price,
                Available = true,
                ImgPath = request.ImgPath,
                TaxId = request.TaxId,
                MenuItemVariations = (request.MenuItemVariations?.Select(var => var.ToMenuItemVariation()).ToList() ?? [])
            };
        }

        public static MenuItemVariation ToMenuItemVariation(this CreateMenuItemVariationDTO variationDTO) {
            return new() {
                Title = variationDTO.Title,
                PriceChange = variationDTO.PriceChange
            };
        }
    }
}
