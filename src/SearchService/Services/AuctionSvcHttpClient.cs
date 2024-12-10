using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    
    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _configuration = config;
    }

    public async Task<List<Item>> GetItemsAsync()
    {
        // Items to string
        // Sort by newest
        // Retrieve first (newest)
        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(a => a.UpdatedAt))
            .Project(p => p.UpdatedAt.ToString())
            .ExecuteFirstAsync();

        return await _httpClient.GetFromJsonAsync<List<Item>>(_configuration.GetValue<string>("AuctionServiceURL") + "/api/auctions?date=" + lastUpdated);
    }
}