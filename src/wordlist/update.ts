import axios, { AxiosPromise } from "axios";
import { writeFile } from "fs";
import { promisify } from "util";
const write = promisify(writeFile);

async function getWordsList() {
  const url: string =
    "https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/";

  const words: string[] = [
    "chinese_simplified",
    "chinese_traditional",
    "english",
    "french",
    "italian",
    "japanese",
    "korean",
    "spanish",
  ];

  const getter: Array<{ type: string; url: string }> = [];

  for (const word of words) {
    getter.push({ type: word, url: `${url}${word}.txt` });
  }

  const res = getter.map(async (v) => {
    const tmp = await axios.get(v.url);
    return {
      data: tmp.data as string,
      type: v.type,
    };
  });

  for (const i of res) {
    const { type, data } = await i;
    await write(`./${type}.json`, JSON.stringify(data.split("\n")));
  }
}

/* tslint:disable */
getWordsList().catch((err) => console.log(err.message));
