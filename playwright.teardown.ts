import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown() {
  const authDir = path.join(process.cwd(), 'auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir);
    files.forEach(file => {
      if (file.startsWith('user-') && file.endsWith('.json')) {
        fs.unlinkSync(path.join(authDir, file));
        console.log(`🗑️ Global Cleanup: Deleted ${file}`);
      }
    });
  }
}

export default globalTeardown;