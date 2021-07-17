import { APIRoute } from "next-s3-upload";
import cuid from "cuid";

export default APIRoute.configure({
  key(req, filename) {
    return `${cuid()}-${filename.replace(/\s/g, "-")}`;
  },
});
