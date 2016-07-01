SSH Slack bot
===========

A Slack bot to send SSH commands.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

![example image 1](http://i.imgur.com/WITk9iT.png)
![example image 2](http://i.imgur.com/dCgE1S5.png)
![example image 3](http://i.imgur.com/AGMGVrD.png)

# ENV

These are environment variables the bot need :

- `SSH_USER` : SSH user
- `SSH_HOST` : SSH server
- `SSH_PASSWORD` : (optional) SSH password
- `SSH_KEY` : (optional) SSH private key

    Example (need to be multiline) :

    ```
    export SSH_KEY="-----BEGIN RSA PRIVATE KEY-----
    MIIJKQIBAAKCAgEA0eLjqZYnHAExXBBVYcn3Pfl/SlbNL8QJoWiKS1mxQIoH9jAt
    ....
    AxD6OeFd8pzpCEgz/qD+rIoV0IDaHbMt/oiOZ1+wYBBfqtli861riPWf5fqH
    -----END RSA PRIVATE KEY-----"
    ```

- `SSH_PREFIX_CMD` : (optional) String to use as prefix of every command send

    Examples :
        `SSH_PREFIX_CMD=ls` will allow you to build a `@ls` bot. Simply call
        `@ls /my/dir`, `@ls -all`, ...
        `SSH_PREFIX_CMD=docker` will allow you to build a `@docker` bot. Simply
        call `@docker ps`, `@docker rm test`, ...

- `SLACK_API_TOKEN` : Slack token of your bot

# Use

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

or

```
git clone https://github.com/guillaumewuip/ssh-slack-bot && cd ssh-slack-bot
npm install
node index.js #with correct env var
```

