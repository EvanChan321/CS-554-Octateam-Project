# GameShare 
@authors Octavio, Allan, Jude Evan

## running the app
To install all the library dependencies, use the command:
```
npm install 
```
Make sure the .env file is at the root of your directory
Use 
```
npm run dev 
```
to start the server

## Creating the Dockerimage
run 
```
docker build -t game-share .
```
to build the docker image.

Then run 
```
docker run -p 3000:3000 game-share
```
to run the image

Vercel Link:
https://webdevfinal-etnjdtxoa-octavio-morales1s-projects.vercel.app/