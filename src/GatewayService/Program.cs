using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.Authority = builder.Configuration["IdentityServiceUrl"]; // Who the token was issued by
    opt.RequireHttpsMetadata = false; // We need HTTP
    opt.TokenValidationParameters.ValidateAudience = false;
    opt.TokenValidationParameters.NameClaimType = "username"; // Mapping username to name claim
});

var app = builder.Build();

app.UseAuthentication(); // This first
app.UseAuthorization(); // This second

app.MapReverseProxy();

app.Run();