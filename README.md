# [Project 11 - House Essential Commerce - Full-Stack E-Commerce App](https://mikesz88.github.io/house_essential_commerce_with_api/)

You are going to build a full-stack project. This is a critical portfolio piece that will help you land your first freelance projects and ultimately a full-time job.

Shopper is a full-stack application that is similar to Amazon.com.

You can use the interface and code you created in the Code Commerce app or you can build this all from scratch.
***I created a new one from scratch***

## Tech Used:
![HTML5](https://camo.githubusercontent.com/d63d473e728e20a286d22bb2226a7bf45a2b9ac6c72c59c0e61e9730bfe4168c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465) ![CSS](https://camo.githubusercontent.com/3a0f693cfa032ea4404e8e02d485599bd0d192282b921026e89d271aaa3d7565/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465) ![JavaScript](https://camo.githubusercontent.com/93c855ae825c1757f3426f05a05f4949d3b786c5b22d0edb53143a9e8f8499f6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d463744463145) ![React](https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)

## Requirements: 
***Front-end***

1. Build a homepage that shows product images, titles, and prices
2. Each item should have an Add to Cart button
3. There should be a navigation bar with a cart icon
4. The cart icon should update based on how many items are in it (ie 3, 5, 10)
5. Menu item for Login/Signup
6. User can sign up and log in
7. Each item should have a details page that has an Image, Title, Description, and price. A user can add to the cart as well as change the quantity.
8. All images in this project should be cached locally so they aren't downloaded each time

***Back-end***

For the backend, you will use the open-source Node API CommerceJS

1. Get started HERE (Follow the 3 steps in Account Setup)
2. From your Dashboard you will need to:
    1). Create 5 different product categories
    2). Create 5 different products in each of those categories
3. Each product needs an image, title, description, quantity and price

Note: You are using this pre-built back-end API to give your front-end the data you need. You should not have to write any backend code.

***Full-Stack***

1. You must get your front-end to "talk" to the CommerceJS API. This means downloading products, parsing the JSON, and then showing that UI in the app
2. You CANNOT use their SDK or CDN. You must use a standard HTTP library such as Fetch or Axios and you must parse the JSON yourself. All http request examples can be found in the documentation.
3. Use Postman or similar tool to test API calls are working.

End result: A user should be able to use your front end just as they might use Amazon.com. i.e.:

1. Display items
2. Sort by category
3. Product search
4. Add items to cart
5. Update cart item quantity
6. Remove items from cart
7. Proceed to checkout (price summary + tax zone rate (available through the API).
8. http and UI error handling. (i.e. UI handling for: user entered quantity that exceeds quantity in DB. Products failed to load. Error adding item to cart, etc)
   
All API actions are found in the CommerceJS API documentation and the data is saved on the backend.

<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
