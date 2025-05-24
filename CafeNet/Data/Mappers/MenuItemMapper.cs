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

        public static MenuItemVariationDto ToMenuVariationDto(this MenuItemVariation variation)
        {
            return new MenuItemVariationDto
            {
                Id = variation.Id,
                Title = variation.Title,
                PriceChange = variation.PriceChange,
                MenuItemId = variation.MenuItemId
            };
        }

        public static MenuItemDto ToMenuItemDto(this MenuItem menuItem)
        {
            return new MenuItemDto
            {
                Id = menuItem.Id,
                Title = menuItem.Title,
                Price = menuItem.Price,
                Available = menuItem.Available,
                ImgPath = menuItem.ImgPath,
                TaxId = menuItem.TaxId,
                Tax = menuItem.Tax,
                Version = menuItem.Version,
                MenuItemVariations = menuItem.MenuItemVariations?
                    .Select(v => v.ToMenuVariationDto())
                    .ToList() ?? []
            };
        }
    }
}
