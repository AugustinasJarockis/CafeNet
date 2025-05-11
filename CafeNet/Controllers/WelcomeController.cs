using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WelcomeController : ControllerBase
{
    [Authorize(Roles = "CLIENT,BARISTA,ADMIN")]
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Skanios kaveles, geros dieneles" });
    }
}
