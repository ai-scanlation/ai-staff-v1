// import googleAuth from 'google-auth-library';

module.exports = function() {
    // return {
    //     getOauth2Client() {
    //         const $store = document.getElementById('app').__vue__.$store;
    //         let $oauth2Client = $store.state.google.oauth2Client;
    //         if ($oauth2Client.constructor.name == 'OAuth2Client') {
    //             return $oauth2Client;
    //         } else {
    //             const {
    //                 client_id,
    //                 client_secret,
    //                 redirect_uris
    //             } = $store.state.google.client_secret;

    //             $oauth2Client = new(new googleAuth()).OAuth2(
    //                 client_id,
    //                 client_secret,
    //                 redirect_uris[0]
    //             );
    //             $oauth2Client.credentials = $store.state.google.auth;

    //             return $oauth2Client;
    //         }
    //     }
    // };
};