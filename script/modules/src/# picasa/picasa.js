import Picasa from 'picasa';
const PicasaAPI = new Picasa();

const express = require('express');
const app = express();
app.listen(3000);

import find from '../# components/find/find';
import axios from 'axios';

module.exports = (function() {
    function getConfig() {
        const state = find('app').$store.state;
        return {
            clientId: state.picasa.clientId,
            clientSecret: state.picasa.clientSecret,
            redirectURI: 'http://localhost:3000/auth'
        };
    }

    function getToken(code) {
        if (!code) throw 'Thiếu tham số Code truyền vào';
        PicasaAPI.getAccessToken(getConfig(), code, (error, accessToken, refreshToken) => {
            const picasa = find('picasa');
            picasa.refreshToken = refreshToken ? refreshToken : '';
            picasa.accessToken = accessToken ? accessToken : 'Không thể lấy accessToken';
        });
    }

    function getaccessTokenExpires(accessToken) {
        axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
            params: {
                access_token: accessToken
            }
        }).then(function(response) {
            find('picasa').accessTokenExpires = require('moment')().add(response.data.expires_in, 's');
        }).catch(function(error) {
            console.error(error);
        });
    }

    function getCodeAndToken() {
        find('#shell.openFile', (shell, openFile) => {
            shell[openFile](
                PicasaAPI.getAuthURL(
                    getConfig()
                )
            );
        });
        app.get('/auth', (req, res) => {
            find('picasa.code', (parent, property) => {
                parent[property] = req.query.code;
                getToken(req.query.code);
            });
            res.json({
                code: req.query.code,
                noti: 'Phía server đã xác nhận. Vui lòng đóng cửa sổ'
            });
        });
    }

    function renewAccessToken(refreshToken) {
        PicasaAPI.renewAccessToken(getConfig(), refreshToken, (error, accessToken) => {
            find('picasa').accessToken = accessToken;
            getaccessTokenExpires(accessToken);
        });
    }
    return {
        getToken,
        getCodeAndToken,
        getaccessTokenExpires,
        renewAccessToken
    };
})();