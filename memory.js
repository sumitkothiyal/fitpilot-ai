let history = [];

function saveDay(entry) {
  history.push(entry);
}

function getHistory() {
  return history;
}

module.exports = { saveDay, getHistory };