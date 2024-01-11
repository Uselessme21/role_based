# role_based

## Setup

 1. clone this repo using  ```git clone``` in your local system.
 2. install all the dependencies using ```git install``` .
 3. create .env file and provide variables  ```MONGOURL, SECRET_KEY, SALT, PORT``` .
 4. start server with ```npm run server```.


## Endpoints

| METHOD | ENDPOINT                    | DESCRIPTION                                                                              | STATUS CODE |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- | ----------- |
| POST   | /auth/signup                | Create a new user/admin account with email/phone or both email and phone, name, password, profileImage . role as Admin for admin account | 201         |
| POST   | /auth/login                 | Allow users/admins to log in using email/phone and password.                                    | 200         |
| PUT    | /user/updateprofile         | Users can modify their own name and profileImage. (protected/accessible by logged in user)               | 200         |
| GET    | /user/viewprofile         | Users can view their own profile. (protected/accessible by logged in user)               | 200         |
| DELETE | /user/deleteprofile         | Users can delete their own accounts.  (protected/accessible by logged in user)                                                       | 200         |
| GET    | /admin/users                | Admins can view details of all users and admins.  (protected/accessible by logged in Admin only)                                                    | 200         |
| PUT    | /admin/updateuser/:userId         | Admins can modify details of any user's email, phone, role. (protected/accessible by logged in Admin only)        | 200         |
| DELETE | /admin/deleteuser/:userId         | Admins can delete any user account.    (protected/accessible by logged in Admin only)                                                    | 200         |

## USER SCHEMA
    
```js
{
  email: { type: String, unique: true, required: true, lowercase: true },
  phone: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // saved as string in database but provided as file while signup or update
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
}
```