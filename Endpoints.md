## User Model
name (String)  
bio (String)  
friends (Array of names)  
facebook (String)  
linkedin (String)  
pics (Array of urls)  

## Endpoints

### GET /user_info
paramters: requested (String), requester (String)  
returns: {status, user, isFriend}  

### GET /mutual_friends
paramters: requested (String), requester (String)  
returns: {status, mutual (array of names)}  

### POST /add_pics
body: {name (String), pics (array of urls)}  
returns: {status}  
