module.exports = {
  sources: {
    mainHtml: './app/index.html',
    mainJs: './app/scripts/main.js',
    vendorJs: './app/scripts/vendor.js',
    scripts: './app/scripts/**/*.js',
    styles: './app/styles/**/*.scss',
    views: './app/views/**/*.html',
    images: './app/images/**/*.png'
  },
  dist: {
    root: './dist/',
    scripts: './dist/js/',
    styles: './dist/css/',
    views: './dist/views/',
    images: './dist/images/'
  }
};
