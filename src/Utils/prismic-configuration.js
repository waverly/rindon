import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

export const linkResolver = function(doc) {
  // Pretty URLs for known types
  if (doc.type === "blog") return "/post/" + doc.uid;
  if (doc.type === "page") return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
};

export const apiEndpoint = "https://waverly-web-portfolio.prismic.io/api/v2";

export const fetchWorkPage = async () => {
  const api = await Prismic.api(apiEndpoint);
  const response = await api.query(
    Prismic.Predicates.at("document.type", "work_page")
  );

  const data = response.results[0].data;

  const portfolioItems = data.portfolio_items;

  const portfolioItemData = await Promise.all(
    portfolioItems.map(async item => {
      const uid = item.portfolio_item.uid;
      const itemResponse = await api.getByUID("portfolio_item", uid);
      const itemData = itemResponse.data;

      const title = itemData.title[0].text;
      // todo - refactor to include richtext
      const description = itemData.description[0].text;
      const thumbnail = itemData.thumbnail.url;
      const hyperlink = itemData.hyperlink.url;

      const technologies = itemData.technologies.map(
        tech => tech.technology[0].text
      );

      return { title, description, thumbnail, hyperlink, technologies, uid };
    })
  );

  const returnData = { portfolioItems: portfolioItemData };
  return returnData;
};

export const fetchPortfolioItem = async () => {};
