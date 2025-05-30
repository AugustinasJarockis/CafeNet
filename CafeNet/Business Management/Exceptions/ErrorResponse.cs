﻿namespace CafeNet.Business_Management.Exceptions;
public class ErrorResponse
{
    public ErrorResponse(string message) => Message = message;
    public ErrorResponse() => Message = "Error";

    public string Message { get; set; }
}