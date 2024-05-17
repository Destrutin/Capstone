import axios from "axios";
import MealDbApi from "../api/MealDbApi";

jest.mock("axios");

describe("MealDbApi", () => {
  const mockedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlc3RydXRpbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTM5MDQ5MH0.iLSQzv_yW0mrdYhcajVsruOn5pi5GupLwAiUO_NMEIM";

  beforeEach(() => {
    MealDbApi.token = mockedToken;
  });

  describe("signup", () => {
    it("should sign up successfully", async () => {
      const userData = { username: "testuser", password: "testpassword" };
      const token = MealDbApi.token;

      axios.mockResolvedValue({ data: { token } });

      const returnedToken = await MealDbApi.signup(userData);
      expect(returnedToken).toEqual(token);

      expect(axios).toHaveBeenCalledWith({
        url: "http://localhost:5000/auth/register",
        method: "post",
        data: userData,
        params: {},
        headers: { Authorization: `Bearer ${mockedToken}` },
      });
    });

    it("should throw an error for failed sign up", async () => {
      const userData = { username: "testuser", password: "testpassword" };

      const errorMessage = "Failed to sign up";
      const error = new Error(errorMessage);
      axios.mockRejectedValue({
        response: { data: { error: { message: errorMessage } } },
      });

      await expect(MealDbApi.signup(userData)).rejects.toThrow(errorMessage);
    });
  });
});
