using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _manager;
    
    public CustomProfileService(UserManager<ApplicationUser> manager)
    {
        _manager = manager;
    }
    
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _manager.GetUserAsync(context.Subject);
        var existingClaims = await _manager.GetClaimsAsync(user!);

        var claims = new List<Claim>
        {
            new("username", user!.UserName!),
        };
        
        // Adds the username and the name to the user claims
        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name)!);
    }

    public Task IsActiveAsync(IsActiveContext context) => Task.CompletedTask;
}