export async function registerUser(registerData, setRegisterStatus, setShowRegister) {
  setRegisterStatus('');

  const id = (registerData.id || '').trim();
  const name = registerData.name.trim();
  const phone = registerData.phone.trim();

  try {
    const params = new URLSearchParams({
      Id: id,
      Name: name,
      Phone: phone
    });
    const existsResponse = await fetch(
      `https://localhost:7099/api/User/exists?${params.toString()}`,
      { method: 'POST' }
    );
    const exists = await existsResponse.json();
    console.log('User exists check result:', exists);
    if (exists === true) {
      setRegisterStatus('You are already registered');
      return;
    }
  } catch (err) {
    setRegisterStatus('Could not check if user exists. Try again.');
    return;
  }

  try {
    const response = await fetch('https://localhost:7099/api/User/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Number(id),
        name,
        phone,
        prompts: []
      }),
    });
    if (response.ok) {
    setRegisterStatus(`Welcome ${name}! You have successfully registered to our site`);
    setTimeout(() => {
      setShowRegister(false);
      setRegisterStatus('');
    }, 2000);
  } else {
      setRegisterStatus('Registration didn\'t work, try again');
    }
  } catch (err) {
    setRegisterStatus('Registration didn\'t work, try again');
  }
}