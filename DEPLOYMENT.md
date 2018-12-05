# Project #2: Deployment.

## Sign up to Heroku

If you haven't already, create an account with at https://www.heroku.com/​

1. Click on **SIGN UP** then fill our the registration form. Since you are creating a personal account you can comfortably leave Company name blank. Set Role to Student, and Primary development language to Node.js

1. Once you have created your account, click on the ninja icon in the top right hand corner and select Account settings

  <img src="https://media.git.generalassemb.ly/user/15120/files/92aaaa4e-89d3-11e8-859b-5155b9350851" style="max-width:300px">

1. Now select Billing from the tabs on the left hand side. Add a credit card.

  > **Note**: Using Heroku during the course will not cost you any money. However some features like databases if heavily used will incur running costs. In order to use these features we need to add a credit card in either case

1. Once you have added a card you need to install the Heroku toolbelt which adds heroku commands to the terminal. Type the following in the terminal:

  ```
  brew install heroku/brew/heroku
  ```

  Once the installation has finished, type `heroku login` and enter the credentials that you used to create your Heroku account.

## Deploying the app

Before we deploy an Express app to Heroku we need to do a couple of things:

1. **Update config/environment.js file:**

  ```
  const port = process.env.PORT || 4000;
  const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/database-name'
  ```

  This will ensure that when deployed we will allow Heroku to set our port and database URI.

1. **Check the package.json:**

  Make sure you have _at least_ a `build` script and a `start` script in your package.json:

  ```json
  "scripts": {
    "build": "webpack -p",
    "start": "yarn build && node index"
  }
  ```

1. **Create a Heroku app:**

  Type the following command in the terminal:
  ```
  heroku create --region=eu project-name
  ```

  `project-name` is the name of your project. If you leave it blank Heroku will create a random name for you.

1. **Add a database:**

  Type the following command in the terminal:
  ```
  heroku addons:create mongolab
  ```

1. **Configure Heroku to build your app remotely:**

  Type the following command in the terminal:
  ```
  heroku config:set NPM_CONFIG_PRODUCTION=false
  ```

1. **Add any environment variables from your `.zshrc` file:**

  For example, if you are using Dark Sky API, you would type the following command in your terminal:

  ```
  heroku confg:set DARKSKY_API_KEY="b7a8aba2c0429ef0616a86a0ba2c64c2"
  ```

1. Now you can deploy the app with the following command:

  ```
  git push heroku master
  ```

Once the deployment is complete, open the site using:

```
heroku open
```

If you see a screen that says Application Error, you can check the logs with:

```
heroku logs
```
