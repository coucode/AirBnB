# Welcome to Aircnc!
Aircnc is a web application inspired by Airbnb that offers short-term rentals of various property types. 
* [Click here to view Aircnc Live Site](https://aircnc-co.herokuapp.com/)

Please see below links to Project Wiki
* [API Documentation](https://github.com/coucode/AirBnB-clone/wiki/API-Documentation)
* [Database Schema](https://github.com/coucode/AirBnB-clone/wiki/Database-Schema)
* [Feature List](https://github.com/coucode/AirBnB-clone/wiki/Feature-List)
* [Redux State Shape](https://github.com/coucode/AirBnB-clone/wiki/Redux-State-Shape)

This project is built with:
* Express
* Sequelize
* PostgreSQL
* React
* Redux 

## Features Directions
### Splash Page: 
Authenticated and unauthenticated users can view listings on the splash page of Aircnc. 
You will be able to test the features without sign up by clicking on the "Log In" button, then Sign in with Demo User
<img width="1426" alt="image" src="https://user-images.githubusercontent.com/103226832/200201034-cd668fc0-4a75-4732-ad49-8c0abc299efe.png">

### Log In: 
You can log in using your credentials or as a demo user. 
<img width="1431" alt="image" src="https://user-images.githubusercontent.com/103226832/200201085-af60896a-ad32-4434-a716-67576168aa8e.png">


### Sign Up: 
You can also create your own account by clicking on the "Sign Up" button and filling out the form. 
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/103226832/200201063-8d7ff208-d17a-41b3-be79-7473858cf10b.png">


### Create a listing
As a signed in user, you can create a new spot/listing by clicking the "Create a new listing" button and filling out the form.
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/103226832/200201107-958989cd-9f17-4c40-8847-c71e87b7cd4b.png">


### View your listings
As a signed in user, you can view your listings by clicking on the profile button on the top right. This opens a dropdown menu that has an option to click Your Listings.
<img width="1437" alt="image" src="https://user-images.githubusercontent.com/103226832/200201118-508be5a8-df1c-482b-8bc5-e6d734621bc8.png">
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/103226832/200201126-44e2b5a9-bcf8-4173-ae61-f05db114d1ad.png">


### Edit a listing
As a signed in user, you can edit your listing by clicking the "Edit Listing" button and filling out the form.
<img width="1432" alt="image" src="https://user-images.githubusercontent.com/103226832/200201138-97f353e6-d94d-4d7c-83fc-19cc649057f1.png">
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/200201145-d1040fcf-aa2b-49f6-8a37-9de83f22ee47.png">

### Delete a listing
As a signed in user, you can edit your listing by clicking the "Delete Listing" button.
<img width="1432" alt="image" src="https://user-images.githubusercontent.com/103226832/200201138-97f353e6-d94d-4d7c-83fc-19cc649057f1.png">

### View a Spot/Listing's details and reviews
As a guest or logged in user, click on a spot/listing to view the spot/listing's details as well as available reviews
<img width="1429" alt="image" src="https://user-images.githubusercontent.com/103226832/200201162-954c3cbc-bd15-4f5a-8784-8254e00c6597.png">
<img width="1422" alt="image" src="https://user-images.githubusercontent.com/103226832/200201173-5566e956-ddcb-4211-b80b-59d2a54d20bf.png">


### Write a Review
As a signed in user, you can write a review. The owner of the spot/location will not be able to write a review for their own spot/listing. 
<img width="1432" alt="image" src="https://user-images.githubusercontent.com/103226832/200201201-3925afed-38d8-4d5b-b122-19356e5aae90.png">

### Delete a Review
As a signed in user, you can delete a review that you wrote by clicking "Delete Review". Users cannot delete reviews belonging to another person. 
<img width="1423" alt="image" src="https://user-images.githubusercontent.com/103226832/200201236-97546dbf-9e4c-45d1-93e9-f702442965ea.png">

### View and Delete your Bookings
As a signed in user, you can click on the drop down on the left hand side to navigate to your bookings as well as delete upcoming bookings.
<img width="1424" alt="image" src="https://user-images.githubusercontent.com/103226832/200201249-592e58c4-06b4-4287-ae7b-cb8e0d8f3d74.png">
<img width="1428" alt="image" src="https://user-images.githubusercontent.com/103226832/200201346-160983e8-3e3e-474f-904b-4b2ce2fc3acd.png">

### Create a Booking
AS a signed in user, you can navigate to a spot and book the spot by picking from available dates on the calendar.
<img width="1435" alt="image" src="https://user-images.githubusercontent.com/103226832/200201355-1519fa94-efc9-479d-968c-bbaf4e016a3c.png">


## Local Installation
To run this application locally, you will need Node.js and NPM. This root folder contains a backend and frontend directory. 

### Step 1: Download
Clone the project repository in your terminal
```
git clone https://github.com/coucode/AirBnB-clone.git
```

### Step 2: Backend Setup
#### Server Installation
Inside of the ```/backend``` directory, run the following command in the terminal to set up the necessary Node.js dependencies for running the backend server and database. 
```
npm install
```
#### Database Creation
Create a .env file in the ```/backend``` directory based on the .env.example
```
PORT=
DB_FILE=
JWT_SECRET=
JWT_EXPIRES_IN=
```
Migrate and seed the database using the following commands. The seeder file is necessary in order to log in as a demo user.
```
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
Run the server by executing the following command in the ```/backend``` directory.
```
npm start
```

### Step 3: Frontend Setup
Navigate to the ```/frontend``` directory, run the following command to set up the necessary Node.js dependencies and then start the server
```
npm install
npm start
```

