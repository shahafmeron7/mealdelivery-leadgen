import { getToken } from "@/utils/impression/impressionFunctions";
const jsonData = [
  {
    elmid: "list",
    space_id_: 1000,
    sticky: "",
    org_id: "def",
    cf_url: "",
    api_url: "https://out.top-payrollservices.com/spaces/",
    style: "payroll_basic",
    template: "payroll_basic",
    vertical: 0,
    list: "1015",
    noc: 100,
    scr_id: 51,
    ld: {
      siteId: "136",
      siteName: "top-payrollservices.com",
      pageId: "/hr/",
      listOrder: "1",
    },
    st_: {
      desktop_card_text_link: "",
      desktop_card_more_info: "display: none",
      desktop_card_promotion: "",
      desktop_card_card_numbering: "",
      desktop_show_phone_number: "display: none",
      mobile_card_text_link: "",
      mobile_card_title: "display: none",
      mobile_card_more_info: "display: none",
      mobile_show_phone_number: "display: none",
      mobile_card_numbering: "",
    },
    loops_caps: [{ arr_loc: "ad_data.txts.sell_lns", max: 3 }],
    tags: {
      "[ad_data][ttls][s_ttl]": ["sales_selling_line_7"],
      "[ad_data][txts][sell_lns]": ["hr_bulletpoints"],
    },
    sdk: "s",
    plgns: [
      { f: "addExData", p: { key: "txtlink", val: "Get a free quote" } },
      { f: "promoted", p: { key: "promoted_brands", val: "none" } },
      { f: "addExData", p: { key: "rr_loction", val: { rating: "set" } } },
      {
        f: "addExData",
        p: { key: "title_sellingline", val: { selling: "set" } },
      },
      {
        f: "addExData",
        p: { key: "mobile_selling", val: { promotion: "set" } },
      },
      {
        f: "bbb",
        p: {
          key: "bbb",
          val: {
            image: {
              url: "https://assets.trafficpointltd.com/app/uploads/sites/6/2024/02/11154734/Editors-choice-badge.svg",
              alt: "Editors-choice-badge",
            },
            brands: ["103711", "105019"],
          },
        },
      },
    ],
  },
];

const data = jsonData[0];

const api = data.api_url;
const sdk = data.sdk;
const vertical = data.vertical;
const space_id = data.space_id_;
const page_load_uid = window.lg_page_load_uid;
const space_load_uid = getToken();
const page = window.location.pathname;
const host = window.location.hostname;
const list_id = data.list;
const noc = data.noc;
const tc = "tc";
const pv = "pv";
const scr_id = data.scr_id;
const template = data.template;
const style = data.style;
const id = data.elmid;
const st = JSON.stringify(data.st_);
const lc = JSON.stringify(data.loops_caps);
export const SPACES_URL = `${api}${sdk}/${vertical}/${space_id}/${page_load_uid}/${space_load_uid}?page=${page}&host=${host}&l=${list_id}&s=${noc}&pageVersion=${pv}&t_=${template}&c_=${style}&elid=${id}&${scr_id}&st_=${st}&lc_=${lc}`;
//https://out.top-payrollservices.com/spaces/s/0/1000/undefined/f5619fc4-69aa-4cb5-b4bd-a854ae61ef3d?page=%2F&host=localhost&l=1015&s=100&pageVersion=pv&t_=payroll_basic&c_=payroll_basic&elid=list&51&st_=%7B%22desktop_card_text_link%22%3A%22%22%2C%22desktop_card_more_info%22%3A%22display%3A%20none%22%2C%22desktop_card_promotion%22%3A%22%22%2C%22desktop_card_card_numbering%22%3A%22%22%2C%22desktop_show_phone_number%22%3A%22display%3A%20none%22%2C%22mobile_card_text_link%22%3A%22%22%2C%22mobile_card_title%22%3A%22display%3A%20none%22%2C%22mobile_card_more_info%22%3A%22display%3A%20none%22%2C%22mobile_show_phone_number%22%3A%22display%3A%20none%22%2C%22mobile_card_numbering%22%3A%22%22%7D&lc_=%5B%7B%22arr_loc%22%3A%22ad_data.txts.sell_lns%22%2C%22max%22%3A3%7D%5D
// export const SPACES_URL = `${api}${sdk}/${vertical}/${space_id}/${page_load_uid}/${space_load_uid}?page=${page}&host=${host}&l=${list_id}&s=${noc}&live=${tc}&pageVersion=${pv}&t_=${template}&c_=${style}&elid=${id}&st_=${(st)}&lc_=${(lc)}`;
