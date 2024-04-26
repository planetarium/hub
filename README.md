# Contributing to the Mod Hub
To contribute a new mod to our mod hub, please follow these steps:

## Step 1: Fork the Repository
Fork the repository to your own GitHub account by clicking on the `Fork` button at the top right of the repository page.
## Step 2: Create Your Mod
Navigate to the `data/mods` directory in your forked repository.

Create a new JSON file for your mod. The file must be named using the format `{owner}.{mod_name}.json`. For example: `planetarium.ares.json`
## Step 3: Follow the Validation Rules
Ensure your JSON file adheres to the following validation rules:

- File Naming: The file must follow the {owner}.{mod_name}.json format.
- Content Requirements:
  - id: Unique identifier for the mod, must not exceed 30 characters.
  - title: Title of the mod, must not exceed 10 characters.
  - developer: Developer's name, must not exceed 15 characters.
  - summary: A brief summary of the mod, must not exceed 120 characters.
  - githubLink: A valid GitHub link starting with https://github.com/.
  - thumbnailExists: Boolean indicating if a thumbnail is provided.
  - tags: An array of tags that must exist in data/tags.json.
## Step 4: Add a Thumbnail (Optional but Recommended)
If thumbnailExists is set to true, upload a corresponding thumbnail image to the public/images directory.

The thumbnail should be in a 4:3 ratio and its file name should match the id of the mod.
Ensure the image file is not too large; aim for a size that balances quality and load efficiency.
## Step 5: Validate Tags
Add or verify tags in `data/tags.json` Each tag must not exceed 10 characters.
## Step 6: Submit a Pull Request
Push your changes to your fork and submit a pull request to the original repository.
Ensure your pull request describes the changes and additions made.
By following these guidelines, you help ensure that your mod can be easily integrated into our hub and accessed by users. Thank you for your contribution!
