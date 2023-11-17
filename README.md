# Introduction

Simple task manager.


# Installation

`docker run --rm -v "$(pwd)":/opt -w /opt laravelsail/php82-composer:latest bash -c "composer install"`  
`cp .env.example .env`  
Modify `.env` to your needs  
`./sail up`  
Make sure you wait till mysql initializes. In case of troubles, you can remove volume with `docker-compose down -v` and try again  
`./sail artisan key:generate`  
`./sail artisan migrate`  
`./sail npm install`  
`./sail down`  

In case of the troubles with permissions, you can run `./fix-perms.sh`.  


# Running

`./sail up` and it should be available on `http://localhost`  

Then you can  
`./sail artisan test` for backend tests and  
`./sail npm test` for frontend tests  


