#Tidetracker

Tidetracker is a mobile app, written in React native. The main idea is to learn the technology and get an app on Appstore and Google play.

Necessary steps to install
````
$ npm install
$ npm install -g rnpm
$ npm install --save react-native-vector-icons
$ rnpm link react-native-vector-icons
````
##To Do
1. Get place name in a consistent way
2. Make DRY
3. Make it possible to remove favorite from Db
4. Add icons to menu Drawer
5. Colors and styling

##Fetch geo info
###Localization
1. Get lat and long from GPS
2. Call Google Place Search API
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&name=cruise&key=AIzaSyDcPQgloYnEPtxh8_WV-qHFVkwFajLS6Ls
3. Read name of json result

###Autocomplete
1. Use autocomplete API
2. Read place_id
3. Call Place details API with place id as parameter
4. Read name of json response
