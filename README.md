# III6 Framework

iii6 Framework is a decentralised application framework that gives you easy access to infrastructure, far edge NFTech, interactive edutainment resources and a network of dynamic NFT enthusiasts for support in different stages of your journey.

- empowering web3 creatives & developers
- providing far edge NFTech infrastructure
- onboarding web2 merchants & users

iii6 Framework enacpsulates all aspects of dynamic NFT creation.

## Decentral Interactive Asset Standard

The DIAS aka Decentral Interactive Asset Standard is the renderlogic behind the iii6 dynamic Token model. It defeats all flaws and solves all problems regarding dynamic NFTs for the creator and also the advertiser by providing an easy workflow for the creation of interactive assets and a simple 3 step dapp integration process.

## DOJO Dapp SDK

The DOJO SDK is a template based dapp development kit that allows you to create complex tokeninomics models and integrate them into your project.

## Codebender Asset Editor

Codebender is the interactive asset editor that allows designers to create dias objects on a visual user interface.

## Vanbyte DIAS Launchpad

VanByte is a Interactive Asset Marketplace that helps Projects create, launch, and build a Marketplace for their Ideas.

# Installation

The iii6 Framework is at the moment only available as git project but the installation is easy and straight forward. Make sure your setup forfills all the expected requirements.

## Requirements

- Git
- NodeJS
- NPM
- Webpack
- Truffle

## Local Development

If you are not on a preferred Code Editor i suggest VScode.

## Cloud Development

Linode allows you to run a Visual Studio Code application in the cloud.
Watch this video how to set it up ... https://www.youtube.com/watch?v=1ZfO149BJvg

## Clone and Run

Simply clone the repository
`git clone https://github.com/iii6code/iii6v2 iii6`

Change Directory
`cd iii6`

Install Webpack in Dev Environment
`npm i --save dev webpack`

Install all NPM Packages
`npm i`

Quick Audit Fixes
`npm audit fix`

Run the Development Template
`npm start`

## Networks

inside the `./truffle-config.js` & `./package.json` configuration files you can add or remove networks. Every migrated contract in `./dist/contracts` has a `network` array that displays the network information for all networks you deployed to. Please note the order and edit the function `netCheck` inside `./src/app.js`. In case you are using Oracles, VRF, Automations or CCIP you need to make sure the Chainlink service is supported on that chain here ... https://docs.chain.link

# Usage

## Templates

iii6 Framework provides a variety of customisable presets.
In order to use the iii6 login system you need to aqquire a membership NFT Token at
https://s0xiety.x and hold it inside the deployment wallet. Otherwise your login
system and user data will be integrated into the iii6 s0xiety user pool automatically.

We have Coin, NFT & SFT Token Models that can be combined in any variation to create an optimised Tokenomics model for your Project in just a few steps in our iii6 builder interface.

## Build

Simply type `npm run build` to compress your project

a directory `./dist` will be created and webpack will compress your project into it

## Compile

Simply type `npm run compile`

a directory `./dist/contracts` will be created and solcbin will compile your contracts into it

## Migrate & Deploy

MAINNETWORKS

For Mainnet type `npm run migrate:main`

For Polygon type `npm run migrate:polygon`

For Avalanche type `npm run migrate:avax`

TESTNETWORKS

For Goerly type `npm run migrate:goerly`

For Mumbai type `npm run migrate:mumbai`

For Fuji type `npm run migrate:fuji`

a directory `./dist/contracts` will be created and solcbin will compile your contracts into it

## Decentral FileStorage (recommended)

## Decentral Hosting (recommended)

## ClearWeb Filestorage

## ClearWeb Hosting (user friendly)
