# DevoxxDemo <img align="right" src="https://github.com/ArkaneNetwork.png?size=30" />

Small basic wallet application showcasing Arkane Connect.
* Authenticate through Arkane
* Fetch user's wallets (including link/unlink)
* Transfer a small amount of internet money

The Demo is connect to the staging environemnt of Arkane and is using the client 'Devoxx', which is free to use in our playground. 
Applications that would like to be connected to the mainnet will receive their own personal client.

This repository contains 2 branches 
* [initial-state](https://github.com/ArkaneNetwork/DevoxxDemo/tree/initial-state)
* [finsihed-state](https://github.com/ArkaneNetwork/DevoxxDemo/tree/finished-state)

Initial-state is the code without Arkane integration, finsihed-state contains the code where we use Arkane for authentication, fetching/linking of wallets and to perform transactions.

The main Arkane component being used in this demo is Arkane Connect, a Javascript library, you can find the full documentation [here](https://www.npmjs.com/package/@arkane-network/arkane-connect).


![Demo app screenshot](https://github.com/ArkaneNetwork/DevoxxDemo/raw/initial-state/README/screen_demo.png "Demo app screenshot")
