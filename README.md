# Volvo Programming Exercise

This project is composed of frontend and backend. Backend is deployed by default on port 3000 and Frontend is deployed by default on port 4200.

## Backend Installation and Execution

[Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies, run migrations and start the server.

```sh
cd backend
npm install
knex migrate:latest
npm run start
```

To run tests

```sh
npm run test
```

To learn how to call endpoints download the postman collection in the folder

```sh
/backend/api/Vehicles.postman_collection.json
```

## Frontend Installation and Execution

Install the dependencies and devDependencies and start the server.

```sh
cd frontend
npm install
ng serve
```

Thanks !
