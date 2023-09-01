# Trip Planner Documentation

Welcome to the documentation for Trip Planner, a web app that lets you track city information from your IP address and plan road trips with various transportation modes.

## Overview

Trip Planner is a user-friendly web app that provides the following features:

- Get city information based on your IP address.
- Choose a destination city for your road trip.
- Plan your trip using different transportation modes.

## API Integration

This app integrates two APIs to power its functionalities:

1. **IP Geolocation API**: Retrieves city information based on your IP address.

   API Documentation: [IP Geolocation API Documentation](https://portal.thatapicompany.com/subscription/sub_bxrcw2zd6bu5rspl/overview)

2. **Intermodal Routing API**: Plans road trips with multiple transportation options.

   API Documentation: [Intermodal Routing API Documentation](https://developer.here.com/documentation/intermodal-routing/dev_guide/concepts/services.html)

## Features

### City Information

When you visit the app at [Trip Planner](https://amandaalexandre.github.io/trip-planner/), it automatically detects your IP address and retrieves city information using the IP Geolocation API. You'll learn details about your current city, including its name and country.

### Road Trip Planning

To start planning your road trip, simply enter your desired destination city in the search box on the app. Trip Planner fetches route information from the Intermodal Routing API, giving you options for various transportation modes, including trains, rideshares, cars, buses, and walking.

### Transportation Modes

Choose the transportation mode that best fits your preferences:

- Trains
- Rideshares
- Cars
- Buses
- Walking

For each mode, the app displays estimated travel time, distance, and any additional available information.

## Getting Started

1. Visit the [Trip Planner App](https://amandaalexandre.github.io/trip-planner/).
2. Grant location access for accurate city information.
3. Enter your desired destination city in the search box.
4. Explore different transportation options and select your preferred mode.

## Conclusion

Trip Planner simplifies road trip planning by providing real-time city information and multiple transportation options. Enjoy a seamless travel experience and make informed decisions using this intuitive web app.

For technical details, refer to the provided API documentation links.

Happy road tripping!
