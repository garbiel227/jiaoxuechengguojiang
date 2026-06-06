const header = document.getElementById("siteHeader");
const hero = document.getElementById("hero");

function updateHeaderTray() {
  if (!header || header.classList.contains("is-compact")) return;
  const threshold = hero ? hero.offsetHeight - 120 : 40;
  header.classList.toggle("has-tray", window.scrollY > threshold);
}

window.addEventListener("scroll", updateHeaderTray, { passive: true });
window.addEventListener("resize", updateHeaderTray);
updateHeaderTray();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
const mobileNavQuery = window.matchMedia("(max-width: 900px)");

if (header && menuToggle && mainNav) {
  const navDropdowns = [...mainNav.querySelectorAll(".nav-dropdown")];

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-trigger");
    trigger?.setAttribute("aria-expanded", "false");
    trigger?.addEventListener("click", (event) => {
      if (!mobileNavQuery.matches) return;
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("is-submenu-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.classList.contains("nav-trigger") && mobileNavQuery.matches) return;
      header.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      navDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("is-submenu-open");
        dropdown.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
      });
    });
  });
}

const slides = [...document.querySelectorAll(".slide")];
const dots = document.querySelector(".dots");
let activeSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeSlide));
  dots?.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("is-active", i === activeSlide));
}

function startSlider() {
  if (slides.length < 2) return;
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(activeSlide + 1), 5000);
}

if (dots && slides.length) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `查看第${index + 1}张轮播图`);
    dot.addEventListener("click", () => {
      showSlide(index);
      startSlider();
    });
    dots.appendChild(dot);
  });
  showSlide(0);
  startSlider();
}

const timelineItems = [...document.querySelectorAll(".timeline-item")];
const timelineCard = document.querySelector(".timeline-card");
let activeTimeline = timelineItems.findIndex((item) => item.classList.contains("is-active"));
let timelineTimer;

function showTimeline(index) {
  if (!timelineItems.length || !timelineCard) return;
  activeTimeline = (index + timelineItems.length) % timelineItems.length;
  const item = timelineItems[activeTimeline];
  timelineItems.forEach((node, i) => node.classList.toggle("is-active", i === activeTimeline));
  timelineCard.classList.add("is-changing");
  window.setTimeout(() => {
    timelineCard.querySelector("h3").textContent = item.dataset.title;
    timelineCard.querySelector("p").textContent = item.dataset.text;
    timelineCard.classList.remove("is-changing");
  }, 120);
}

function startTimeline() {
  if (timelineItems.length < 2) return;
  clearInterval(timelineTimer);
  timelineTimer = setInterval(() => showTimeline(activeTimeline + 1), 4200);
}

function pauseTimeline() {
  clearInterval(timelineTimer);
}

timelineItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    showTimeline(index);
    pauseTimeline();
  });
  item.addEventListener("focus", () => {
    showTimeline(index);
    pauseTimeline();
  });
});

if (timelineItems.length) {
  if (activeTimeline < 0) activeTimeline = 0;
  showTimeline(activeTimeline);
  startTimeline();
  const timelineArea = document.querySelector(".timeline-section");
  timelineArea?.addEventListener("mouseenter", pauseTimeline);
  timelineArea?.addEventListener("mouseleave", startTimeline);
  timelineArea?.addEventListener("focusin", pauseTimeline);
  timelineArea?.addEventListener("focusout", startTimeline);
}

const detailData = {
  preview: ["成果预览", "申报书封面及成果基本信息。", 1],
  intro: ["成果简介", "成果简介及主要解决的教学问题。", 9],
  methods: ["成果解决教学问题的方法", "宏观、中观、微观三个层面的改革路径。", 11],
  innovation: ["成果创新点", "理论创新、机制创新与路径创新。", 13],
  effects: ["成果的推广应用效果", "人才培养质量、行业认可与示范辐射。", 15],
  contributors: ["主要完成人情况", "主要完成人信息与贡献说明。", 19],
  awards: ["成果曾获奖励情况", "成果获奖、专业建设、育人成果等材料。", 4],
  period: ["成果起止时间", "起始、完成与实践检验时间。", 8],
  papers: ["论文", "支撑材料中的论文和教研成果。", 18],
  "awards-support": ["获奖情况", "学生、教师与成果获奖支撑材料。", 16],
  textbooks: ["教材", "教材建设与课程建设相关支撑材料。", 18],
  teaching: ["教学成果相关材料", "教学研讨、教师成果和实践项目材料。", 18],
  media: ["媒体报道", "专业建设与部校共建成果媒体报道。", 17],
  unit: ["主要完成单位情况", "成果依托单位的主要贡献与组织保障。", 30],
  political: ["政治审查意见", "主要完成人政治立场、师德师风与成果内容政治方向审查。", 31],
  recommendation: ["推荐单位意见", "推荐单位对成果创新性、引领性、推广价值与申报条件的意见。", 32]
};

