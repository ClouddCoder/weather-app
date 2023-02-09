import axios from "axios";
import { getWeather } from "./weather";

jest.mock("axios");

const response = { data: { weather: "sunny" } };

describe("getWeather", () => {
  it("should return weather data", async () => {
    axios.get.mockResolvedValue(response);
    const data = await getWeather("London");
    expect(data).toEqual(response.data);
  });
});
