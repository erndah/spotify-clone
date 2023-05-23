import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "@/lib/spotify";
// import SpotifyWebApi from "spotify-web-api-node";

export default function useSpotify() {
    const {data : session, status } = useSession();

    // const spotifyApi = new SpotifyWebApi({
    //     clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    //     clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    // });

    useEffect(() => {
        if(session) {
            // if refresh access token attempt fails, direct user to login
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}