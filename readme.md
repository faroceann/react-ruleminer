React ruleminer
==========================================

This is a full stack Node.js/Python/ZeroRPC/Express/React.js app for performing association rule discovery in the browser. It allows a user to upload a CSV file of itemsets, set minimum confidence and minimum support values and then view mined association rules in a sortable table. It is intended to demo use of the [ruleminer API](https://github.com/maxhammad/ruleminer) that I developed, which uses a Python implementation of the Apriori algorithm that talks to a Node.js server via ZeroRPC. The ruleminer API project is bundled in with this project.

[Test out the demo here](http://ruleminer.maxhammad.com/)

## System Dependencies
* Python3
* ZeroRPC: used to facilitate communication between Node.js and Python3 in a service-oriented architecture. Due credit to Ian Hindsdale for making the initial [guide on communicating between Node.js and Python using ZeroRPC](https://ianhinsdale.com/post/communicating-between-nodejs-and-python/).
   * libevent 
   * ZeroMQ
   * pyzmq
* Node.js


## Installation

##### Install via git clone with system dependencies using Homebrew on Mac OS
```bash
# First install ZeroMQ
brew install zeromq

# Next install libevent, an event notification library required by zerorpc
brew install libevent

# Now install pyzmq: Python bindings for ZeroMQ
pip install pyzmq

# Now we can install ZeroRPC
pip install zerorpc

# Clone the repo
$ git clone https://github.com/maxhammad/react-ruleminer.git
$ cd ruleminer
$ npm install
```


##### Install via git clone with system dependencies on Ubuntu 
```bash
#!/bin/bash

# Simple script for installing ZeroRPC on Ubuntu 12.04 LTS
# https://ianhinsdale.com/post/communicating-between-nodejs-and-python/

# First install ZeroMQ
sudo apt-get install libzmq-dev

# Next install libevent, an event notification library required by zerorpc
sudo apt-get install libevent

# Python dependencies

# Now install pyzmq: Python bindings for ZeroMQ
# If you don't already have pip installed:
sudo apt-get install python-setuptools
sudo apt-get install python-pip
sudo pip install pyzmq

# Now we can install ZeroRPC
sudo pip install zerorpc

# Clone the repo
$ git clone https://github.com/maxhammad/react-ruleminer.git
$ cd ruleminer
$ npm install
```

##### Install via git clone

```bash
$ git clone https://github.com/maxhammad/react-ruleminer.git
$ cd ruleminer
$ npm install
```
