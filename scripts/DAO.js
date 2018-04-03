
var dbPromise = idb.open('lifecoach', 3, function(db) {

    if (!db.objectStoreNames.contains('users')) {
    var myObjectStore = db.createObjectStore('users', {keyPath: 'Rowid', autoIncrement: true});

    myObjectStore.createIndex('name','name');
  }
    if (!db.objectStoreNames.contains('food')) {
    var foodObjectStore = db.createObjectStore('food', {keyPath: 'Rowid', autoIncrement: true});
    foodObjectStore.createIndex('name','name')
  }

});



function writeData(st, data) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}
function readOneData(st, Rowid) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.get(Rowid);
    });
}


function dataURItoBlob(dataURI) {
    console.log('URI thingie');

    var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1];
    return new Blob([atob(arr[1])], {type:mime});

  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}
function search4(st,key, data) {
  return dbPromise
    .then(function(db) {
      console.log('trying');
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      var descIndex = store.index(key);

      var ee = descIndex.get(data) // = e => console.log('here1:',e.target.result);
   return ee

    });
}
