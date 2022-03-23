# Multitenant project

This project demonstates an HTTP api that communicates to 2 microservices.
For simplicity, i included the .env files
## API Installation

```bash
$ cd api

#start postgres service
$ docker-compose up

#install dependencies
$ yarn install

# development
$ yarn start
```

## microservices installation
##### *Repeat for 2nd service
```bash
$ cd microservices/source-service

#install dependencies
$ yarn install

# development
$ yarn start
```

### Testing

For testing purposes i have included a swagger page.
After installing all apps got to http://localhost:3000/api/