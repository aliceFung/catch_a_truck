An implementation of one of the Uber coding challenges (finding nearby food trucks)

Live, here: [Find Food trucks in San Francisco](https://catch-a-meal.herokuapp.com/)

How to use - Input an address, and a map will show up focused at the location. Nearby trucks or food carts in the San Francisco area will appear. Clicking or tapping on these markers will provide more information about the given selection.

Technical Highlights:
Uses [SODA (datasf open data)](https://data.sfgov.org/developers) to provide information on carts.
Rails back-end performs queries to this api and pushes refined results to AngularJS front end.
The application should scale decently on mobile devices.

[Alice Fung](https://github.com/aliceFung/catch_a_truck) and [Donald Kelsey](https://github.com/shadefinale/catch_a_truck)