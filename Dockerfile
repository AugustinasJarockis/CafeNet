FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["CafeNet/CafeNet.csproj", "CafeNet/"]
RUN dotnet restore "CafeNet/CafeNet.csproj"
COPY . .
WORKDIR "/src/CafeNet"
RUN dotnet build "CafeNet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CafeNet.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CafeNet.dll"]
