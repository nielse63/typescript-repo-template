#!/usr/bin/env node
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const readline = require('readline');
const cp = require('child_process');
const util = require('util');
const {
  getAuthorDetails,
  isDryRun,
  pwd,
  dirname,
  files,
} = require('./scripts/helpers');

const execPromise = util.promisify(cp.exec);
const exec = async (cmd, options = {}) => {
  const { stdout } = await execPromise(cmd, { ...options });
  return stdout.toString().trim();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (message, defaultValue = '') => {
  return new Promise((resolve) => {
    let prompt = `${message}`;
    if (defaultValue) {
      prompt = `${prompt} [${defaultValue}]`;
    }
    prompt = `${prompt}: `;
    rl.question(prompt, (answer) => {
      resolve(answer || defaultValue);
    });
  });
};

const prompt = async () => {
  const name = await ask('Repo Name', dirname);
  const defaultUser = await exec(
    'git config --get "credential.https://github.com.username"'
  );
  const user = await ask('GitHub User', defaultUser);
  const defaultAuthorName = await exec('git config --get "user.name"');
  const defaultAuthorEmail = await exec('git config --get "user.email"');
  const author = await ask(
    'Author',
    `${defaultAuthorName} <${defaultAuthorEmail}>`
  );
  const description = await ask('Description');
  const keywords = (await ask('Keywords'))
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean);
  rl.close();
  const date = new Date();
  const { name: authorName, email: authorEmail } = getAuthorDetails(author);
  return {
    name,
    user,
    author,
    description,
    keywords,
    version: '1.0.0',
    year: `${date.getFullYear()}`,
    authorEmail,
    authorName,
  };
};

const findAndReplaceInFile = async (file, hash) => {
  if (!fs.existsSync(file)) {
    return;
  }
  const content = await fsp.readFile(file, 'utf-8');
  let newContent = content;
  Object.entries(hash).forEach(([key, value]) => {
    let stringValue = `${value}`;
    if (Array.isArray(value)) {
      if (file.endsWith('.json')) {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = value.join(', ');
      }
    }
    newContent = newContent.replace(
      new RegExp(`{{${key}}}`, 'gm'),
      stringValue
    );
  });
  console.log(`writing ${path.basename(file)}`);
  if (!isDryRun) {
    await fsp.writeFile(file, newContent);
  }
};

const setup = async () => {
  const answers = await prompt();
  if (isDryRun) {
    console.log('config:\n', {
      pwd,
      ...answers,
    });
  }
  const promises = [...files].map((file) => {
    return findAndReplaceInFile(file, answers);
  });
  await Promise.all(promises);
  await exec('npm pkg delete scripts.setup');
  console.log('setup complete. you can now run `npm ci`');
};

setup().catch(console.error);
