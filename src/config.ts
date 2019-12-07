import { Config } from "@aldahick/service-utils";

export const config = {
  httpPort: Config.required("HTTP_PORT", Number)
};
