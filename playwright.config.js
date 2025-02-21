// @ts-check
const {  devices } = require('@playwright/test');

const config = {

  testDir: './tests',
  retries: 1,

  /*
  workers: 2,
  */

  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',
  use: {
    
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace: 'on', //off, on , retain-on-failure


    /*
video: 'retain-on-failure',
ignoreHttpsErrors:true;
permissions:['geolocation']
...devices['']
viewport : {width:720, height:720}
    */


  },
};

module.exports = config;