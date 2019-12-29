const createTimeUnits = require('./createTimeUnitsInJSON');

function createTodayFile() {
    return new Promise((resolve, reject) => {
        const fileName = `username-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.json`;
        const todayFilePath = path.join(__dirname, `./data/`, fileName);
        
        fs.readdir(path.join(__dirname, '/data'), (err, files) => {
            if (err) throw err;
            const hasTodayFile = !!~files.indexOf(fileName);
            
            if (!hasTodayFile) {
                fs.readFile(path.join(__dirname, '/data', files[files.length - 1]), 'utf8', (err, data) => {
                    if (err) throw err;
                    
                    const constantData = JSON.parse(data, (k, v) => {
                        if (k !== 'time_units') return v;
                    });
                    constantData['time_units'] = createTimeUnits();
        
                    fs.writeFile(todayFilePath, JSON.stringify(constantData), err => {
                        if (err) throw err;
                        console.log('Today\'s file was created!');
                        resolve(todayFilePath);
                    });
                });        
            } else {
                resolve(todayFilePath);
            }
        });
    });
}

module.exports = createTodayFile;