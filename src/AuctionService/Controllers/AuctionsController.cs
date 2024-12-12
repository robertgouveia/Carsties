using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionDbContext _auctionDbContext;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    
    public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _auctionDbContext = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
    {
        var query = _auctionDbContext.Auctions.OrderBy(x => x.Item.Make).AsQueryable();

        if (!string.IsNullOrEmpty(date))
            // Greater than the date
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        
        // Mapper maps from a query
        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var auction = await _auctionDbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
        
        if (auction == null) return NotFound();
        
        return _mapper.Map<AuctionDto>(auction);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuction)
    {
        var auction = _mapper.Map<Auction>(createAuction);
        
        // TODO: Add current user as seller
        auction.Seller = "test";
        
        // Transaction - all must pass
        _auctionDbContext.Auctions.Add(auction);
        
        // Publish message to the message bus
        var newAuction = _mapper.Map<AuctionDto>(auction);
        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));
        
        var result = await _auctionDbContext.SaveChangesAsync() > 0;
        
        if (!result) return BadRequest("Could not create auction");

        return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuction)
    {
        var auction = await _auctionDbContext.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id.Equals(id));
        
        if (auction == null) return NotFound();

        // TODO: Check Seller's Username
        
        auction.Item.Make =  updateAuction.Make ?? auction.Item.Make;
        auction.Item.Color = updateAuction.Color ?? auction.Item.Color;
        auction.Item.Mileage = updateAuction.Mileage ?? auction.Item.Mileage;
        auction.Item.Model = updateAuction.Model ?? auction.Item.Model;
        auction.Item.Year = updateAuction.Year ?? auction.Item.Year;
        
        await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));
      
        return await _auctionDbContext.SaveChangesAsync() < 0 ? BadRequest("Could not update auction") : Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAuction(Guid id)
    {
        var auction = await _auctionDbContext.Auctions.FindAsync(id);
        
        if (auction == null) return NotFound();
        
        // TODO: Check Seller's Username
        
        _auctionDbContext.Auctions.Remove(auction);

        // Specify type
        await _publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });
        
        return await _auctionDbContext.SaveChangesAsync() < 0 ? BadRequest("Could not delete auction") : Ok();
    }
    
}