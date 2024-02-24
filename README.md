# AirMap

A platform for visualizing real-time flight data.

## About

This project uses Mapbox through the React Map GL library, and the OpenSky Network API to get real-time aircraft info.
Note that there is a limit of 400 credits per day. A global query(all planes in the sky right now) costs 4 credits. Therefore, there are around 100 daily requests from OpenSky Network API for those without accounts.

## Built With
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![image](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)


## Getting Started

This program requires [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to be installed on your computer.

1. Fork and clone the repo onto your local computer.
2. Navigate into the root directory
3. Run ```npm install``` and wait for everything to finish installing.
4. Create a *.env* file in the root directory.
5. Go to the [Mapbox](https://account.mapbox.com/auth/signup) website and sign up.
6. After signing up, go to your [account](https://account.mapbox.com/).
7. Navigate to the [Access Token](https://account.mapbox.com/access-tokens) page. Click the "**Create Token**" button.
8. Complete the token creation process. Name the token whatever you want. Default scopes.
9. Copy and paste your token into your *.env* file. It should look like this:
```VITE_MAPBOX_TOKEN=whateverYourTokenIsFromSettingUpYourAccountAtMapbox```
10. It is crucial that the variable be named ```VITE_MAPBOX_TOKEN``` and that there are no spaces.
11. Run ```npm run dev``` in the root of the application to start the application. It should redirect you to the client automatically, but if not, the app can be found running on *[localhost:5173](localhost:5173)*

## Help

Refer to *package.json* for more commands.
Feel free to contact me in whatever form you deem best.

## Future Implementations
If I had more time, here are a few of the things I would love to implement:

- More advanced state management like Redux, Context, or Zustand to allow for calling the API before we get to the map to reduce map-load speed.
- Dark/Light theme switch, because that's always fun.
- Give the user the ability to filter the planes shown.
- Look at having the pins being a separate layer so the size can change depending on the zoom level. This would give users a more visually pleasant and responsive map.
- Check if calling the API based on currently observed geographic boundaries helps performance.
  - Check if calling the API in sections like this would help with performance as well.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Acknowledgments

* [OpenSky Network](https://opensky-network.org/)
* [Mapbox](https://www.mapbox.com/)
* [React Map GL](https://visgl.github.io/react-map-gl/)
* [Vite](https://vitejs.dev/)