const detailLinks = [
  ["preview", "成果预览"],
  ["awards", "成果曾获奖励情况"],
  ["period", "成果起止时间"],
  ["intro", "成果简介"],
  ["methods", "解决教学问题的方法"],
  ["innovation", "成果创新点"],
  ["effects", "推广应用效果"],
  ["contributors", "主要完成人情况"],
  ["unit", "主要完成单位情况"],
  ["political", "政治审查意见"],
  ["recommendation", "推荐单位意见"],
  ["papers", "论文"],
  ["awards-support", "获奖情况"],
  ["textbooks", "教材"],
  ["teaching", "教学成果相关材料"],
  ["media", "媒体报道"]
];

const sectionFromBody = document.body.dataset.section;
const pdfMenu = document.querySelector(".pdf-menu");
if (pdfMenu && sectionFromBody) {
  pdfMenu.innerHTML = "<h2>目录</h2>";
  detailLinks.forEach(([section, label]) => {
    const link = document.createElement("a");
    link.href = `${section}.html`;
    link.textContent = label;
    link.classList.toggle("is-current", section === sectionFromBody);
    pdfMenu.appendChild(link);
  });
}

const pdfViewer = document.getElementById("pdfViewer");
if (pdfViewer) {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section") || "preview";
  const [title, desc, page] = detailData[section] || detailData.preview;
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailDesc").textContent = desc;
  pdfViewer.src = `0504附件2%20李秀云-天津师范大学高等教育（本科）教学成果奖申报书成稿_副本.pdf#page=${page}`;
  document.querySelectorAll(".pdf-menu a").forEach((link) => {
    const target = new URL(link.href).searchParams.get("section");
    link.classList.toggle("is-current", target === section);
  });
}

const supportGallery = document.getElementById("supportGallery");
if (supportGallery) {
  const supportSections = {
    projects: ["教师教改项目", [
      ["image60.png", "天津市普通高等学校本科教学质量与教学改革研究计划项目"],
      ["image24.jpeg", "教育部产学合作协同育人项目合作材料"],
      ["image35.png", "教育部产学合作协同育人项目结项证书"]
    ]],
    "student-awards": ["学生代表性获奖证书", [
      ["image16.jpeg", "中国数据新闻大赛暨 AIGC 应用大赛荣誉证书"],
      ["image13.png", "中国数据新闻大赛代表性获奖证书"],
      ["image48.jpeg", "中国国际大学生创新大赛代表性获奖证书"]
    ]],
    "student-projects": ["指导学生获批项目和教学奖励材料", [
      ["image24.jpeg", "大学生创新创业项目获奖材料"],
      ["image35.png", "学生项目结项与验收材料"],
      ["image16.jpeg", "教师指导学生竞赛获奖材料"]
    ]],
    media: ["教学成果媒体发布材料", [
      ["image75.png", "教学成果及专业建设媒体发布材料"],
      ["image88.png", "媒体报道与社会传播材料"],
      ["image90.jpeg", "教学成果采访与宣传材料"]
    ]],
    "teacher-results": ["教师代表性成果", [
      ["image8.png", "教师代表性教改论文成果"],
      ["image9.png", "教师代表性教改论文与著作"],
      ["image90.jpeg", "教师教学与人才培养实践"]
    ]],
    other: ["其他教学成果材料", [
      ["image1.png", "卓越新闻传播人才“四全”培养体系改革"],
      ["image2.png", "卓越新闻传播人才结构式改革"],
      ["image75.png", "专业建设与教学实践成果"]
    ]]
  };
  const section = new URLSearchParams(window.location.search).get("section") || "projects";
  const [title, items] = supportSections[section] || supportSections.projects;
  document.getElementById("supportTitle").innerHTML = `${title} <small>/ Supporting Materials</small>`;
  document.title = title;
  items.forEach(([image, caption]) => {
    const card = document.createElement("article");
    card.className = "material-card";
    card.innerHTML = `<img src="../picture/support/${image}" alt="${caption}"><p>${caption}</p>`;
    supportGallery.appendChild(card);
  });
}

