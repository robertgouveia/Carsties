using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;
    
    public AuctionCreatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }   
    
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        // Context Message is our item
        var item = _mapper.Map<Item>(context.Message);
        
        // If Mongo is down the below will throw an error and the message has been consumed.
        // We need to enable a retry policy

        if (item.Model == "Foo") throw new ArgumentException("Not allowed");
        
        await item.SaveAsync(); // Mongo save async
    }
}