import { request } from "undici";
import { parse } from "node-html-parser";

const SPONSORS = process.env.SPONSORS_URL as string;
const SPONSORING = process.env.SPONSORING_URL as string;

export async function sponsors(user: string) {
  let url = SPONSORS.replace("$u", user);

  let page = 1;
  let text = "";
  while (true) {
    const { body } = await request(url.replace("$p", page.toString()));
    const partial = await body.text();

    if (!partial) {
      break;
    }

    text += partial;
    page++;
  }

  const html = parse(text);
  const users = html.querySelectorAll("a[data-hovercard-type=user]");

  return users.map((user) => user.getAttribute("href")?.substring(1));
}

export async function sponsorees(user: string) {
  const { body } = await request(SPONSORING.replace("$u", user));
  const text = await body.text();

  const html = parse(text);
  const sponsoring = html.querySelector("a[data-tab-item=sponsoring]");

  if (!sponsoring) {
    return [];
  }

  const users = html.querySelectorAll("a[data-hovercard-type=user]");
  return users.map((user) => user.getAttribute("href")?.substring(1));
}

export async function sponsoring(user: string, sponsor: string) {
  const users = await sponsors(user);
  return users.includes(sponsor);
}
