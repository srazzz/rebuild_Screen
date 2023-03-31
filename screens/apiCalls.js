export const homePageData = async () => {
  try {
    const response = await fetch('http://192.168.0.138:3001/homescreenData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
