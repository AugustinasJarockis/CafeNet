namespace CafeNet.Business_Management.Exceptions;
public class ForbiddenException(string message = "Forbidden Resource") : Exception(message);