using Microsoft.AspNetCore.Mvc;

namespace CafeNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WelcomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Skanios kaveles, geros dieneles" });
    }
}
