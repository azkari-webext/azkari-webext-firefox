# azkari
Azkar extension for web browser
Update the new tab page to include Muslim zekr and prayer time (adding day/night azkar soon)

**Add-on link on Firefox** https://addons.mozilla.org/en-US/firefox/addon/azkari-extension/ 


## Setup
### 1. Setup Node.js
Follow the guide on https://nodejs.org/en/download

### 2. Build the code locally
```
cd firefox
npm install
npm run build
```

### 3. Load it into your Firefox
- In firefox go to url "about:debugging#/runtime/this-firefox"
- Click on "Load Temporary Add-on"
- Browse to the `firefox/dist` folder and choose `manifest.json'

![](Screenshot_v0.1.0.png)

## Credits
- The background image is [designed by starline at Freepik](https://www.freepik.com/free-vector/mosque-cloud-islamic-new-year-greeting_5288906.htm) 
- The world cities used are extracted with the help of [this dataset](https://www.kaggle.com/datasets/bpmtips/all-cities-and-towns-extract-from-osm)
