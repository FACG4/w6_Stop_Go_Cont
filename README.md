# week6_StopGoContinue
[![Build Status](https://travis-ci.org/FACG4/w6_Stop_Go_Cont.svg?branch=master)](https://travis-ci.org/FACG4/w6_Stop_Go_Cont)

![S-T-C](https://image.freepik.com/vetores-gratis/desenho-de-semaforo-desenhado-mao_23-2147633184.jpg)

## Project idea
A simple Stop-Go-Continue App that allow you to Express your opinion and share your thoughts about the activates that done during the week  .

## HOW?
* Day 1:

   *  Discuss our website purpose and architecture.
   *  Creating our server,handler's,router's and starting to create our functions.
   *  Creating our DB.

* Day 2:
  * Completing our functions,handler's and router's.
  * Testing.
  * Deploying on Heroku and traves.

## What is the Sites structure?
  The site contains 2 folders:
  1. **public folder:**
  the frond end part contains two sub-folders :**css**: contains the img folder and style.css file, and **js folder** contains the (dom.js and logic.js).and contains the (index.html).

  2. **src folder:** The back end part contains the **database** folder that contains querjs folder >> (getdata.js and postdata.js) files and **test** folder that contains dbtest file and the **src** folder also contains(handler.js, server.js.and router.js)

## How to use ?
 * User Side :

    * Open url for the website .
    * Insert the post that you want to insert and set the another details .
    * Select the post button to send the data to the DB.
    * And then you can see your post and the other post's bellow .


  * Developer Side:

      ` git clone "git@github.com:FACG4/w6_Stop_Go_Cont.git"`

      Run `npm install` to install all dependencies`

  * Database:

   - Create a `config.env` file in the root of the project

   - Add the `DB_URL` variable ,`TEST_URL` variable


  Navigate to http://localhost:5000/ in your browser


[check the site](https://stop-go-cont.herokuapp.com/)

>Done By : Mohameed,Ishak,marwa,ramy.
