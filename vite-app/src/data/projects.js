const BASE = import.meta.env.BASE_URL

const sketchupBuildingImg = BASE + 'sources/sketchup-building-model.jpg'
const sketchupEntranceImg = BASE + 'sources/sketchup-entrance-comparison.jpg'

export const PROJECTS = [
    {
        id: 'hw-cosmos-img',
        title: 'AI生圖工作室',
        category: 'aiml',
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
        category: 'aiml',
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
        category: 'aiml',
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
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/ssr1-movie-webapp/main/web/public/posters/1.jpg',
        colorGradient: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)',
        date: '2026'
    },
    {
        id: 'proj-yyx-cramschool',
        title: '楊宜修國文文理補習班形象網站',
        category: 'project',
        highlight: '全響應式 RWD · 課程 / 師資 / 報名完整功能',
        shortDescription: '為文理補習班量身打造的現代化響應式形象官網。',
        longDescription: '此專案是為楊宜修國文文理補習班設計的形象網站。網站採用響應式網頁設計（RWD），包含班級介紹、師資陣容、最新消息與聯絡表單，旨在提供家長與學生一個清晰、專業且易於瀏覽的補習班入口平台。',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'RWD', 'Institution'],
        demoUrl: 'https://chenyuhsu413.github.io/YYXTest/',
        githubUrl: 'https://github.com/ChenYuHsu413/YYXTest',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/YYXTest/main/sources/demo-screenshot.png',
        colorGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        date: '2026'
    },
    {
        id: 'proj-sulawesi-shrimp',
        title: '蘇拉威西蝦形象網站',
        category: 'project',
        highlight: '多品種圖鑑 · 詳細飼育水質環境參數',
        shortDescription: '介紹蘇拉威西觀賞蝦品種、飼養水質與生態環境的形象網站。',
        longDescription: '此專案是一個專門為蘇拉威西觀賞蝦打造的介紹與形象展示網站。網站呈現了細緻的各類蝦種圖鑑、特有的飼養環境參數（如 pH 值、溫度、礦物質等）以及造景建議，以流暢的介面推廣觀賞蝦養殖愛好。',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Sulawesi Shrimp', 'Aquarium'],
        demoUrl: 'https://chenyuhsu413.github.io/SulawesiTest/',
        githubUrl: 'https://github.com/ChenYuHsu413/SulawesiTest',
        previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/SulawesiTest/main/sources/demo-screenshot.png',
        colorGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        date: '2026'
    },
    {
        id: 'proj-account-system',
        title: '個人智慧記帳與股票追蹤系統',
        category: 'project',
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
        category: 'project',
        highlight: '配種路線 · 詞條繼承機率 · AI 建議',
        shortDescription: '幫 Palworld 玩家規劃完美詞條培育路線的純前端工具。',
        longDescription: 'PalBreed 是為《幻獸帕魯 Palworld》後期玩家設計的培育規劃器。使用者可以建立素材帕魯資料庫，選擇目標物種與被動詞條後，系統會依配種表分析可行父母組合、性別條件、最短配種路徑、詞條缺口與繼承機率，並估算所需蛋數。專案也加入截圖辨識、JSON 匯入、存檔轉換工具與 AI 配種建議，資料儲存在瀏覽器 localStorage，不需後端上傳。',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'AI Assistant'],
        demoUrl: 'https://chenyuhsu413.github.io/PalBreed/',
        githubUrl: 'https://github.com/ChenYuHsu413/PalBreed',
        previewImage: 'https://opengraph.githubassets.com/palbreed/ChenYuHsu413/PalBreed',
        colorGradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        date: '2026'
    },
    {
        id: 'proj-scratch-teaching',
        title: '小小遊戲設計師 Scratch 程式先修班',
        category: 'project',
        highlight: '12 堂課程 · 任務卡與 Scratch iframe',
        shortDescription: '為國小三、四年級設計的 Scratch 程式先修互動教學網站。',
        longDescription: '此專案是一個 Scratch 程式先修課程網站，規劃 12 堂、每堂 3 小時的遊戲設計課程，包含角色動畫、互動故事、接水果、打地鼠、迷宮挑戰與作品升級分享。網站作為教學入口、範例展示與任務導引，提供課程總覽、單堂詳情、任務卡、小挑戰、常見錯誤與教師備課頁，並可嵌入 Scratch 專案 iframe，方便學生在學習流程中直接查看範例與前往 Remix。',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Scratch', 'Education'],
        demoUrl: 'https://chenyuhsu413.github.io/ScratchTeaching/',
        githubUrl: 'https://github.com/ChenYuHsu413/ScratchTeaching',
        previewImage: 'https://opengraph.githubassets.com/scratch-teaching/ChenYuHsu413/ScratchTeaching',
        colorGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        date: '2026'
    },
    {
        id: 'proj-taiwan-pc-fit-checker',
        title: '台灣版 PC 組裝空間模擬器',
        category: 'project',
        highlight: '3D / 2D 相容性檢查 · 台灣化零件資料',
        shortDescription: '協助使用者在組裝前檢查機殼、顯卡、散熱器、水冷與電源尺寸相容性的工具。',
        longDescription: 'Taiwan PC Fit Checker 是一個偏台灣市場的 PC 組裝空間相容性工具。使用者可選擇機殼、主機板、顯卡、CPU 散熱器、水冷與電源等零件，系統依簡化尺寸資料判斷是否放得下，並提供 Safe、Tight、Warning、Incompatible 等狀態。專案同時提供 Three.js / React Three Fiber 3D 視覺化、2D 空間示意、走線建議、12VHPWR 彎折空間提醒與本地零件資料庫。',
        tags: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
        githubUrl: 'https://github.com/ChenYuHsu413/taiwan-pc-fit-checker',
        previewImage: 'https://opengraph.githubassets.com/taiwan-pc-fit-checker/ChenYuHsu413/taiwan-pc-fit-checker',
        colorGradient: 'linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)',
        date: '2026'
    },
    {
        id: 'hw-taiwan-weather-map',
        title: '台灣即時氣象視覺化地圖',
        category: 'aiml',
        highlight: '未使用 Windy API 或框架 · 自行實作類 Windy 風場效果',
        shortDescription: '整合 CWA、NOAA GFS、Leaflet 與 Canvas 的台灣即時氣象視覺化地圖。',
        longDescription: '此專案實作一個類 Windy 風格的台灣即時氣象地圖，但沒有使用 Windy API、圖磚、資料或內嵌服務。後端串接中央氣象署開放資料 API，負責資料抓取、清洗、快取、SQLite 紀錄與 fallback；前端使用 Leaflet 呈現互動地圖、測站資訊、縣市界線、雷達動畫與氣象圖層。氣溫與雨量透過 IDW 內插成平滑填色場，風場則使用 NOAA GFS 10m u/v 格點搭配 Canvas 粒子動畫，自行做出類 Windy 的動態流線效果。',
        tags: ['Next.js', 'TypeScript', 'Leaflet', 'Canvas', 'CWA API', 'NOAA GFS'],
        demoUrl: 'https://taiwan-weather-map.vercel.app/',
        githubUrl: 'https://github.com/ChenYuHsu413/taiwan-weather-map',
        previewImage: 'https://opengraph.githubassets.com/taiwan-weather-map/ChenYuHsu413/taiwan-weather-map',
        colorGradient: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
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
