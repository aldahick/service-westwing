import { Controller, HttpMethod } from "@aldahick/service-utils";
import * as joi from "@hapi/joi";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import * as moment from "moment";
import { TranscriptApi } from "../lib/TranscriptApi";

export class GetEpisodesController extends Controller {
  version = "1";
  method = HttpMethod.Get;
  route = "/seasons/:seasonId/episodes";

  async handle(req: Request<{ seasonId: string }>, res: Response) {
    joi.assert(req.params, joi.object({
      seasonId: joi.string().required()
    }));
    const { seasonId } = req.params;
    const $ = cheerio.load(await TranscriptApi.fetch(HttpMethod.Post, {
      season: seasonId,
      flag: "showseason"
    }));
    return {
      episodes: $("table.boldtable tr").toArray().slice(1).map(row => {
        const cells = $(row).children("td").toArray().map(e => $(e));
        return {
          id: Number(cells[0].text()),
          title: cells[1].text(),
          airedAt: moment(cells[3].text(), "D MMM YY").toDate(),
          number: Number(cells[4].text().split("-")[1]),
        };
      })
    };
  }
}
