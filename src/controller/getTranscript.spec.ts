import * as assert from "assert";
import * as crypto from "crypto";
import * as url from "url";
import axios from "axios";

const serviceUrl = process.env.SERVICE_URL!;

// Precomputed known SHA256 hash for S1E1 transcript
// The actual transcript is much too long
const S1E1_TRANSCRIPT_HASH = "67522ac19a22f0f1f57493692885f45c0dea99407dbde604fc58a605d0d571c354087e55f843b65ba0cf392229203e12032920e35d4a33a6550c66f3bdd87a44";

describe("GET /v1/seasons", () => {
  it("should return transcript for S1E1", async function() {
    this.slow(6000);
    this.timeout(10000);
    const { data } = await axios.get<{ transcript: string }>(
      url.resolve(serviceUrl, "/v1/episodes/1/transcript")
    );
    const generatedHash = crypto.createHash("sha512").update(data.transcript).digest("hex");
    assert.strictEqual(generatedHash, S1E1_TRANSCRIPT_HASH, "transcript hashes don't match");
  });
});
