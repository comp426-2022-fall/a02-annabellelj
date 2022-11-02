#!/usr/bin/env node

import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const args = minimist(process.argv.slice(2));

if(args.h){
    try{
        console.log(`
            Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
            -h            Show this help message and exit.
            -n, -s        Latitude: N positive; S negative.
            -e, -w        Longitude: E positive; W negative.
            -z            Time zone: uses tz.guess() from moment-timezone by default.
            -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
            -j            Echo pretty JSON from open-meteo API and exit.
         `)
        process.exit(0);
    } catch(err){
        process.exitCode(1);
    }
}

const timezone = moment.tz.guest();

var latitude = args.n || args.s * -1;

var longitude = args.e || args.w * -1;

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude +'&hourly=temperature_2m&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

if(args.j){
    console.log(data);
    process.exit(0);
}

const data = await response.json();

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

if(data.daily.precipitation_hours == 0){
    console.log("You will not need your galoshes");
} else{
    console.log("You might need your galoshes")
}
