*Full Stack App

--Non-autheticated user should't have access to the admin-panel

--Authenticated users have access to the admin-panel

--All users should be able to block or delete themselves or any other user.

--If user account is blocked or deleted any next user’s request should redirect to the login page.

--User can use any non-empty password (even one character). 

--Blocked user should not be able to login, deleted user can re-register.

--YOU HAVE TO CREATE A UNIQUE INDEX IN THE SELECTED DATABASE

--Use css framework -- next UI + Tailwind 

Pages
 --Login
 --Register
 --admin-panel


admin panel

					   block(red button with text)   unblock(icon)  delete(icon)
 🔳    id | name | e-mail | last-login | registration-time | status

 ✅     1  Jhon    jhon3@s   12/8/2024    12/7/2024           active

 🔳     2  Mau     mau3@ji   12/8/2024    12/7/2024           blocked




how to update data in the table

ask for the data in a server function

then send to the user the component with the data as a prop

the data should be render then




Create postgresSQLDB in Vercel or Turso
Create Server Actions to manipulate the DB
Add use Optimistic to improve UX


Start creating the Auth Module
