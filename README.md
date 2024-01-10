# role_based

## Endpoints

| METHOD | ENDPOINT                    | DESCRIPTION                                                                              | STATUS CODE |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- | ----------- |
| POST   | /auth/signup                | Create a new user/admin account with email/phone or both email and phone, name, password, profileImage . role as Admin for admin account | 201         |
| POST   | /auth/login                 | Allow users/admins to log in using email/phone and password.                                    | 200         |
| PUT    | /user/updateprofile         | Users can modify their own name and profileImage. (protected/accessible by logged in user)               | 200         |
| DELETE | /user/deleteprofile         | Users can delete their own accounts.  (protected/accessible by logged in user)                                                       | 200         |
| GET    | /admin/users                | Admins can view details of all users and admins.  (protected/accessible by logged in Admin only)                                                    | 200         |
| PUT    | /admin/updateuser/:userId         | Admins can modify details of any user's email, phone, role. (protected/accessible by logged in Admin only)        | 200         |
| DELETE | /admin/deleteuser/:userId         | Admins can delete any user account.    (protected/accessible by logged in Admin only)                                                    | 200         |
