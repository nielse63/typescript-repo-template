#!/usr/bin/env node
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pwd = path.resolve(__dirname, '..');
const dirname = path.basename(pwd);
const templatesDir = path.join(__dirname, 'templates');
const files = [
  'package.json',
  'package-lock.json',
  'README.md',
  '.github/settings.yml',
];
const templates = [...files].reduce((output, file) => {
  const dest = path.join(templatesDir, `${file}.tpl`);
  return {
    ...output,
    [path.basename(file)]: dest,
  };
}, {});
const sources = [...files].map((file) => path.join(pwd, file));

const getPackageJson = async () => {
  const content = await fs.readJSON(path.join(pwd, 'package.json'));
  return content;
};

const createTemplateFromStringFile = async (file, answers) => {
  const content = await fs.readFile(file, 'utf-8');
  let newContent = content;
  Object.entries(answers).forEach(([key, value]) => {
    const stringValue = Array.isArray(value) ? value.join(', ') : value;
    newContent = newContent.replace(new RegExp(stringValue, 'g'), `{{${key}}}`);
  });
  await fs.writeFile(templates[path.basename(file)], newContent);
};

const createTemplateFromJsonFile = async (file, answers) => {
  const content = await fs.readFile(file, 'utf-8');
  let newContent = content;
  Object.entries(answers).forEach(([key, value]) => {
    const stringValue = Array.isArray(value) ? value.join(', ') : value;
    newContent = newContent.replace(new RegExp(stringValue, 'g'), `{{${key}}}`);
  });
  console.log({ file, newContent });
};

const copySourceToTemplate = async (answers) => {
  const promises = sources.map(async (file) => {
    if (file.endsWith('.json')) {
      console.log('json file');
    } else {
      return createTemplateFromStringFile(file, answers);
    }
  });
  await Promise.all(promises);
};

const backup = async () => {
  const pkg = await getPackageJson();
  const answers = {
    name: pkg.name,
    user: 'nielse63',
    author: pkg.author,
    description: pkg.description,
    keywords: pkg.keywords,
    version: pkg.version,
  };
  await copySourceToTemplate(answers);
  // const answers = await prompt();
  // const promises = templates.map((file) => {
  //   return findAndReplaceInFile(file, answers);
  // });
  // await Promise.all(promises);
  // console.log(replaceHash);
};

backup().catch(console.error);
