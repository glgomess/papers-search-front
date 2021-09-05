export default function useLogin() {
  async function validateLogin(username, password) {
    console.log(username);
    console.log(password);
  }

  return { validateLogin };
}
