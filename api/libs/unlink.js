const fs = require("fs");

const unlink = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${filePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${filePath}`);
    }
  });
};

module.exports = unlink;
