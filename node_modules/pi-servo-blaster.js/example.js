var piblaster = require("pi-servo-blaster.js");

// Set first pin at 40% using pi blaster
piblaster.setPwm(0, 0.4);

// Set second pin at 100% using pi blaster
piblaster.setPwm(1, 1);

// Set third pin at 80% using servo blaster
piblaster.setServoPwm(0, 0.8);
