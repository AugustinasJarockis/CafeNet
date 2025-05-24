namespace CafeNet.Business_Management.DTOs;

public class UpdateTaxRequest
{
    public long Id { get; set; }
    public required string Type { get; set; }
    public byte Percent { get; set; }
    public uint Version { get; set; }
}
