const fs = require('fs');
const path = require("path");
const readline = require('readline');
const cliProgress = require('cli-progress');

let deleteList = 'sitemap_need_to_be_deleted.txt';
let toCompareList = 'output-3.93.94.187.txt';

var deleteListArr = require('fs').readFileSync(deleteList, 'utf-8')
    .split('\n')
    .filter(Boolean);

var toCompareListArr = require('fs').readFileSync(toCompareList, 'utf-8')
    .split('\n')
    .filter(Boolean);

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(toCompareListArr.length - 1, 0);

let existCount = 0;
let outputArr = [];
for (let i = 0; i < toCompareListArr.length; i++) {
    let toCompareListLine = toCompareListArr[i].trim();

    let found = false;
    for (let j = 0; j < deleteListArr.length; j++) {
        let deleteListLine = deleteListArr[j].trim();
        if (deleteListLine === toCompareListLine) {
            existCount++;
            outputArr.push(deleteListLine)
            console.log('exists: ' + deleteListLine);
            found = true;
            break;
        }
    }

    bar1.update(i);
}

bar1.stop();

console.log('total existing urls: ' + existCount);

fs.writeFileSync('exist-3.93.94.187.txt', outputArr.join('\n'));