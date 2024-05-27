export const spacesData = [
  {
    elmid: "spaces",
    sdk: "c",
    space_id_: 1000,
    sticky: "",
    loops_caps: [
      { arr_loc: "ad_data.ex_data.stats", max: 5 },
      { arr_loc: "ad_data.ex_data.kf", max: 3 },
      { arr_loc: "ad_data.txts.sell_lns", max: 3 },
    ],
    scr_id: 51,
    org_id: "def",
    cf_url: "",
    api_url: "https://out.top5-crm.com/spaces/",
    style: "payroll_basic",
    template: "payroll_basic",
    vertical: 0,
    noc: 100,
    ld: {
      siteId: "106",
      siteName: "top5mealdelivery.com",
      pageId: "/food-delivery-wizard/",
      listOrder: "1",
    },
    st_: {
      desktop_card_text_link: "",
      desktop_card_more_info: "display: none",
      desktop_card_card_numbering: "display: none",
      desktop_show_phone_number: "display: none",
      mobile_card_text_link: "",
      mobile_card_title: "display: none",
      mobile_card_more_info: "display: none",
      mobile_show_phone_number: "display: none",
      mobile_card_numbering: "display: none",
    },
    plgns: [
      {
        f: "addExData",
        p: {
          key: "txtlink",
          val: "Order Now",
        },
      },
      {
        f: "changeCTA",
        p: "View Plan"
      },

      {
        f: "promoted",
        p: {
          key: "promoted_brands",
          val: "none",
        },
      },
      {
        f: "addExData",
        p: {
          key: "mobile_selling",
          val: {
            promotion: "set",
          },
        },
      },
    

     
    ],
  },
];
