/// <reference path="utility-functions.ts" />

const r1 = Utility.maxBooksAllowed(10);
console.log(r1);

import util = Utility.Fees;
const r2 = util.calculateLateFee(2);
console.log(r2);
