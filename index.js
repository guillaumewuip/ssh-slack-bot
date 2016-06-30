
'use strict';

(() => {

    const
        SSH   = require('simple-ssh'),
        slack = require('slack');

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

    const
        bot = slack.rtm.client(),
        ssh = new SSH({
            host: HOST,
            user: USER,
            key:  SSH_KEY,
        });

    bot.message((message) => {

        if (message.user === bot.self.id || !message.text) {
            return;
        }

        let match = message.text.match(/^\ *<@(.*)>\ *:?(.*)/);

        if (match && match.length === 3 && match[1] === bot.self.id) {

            console.log(`Received command: ${match[2]}`);

            const callback = (code, text) => {

                let color = code ? 'danger' : 'good';

                slack.chat.postMessage({
                    token:       SLACK_API_TOKEN,
                    channel:     message.channel,
                    as_user:     true,
                    text:        '',
                    attachments: [{
                        fallback:    text,
                        author_name: `Status: ${code}`,
                        footer:      `${USER}@${HOST}`,
                        color:       color,
                        text:        text,
                        ts:          Math.floor(Date.now() / 1000),
                    }],
                }, (err) => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            };

            ssh.exec(match[2], {
                exit: (code, stdout, stderr) => {
                    ssh.reset();
                    return callback(code, stdout || stderr);
                },
            }).start();
        }

    });

    bot.listen(
        {
            token: SLACK_API_TOKEN,
        },
        (err, data) => {
            if (err) {
                throw new Error(err);
            }

            bot.self = data.self;
            console.log(`Connected to Slack as ${bot.self.id}`);
        }
    );

    ssh.on('error', (err) => {
        ssh.end();
        throw new Error(err);
    });

})();
