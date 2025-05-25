using System.Text.Json.Serialization;

namespace CafeNet.Data.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PaymentMethod
    {
        CASH,
        CARD
    }
}
