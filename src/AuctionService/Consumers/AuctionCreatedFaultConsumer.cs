using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        var exception = context.Message.Exceptions.First();
        
        // Resends on fail due to test error
        if (exception.ExceptionType == typeof(ArgumentException).ToString())
        {
            context.Message.Message.Model = "FooBar";
            await context.Publish(context.Message.Message);
        }
    }
}