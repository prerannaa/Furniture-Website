const fs = require('fs');
const path = require('path');

const chairsDir = path.join(__dirname, 'assets', 'furniture', 'chairs');
const outputJson = path.join(__dirname, 'assets', 'furniture', 'chairs.json');

fs.readdir(chairsDir, (err, files) => {
    if (err) {
        console.error('Error reading chairs directory:', err);
        process.exit(1);
    }
    // Filter for image files (jpg, jpeg, png, gif, webp)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    fs.writeFileSync(outputJson, JSON.stringify(imageFiles, null, 2));
    console.log(`Found ${imageFiles.length} images. chairs.json generated!`);
}); 