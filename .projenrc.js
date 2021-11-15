const { TypeScriptAppProject } = require('projen');
const project = new TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'repository-pattern',

  deps: [
    'express',
    'body-parser',
    'cors',
    'dotenv',
    'joi',
    'mongoose',
    'passport',
    'passport-jwt',
    'bcrypt-nodejs',
  ], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@types/node',
    '@types/bcrypt-nodejs',
    '@types/cors',
    '@types/mongoose',
    '@types/passport',
    '@types/passport-jwt',
    'nodemon',
  ], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
  tsconfig: {
    compilerOptions: {
      outDir: 'dist',
      allowSyntheticDefaultImports: true,
      moduleResolution: 'node',
      esModuleInterop: true,
      target: 'es6',
    },
  },
  scripts: {
    serve: 'nodemon --exec node ./dist/server.js',
  },
  gitignore: [
    '.env',
  ],
});
project.synth();