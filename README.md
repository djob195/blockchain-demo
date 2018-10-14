# My fist blockchain

This project develops concepts of the Blockchain

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node JS
```

### Installing


```
cd to project path
npm install
```


## Running the tests

### My first block

* Test to instance a block
* Test to Genesis Function
* Test to mineBlock Function
```
cd to project path
npm run 
```

### Server peer to peer
* Original server (first)
```
nodemon ./app
```

* Other peer, where:

** N is unique number peer
** Z is original server

```
 HTTP_PORT=300N P2P_PORT=500N PEERS=ws://localhost:500N-1,ws://localhost:500N-2, ... ws://localhost:500Z N npm run dev
```

## Built With

* [Node.js](https://nodejs.org/es/) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.


## Authors

* **Diego Orellana** - *Initial work* - [djob195](https://github.com/djob195)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Start learning basic blockchain concepts
