// export const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_BASE_URL_PROD
//     : process.env.NEXT_PUBLIC_BASE_URL_DEV;
// export const API_FINANCIAL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_FINANCIAL_PROD
//     : process.env.NEXT_PUBLIC_API_FINANCIAL_DEV;
// export const API_MARKETING =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_API_MARKETING_PROD
//     : process.env.NEXT_PUBLIC_API_MARKETING_DEV ??
//       "https://marketing.stage-gke.letseduvate.com/qbox";
// console.log(process.env.NODE_ENV, "environment");

export const API_MARKETING =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_MARKETING_PROD
    : process.env.NEXT_PUBLIC_API_MARKETING_DEV ??
      "https://dbt.io/api/";
console.log(process.env.NODE_ENV, "environment");
const BASE_URL =
  "https://dbt.io/api/";
const APIKEY =
  "a06351bd-4cae-40e7-90ec-ffdd13506987";
export { BASE_URL,APIKEY };
