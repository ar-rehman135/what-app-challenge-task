export const getRandomInt = (min: number = 1, max: number = 10000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const setCookies = async (token: string) => {
  try {
    await fetch('/api/auth/login', { method: "POST", body: JSON.stringify({ token }) })
    return true
  } catch (error) {
    console.log({ error })
    return false

  }
}
