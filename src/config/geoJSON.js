import axios from "axios";

const INDIA_URL =
  "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States";

export const indiaGeoJSON = async () => {
  try {
    const { data } = await axios.get(INDIA_URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};
