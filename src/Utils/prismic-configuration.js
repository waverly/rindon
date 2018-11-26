import Prismic from "prismic-javascript";

export const linkResolver = function(doc) {
  // Pretty URLs for known types
  if (doc.type === "blog") return "/post/" + doc.uid;
  if (doc.type === "page") return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
};

export const apiEndpoint = "https://rindon.prismic.io/api/v2";

export const fetchTagData = async uid => {
  const api = await Prismic.api(apiEndpoint);
  const tagData = await api.getByUID("tag", uid).then(function(t) {
    return t;
  });

  if (tagData) {
    const { id } = tagData;
    const title = tagData.data.tag[0].text;
    return { id, title };
  } else return null;
};

export const fetchWorkPage = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "work_item"),
    { pageSize: 500 }
  );

  const results = response.results;

  // loop over results and return relevant information:

  const resultData = await Promise.all(
    results.map(async item => {
      const data = item.data;
      const uid = item.uid;
      const title = data.project_title[0].text;
      const tags = await Promise.all(
        data.tags.map(async tag => {
          const uid = tag.tag.uid;
          if (uid) {
            const tagData = await fetchTagData(uid);
            return tagData;
          } else return null;
        })
      );
      const date = data.project_date;
      const body = data.body;
      const dateArray = Array.from(date);
      const yearArray = dateArray.slice(0, 4);
      const year = yearArray.join("");
      return { uid, body, title, tags, year };
    })
  );

  const returnData = { workPageData: resultData };
  return returnData;
};

// can i refactor this to accept a "field" param if i want to sort by something other than title?
export const compare = (a, b) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

export const fetchNewsPage = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "news_item"),
    { pageSize: 500 }
  );

  const results = response.results;

  // loop over results and return relevant information:
  const resultData = await Promise.all(
    results.map(item => {
      const data = item.data;
      const uid = item.uid;
      const title = data.title ? data.title[0].text : null;
      const blurb = data.blurb ? data.blurb : null;
      const time = data.time[0] ? data.time[0].text : null;
      const location = data.location[0] ? data.location[0].text : null;
      const link = data.external_link.url;

      const date = data.date;
      const dateArray = Array.from(date);
      const yearArray = dateArray.slice(0, 4);
      const year = yearArray.join("");
      return { uid, date, title, blurb, year, time, location, link };
    })
  );

  // const returnData = { workPageData: resultData };
  return resultData;
};

export const fetchAbout = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "about_page"),
    { pageSize: 10 }
  );

  const data = response.results[0].data;
  const contact = data.contact_link.url;
  const cv = data.cv.url;
  const text = data.text;
  return { contact, cv, text };
};

export const fetchColor = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "key_color"),
    { pageSize: 10 }
  );

  const color = response.results[0].data.color;
  console.log(color);

  return color;
};

export const fetchTags = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "tag"),
    { pageSize: 500 }
  );
  const results = response.results;

  // // loop over results and return relevant information:
  const tagData = results.map(item => {
    const title = item.data.tag[0].text;
    const uid = item.uid;
    return { uid, title };
  });

  // sort in abc order
  tagData.sort(compare);

  return tagData;
};

export const fetchPortfolioItem = async () => {};
