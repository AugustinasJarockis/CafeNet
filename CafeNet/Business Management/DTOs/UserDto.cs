namespace CafeNet.Business_Management.DTOs;

public class UserDTO
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public long? LocationId {  get; set; } 
    public required string LocationAddress { get; set; }
    public required string Role { get; set; }
    public required string Version { get; set; }
}
