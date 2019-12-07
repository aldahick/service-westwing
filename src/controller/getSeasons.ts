import { Controller, HttpMethod } from "@aldahick/service-utils";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { TranscriptApi } from "../lib/TranscriptApi";

export class GetSeasonsController extends Controller {
  version = "1";
  method = HttpMethod.Get;
  route = "/seasons";

  async handle(req: Request, res: Response) {
    const $ = cheerio.load(await TranscriptApi.fetch(HttpMethod.Get));
    return {
      seasonIds: $("select[name=\"season\"] option").toArray()
        .map(e => Number($(e).text()))
        .filter(n => !isNaN(n))
    };
  }
}
