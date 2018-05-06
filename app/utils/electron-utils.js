const app = require('electron').remote.app;
const fs = require('fs');
const path = require('path');

export const saveToTempFolder = async (filename, folderName = '') => {
  const tempFolder = app.getPath('userData');
  const folderPath = path.join(tempFolder, folderName);
  const filePath = path.join(folderPath, filename);

  // creates folder if it doesn't exist
  await mkdirp(folderPath);

  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, err => {
      if (err) reject(err);
      else {
        console.log('written file to temp folder', filePath);
        resolve();
      }
    });
  });
};

/* https://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist */
function mkdirp(path, mask = 484) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, mask, err => {
      if (err) {
        if (err.code == 'EEXIST')
          resolve(); // ignore the error if the folder already exists
        else reject(err); // something else went wrong
      } else resolve(); // successfully created folder
    });
  });
}
