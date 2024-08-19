/**
 * Django `ImageField` expects a file name with valid image extension like .jpg, .png, etc
 * but the javascript `Blob` object doesn't have a file name and so, you have to define it
 * yourself when adding the blob to form data:
 * formData.append('field-name', dataBlob, 'filename.ext')
 * 
 * We are using the Open API generator to generate the API client and the generator
 * hides form handling details including the process of appending fields to form data and we
 * can't directly override the `profilesPartialUpdateRaw` method of `ProfilesApi` class by
 * methods like inheritance because the method is just so big that overriding it means to
 * literally write it from scratch.
 * 
 * Since what we are doing is just simply passing the third parameter to `formData.append`
 * method to provide a file name and extension, this script is written to automatically 
 * edit the contents of the generated file (after generation is completed) and perform the
 * changes as desired.
 * 
 * If you are thinking: `well, if the file name is a fixed constant string, the server will
 * receive duplicate file names` your assumption is true but the Django server will handle
 * this case gracefully by adding some random elements into the file name string 
 * 
 * Note: This script is invoked inside `gen:api` script of `package.json` file, immediately after
 * the openapi-generator-cli script is done generating.
 * 
 * Review: This script is just a temporary fix and is not flexible enough to handle following scenarios:
 * 1. If the internal implementation of API client generated by open api generator changes, there's
 * a high possibility that this script will crash
 * 2. If we decide to add file fields to any other API in the future, we will need to edit this file
 * to handle the new fields as well which in long term can be tedious and time consuming
 */

const fs = require('fs');
const path = require('path');

// Define the file path relative to package.json
const filePath = path.join(__dirname, 'src/gen/apis/ProfilesApi.ts');

fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    const lines = data.split('\n');

    const modifiedLines = lines.map((line, index) => {
        // Check if the current line has already received the necessary modification
        if (line.includes('requestParameters.profileImg as any, \'prof-img.png\'')) {
            console.log('Modification has already been done on line ', index+1)
            return line
        }
        // Check if the current line contains the target string
        if (line.includes('requestParameters.profileImg as any')) {
            // Insert "// @ts-ignore" on the line above the match
            if (index > 0) {
                line = ' // @ts-ignore\n'+line;
            }
            return line.replace('requestParameters.profileImg as any', 'requestParameters.profileImg as any, \'prof-img.png\'');
        }
        return line; // Return the line unchanged if it doesn't contain the target string
    });

    // Join the modified lines back into a single string
    const newData = modifiedLines.join('\n');

    // Write the modified content back to the file
    fs.writeFile(filePath, newData, 'utf8', function(err) {
        if (err) console.error("Error writing file:", err);
    });
});