const siteSearchIndex = [
  ["首页", "index.html", "首页 四全 全过程 全场景 全要素 全效能 时间轴 教学成果奖"],
  ["成果简介", "pages/profile.html", "成果简介 四全培养体系 部校共建 马克思主义新闻观"],
  ["完成人介绍", "pages/contributor-profiles.html", "完成人介绍 李秀云 林靖 胡振宇 李蓓 张洪伟 祁小龙 冯帆 韩诚 王芳 李冰玉 马涛"],
  ["成果预览（PDF 第1页）", "pages/preview.html", "PDF 申报材料 申报书 封面 成果名称 成果预览"],
  ["成果曾获奖励情况（PDF 第4页）", "pages/awards.html", "PDF 申报材料 奖励 获奖情况 专业建设 育人成果"],
  ["成果起止时间（PDF 第8页）", "pages/period.html", "PDF 申报材料 起始时间 完成时间 实践检验"],
  ["成果简介（PDF 第9页）", "pages/intro.html", "PDF 申报材料 成果简介 主要解决的教学问题"],
  ["成果解决教学问题的方法（PDF 第11页）", "pages/methods.html", "PDF 申报材料 教学问题 方法 宏观 中观 微观 改革路径"],
  ["成果创新点（PDF 第13页）", "pages/innovation.html", "PDF 申报材料 创新点 理论创新 机制创新 路径创新"],
  ["成果的推广应用效果（PDF 第15页）", "pages/effects.html", "PDF 申报材料 推广应用效果 人才培养 行业认可 示范辐射"],
  ["主要完成人情况（PDF 第19页）", "pages/contributors.html", "PDF 申报材料 主要完成人 情况 贡献说明"],
  ["主要完成单位情况（PDF 第30页）", "pages/unit.html", "PDF 申报材料 主要完成单位 组织保障"],
  ["政治审查意见（PDF 第31页）", "pages/political.html", "PDF 申报材料 政治审查 师德师风 政治方向"],
  ["推荐单位意见（PDF 第32页）", "pages/recommendation.html", "PDF 申报材料 推荐单位 创新性 引领性 推广价值"],
  ["成果支撑材料", "pages/teaching.html", "成果支撑材料 附件 教改论文 教师教改项目 学生获奖"],
  ["教改论文与著作", "pages/papers.html", "成果支撑材料 论文 著作 教改论文"],
  ["教材展示", "pages/textbooks.html", "教材 品牌创意案例教程 胡振宇 清华大学出版社"],
  ["教师教改项目", "pages/support-materials.html?section=projects", "成果支撑材料 教师教改项目"],
  ["学生代表性获奖证书", "pages/support-materials.html?section=student-awards", "成果支撑材料 学生 获奖证书"],
  ["指导学生获批项目和教学奖励材料", "pages/support-materials.html?section=student-projects", "成果支撑材料 学生项目 教学奖励"],
  ["教学成果媒体发布材料", "pages/support-materials.html?section=media", "成果支撑材料 媒体发布"],
  ["教师代表性成果", "pages/support-materials.html?section=teacher-results", "成果支撑材料 教师代表性成果"],
  ["其他教学成果材料", "pages/support-materials.html?section=other", "成果支撑材料 其他教学成果"],
  ["教学成果报告（附件3 PDF）", "pages/teaching-report.html", "PDF 教学成果报告 附件三 附件3"],
  ["获奖情况（PDF 第16页）", "pages/awards-support.html", "PDF 获奖情况 学生 教师 成果获奖 支撑材料"],
  ["媒体报道（PDF 第17页）", "pages/media.html", "PDF 媒体报道 专业建设 部校共建"],
  ["教学成果相关材料（PDF 第18页）", "pages/teaching.html", "PDF 教学成果 教学研讨 教师成果 实践项目 支撑材料"]
];

function mergeFullTextSearchIndex(entries) {
  entries.forEach(([title, path, text]) => {
    const existing = siteSearchIndex.find(([, indexedPath]) => indexedPath === path);
    if (existing) {
      existing[2] += ` ${text}`;
    } else {
      siteSearchIndex.push([title, path, text]);
    }
  });
}

