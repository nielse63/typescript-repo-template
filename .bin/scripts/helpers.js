const path = require('path');
const { execSync } = require('child_process');

const getAuthorDetails = (author) => {
  const emailMatches = author.match(/<(.*?)>/) || [];
  const nameMatches = author.match(/\b(.*?)\s(?=<)/) || [];

  return {
    name: nameMatches && nameMatches.length > 1 ? nameMatches[1] : '',
    email: emailMatches && emailMatches.length > 1 ? emailMatches[1] : '',
  };
};

const isDryRun = process.argv.includes('--dry-run');
const pwd = execSync('git rev-parse --show-toplevel').toString().trim();
const dirname = path.basename(pwd);
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
exports.files = files;
