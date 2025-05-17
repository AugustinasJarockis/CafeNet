using CafeNet.Business_Management.Interfaces;
using CafeNet.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        [Authorize(Roles = "CLIENT,BARISTA,ADMIN")]
        [ProducesResponseType<User>(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            return Ok(_locationService.GetAll());
        }
    }
}
