// 名片資料與設定：要改內容只改這個檔
const CARD = {
  // 在 LINE Developers 建好 LIFF 後，把 LIFF ID 貼在這裡
  liffId: "",
  nameZh: "卓家棋",
  nameEn: "Clyde",
  title: "業務",
  company: "淩琦科技",
  phone: "0972-708-859",
  phoneIntl: "+886972708859",
  email: "clyde@icshop.com.tw",
  lineUrl: "https://line.me/ti/p/FuiakHc92c",
  red: "#E90316",
};

// 網頁放上去後的根網址，例如 https://xxx.pages.dev/
const BASE = new URL(".", location.href).href;

function liffUrl() {
  return CARD.liffId ? `https://liff.line.me/${CARD.liffId}` : BASE;
}

// 傳進 LINE 聊天室的卡片（Flex Message）
// Flex 的按鈕只接受 http、https、line、tel，所以 Email 先開網頁再轉 mailto
function flexMessage() {
  const btn = (label, uri, style = "secondary") => ({
    type: "button",
    style,
    height: "sm",
    ...(style === "primary" ? { color: "#06C755" } : {}),
    action: { type: "uri", label, uri },
  });
  const infoRow = (text) => ({
    type: "text", text, size: "sm", color: "#333333", margin: "sm",
  });
  return {
    type: "flex",
    altText: `${CARD.nameZh} ${CARD.nameEn}｜${CARD.company} ${CARD.title}`,
    contents: {
      type: "bubble",
      size: "kilo",
      header: {
        type: "box", layout: "vertical", paddingAll: "0px",
        contents: [
          { type: "box", layout: "vertical", height: "6px", backgroundColor: CARD.red, contents: [] },
          {
            type: "image", url: `${BASE}logo.png`, size: "full",
            aspectRatio: "974:402", aspectMode: "fit", margin: "md",
          },
        ],
      },
      body: {
        type: "box", layout: "vertical", paddingTop: "4px",
        contents: [
          {
            type: "box", layout: "baseline", spacing: "sm",
            contents: [
              { type: "text", text: CARD.nameZh, size: "xl", weight: "bold", color: "#111111", flex: 0 },
              { type: "text", text: CARD.nameEn, size: "md", color: "#666666", flex: 0 },
            ],
          },
          { type: "text", text: `${CARD.title}｜${CARD.company}`, size: "sm", color: "#666666", margin: "xs" },
          { type: "separator", margin: "lg" },
          { ...infoRow(`電話　${CARD.phone}`), margin: "lg" },
          infoRow(`Email　${CARD.email}`),
        ],
      },
      footer: {
        type: "box", layout: "vertical", spacing: "sm",
        contents: [
          btn("加我 LINE", CARD.lineUrl, "primary"),
          {
            type: "box", layout: "horizontal", spacing: "sm",
            contents: [
              btn("撥打電話", `tel:${CARD.phoneIntl}`),
              btn("寄送 Email", `${BASE}mail.html`),
            ],
          },
          btn("存入通訊錄", `${BASE}clyde.vcf?openExternalBrowser=1`),
          btn("轉傳這張名片", liffUrl(), "link"),
        ],
      },
    },
  };
}
