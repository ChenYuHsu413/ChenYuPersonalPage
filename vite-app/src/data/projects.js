const BASE = import.meta.env.BASE_URL

export const PROJECTS = [
    {
        id: 'hw-cosmos-img',
        title: 'AI生圖工作室',
        category: 'homework',
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
        category: 'homework',
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
        category: 'homework',
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
        id: 'arc-sketchup-modeling',
        title: '清大原子爐 SketchUp 還原建模',
        category: 'archive',
        highlight: '實體建築觀察還原 · 模型與實景對照',
        shortDescription: '2013 年的 SketchUp 自主建模練習，觀察清大原子爐建築並還原其量體結構與入口門牌細節。',
        longDescription: '此為 2013 年在學期間自主完成的 SketchUp 3D 建模練習，並非課程作業，而是出於對 3D 建模的興趣，以國立清華大學的原子爐建築（原科中心反應器組）為還原對象。建模從整體量體的觀察與拆解開始，先建立主體的階狀量體組合與立面的垂直板狀結構，再針對入口門牌進行細部還原，包含深紅色門框造型與牌面題字的位置比例，最後以模型與實景照片並排對照，檢視還原的準確度。雖然屬於練習性質的作品，但過程中扎實練習了空間結構的觀察與拆解、比例與尺度的掌握，以及將實體建築轉化為 3D 模型的基本工作流程，也是我接觸 3D 建模與空間設計的起點。',
        tags: ['SketchUp', '3D Modeling', 'Architecture Reference', 'Spatial Design', 'Archive'],
        previewImage: BASE + 'sources/sketchup-building-model.jpg',
        gallery: [
            {
                src: BASE + 'sources/sketchup-building-model.jpg',
                alt: 'SketchUp white massing model of the building with vertical fin structures',
                caption: '建築主體白模：階狀量體組合與立面垂直板狀結構'
            },
            {
                src: BASE + 'sources/sketchup-entrance-comparison.jpg',
                alt: 'Side-by-side comparison of the SketchUp entrance model and the real building photo',
                caption: '入口門牌還原：左為 SketchUp 模型，右為實景照片對照'
            }
        ],
        colorGradient: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
        date: '2013'
    }
]
