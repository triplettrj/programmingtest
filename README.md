# Spaghetti Diagram 

The project plots telemetry data onto a map of the where the telemetry data was taken.  The result is known as a Spaghetti Diagram.  The project is meant help manufacturing facilities or inventory wearhouses track workers or autonomous equipment in order to optimize work routes.

NextJS, supabase

https://programmingtest.vercel.app/Loginpage

## APIs
jwt_decode is used to set the supabase id and to display previously uploaded telemetry data and background image.
papaparse is used to parse the telemetry data, which is a .csv file, into json so it can be used by the chartjs api.
chartjs is used to plot the telemetry data.

## Instructions
1. Sign up using a working email and password.  Verify email address. Login.
or
use the credentials provided on the login page.
2. Enter Project Title, choose Background Image and Log File (telemetry data .csv file), submit.
Use the 2 example Background Image and Log File because you probable don't have these...
3. The Background Image will appear below for the user to preview
4. The link "You can now get Spaghetti so CLICK HERE and go there!" will appear above it.  Click on it to go to the Spaghetti Diagram page.
5. Amazing
6. The feature of adding a Stopping Point can be used.  Click anywhere in the image to add a stopping point

## Future Improvements
1. Save Spaghetti Diagram submissions to submitted Project Title and have users the option to look at previous submissions, or to add a new project.
2. Add Stopping Point to existing telemetry data and export for efficiency engineer use.
3. 


