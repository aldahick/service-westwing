import { Controller, HttpMethod } from "@aldahick/service-utils";
import * as joi from "@hapi/joi";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { TranscriptApi } from "../lib/TranscriptApi";

export class GetTranscriptController extends Controller {
  version = "1";
  method = HttpMethod.Get;
  route = "/episodes/:episodeId/transcript";

  async handle(req: Request<{ episodeId: string }>, res: Response) {
    joi.assert(req.params, joi.object({
      episodeId: joi.string().required()
    }));
    const { episodeId } = req.params;
    const $ = cheerio.load(await TranscriptApi.fetch(HttpMethod.Get, {
      flag: "getTranscript",
      id: episodeId
    }));
    return {
      transcript: $("pre").text()
    };
  }
}
