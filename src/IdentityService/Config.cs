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
        }
    ];
}
