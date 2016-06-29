
'use strict';

(() => {

    const
        SSH       = require('simple-ssh'),
        RtmClient = require('@slack/client').RtmClient;

    const
        USER = (() => {
            if (!process.env.USER) {
                throw new Error('USER is needed');
            }
            return process.env.USER;
        })(),

        SSH_KEY = (() => {
            if (!process.env.SSH_KEY) {
                throw new Error('SSH_KEY is needed');
            }
            return process.env.SSH_KEY;
        })(),

        HOST = (() => {
            if (!process.env.HOST) {
                throw new Error('HOST is needed');
            }
            return process.env.HOST;
        })(),

        SLACK_API_TOKEN = (() => {
            if (!process.env.SLACK_API_TOKEN) {
                throw new Error('SLACK_API_TOKEN is needed');
            }
            return process.env.SLACK_API_TOKEN;
        })();

    const ssh = new SSH({
        host: HOST,
        user: USER,
        key:  SSH_KEY,
    });

    const rtm = new RtmClient(SLACK_API_TOKEN, {
        logLevel: 'debug',
    });
    rtm.start();

})();
