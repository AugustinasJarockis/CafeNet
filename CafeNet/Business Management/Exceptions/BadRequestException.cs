namespace CafeNet.Business_Management.Exceptions;

public class BadRequestException(string message = "Bad Request") : Exception(message);