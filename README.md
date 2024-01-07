# role_based

## Endpoints

| METHOD | ENDPOINT                    | DESCRIPTION                                                                              | STATUS CODE |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- | ----------- |
| POST   | /auth/signup                | Create a new user account with email, phone, name, password, and optional profile image. | 201         |
| POST   | /auth/login                 | Allow users to log in using email/phone and password.                                    | 200         |
| PUT    | /user/profile               | Users can modify their own name and profile image.                                       | 200         |
| DELETE | /user/profile               | Users can delete their own accounts.                                                     | 200         |
| POST   | /auth/create-admin          | Create a new admin account.                                                              | 201         |
| GET    | /admin/user/:userId         | Admins can view details of any user.                                                     | 200         |
| PUT    | /admin/user/:userId         | Admins can modify details of any user.                                                   | 200         |
| DELETE | /admin/user/:userId         | Admins can delete any user account.                                                      | 200         |
| POST   | /auth/signup (Image Upload) | Save profile images locally or integrate with a third-party service (e.g., Cloudinary).  | 201         |
