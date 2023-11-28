## Hosted Project

[Student-Registration App Cyclic URL](https://amethyst-coypu-gown.cyclic.app/api/v1)

#### Setup Basic Express Server

# Student Registration App Schema Design

## User Story

- As a student, I should be able to register or signup and retrieve information concerning myself. 
- Students can register or login to their account and are able to view their details. 
- Only registered students can upload their images which will be stored in the cloud and can be accessed by themselves and admin/super-admin.
- Students can only access information pertaining to themselves as they wont be able to access information concerning other students.
- Admins and super-admin can sign up and login to their accounts.
- Only Admin/Super-Admin can get information about all students and other sensitive statistics concerning the students.
- Only super-admin can delete an admin or students profile. 
- Super Admin can execute all functions of an admin.
- I created a checkPermissions function which limits the access of students' resources by anyone except the owner of the resource or admin/super-admin.
- Once a student, admin/super-admin is logged out, their tokens gets saved in the Blacklisted Tokens which prevents them from accessing other routes unless they login afresh.

## Requirement Analysis

### Entities:

- Authentication: This allows for registering and enabling students,admin,super-admin login to their account and also logging out
- Student: A student has a unique identifier, fullname, email, password, faculty, department amongst other features.
- StudentPhoto: This contains profile pictures of students and only valid students can upload their images.
- Admin: An admin or super-admin has a unique identifier, name, email, password and role.
- Analytics: This provides statistical data for analytics on the mobile app.
- BlackListed Token: This shows all the tokens of logged out students and admin.


### Postman Link:
https://www.postman.com/galactic-resonance-793427/workspace/babban-gona-hackathon/collection/26636754-1a805b8c-845a-4776-a9fd-1ca256404349?action=share&creator=26636754

### Server Link:
https://amethyst-coypu-gown.cyclic.app/api/v1

