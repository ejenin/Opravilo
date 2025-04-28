FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556 AS build
WORKDIR /App
EXPOSE 80

# Copy everything
COPY . ./
RUN dotnet restore src/Opravilo.sln
RUN dotnet publish src/Opravilo.API/Opravilo.API.csproj -o out -c Release

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "Opravilo.API.dll"]