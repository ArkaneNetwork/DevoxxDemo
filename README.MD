# Devoxx Demo <img align="right" src="https://github.com/ArkaneNetwork.png?size=30" />

Small basic wallet application showcasing Arkane Connect.

* Authenticate through Arkane
* Fetch user's wallets (including link/unlink)
* Transfer a small amount of magical internet money

The Demo is connected to the staging environment of Arkane and is using the client '**Devoxx**', which is free to use in our playground. Applications that would like to be connected to the mainnet will receive their own personal client.

This repository contains 2 branches 
* [initial-state](https://github.com/ArkaneNetwork/DevoxxDemo/tree/initial-state)
* [finished-state](https://github.com/ArkaneNetwork/DevoxxDemo/tree/finished-state)

Initial-state is the code without Arkane integration, finished-state contains the code where we use Arkane for authentication, fetching/linking of wallets and to perform transactions.

The main Arkane component being used in this demo is Arkane Connect, a Javascript library, you can find the full documentation [here](https://www.npmjs.com/package/@arkane-network/arkane-connect).


![Demo app screenshot](https://github.com/ArkaneNetwork/DevoxxDemo/raw/initial-state/README/screen_demo.png "Demo app screenshot")
![Demo Arkane screenshot](https://github.com/ArkaneNetwork/DevoxxDemo/raw/initial-state/README/screen_demo_arkane.png "Demo Arkane screenshot")

### Explainer Video
[![Watch the video](https://github.com/ArkaneNetwork/DevoxxDemo/raw/initial-state/README/video.png)](https://www.youtube.com/embed/Xu-ofgrwKLw?autoplay=1&start=2040)

During our Devoxx talk, we explain the wallet demo, you can find the explanation in the video above.






