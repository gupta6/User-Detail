export const fetchAPI = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    return err;
  }
};
