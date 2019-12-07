import * as assert from "assert";
import * as url from "url";
import axios from "axios";

const serviceUrl = process.env.SERVICE_URL!;

describe("GET /v1/seasons/:seasonId/episodes", () => {
  it("should return correct episodes for season 1", async function() {
    this.slow(6000);
    this.timeout(10000);
    const { data } = await axios.get<{ episodes: { title: string }[] }>(
      url.resolve(serviceUrl, "/v1/seasons/1/episodes")
    );
    assert.deepStrictEqual(data.episodes.map(e => e.title), [
      "Pilot",
      "Post Hoc, Ergo Propter Hoc",
      "A Proportional Response",
      "Five Votes Down",
      "The Crackpots and These Women",
      "Mr. Willis of Ohio",
      "The State Dinner",
      "Enemies",
      "The Short List",
      "In Excelsis Deo",
      "Lord John Marbury",
      "He Shall, from Time to Time",
      "Take Out the Trash Day",
      "Take This Sabbath Day",
      "Celestial Navigation",
      "20 Hours in L.A.",
      "The White House Pro-Am",
      "Six Meetings Before Lunch",
      "Let Bartlet Be Bartlet",
      "Mandatory Minimums",
      "Lies, Damn Lies and Statistics",
      "What Kind of Day Has It Been?"
    ]);
  });
});
