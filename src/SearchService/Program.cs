using System.Net;
using Polly;
using Polly.Extensions.Http;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

// Async so app runs
app.Lifetime.ApplicationStarted.Register(async () =>
{
        try
        { 
                await DbInitializer.InitDb(app); 
        }
        catch (Exception e)
        {
                Console.WriteLine(e);
        }
});

app.Run();

// Handles errors which state can change
static IAsyncPolicy<HttpResponseMessage> GetPolicy() => HttpPolicyExtensions.HandleTransientHttpError().OrResult(msg =>
        msg.StatusCode == HttpStatusCode.NotFound // Example of status codes
).WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3)); // Retry every 3 seconds
