import * as fs from 'fs'
import { Database } from 'bun:sqlite'
const prompt = "Type something: ";
const writeJSON = true
process.stdout.write(prompt);
for await (const line of console) {
//   console.log(`You typed: ${line}`);
if (line === 'exit') {
    process.exit(0);
}
if (line === 'clear' || line == '') {
    console.clear();
    process.stdout.write(prompt);
    continue;
}
const db = new Database('test.sqlite')
try {
    const json = db.prepare(line).all() 
    console.log(db.prepare(line).all())
    if (writeJSON) {
        fs.writeFileSync(process.cwd()+'/output.json', JSON.stringify(json, null, 2))
    }   
} catch (error) {
    console.log(error)
}
process.stdout.write(prompt);
};