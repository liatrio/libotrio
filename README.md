# libotrio

## Feature list

Below are the current features of libotrio:
* beep - boop 
    * When a user messages "beep" in a channel that libotrio is a part of, libotrio responds with "BOOP: #X since last restart" where X is the total number of boops since the last restart of the bot.
* dbping
    * When a user messages "dbping" in a channel that libotrio is a part of, libotrio responds with "total pings from you: X" where X is the total number of pings your user has done to the database.

## AWS RDS

The `tf` folder contains terraform for provisioning an RDS instance for the bot to use. It use Vault to setup a password for the database.

Set vault key:

```
vault kv put -address https://vault.internal.services.liatr.io lead/aws/AWS_ACCOUNT_ID/libotrio db_password="DB_PASSWORD"
```

## Helm

The `chart` folder contains a Helm chart for deploying the bot. It expects a secret called `libotrio` to exist in the same namespace to configure the pod.

```
kubectl -n libotrio create secret generic libotrio --from-literal=SLACK_APP_TOKEN=APP_TOKEN --from-literal=SLACK_SIGNING_SECRET=SIGNING_SECRET --from-literal=SLACK_BOT_USER_OAUTH_TOKEN=OAUTH_TOKEN --from-literal=DB_HOST=DB_HOSTNAME --from-literal=DB_USERNAME=DB_USERNAME --from-literal=DB_PASSWORD=DB_PASSWORD
```

## Local Development

In the course of adding features to Libotrio, you will need a local version of the bot you can test with. To get a local version of Libotrio set up, clone this repository down to your local development environment. While this repository has all the code you need to run the bot, you will need to register it with the Slack API if it is not already registered. If you already have a test version of Libotrio in your workspace, skip to step number three.

1.  Visit [api.slack.com/apps](https://api.slack.com/apps) and create a new app using the manifest provided in this repository. On the basic information page you will need to generate an app-level token with connections:write permissions and make a note of the token generated. On the Install App page make a note of the OAuth token. You will need these token for configuring the bot bellow.
2.  Once the app has been created, install it in the Slack workspace of interest.
3.  You will need to setup some environment variables to be passed into the application containers by docker-compose. Values for variables starting with `SLACK_` need to be copied from the Slack app. The mysql username and passwords can
    be set to whatever you like as they configure a local mysql instance along with the application.
    Create a file called `variables.sh` in the project root, paste the sample export commands bellow into the file and fill in empty values. Run the script any time you need to set the environment variables.

```
export MYSQL_ROOT_PASSWORD=""
export MYSQL_DATABASE=database
export MYSQL_USER=""
export MYSQL_PASSWORD=""
export SLACK_BOT_USER_OAUTH_TOKEN=""
export SLACK_APP_TOKEN=""
```

4. Run docker-compose up to run the bot in your workspace. Only one person needs to run the bot locally at any given time; anyone in the Slack workspace will be able to test against it.
