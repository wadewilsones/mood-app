# Hello there

## This is short explanation how to get started:

1. Clone the repo:

```
git clone https://github.com/wadewilsones/mood-app.git
```

2. Install modules

```
npm install
```

3. Set up Database. 
Create DB with your credentials 

```
    user: 'yourusername', 
    password:'yourpassword',
    database:'yourdbname',
    host:'localhost',
    port:5432,
    
```
4. Create role and add tables from database.sql to your previous created database.
5. For getting Weather API you will need your own API key from https://openweathermap.org/api. After you had obtained it, you can change Weather.js.
6. 
```javascript

const API_KEY = 'type ypur API here'

```

7. Run localhost

```
npm run serve
```

6. Go to client folder and run react app

```
cd client

npm run start

```




