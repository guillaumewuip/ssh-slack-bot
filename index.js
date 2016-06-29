
'use strict';

(() => {

    const
        SSH       = require('simple-ssh'),
        RtmClient = require('@slack/client').RtmClient;

    const
        DOKKU_USER = 'dokku',

        DOKKU_SSH_KEY = (() => {
            if (!process.env.DOKKU_SSH_KEY) {
                throw new Error('DOKKU_SSH_KEY is needed');
            }
            return process.env.DOKKU_SSH_KEY;
        })(),

        DOKKU_HOST = (() => {
            if (!process.env.DOKKU_HOST) {
                throw new Error('DOKKU_HOST is needed');
            }
            return process.env.DOKKU_HOST;
        })(),

        SLACK_API_TOKEN = (() => {
            if (!process.env.SLACK_API_TOKEN) {
                throw new Error('SLACK_API_TOKEN is needed');
            }
            return process.env.SLACK_API_TOKEN;
        })();

    const ssh = new SSH({
        host: DOKKU_HOST,
        user: DOKKU_USER,
        key:  DOKKU_SSH_KEY,
    });

    const rtm = new RtmClient(SLACK_API_TOKEN, {
        logLevel: 'debug',
    });
    rtm.start();

})();