async function loadDynamicSearchIndex() {
  if (window.location.protocol === "file:") {
    if (typeof htmlFullTextSearchIndex !== "undefined") mergeFullTextSearchIndex(htmlFullTextSearchIndex);
    return;
  }

  const parser = new DOMParser();
  const rootUrl = new URL(siteSearchHref("index.html"), window.location.href);
  const queue = [rootUrl.href];
  const visited = new Set();
  const entries = [];

  while (queue.length && visited.size < 100) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const documentFromPage = parser.parseFromString(await response.text(), "text/html");
      documentFromPage.querySelectorAll("a[href]").forEach((link) => {
        const linkedUrl = new URL(link.getAttribute("href"), url);
        linkedUrl.hash = "";
        if (linkedUrl.origin === window.location.origin && linkedUrl.pathname.endsWith(".html") && !visited.has(linkedUrl.href)) {
          queue.push(linkedUrl.href);
        }
      });
      documentFromPage.querySelectorAll("script, style, header, footer").forEach((node) => node.remove());
      const path = new URL(url).pathname.replace(rootUrl.pathname.replace(/index\.html$/, ""), "").replace(/^\//, "") || "index.html";
      const title = documentFromPage.title || path;
      const text = documentFromPage.body?.textContent.replace(/\s+/g, " ").trim() || "";
      entries.push([title, path, text]);
    } catch {
      continue;
    }
  }
  mergeFullTextSearchIndex(entries);
}

const dynamicSearchIndexReady = loadDynamicSearchIndex();

const searchPanel = document.createElement("section");
searchPanel.className = "search-results";
searchPanel.setAttribute("aria-live", "polite");
searchPanel.innerHTML = '<div class="search-results-inner"><button class="search-results-close" type="button" aria-label="关闭搜索结果">×</button><h2>搜索结果</h2><p class="search-results-summary"></p><div class="search-results-list"></div></div>';
document.body.appendChild(searchPanel);

function siteSearchHref(path) {
  const isInPages = window.location.pathname.includes("/pages/");
  if (!isInPages) return path;
  return path === "index.html" ? "../index.html" : path.replace(/^pages\//, "");
}

async function showSearchResults(query) {
  await dynamicSearchIndexReady;
  const normalizedQuery = query.toLowerCase();
  const results = siteSearchIndex.filter(([title, , keywords]) =>
    `${title} ${keywords}`.toLowerCase().includes(normalizedQuery)
  );
  const summary = searchPanel.querySelector(".search-results-summary");
  const list = searchPanel.querySelector(".search-results-list");
  summary.textContent = results.length ? `找到 ${results.length} 个与“${query}”相关的页面` : `没有找到与“${query}”相关的页面`;
  list.innerHTML = "";
  results.forEach(([title, path, keywords]) => {
    const link = document.createElement("a");
    link.href = siteSearchHref(path);
    link.innerHTML = `<strong>${title}</strong><span>${keywords}</span>`;
    list.appendChild(link);
  });
  searchPanel.classList.add("is-open");
}

async function updateSearchSuggestions(form, query) {
  await dynamicSearchIndexReady;
  const suggestions = form.querySelector(".search-suggestions");
  if (!query) {
    suggestions.classList.remove("is-open");
    return;
  }
  const normalizedQuery = query.toLowerCase();
  const results = siteSearchIndex
    .filter(([title, , keywords]) => `${title} ${keywords}`.toLowerCase().includes(normalizedQuery))
    .slice(0, 6);
  suggestions.innerHTML = "";
  results.forEach(([title, path]) => {
    const link = document.createElement("a");
    link.href = siteSearchHref(path);
    link.textContent = title;
    suggestions.appendChild(link);
  });
  if (!results.length) {
    const empty = document.createElement("span");
    empty.textContent = "暂无匹配结果";
    suggestions.appendChild(empty);
  }
  suggestions.classList.add("is-open");
}

searchPanel.querySelector(".search-results-close").addEventListener("click", () => {
  searchPanel.classList.remove("is-open");
});

searchPanel.addEventListener("click", (event) => {
  if (event.target === searchPanel) searchPanel.classList.remove("is-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") searchPanel.classList.remove("is-open");
});

document.querySelectorAll(".search").forEach((form) => {
  const input = form.querySelector("input");
  const suggestions = document.createElement("div");
  suggestions.className = "search-suggestions";
  form.appendChild(suggestions);
  let searchTimer;

  input.addEventListener("input", () => {
    window.clearTimeout(searchTimer);
    const query = input.value.trim();
    if (!query) {
      suggestions.classList.remove("is-open");
      return;
    }
    searchTimer = window.setTimeout(() => updateSearchSuggestions(form, query), 160);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (query) {
      suggestions.classList.remove("is-open");
      showSearchResults(query);
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search")) {
    document.querySelectorAll(".search-suggestions").forEach((suggestions) => suggestions.classList.remove("is-open"));
  }
});
