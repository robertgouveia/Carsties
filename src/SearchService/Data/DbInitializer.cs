using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        
        await DB.InitAsync(
            "SearchDb",
            MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));
        
        await DB.Index<Item>()
            .Key(x => x.Make, KeyType.Text)
            .Key(x => x.Model, KeyType.Text)
            .Key(x => x.Color, KeyType.Text)
            .CreateAsync();
        
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var auctionSvcHttpClient = services.GetRequiredService<AuctionSvcHttpClient>();

        var items = await auctionSvcHttpClient.GetItemsAsync();
        
        Console.WriteLine($"Found {items.Count} new items in the auction service");

        if (items.Count > 0) await DB.SaveAsync(items);
    }
    
}