const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = ['./loaders/1.jpg', './loaders/2.jpg', './loaders/3.jpg'];

Spritesmith.run({ src: sprites }, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  //   console.log(result.image);
  //   console.log(result.coordinates);
  //   console.log(result.properties);
  fs.writeFileSync(path.join(__dirname, 'dist/sprite.png'), result.image);
});
