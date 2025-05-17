namespace CafeNet.Business_Management.Exceptions;
public class NotFoundException(string message = "Resource not found") : Exception(message);
