1. Receive a HTTP request.
2. Handle the request with `http middleware` (async), mounting an ApplicationProperties object.
3. Call the application, passing the parameters.
4. The application uses a router, which is covered with routes. The pathname is used to use the right route! The router use injected logic
5. Run the code of the route, passing request and response custom objects.
6. Return the response received from the router function.