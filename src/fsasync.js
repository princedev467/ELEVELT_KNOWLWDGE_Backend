const fs = require('fs');
const path = require('path');


// Write to a file
fs.writeFile('example.txt', 'Hello, world!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

// Read from a file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

//  rename file
fs.rename('example.txt', 'newname.txt', (err) => {
  if (err) {
    console.error('Error renaming file:', err);
    return;
  }
  console.log('File renamed successfully');
});

//append file

fs.appendFile('example.txt','welcomeback',(err)=>{
    if(err){
        console.log(err);
        console.log('data is successfully is append');
        
        fs.readFile('example.txt','utf-8',(err,data)=>{
                console.log('append answer:',data);
                
        })
    }
})


// Getting information for a file -stat
fs.stat("example.txt", (error, stats) => {
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

// readdirectory
fs.readdir(__dirname, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
      console.log(file);
    })
  }
})

//delete file
// fs.unlink("newname.txt",
//     (err => {
//         if (err) console.log(err);
//         else {
//             console.log("\nDeleted file: newname.txt");

//         }
//     }));



  //  mkdir -create directory
  fs.mkdir(path.join(__dirname, 'test'),
    (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    }); 

   
//rmdir :- remove directory
// fs.rmdir(path.join(__dirname, 'test'), (err) => {
//   if (err) {
//     console.log(err);
    
//   }
//   console.log('Folder removed');
// });