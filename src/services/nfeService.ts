import xmlbuilder from "xmlbuilder";
import { SignedXml } from "xml-crypto";
import { api } from "./api";
import { NFe } from "../types/nfe";

export function processNfe(options: NFe) {
}

function generateXml(rootElement: string, data: NFe>): string {
  const xml = xmlbuilder.create(rootElement, { encoding: "UTF-8" });
  (function build(element: any, data: Record<string, any>) {
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith("@")) element.att(key.slice(1), value);
      else if (typeof value === "object" && !Array.isArray(value)) build(element.ele(key), value);
      else element.ele(key, value);
    });
  })(xml, data);
  return xml.end({ pretty: true });
}
