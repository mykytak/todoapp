# Introduction

Simple task manager.


# Installation

`docker run --rm -v "$(pwd)":/opt -w /opt laravelsail/php82-composer:latest bash -c "composer install"`  
`cp .env.example .env`  
Modify `.env` to your needs  
`./sail up`  
`./sail npm install`  
`./sail down`  


# Running

`./sail up` and it should be available on `http://localhost`  

Then you can  
`./sail artisan test` for backend tests and  
`./sail npm test` for frontend tests  


