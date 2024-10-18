# Code and Pepper
Interview Task

## App Deployment
The app is deployed on Vercel:
[Interview Task on Vercel](https://vercel.live/link/interview-task-16fkbiqcf-gstraczeks-projects.vercel.app?via=deployment-screenshot&p=1)

## Running the Project Locally with Docker Compose
To run the project locally, use Docker Compose:

```sh
docker build -t investments:latest .
docker compose up --build -d
```

## Seeding the Database with Initial Data
To seed the database with initial data, run:
```sh
npm run prisma:setup
```

## Login Credentials
    - email: test@test.pl
    - password: test

## To run unit tests
```sh
npm run test
```

## To run cypress E2E tests 
```sh
npm run cypress:open
```
