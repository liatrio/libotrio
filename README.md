# libotrio2.0

Updated

## Local Development

In the course of adding features to Libotrio, you will need a local version of the bot you can test with. To get a local version of Libotrio set up, clone this repository down to your local devlopment environment. While this repository has all the code you need to run the bot, you will need to register it with the Slack API if it is not already registered. If you already have a test version of Libotrio in your workspace, skip to step number three.

1. Visit [api.slack.com/apps](https://api.slack.com/apps) and create a new app using the manifest provided in this repository.
2. Once the app has been created, install it in the workspace of interest.
3. Looking at the provided docker-compose file you will notice there are two environment variables being requested. On the basic information page you will need to generate an app-level token with connections:write permissions. Under install app you can find the OAuth token. Once you've set these variables in your environment you can run docker-compose up, and the bot should be running in your workspace. Only one person needs to run the bot locally at any given time; anyone in the workspace will be able to test against it.

## Setting up Enviornment Variables
For this app to run there needs to be certain enviornment variables that need to be set. You can set them by running the command `export NAME=data`. The NAMEs in this case can be found in the list below:
```
MYSQL_ROOT_PASSWORD
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD
MYSQL_HOSTNAME
SLACK_SIGNING_SECRET
SLACK_BOT_USER_OAUTH_TOKEN
SLACK_APP_TOKEN
```
