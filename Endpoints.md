### params in [] are optional
## User Model
name (String)
bio (String)
friends (Array of names)
facebook (String)
linkedin (String)
pics (Array of urls)

## Endpoints

### GET /user_info
parameters: requested (String), requester (String)
returns: {status, user, isFriend}

### GET /mutual_friends
parameters: requested (String), requester (String)
returns: {status, mutual (array of names)}

### POST /add_pics
body: {name (String), pics (array of urls)}
returns: {status}

### POST /create
body: {name (String), bio (String), [facebook (String)], [linkedin (String)]}
returns: {status}

### GET /befriend
parameters: requested (String), requester (String)
return: {status}

### POST /delete
parameters: name (String)  
return: {status}