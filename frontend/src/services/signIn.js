export async function signInUser(signInData) {
  const response = await fetch('https://localhost:7099/api/User/exists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signInData),
  });
  return response.json();
}