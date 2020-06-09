const download = require("download-git-repo");
// const download = require("download-git");
// download("https://github.com/promotion-xu/react-app", "test", (err) => {
//   console.log(err);
// });

// download("https://github.com/promotion-xu/react-app.git");

// const ghdownload = require("github-download");

// const exec = require("exec");

download(
  // "https://github.com:bear-new/latest-webpack-cli#master",
  "https://github.com:promotion-xu/react-app#master",
  "name",
  { clone: true },
  (err) => {}
);
