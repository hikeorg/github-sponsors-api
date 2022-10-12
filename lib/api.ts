import { request } from "undici";
import { parse } from "node-html-parser";

const SPONSORS = process.env.SPONSORS_URL as string;
const SPONSORING = process.env.SPONSORING_URL as string;

export const FILTERS = ["active", "inactive"] as const;
export type Filter = typeof FILTERS[number];

export async function sponsors(user: string, filter: Filter = "active") {
  let url = SPONSORS.replace("$u", user).replace("$f", filter);

  let page = 1;
  let text = "";
  while (true) {
    const res = await request(url.replace("$p", page.toString()));
    const partial = await res.body.text();

    if (!partial || res.statusCode !== 200) {
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

export async function sponsoring(
  user: string,
  sponsor: string,
  filter: Filter = "active"
) {
  const users = await sponsors(user, filter);
  return users.includes(sponsor);
}
