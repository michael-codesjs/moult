const fs = require('fs');
const path = require('path');

// Paths
const PRISMA_CLIENT_PATH = path.join(__dirname, '../node_modules/.prisma/client');
const LAMBDA_FUNCTION_DIRS = fs.readdirSync(path.join(__dirname, '../.serverless'))
  .filter(dirname => dirname.endsWith('.zip') || fs.statSync(path.join(__dirname, '../.serverless', dirname)).isDirectory());

// Engine filename based on the target platform (rhel-openssl-1.0.x for AWS Lambda)
const ENGINE_FILE = fs.readdirSync(PRISMA_CLIENT_PATH)
  .find(file => file.endsWith('.node') && file.includes('rhel-openssl-1.0.x'));

if (!ENGINE_FILE) {
  console.error('Could not find the Prisma engine for rhel-openssl-1.0.x');
  process.exit(1);
}

console.log(`Found Prisma engine: ${ENGINE_FILE}`);

// Create temp directory if it doesn't exist
const TEMP_DIR = path.join(__dirname, '../.temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Copy the engine file to the deployment packages
for (const funcDir of LAMBDA_FUNCTION_DIRS) {
  const funcPath = path.join(__dirname, '../.serverless', funcDir);
  
  // If it's a directory (not a zip file), add the engine directly
  if (fs.statSync(funcPath).isDirectory()) {
    const targetPath = path.join(funcPath, ENGINE_FILE);
    console.log(`Copying engine to ${targetPath}`);
    fs.copyFileSync(path.join(PRISMA_CLIENT_PATH, ENGINE_FILE), targetPath);
  } 
  // If it's a zip file, we need to extract, add the engine, and rezip
  else if (funcDir.endsWith('.zip')) {
    console.log(`Function ${funcDir} is already zipped, skipping engine injection.`);
    // This would require a zip manipulation library to implement properly
  }
}

console.log('Successfully copied Prisma engines to Lambda deployment packages.'); 