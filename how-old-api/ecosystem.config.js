module.exports = {
  apps: [
    {
      name: 'howold.com',
      script: './bin/www',

      watch: true,
      ignore_watch: ['public/**/*', 'views/**/*.ejs'],
    },
  ],
};
