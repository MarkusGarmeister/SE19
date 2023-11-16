# Blockfolio

Blockfolio is a tool for users to track their investments or trades in the crypto area. 

## Description

The main aim of creating this project was to learn the basics of web development and get a good understanding of the MVC Model.
Users can register and login into the website and can start creating single journal posts about their trades/investments. For the backend/server I used node express. For my database i used moongose and it is deployed on MongoDBAtlas. The application is deployed on heroku. You can find the project here:
https://glacial-oasis-41748-968f85d2fc55.herokuapp.com/ 


### Features

- register and login / password is hashed with SHA512 algorithm
- create trade/investments journal / Properties of single trade are: Asset, Date, Price, Amount, Notes
- edit created trades or investments
- delete created trades or investments
- filter by assets 

## Getting Started
### Prerequisites

If you want to work or run this project you need to have Node.js installed.
You can find Node.js here: https://nodejs.org/

### Installation

First clone the repository.
git clone https://github.com/MarkusGarmeister/SE19.git

Open the terminal an navigate into your folder with the cloned repository. 
cd yourFolder

Install all required packages for this project.
npm install

##Usage

I created a test user with data, to experience all features right away. But you can also register as new user and create data.
email: test@test.com
password: test123

##Packages

For the register and login process I used the passport module. I used the local strategy for the authentification and for encrypting the password I used the crypto module from node.
