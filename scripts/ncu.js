const ncu = require('npm-check-updates')
const packageFiles = [
  './package.json',
  './packages/features/package.json'
]

async function upgrade() {
  for (const file of packageFiles) {
    await ncu.run({
      packageFile: file,
      upgrade: true
    })
  }
}

upgrade()