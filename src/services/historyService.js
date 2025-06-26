export async function getUserHistory(userId) {
  const response = await fetch(`https://localhost:7099/api/User/GetAllTheLastResponses?userId=${userId}`);
  return response.json();
}

export async function getAllUserHistories() {
  const response = await fetch('https://localhost:7099/api/User/GetAllTheLastResponses');
  return response.json();
}