pi-servo-blaster.js
===================

[![license](http://img.shields.io/badge/license-Apache-blue.svg?style=flat)](https://raw.githubusercontent.com/acevedodamian/pi-blaster/master/LICENSE)
[![npm](http://img.shields.io/npm/v/pi-servo-blaster.js.svg?style=flat)](https://www.npmjs.com/package/pi-servo-blaster.js)


NodeJS library for the [pi-blaster daemon][pi-blaster], and the [servo blaster daemon][servo-blaster].

## Installation
    
Make sure you have `node` and `npm` installed on your Raspberry Pi.

Install the pi-blaster daemon ([instructions][pi-blaster]).
And install the ServoBlaster daemon ([instructions][servo-blaster]).

Finally install `pi-servo-blaster.js`:
    https://www.npmjs.com/package/pi-servo-blaster.js

    npm install pi-servo-blaster.js
    
## Usage

    var piServoblaster = require('pi-servo-blaster.js');
    
    // Set first pin at 40% using pi blaster
    piblaster.setPwm(0, 0.4);
    
## License

Copyright 2014 - Damian Acevedo. Published under the Apache open source license (see full license in LICENSE.txt file).

## Credits

Original version forked from code written by Thomas Sarlandie.
    https://github.com/sarfata/pi-blaster.js/

[pi-blaster]: https://github.com/sarfata/pi-blaster
[servo-blaster]: https://github.com/richardghirst/PiBits/tree/master/ServoBlaster