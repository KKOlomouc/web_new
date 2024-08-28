import { defineConfig } from "tinacms";
const dateTime = (new Date()).toISOString().split('T')[0];

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "dist",
    host: "0.0.0.0"
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "dist",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date'
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft'
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: 'Type',
            name: 'type',
            type: 'string',
            list: true,
            options: [
              {
                value: 'default',
                label: 'Default',
              }
            ]
          }
        ],
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${dateTime}-${values.title
                  ?.toLowerCase()
                  .replace(/ /g, '-')}`
            },
          },
        },
      },
    ],
  },
});
