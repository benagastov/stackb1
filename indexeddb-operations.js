// indexeddb-operations.js

let db;

function initDB() {
  db = new Dexie('CSVDatabase');
  db.version(1).stores({
    csvData: '++id, *data',
  });
}

async function saveCSVToIndexedDB(csvData) {
  try {
    await db.csvData.clear();
    await db.csvData.add({ data: csvData });
    console.log('CSV data saved to IndexedDB');
  } catch (error) {
    console.error('Error saving CSV data to IndexedDB:', error);
  }
}

async function getCSVFromIndexedDB() {
  try {
    const result = await db.csvData.toArray();
    return result[0]?.data || [];
  } catch (error) {
    console.error('Error retrieving CSV data from IndexedDB:', error);
    return [];
  }
}

function generateDummyData() {
  const headers = ['ID', 'Name', 'Age', 'City', 'Occupation'];
  const data = [headers];
  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
  const occupations = ['Engineer', 'Teacher', 'Doctor', 'Artist', 'Scientist'];

  for (let i = 1; i <= 20; i++) {
    const row = [
      i,
      `Person ${i}`,
      Math.floor(Math.random() * 50) + 20,
      cities[Math.floor(Math.random() * cities.length)],
      occupations[Math.floor(Math.random() * occupations.length)],
    ];
    data.push(row);
  }

  return data;
}

async function generateAndSaveData() {
  const csvData = generateDummyData();
  await saveCSVToIndexedDB(csvData);
  setCurrentData(csvData); // Store the current data
  updateTable(csvData);
  updateColumnSelector(csvData[0]);
}

async function loadDataFromIndexedDB() {
  let csvData = await getCSVFromIndexedDB();
  if (csvData.length === 0) {
    csvData = generateDummyData();
    await saveCSVToIndexedDB(csvData);
  }
  setCurrentData(csvData); // Store the current data
  updateTable(csvData);
  updateColumnSelector(csvData[0]);
}