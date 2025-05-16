const fs = require('fs');
const path = require('path');

const scanFiles = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            scanFiles(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content
                .replace(/require$['"]lodash\.isequal['"]$/g, '{ isDeepStrictEqual } = require("node:util")')
                .replace(/import\s+.*?\s+from\s+['"]lodash\.isequal['"]/g, 'const { isDeepStrictEqual } = require("node:util")');
            fs.writeFileSync(fullPath, content);
        }
    });
};

scanFiles(process.cwd());
