const fs = require('fs');
const path = require('path');
  
  // Write to a file
  fs.writeFileSync('example.txt', 'Hello, world!', (err) => {
    if (err) throw err;
    console.log('File written successfully');
  });
  
  // Read from a file
  fs.readFileSync('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  
  //  rename file
  fs.renameSync('example.txt', 'newname.txt', (err) => {
    if (err) {
      console.error('Error renaming file:', err);
      return;
    }
    console.log('File renamed successfully');
  });
  
  //append file
  
  fs.appendFileSync('example.txt','welcomeback',(err)=>{
      if(err){
          console.log(err);
          console.log('data is successfully is append');
          
          fs.readFile('example.txt','utf-8',(err,data)=>{
                  console.log('append answer:',data);
                  
          })
      }
  })
  
  
  // Getting information for a file -stat
  fs.statSync("example.txt", (error, stats) => {
      if (error) {
          console.log(error);
      }
      else {
          console.log("Stats object for: example.txt");
          console.log(stats);
  
          // Using methods of the Stats object
          console.log("Path is file:", stats.isFile());
          console.log("Path is directory:", stats.isDirectory());
      }
  });
  
  //delete file
  fs.unlinkSync("newname.txt",
      (err => {
          if (err) console.log(err);
          else {
              console.log("\nDeleted file: newname.txt");
  
          }
      }));
  