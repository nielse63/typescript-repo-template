const path = require('path');

const getAuthorDetails = (author) => {
  const emailMatches = author.match(/<(.*?)>/) || [];
  const nameMatches = author.match(/\b(.*?)\s(?=<)/) || [];

  return {
    name: nameMatches && nameMatches.length > 1 ? nameMatches[1] : '',
    email: emailMatches && emailMatches.length > 1 ? emailMatches[1] : '',
  };
};

const isDryRun = process.argv.includes('--dry-run');
const pwd = path.resolve(__dirname, '../..');
const dirname = path.basename(pwd);
const templatesDir = path.join(__dirname, 'templates');
const files = [
  'package.json',
  'package-lock.json',
  'README.md',
  '.github/settings.yml',
  'LICENSE',
];

exports.getAuthorDetails = getAuthorDetails;
exports.isDryRun = isDryRun;
exports.pwd = pwd;
exports.dirname = dirname;
exports.templatesDir = templatesDir;
exports.files = files;
