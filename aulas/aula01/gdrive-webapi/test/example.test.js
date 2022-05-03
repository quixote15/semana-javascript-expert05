import { describe, test, expect, jest } from "@jest/globals";
import Routes from "../src/routes.js";
describe("Test suite", () => {
  describe("#setSocketInstance", () => {
    test("should store io instance", () => {
      const routes = new Routes();

      const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => {},
      };

      routes.setSocketInstance(ioObj);
      expect(routes.io).toStrictEqual(ioObj);
    });
  });

  describe("#handler", () => {
    const defaultParams = {
      request: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "",
        body: {},
      },
      response: {
        setHeader: jest.fn(),
        writeHead: jest.fn(),
        end: jest.fn(),
      },
      values: () => Object.values(defaultParams),
    };
    test("given inexistent route it should choose default route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      params.request.method = "inexistent";
      routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
    test("given method GET it should choose GET route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      params.request.method = "OPTIONS";
      routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hello world");
      expect(params.response.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Origin",
        "*"
      );
      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
    test("given method GET it should choose GET route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      jest.spyOn(routes, routes.get.name).mockResolvedValue();
      params.request.method = "GET";
      await routes.handler(...params.values());
      expect(routes.get).toHaveBeenCalled();
    });
    test("given method POST it should choose POST route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };

      jest.spyOn(routes, routes.post.name).mockResolvedValue();
      params.request.method = "POST";
      await routes.handler(...params.values());
      expect(routes.post).toHaveBeenCalled();
    });
  });
});
