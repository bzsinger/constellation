var GitHub = require('github-api');
var fs = require('fs');

var gh = new GitHub({
  username: process.argv[2],
  password: process.argv[3]
})

var user = gh.getUser(gh.username);
user.listStarredRepos(function(err, _repos) {
   var repos = _repos;

   repos.sort(function(a, b) {
     if (a['full_name'].toLowerCase() < b['full_name'].toLowerCase()) return -1;
     if (a['full_name'].toLowerCase() > b['full_name'].toLowerCase()) return 1;
     return 0;
   })

   fs.writeFileSync('README.md', '# Stars \n' +
        '## <em>A list of repos I\'ve starred</em>\n');

   repos.forEach(function(repo) {
     fs.appendFileSync('README.md', '<strong>' + repo['full_name'] + '</strong> ');
     fs.appendFileSync('README.md', getShield(repo['full_name']) + '\n\n')

     var description = repo['description'];
     if (description !== null) {
       fs.appendFileSync('README.md', description + '\n\n\n </br>');
     } else {
       fs.appendFileSync('README.md', '\n </br>');
     }
   })
});

function getShield(full_name) {
   return '[![GitHub stars](https://img.shields.io/github/stars/' + full_name
      + '.svg?style=social&label=Star)](https://github.com/' + full_name + ')';
}
