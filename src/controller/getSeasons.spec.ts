import * as assert from "assert";
import * as url from "url";
import axios from "axios";

const serviceUrl = process.env.SERVICE_URL!;

describe("GET /v1/seasons", () => {
  it("should return correct season IDs", async function() {
    this.slow(6000);
    this.timeout(10000);
    const { data } = await axios.get<{ seasonIds: number[] }>(
      url.resolve(serviceUrl, "/v1/seasons")
    );
    assert.deepStrictEqual(data.seasonIds, [1,2,3,4,5,6,7]);
  });
});
