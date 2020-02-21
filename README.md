# Bulk Purchase App

## Setup

#### Node

For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:
```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### Packages

```
cd frontend
npm install
cd ../backend
npm install
```

## Running the App

Run Mongo daemon:
```
sudo mongod
```

Run Backend:
```
cd backend
nodemon server.js
```

Run Frontend
```
cd frontend
npm start
```
Navigate to localhost:3000/ in your browser.

