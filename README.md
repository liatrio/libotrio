# libotrio2.0
Updated

# Local Development
In the course of adding features to Libotrio, you will need a local version of the bot you can test with. To get a local version of Libotrio set up clone this repository down to your devlopment environment. While this repository has all the code you need to run the bot, you will first need to register it with the Slack API. 

Visit api.slack.com/apps and create a new app using the manifest provided in this repository. Once the app has been created, install it in the workspace of interest. Looking at the provided docker-compose file you will notice there are three environmental variables that need to be provided. On the basic information page you can find the signing secret and you can generate an app-level token with connections:write permissions. Under install app you can find the OAuth token. Once you've set these variables you can run docker-compose up, and the bot should be running in your workspace. Only one person needs to run the bot locally at any given time, anyone in the workspace will be able to test against it.