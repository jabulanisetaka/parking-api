# install

npm install

# run server

npm run dev

# Registering

http://localhost:8000/api/users

POST

# login with token

http://localhost:8000/api/users/login

Bearer Token Auth

POST

# See parkinglots

No auth needed

http://localhost:8000/api/parkinglots

GET

# admin create parking slots

http://localhost:8000/api/parkinglots/

username: admin@gmail.com
password: 123456

POST

# park car with token

http://localhost:8000/api/parkinglots/cars/

field:
parkinglotId: ObjectId
carBrand: String
licensePlate: String

POST

# get all users cars with token

http://localhost:8000/api/parkinglots/cars

GET

# Upload CSV with token

http://localhost:8000/api/parkinglots/cars

POST
