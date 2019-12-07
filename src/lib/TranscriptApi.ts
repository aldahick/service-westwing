import axios from "axios";
import { HttpMethod } from "@aldahick/service-utils";

const BASE_URL = "http://www.westwingtranscripts.com/search.php";

export class TranscriptApi {
  /**
   * Returns HTML of fetched page
   */
  static async fetch(method: HttpMethod, params: {[key: string]: any} = {}): Promise<string> {
    const { data } = await axios({
      url: BASE_URL,
      method,
      ...(method === HttpMethod.Get ? { params } : { data: new URLSearchParams(params).toString() })
    });
    return data;
  }
}
