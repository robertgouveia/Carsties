using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        var result = await DB.DeleteAsync<Item>(context.Message.Id);

        if (!result.IsAcknowledged || result.DeletedCount != 1)
            throw new MessageException(typeof(AuctionDeleted), "Unable to delete auction");
    }
}