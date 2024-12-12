using System.Net;
using MassTransit;
using Polly;
using Polly.Extensions.Http;
using SearchService.Consumers;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(opt =>
{ 
        // Any consumers in the same namespace are declared
        opt.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
        
        // Auto renames according to the service
        opt.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));
        
        // Rabbit MQ
        opt.UsingRabbitMq((context, cfg) =>
        {
                // For this queue
                cfg.ReceiveEndpoint("search-auction-created", e =>
                {
                        // Allows for retries (5 max)
                        e.UseMessageRetry(r => r.Interval(5, 5));
                        
                        // Only applied for this consumer
                        e.ConfigureConsumer<AuctionCreatedConsumer>(context);
                });
                
                cfg.ConfigureEndpoints(context);
        });
});

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
