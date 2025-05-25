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

        public static MenuItemVariationDTO ToMenuVariationDTO(this MenuItemVariation variation)
        {
            return new MenuItemVariationDTO
            {
                Id = variation.Id,
                Title = variation.Title,
                PriceChange = variation.PriceChange,
                MenuItemId = variation.MenuItemId
            };
        }

        public static MenuItemDTO ToMenuItemDTO(this MenuItem menuItem)
        {
            return new MenuItemDTO
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
                    .Select(v => v.ToMenuVariationDTO())
                    .ToList() ?? []
            };
        }

        public static MenuItem ToMenuItem(this UpdateMenuItemRequest dto)
        {
            return new MenuItem
            {
                Id = dto.Id,
                Title = dto.Title,
                Price = dto.Price,
                Available = dto.Available,
                ImgPath = dto.ImgPath,
                TaxId = dto.TaxId,
                Version = dto.Version,
                MenuItemVariations = dto.MenuItemVariations?
                    .Select(variation => variation.ToMenuItemVariation())
                    .ToList() ?? new List<MenuItemVariation>()
            };
        }

        public static MenuItemVariation ToMenuItemVariation(this MenuItemVariationDTO dto)
        {
            return new MenuItemVariation
            {
                Id = dto.Id,
                MenuItemId = dto.MenuItemId,
                Title = dto.Title,
                PriceChange = dto.PriceChange
            };
        }
    }
}
