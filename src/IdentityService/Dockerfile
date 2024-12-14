# this fetches the sdk from microsoft and we name the image build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Not a directory inside out file system (docker)
WORKDIR /app

# Running Port 80
EXPOSE 80

# Copy all .csproj files and restore as distinct layers, speeds up builds due to caching
COPY Carsties.sln Carsties.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

# Restore package dependencies - using sdk
RUN dotnet restore Carsties.sln

# Copy the application code - dependencies
COPY src/IdentityService src/IdentityService

WORKDIR /app/src/IdentityService

RUN dotnet publish -c Release -o /app/src/out

# Build runtime image - smaller dotnet runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copying publish files
COPY --from=build /app/src/out .
# Run dotnet dll
ENTRYPOINT ["dotnet", "IdentityService.dll"]