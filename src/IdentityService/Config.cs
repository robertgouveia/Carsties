using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
    [
        new ApiScope("auctionApp", "Auction App Full Access")
    ];

    public static IEnumerable<Client> Clients =>
    [
        new() // POSTMAN CLIENT
        {
            ClientId = "postman",
            ClientName = "Postman",
            AllowedScopes = { "openid", "profile", "auctionApp" },
            RedirectUris = { "https://www.getposman.com/oauth2/callback" }, // Example Callback
            ClientSecrets = [ new("NotASecret".Sha256()) ],
            AllowedGrantTypes = { GrantType.ResourceOwnerPassword } // Not a recommended grant type (DEV ONLY)
        },
        
        new() // NEXT.JS CLIENT
        {
            ClientId = "nextApp",
            ClientName = "nextApp",
            ClientSecrets = {new("secret".Sha256())},
            AllowedGrantTypes = GrantTypes.CodeAndClientCredentials, // Internally communicate via credentials
            RequirePkce = false, // Would be able to store secret server side
            RedirectUris = { "http://localhost:3000/api/auth/callback/id-server" },
            AllowOfflineAccess = true, // Enable refresh token
            AllowedScopes = {"openid", "profile", "auctionApp"}, // Scopes for Identity
            AccessTokenLifetime = 3600*24*30 // 1 Month (DEV ONLY) -- Unrevokeable
        }
    ];
}
