import NextAuth, {Profile} from "next-auth"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"
import {OIDCConfig} from "@auth/core/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIDS6Provider({
            id: "id-server",
            clientId: "nextApp", // matches out client
            clientSecret: "secret",
            issuer: "http://localhost:5001",
            authorization: {params: {scope: "openid profile auctionApp"}}, // scopes
            idToken: true // claims automatically
        } as OIDCConfig<Omit<Profile, "username">>),
    ],
    callbacks: {
        async jwt({token, profile, account}) {
            if (account && account.access_token) {
                token.access_token = account.access_token;
            }

            if (profile) {
                token.username = profile.username;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.username = token.username;
                session.access_token = token.access_token;
            }
            return session;
        },
        async authorized({auth} ) {
            return !!auth;
        }
    }
})