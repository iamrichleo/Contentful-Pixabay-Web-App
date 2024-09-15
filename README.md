# My Contentful Pixabay Web App

This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Approach

In this project, I took a structured approach to integrate the Pixabay API into a field-level app for Contentful. The app allows users to search for images and embed them directly into Contentful entries. Key aspects of my approach include:

- **Component-based architecture**: I designed the app leveraging React Components and Emotion CSS-in-JS for styling, ensuring a modular and maintainable codebase.
- **Pixabay API integration**: A dedicated service layer was created to handle API requests to Pixabay, making it easier to manage API interactions.
- **Scalable design**: The app was designed to handle multiple image selections, pagination, and image removal while maintaining a clean and user-friendly UI.
- **Efficient state management**: React's state management was employed to track selected images, search results, and pagination, optimizing the overall user experience.
- **Image selection limitation**: I made the assumption to limit the user to add 5 images, as this seemed like a reasonable number to demonstrate the functionality without overwhelming the example application.

## Areas for Future Improvement

While the app is functional, several improvements can be made to enhance the overall experience and future scalability:

### 1. Use of More Modern Technologies
   Future iterations could leverage more modern technologies like **TypeScript**, **Next.js**, **Vite**, or **Bun** for improved performance, scalability, and maintainability.

### 2. Advanced Search Options
   The Pixabay API supports advanced search features such as filtering by popularity, categories, or specific image types. Adding these filters could provide users with more precise search results, improving the usability of the app.

### 3. Improved Metadata Handling
   Currently, the app only stores the `largeImageURL`. By storing more metadata, such as the image ID, we could restrict users from selecting the same image multiple times (if required by the product), and we could optimize performance by fetching smaller or alternative image sizes when needed.

### 4. Localization
   As Contentful is used internationally, introducing **localization** for all user-facing text would make the app accessible to a broader audience, supporting different languages and regions.

### 5. Logging and Analytics
   To better understand how users interact with the app, logging could be introduced. This would help track common user actions, monitor any error states in production, and gain insights into how the app is performing in real-life environments.


## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is  
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set:

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Using the `contentful-management` SDK

In the default create contentful app output, a contentful management client is
passed into each location. This can be used to interact with Contentful's
management API. For example

```js
// Use the client
cma.locale.getMany({}).then((locales) => console.log(locales));
```

Visit the [`contentful-management` documentation](https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#using-the-contentful-management-library)
to find out more.

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.
