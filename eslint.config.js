export default [
  {
    files : ['**/*.js' ],      //only check .js files in server directories
    rules : {
        semi : 'error' ,
      'no-unused-vars' : 'warn'    //warn if variables are unused 
    },
  },
];
