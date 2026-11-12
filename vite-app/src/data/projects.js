const BASE = import.meta.env.BASE_URL

const sketchupBuildingImg = BASE + 'sources/sketchup-building-model.jpg'
const sketchupEntranceImg = BASE + 'sources/sketchup-entrance-comparison.jpg'

const ssr1MovieImg = BASE + 'sources/ssr1-movie.png'
const palbreedImg = BASE + 'sources/palbreed.png'
const scratchTeachingImg = BASE + 'sources/scratch-teaching.png'
const mhBuildFinderImg = BASE + 'sources/mh-build-finder.png'
const artaleRomioImg = BASE + 'sources/artale-romio.png'
const echoaiWebsiteImg = BASE + 'sources/echoai-website.png'
const lolWorldsImg = BASE + 'sources/lol-worlds-2026.png'

export const PROJECTS = [
    {
        id: 'pro-echoai-website',
        title: 'ECHOAi 品牌官網',
        category: 'professional',
        highlight: '中英雙語 · 語音導覽小幫手 · AI 導頁白名單',
        shortDescription: '士欣資訊新品牌 ECHOAi 的中英雙語形象官網,整合語音導覽小幫手與文字 AI 助理。',
        longDescription: '此專案是士欣資訊新品牌 ECHOAi 的形象官網,由我負責整體開發。網站介紹 Route(智能分流)、Guard(守護治理)、Coach(訓練教練)、Insight(洞察分析)四個企業語音 AI 產品,以及產業應用、平台與技術信任頁。全站支援繁中／英文雙語,每頁皆設定 canonical、hreflang、sitemap 與分享預覽。中文頁整合語音導覽小幫手,訪客可以用說的提問,小幫手會依網站內容回答並自動換到對應頁面;英文頁則提供文字 AI 助理「問 ECHOAi」,AI 只能從導頁白名單中挑選答案,畫面文字一律是預先撰寫的回覆,避免產生不實內容,比對不到時引導至聯絡表單。內容由 CMS 後台管理,行銷人員不需改程式即可更新文案。',
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Payload CMS', 'AI Chat Assistant'],
        demoUrl: 'https://echoai.saysing.com.tw/',
        previewImage: echoaiWebsiteImg,
        colorGradient: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        date: '2026'
    },
    {
        id: 'hw-cosmos-img',
        title: 'AI生圖工作室',
        category: 'archive',
        highlight: '已部署 Streamlit Cloud · 即時文字轉圖像',
        shortDescription: '結合 Cosmos 與 Streamlit 開發的 AI 文本生成圖像工具。',
        longDescription: '此課程作業使用 Python 配合 Streamlit 框架，建構一個 AI 圖像生成工作室。使用者可以輸入文字描述（Prompt），系統將呼叫 Cosmos 生成模型，將文本描述轉換成高品質的圖像，並提供方便的參數調整與下載功能。',
        tags: ['Python', 'Streamlit', 'Cosmos AI', 'Text-to-Image'],
        demoUrl: 'https://chenyu-hw3-cosmos-text2image.streamlit.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/hw3-cosmos-text2image',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/hw3-cosmos-text2image/main/screenshots/2026-06-04%20201852.png',
        colorGradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        date: '2026'
    },
    {
        id: 'hw-linear-regression',
        title: '線性回歸分析',
        category: 'archive',
        highlight: '互動調參 · 動態視覺化梯度下降收斂',
        shortDescription: '基於 Streamlit 視覺化呈現線性回歸模型預測與訓練分析。',
        longDescription: '此課程作業展示了機器學習中的線性回歸（Linear Regression）演算法。透過 Streamlit 網頁介面，動態呈現數據點分佈、擬合回歸線、損失函數收斂曲線，並允許使用者動態調整超參數以觀察模型學習成效。',
        tags: ['Python', 'Streamlit', 'Machine Learning', 'Linear Regression'],
        demoUrl: 'https://chenyu-hw4-linear-regression.streamlit.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/hw4-linear-regression',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/hw4-linear-regression/main/linear_regression_outliers.png',
        colorGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        date: '2025'
    },
    {
        id: 'hw-ml-algorithms',
        title: '機器學習十大演算法互動式學習平台',
        category: 'aiml',
        highlight: '10 大演算法 · 互動式視覺化調參',
        shortDescription: '涵蓋十大機器學習演算法的互動式視覺化學習平台。',
        longDescription: '此課程作業建構了一個互動式機器學習教學平台，完整介紹十大經典機器學習演算法，包含線性回歸、邏輯回歸、決策樹、隨機森林、SVM、K-Means 等。使用者可透過視覺化圖表與即時參數調整，深入理解各演算法的運作原理與適用情境，兼具學習性與實用性。',
        tags: ['Python', 'Machine Learning', 'Interactive', 'Data Visualization', 'Algorithms'],
        demoUrl: 'https://ml-algorithm-learning.onrender.com/',
        githubUrl: 'https://github.com/ChenYuHsu413/MLAlgorithmLearning',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/MLAlgorithmLearning/main/sources/demo_screenshot.png',
        colorGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        date: '2026'
    },
    {
        id: 'hw-boston-housing-regression',
        title: 'Boston Housing 房價回歸與特徵選擇分析',
        category: 'archive',
        highlight: 'CRISP-DM 流程 · 10 種特徵選擇演算法比較',
        shortDescription: '以 Boston Housing 資料集進行多元線性回歸、模型比較與特徵選擇分析。',
        longDescription: '此課程作業以 Boston Housing 房價資料集為分析對象，依照 CRISP-DM 流程完成資料理解、建模與評估。專案比較多組線性回歸特徵組合，並延伸使用 Sequential Feature Selection、RFE、Lasso、SelectKBest、Random Forest Importance、RidgeCV 等方法進行特徵選擇，最後以 RMSE、MAE、R² 與 Adjusted R² 評估模型表現，整理出具備解釋性的房價影響因子。',
        tags: ['Python', 'scikit-learn', 'Linear Regression', 'Feature Selection', 'CRISP-DM'],
        githubUrl: 'https://github.com/ChenYuHsu413/HW6-Kaggle-50-Startup',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/HW6-Kaggle-50-Startup/main/plots/crisp_dm_v4/feature_selection_performance_allinone_summary.png',
        colorGradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
        date: '2026'
    },
    {
        id: 'hw-ssr1-movie-webapp',
        title: 'SSR1 電影資料爬蟲與 AI 問答網站',
        category: 'aiml',
        highlight: '100 部電影爬蟲 · SQLite + AI catalog chatbot',
        shortDescription: '整合電影資料爬蟲、SQLite 資料庫、網站前台與 AI 目錄問答的端到端專案。',
        longDescription: '此專案從 ssr1.scrape.center 抓取 100 部電影資料，包含標題、分類、地區、片長、上映日期、評分、詳情頁與海報，並輸出 CSV、Excel、Markdown 與 SQLite 資料庫。前端提供電影海報格狀瀏覽、即時搜尋與分類篩選，並加入 AI 聊天機器人，可針對電影目錄進行問答；聊天功能支援 Groq、Gemini、Claude provider cascade，沒有 API key 時也能退回本地關鍵字搜尋。',
        tags: ['Python', 'FastAPI', 'Next.js', 'SQLite', 'Web Scraping', 'AI Chatbot'],
        demoUrl: 'https://ssr1-movie-webapp.vercel.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/ssr1-movie-webapp',
        previewImage: ssr1MovieImg,
        colorGradient: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)',
        date: '2026'
    },
    {
        id: 'proj-yyx-cramschool',
        title: '楊宜修國文文理補習班形象網站',
        category: 'web',
        highlight: '全響應式 RWD · 課程 / 師資 / 報名完整功能',
        shortDescription: '為文理補習班量身打造的現代化響應式形象官網。',
        longDescription: '此專案是為楊宜修國文文理補習班設計的形象網站。網站採用響應式網頁設計（RWD），包含班級介紹、師資陣容、最新消息與聯絡表單，旨在提供家長與學生一個清晰、專業且易於瀏覽的補習班入口平台。',
        tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'RWD', 'Institution'],
        demoUrl: 'https://chenyuhsu413.github.io/YangYiXiu/',
        githubUrl: 'https://github.com/ChenYuHsu413/YangYiXiu',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/YangYiXiu/main/sources/demo-screenshot.png',
        colorGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        date: '2026'
    },
    {
        id: 'proj-sulawesi-shrimp',
        title: '蘇拉威西蝦形象網站 Sulawesi: Living Gems',
        category: 'web',
        highlight: '品種百科 · 水質參數計算器 · AI 養殖顧問',
        shortDescription: '以高單價蘇拉威西觀賞蝦為主題的極簡奢華形象網站,含 AI 養殖顧問。',
        longDescription: '此專案是一個以高單價蘇拉威西觀賞蝦為主題的極簡奢華形象網站。首頁包含 Hero 微距影片、品種介紹、Care SOP 與水質參數計算器；品種百科頁提供難度篩選器與品系資訊卡。網站另內建 AI 養殖顧問聊天視窗，後端以 Vercel Serverless Function 代理，依序 fallback Groq → Gemini → OpenRouter，可回答蘇拉威西蝦養殖相關問題。',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Vercel Serverless', 'AI Chatbot', 'Aquarium'],
        demoUrl: 'https://sulawesi-test.vercel.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/SulawesiShrimp',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/SulawesiShrimp/main/sources/demo-screenshot.png',
        colorGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        date: '2026'
    },
    {
        id: 'proj-account-system',
        title: '個人智慧記帳與股票追蹤系統',
        category: 'web',
        highlight: '串接即時股價 API · 多類別收支統計圖表',
        shortDescription: '整合日常記帳收支管理與即時股票數據追蹤的個人理財系統。',
        longDescription: '此專案是一個整合性個人理財管理系統。除了提供直覺的每日收支記帳與分類統計圖表外，亦結合了股票數據追蹤功能，讓使用者能在單一平台上掌握日常消費狀況與股票投資組合的即時損益變動。',
        tags: ['JavaScript', 'Chart.js', 'Stock API', 'Financial Tracker', 'RWD'],
        demoUrl: 'https://chenyuhsu413.github.io/PersonalAccountSystem/',
        githubUrl: 'https://github.com/ChenYuHsu413/PersonalAccountSystem',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/PersonalAccountSystem/main/docs/screenshot_bookkeeping.png',
        colorGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        date: '2026'
    },
    {
        id: 'proj-palbreed',
        title: 'PalBreed 幻獸帕魯培育規劃器',
        category: 'game',
        highlight: '配種路線 · 詞條繼承機率 · AI 建議',
        shortDescription: '幫 Palworld 玩家規劃完美詞條培育路線的純前端工具。',
        longDescription: 'PalBreed 是為《幻獸帕魯 Palworld》後期玩家設計的培育規劃器。使用者可以建立素材帕魯資料庫，選擇目標物種與被動詞條後，系統會依配種表分析可行父母組合、性別條件、最短配種路徑、詞條缺口與繼承機率，並估算所需蛋數。專案也加入截圖辨識、JSON 匯入、存檔轉換工具與 AI 配種建議，資料儲存在瀏覽器 localStorage，不需後端上傳。',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'AI Assistant'],
        demoUrl: 'https://chenyuhsu413.github.io/PalBreed/',
        githubUrl: 'https://github.com/ChenYuHsu413/PalBreed',
        previewImage: palbreedImg,
        colorGradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        date: '2026'
    },
    {
        id: 'proj-scratch-teaching',
        title: '小小遊戲設計師 Scratch 程式先修班',
        category: 'web',
        highlight: '12 堂課程 · 任務卡與 Scratch iframe',
        shortDescription: '為國小三、四年級設計的 Scratch 程式先修互動教學網站。',
        longDescription: '此專案是一個 Scratch 程式先修課程網站，規劃 12 堂、每堂 3 小時的遊戲設計課程，包含角色動畫、互動故事、接水果、打地鼠、迷宮挑戰與作品升級分享。網站作為教學入口、範例展示與任務導引，提供課程總覽、單堂詳情、任務卡、小挑戰、常見錯誤與教師備課頁，並可嵌入 Scratch 專案 iframe，方便學生在學習流程中直接查看範例與前往 Remix。',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Scratch', 'Education'],
        demoUrl: 'https://chenyuhsu413.github.io/ScratchTeaching/',
        githubUrl: 'https://github.com/ChenYuHsu413/ScratchTeaching',
        previewImage: scratchTeachingImg,
        colorGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        date: '2026'
    },
    {
        id: 'proj-taiwan-pc-fit-checker',
        title: '台灣版 PC 組裝空間模擬器',
        category: 'web',
        highlight: '3D / 2D 相容性檢查 · 台灣化零件資料',
        shortDescription: '協助使用者在組裝前檢查機殼、顯卡、散熱器、水冷與電源尺寸相容性的工具。',
        longDescription: 'Taiwan PC Fit Checker 是一個偏台灣市場的 PC 組裝空間相容性工具。使用者可選擇機殼、主機板、顯卡、CPU 散熱器、水冷與電源等零件，系統依簡化尺寸資料判斷是否放得下，並提供 Safe、Tight、Warning、Incompatible 等狀態。專案同時提供 Three.js / React Three Fiber 3D 視覺化、2D 空間示意、走線建議、12VHPWR 彎折空間提醒與本地零件資料庫。',
        tags: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
        githubUrl: 'https://github.com/ChenYuHsu413/taiwan-pc-fit-checker',
        previewImage: BASE + 'sources/proj-taiwan-pc-fit-checker-og.png',
        colorGradient: 'linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)',
        date: '2026'
    },
    {
        id: 'hw-taiwan-weather-map',
        title: '台灣即時氣象視覺化地圖',
        category: 'web',
        highlight: '未使用 Windy API 或框架 · 自行實作類 Windy 風場效果',
        shortDescription: '整合 CWA、NOAA GFS、Leaflet 與 Canvas 的台灣即時氣象視覺化地圖。',
        longDescription: '此專案實作一個類 Windy 風格的台灣即時氣象地圖，但沒有使用 Windy API、圖磚、資料或內嵌服務。後端串接中央氣象署開放資料 API，負責資料抓取、清洗、快取、SQLite 紀錄與 fallback；前端使用 Leaflet 呈現互動地圖、測站資訊、縣市界線、雷達動畫與氣象圖層。氣溫與雨量透過 IDW 內插成平滑填色場，風場則使用 NOAA GFS 10m u/v 格點搭配 Canvas 粒子動畫，自行做出類 Windy 的動態流線效果。',
        tags: ['Next.js', 'TypeScript', 'Leaflet', 'Canvas', 'CWA API', 'NOAA GFS'],
        demoUrl: 'https://taiwan-weather-map.vercel.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/taiwan-weather-map',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/taiwan-weather-map/main/docs/screenshot.png',
        colorGradient: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
        date: '2026'
    },
    {
        id: 'aiml-ai-town',
        title: 'AI Town 多代理人社會模擬',
        category: 'aiml',
        highlight: '5 個 LLM 代理人 · 謠言傳播與關係系統 · 近零 LLM 成本',
        shortDescription: '生成式多代理人小鎮模擬,AI 村民會聊天、傳謠言、鬧翻與和好。',
        longDescription: '此專案是一個生成式多代理人社會模擬,5 個 LLM 驅動的村民在像素小鎮中依日常作息生活、對話、傳播謠言、破壞信任並最終當面對質和解。系統採事件驅動排程器與四層決策漏斗(規則 → cheap → normal → smart LLM),約 90% 的決策由規則解決,搭配 Groq → Gemini → OpenRouter → mock 的三重免費供應商 fallback,以近乎零成本跑完一整天。代理人具備語意記憶,會將重複經驗蒸餾為帶信心值與衰減的長期印象;世界支援日夜循環、天氣與祭典等上帝模式效果。持久層使用 Postgres + pgvector 儲存事件、記憶與世界快照,支援中斷續跑與時間軸回放;前端為單一 HTML 檔的像素村莊 UI,含 WebSocket 即時事件流、關係力導向圖與代理人檢視器。',
        tags: ['Python', 'FastAPI', 'LLM Agents', 'pgvector', 'WebSocket', 'Simulation'],
        githubUrl: 'https://github.com/ChenYuHsu413/AITown',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/AITown/main/docs/img/town3d-day.png',
        colorGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        date: '2026'
    },
    {
        id: 'aiml-servo-predictive-maintenance',
        title: 'AI 伺服馬達預測性維護系統',
        category: 'aiml',
        highlight: '健康分類 macro-F1 0.819 · 退化回歸 R² 0.944 · MLOps 閉環',
        shortDescription: '端到端預測性維護原型,含漂移偵測、自動重訓與 LLM 維護助理。',
        longDescription: '此專案為端到端預測性維護原型,以真實 PHM FMCRD 伺服馬達退化資料為主線,達成健康分類 macro-F1 0.819 與退化值回歸 R² 0.944,並附 CRC32 指紋資料溯源。另含 A/B/B+/C 四條對照軌(UCI AI4I、IMS、XJTU-SY、Paderborn),涵蓋不同失效模式與感測模態。系統具完整 MLOps 閉環:串流監控 → 告警 → 漂移偵測 → 自動重訓 → 驗證閘門 → 模型版本 registry,並整合 LLM 維護助理與 RAG 知識庫,產出人類可讀的維護建議。主前端為 Next.js Command Center,後端為 FastAPI,151 項測試通過並以 GitHub Actions CI 驗證。',
        tags: ['Python', 'scikit-learn', 'FastAPI', 'Next.js', 'MLOps', 'RAG'],
        demoUrl: 'https://ai-final-project-one.vercel.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/AIFinalProject',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/AIFinalProject/main/outputs/figures/servo_modality_matrix.png',
        colorGradient: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
        date: '2026'
    },
    {
        id: 'aiml-ai-servo-platform',
        title: 'AI SERVO PLATFORM 治理與監控平台',
        category: 'aiml',
        highlight: '前後端分離架構 · 稽核雜湊鏈 · 三角色工作台',
        shortDescription: '工業伺服系統治理平台:Flask HMI 前端 + FastAPI 治理後端。',
        longDescription: '此專案為 AI SERVO PLATFORM 的前後端完整實作。前端(AI-Servo-Frontend)是 Flask Web HMI,為操作員、設備工程師與系統管理者提供三種角色導向工作台,整合即時設備狀態、AI 特徵監控、警報處理、受控命令與平台治理,81 項測試通過;未設定 SERVICE_TOKEN 時自動退回 fixture 模式,後端失效時頁面降級而非報錯。後端(FinalProject-Backend,https://github.com/ChenYuHsu413/FinalProject-Backend)為 FastAPI 治理層與引擎層,實作命令、警報生命週期狀態機、PostgreSQL append-only 稽核雜湊鏈(REVOKE + trigger 三層防護)、核准流程與世界快照,瀏覽器僅透過 Flask BFF 以 service token 存取,以 Docker Compose 部署於 GCP。',
        tags: ['Python', 'Flask', 'FastAPI', 'PostgreSQL', 'Docker', 'RBAC'],
        githubUrl: 'https://github.com/ChenYuHsu413/AI-Servo-Frontend',
        previewImage: BASE + 'sources/aiml-ai-servo-platform-og.png',
        colorGradient: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
        date: '2026'
    },
    {
        id: 'proj-mh-build-finder',
        title: 'Monster Hunter 多遊戲配裝搜尋器',
        category: 'game',
        highlight: '三代 MH 支援 · EFR 期望傷害排序 · 純前端 Web Worker',
        shortDescription: '技能條件驅動的 MH 配裝搜尋器,支援 Rise / World / Wilds 三款遊戲。',
        longDescription: '此專案是以技能條件與武器選擇驅動的《Monster Hunter》配裝搜尋工具,支援 Rise: Sunbreak、World: Iceborne 與 Wilds 三款遊戲,收錄上千件防具、武器、裝飾珠與護石資料。排名採 EFR(有效攻擊力/期望傷害)模型,兼顧物理與屬性;無後端,資料為本地靜態 JSON,搜尋在前端 Web Worker 執行。支援固定部位、護石庫、保留洞位、傀異鍊成/武器強化/Artian 武器等進階控制,World/Wilds 的複合珠以有界局部搜尋 solver 處理,並內建各階段推薦配裝資料庫。三款遊戲以 localStorage 前綴隔離狀態,分享連結可還原完整配置。',
        tags: ['TypeScript', 'Next.js', 'React', 'Web Worker', 'Tailwind CSS', 'Game Tool'],
        demoUrl: 'https://monster-hunter-rise-equipment-searc.vercel.app',
        githubUrl: 'https://github.com/ChenYuHsu413/Monster-Hunter-equipment-search-tool',
        previewImage: mhBuildFinderImg,
        colorGradient: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 100%)',
        date: '2026'
    },
    {
        id: 'proj-artale-romio',
        title: 'Artale 羅朱組隊任務即時同步工具',
        category: 'game',
        highlight: '多人即時同步 · Vercel Serverless + Redis 房間機制',
        shortDescription: '羅密歐與茱麗葉組隊任務的多人樓層標記工具,全隊即時同步。',
        longDescription: '此專案是為 Artale「羅密歐與茱麗葉」組隊任務打造的多人即時同步樓層標記工具。玩家建立或加入房間後,每位隊友選擇一個顏色(101–104),點擊格子標記正確平台,路線每 1.5 秒輪詢同步給全隊,房間 20 分鐘無更新自動關閉。前端為純 HTML/CSS/JS,後端使用 Vercel Serverless Function 搭配 Upstash Redis 儲存房間狀態,另提供本機開發用的記憶體儲存 Node 後端,免設定資料庫即可開發。',
        tags: ['JavaScript', 'Vercel Serverless', 'Redis', 'Realtime', 'Game Tool'],
        demoUrl: 'https://artale-romio.vercel.app',
        githubUrl: 'https://github.com/ChenYuHsu413/Artale-Romio',
        previewImage: artaleRomioImg,
        colorGradient: 'linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)',
        date: '2026'
    },
    {
        id: 'game-lol-worlds-2026',
        title: 'LoL Worlds 2026 世界賽視覺化',
        category: 'game',
        highlight: 'Play-In / 瑞士輪 / 淘汰賽籤表 · 小局 Ban/Pick 與 KDA',
        shortDescription: '以單頁網站呈現英雄聯盟 2026 世界賽籤表、賽程、比分與小局細節。',
        longDescription: '此專案以單頁網站呈現英雄聯盟 2026 世界賽,包含 Play-In 雙敗籤表、瑞士輪戰績分桶對戰圖、淘汰賽籤表與全部賽程,時間一律以台灣時間顯示。資料主要來自 LoL Esports API,API 沒有提供的輪次、戰績桶與籤表晉級路線則由程式自行推算,並以 2025 世界賽資料驗證;籤表連線以 SVG 自行繪製,未使用 bracket 函式庫。瑞士輪可切換對戰圖與戰績表,並顯示分池與抽籤規則;參賽隊伍頁列出各隊賽區與登錄選手。點選任一系列賽即可開啟小局面板,查看每局英雄、KDA、補刀、經濟、Ban/Pick 順序與 Fearless 已鎖定英雄池。上游資料失效時會保留最後一次成功的資料並顯示提示,不會白屏。',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SVG', 'Vitest', 'Game Tool'],
        demoUrl: 'https://lol-worlds-2026.vercel.app',
        githubUrl: 'https://github.com/ChenYuHsu413/lol-worlds-2026',
        previewImage: lolWorldsImg,
        colorGradient: 'linear-gradient(135deg, #0ea5e9 0%, #b45309 100%)',
        date: '2026'
    },
    {
        id: 'game-deskrawl-monitor',
        title: 'Deskrawl Monitor 桌面破壞神更新監控',
        category: 'game',
        highlight: 'Steam Build ID 監控 · LLM 公告翻譯 · GitHub Actions 自動化',
        shortDescription: '監控 Steam 遊戲《桌面破壞神》版本更新,並自動將官方英文公告翻成中文轉發到 Discord。',
        longDescription: '此專案以 GitHub Actions 自動監控 Steam 遊戲《桌面破壞神:掛機ARPG》,包含兩個互相獨立的功能。其一是 Build ID 監控:定期查詢 public branch 的 Build ID,一有變化就推播到 Discord。其二是官方公告翻譯轉發:自建 Discord Bot 讀取官方英文公告,交由 LLM(Claude 為主、Gemini 備援)翻成繁體中文並將日期換算為台灣時間後轉發;翻譯搭配可維護的術語表統一譯名,公告中的圖片也會縮圖後一併送入模型翻譯圖中文字。workflow 由排程定時觸發,狀態只在推播成功後才 commit 更新,失敗時下次自動重試。',
        tags: ['GitHub Actions', 'Bash', 'Discord Bot', 'Claude API', 'Gemini API', 'Game Tool'],
        githubUrl: 'https://github.com/ChenYuHsu413/deskrawl-monitor',
        previewImage: BASE + 'sources/game-deskrawl-monitor-og.png',
        colorGradient: 'linear-gradient(135deg, #78350f 0%, #dc2626 100%)',
        date: '2026'
    },
    {
        id: 'proj-receipt-check',
        title: 'Gmail 電子發票自動解析與對獎系統',
        category: 'aiml',
        highlight: 'Gmail API 自動抓取 · 財政部獎號自動對獎 · CLI + 儀表板雙模式',
        shortDescription: '自動解析 Gmail 電子發票、匯入 Google Sheets 並自動對獎的工具。',
        longDescription: '此專案自動化處理 Gmail 中的電子發票:以 Gmail 運算子精準篩選發票信件,支援對無附件的純 HTML 信件(如 Uber、外送平台)進行回退式內文解析,並提供 local(pdfplumber 正則)、Gemini 多模態與 Claude 三種解析模式因應不同發票版面。解析結果安全寫入 Google Sheets,以本地快取與雲端資料行雙重防護避免重複匯入,加密 PDF 會自動偵測並標記。系統透過財政部電子發票 XML 獎號自動對獎,涵蓋特別獎至六獎與雲端發票專屬獎;可用 CLI 排程模式靜默執行,或使用毛玻璃風格的 Streamlit 儀表板視覺化管理。',
        tags: ['Python', 'Streamlit', 'Gmail API', 'Google Sheets', 'Gemini API'],
        demoUrl: 'https://chenyu-personalreciptchecck.streamlit.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/PersonalReciptCheck',
        previewImage: BASE + 'sources/proj-receipt-check-og.png',
        colorGradient: 'linear-gradient(135deg, #22d3ee 0%, #16a34a 100%)',
        date: '2026'
    },
    {
        id: 'arc-sketchup-modeling',
        title: '清大原子爐 SketchUp 還原建模',
        category: 'archive',
        highlight: '實體建築觀察還原 · 模型與實景對照',
        shortDescription: '2013 年的 SketchUp 自主建模練習，觀察清大原子爐建築並還原其量體結構與入口門牌細節。',
        longDescription: '此為 2013 年在學期間自主完成的 SketchUp 3D 建模練習，並非課程作業，而是出於對 3D 建模的興趣，以國立清華大學的原子爐建築（原科中心反應器組）為還原對象。建模從整體量體的觀察與拆解開始，先建立主體的階狀量體組合與立面的垂直板狀結構，再針對入口門牌進行細部還原，包含深紅色門框造型與牌面題字的位置比例，最後以模型與實景照片並排對照，檢視還原的準確度。雖然屬於練習性質的作品，但過程中扎實練習了空間結構的觀察與拆解、比例與尺度的掌握，以及將實體建築轉化為 3D 模型的基本工作流程，也是我接觸 3D 建模與空間設計的起點。',
        tags: ['SketchUp', '3D Modeling', 'Architecture Reference', 'Spatial Design', 'Archive'],
        previewImage: sketchupBuildingImg,
        gallery: [
            {
                src: sketchupBuildingImg,
                alt: 'SketchUp white massing model of the building with vertical fin structures',
                caption: '建築主體白模：階狀量體組合與立面垂直板狀結構'
            },
            {
                src: sketchupEntranceImg,
                alt: 'Side-by-side comparison of the SketchUp entrance model and the real building photo',
                caption: '入口門牌還原：左為 SketchUp 模型，右為實景照片對照'
            }
        ],
        colorGradient: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
        date: '2013'
    }
]
