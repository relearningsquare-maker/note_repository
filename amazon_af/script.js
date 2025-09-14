document.addEventListener('DOMContentLoaded', () => {
    const amazonUrlInput = document.getElementById('amazonUrl');
    const productImageUrlInput = document.getElementById('productImageUrl');
    const productNameInput = document.getElementById('productNameInput');
    const productPriceInput = document.getElementById('productPriceInput');
    const generateButton = document.getElementById('generateButton');
    const productInfoDiv = document.getElementById('productInfo');
    const htmlOutputTextarea = document.getElementById('htmlOutput');
    const copyButton = document.getElementById('copyButton');

    generateButton.addEventListener('click', generateAffiliatePart);
    copyButton.addEventListener('click', copyHtmlCode);

    // 初期表示のプレースホルダー
    productInfoDiv.innerHTML = `
        <p>商品情報を入力して「パーツ生成」ボタンを押してください。</p>
    `;

    function generateAffiliatePart() {
        const amazonUrl = amazonUrlInput.value.trim();
        const productImageUrl = productImageUrlInput.value.trim();
        const productName = productNameInput.value.trim();
        const productPrice = productPriceInput.value.trim();

        if (!amazonUrl || !productImageUrl || !productName || !productPrice) {
            alert('すべての商品情報を入力してください。');
            return;
        }

        // 現在の日付を取得
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;

        // 商品情報オブジェクトの作成（手動入力された値を使用）
        const product = {
            imageUrl: productImageUrl,
            productName: productName,
            price: productPrice,
            affiliateUrl: amazonUrl
        };

        // 商品プレビューの表示
        productInfoDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.productName}">
            <p class="product-name">${product.productName}</p>
            <p class="product-price">${product.price}</p>
            <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">執筆時点（${formattedDate}）の値段</p>
            <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="buy-button">Amazonで購入</a>
        `;

        // HTMLコードの生成
        // ブログに貼り付けることを想定し、インラインスタイルで基本的なデザインを適用
        const htmlCode = `
<div class="amazon-affiliate-part" style="
    display: flex;
    flex-direction: column;
    align-items: center; /* 中央寄せ */
    text-align: center;
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 700px; /* ブログに貼り付ける際の最大幅を想定 */
    margin: 20px 0; /* 左寄せ */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    line-height: 1.6;
">
    <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
        <img src="${product.imageUrl}" alt="${product.productName}" style="
            max-width: 180px;
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        ">
        <p class="product-name" style="
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        ">${product.productName}</p>
        <p class="product-price" style="
            font-size: 1.5em;
            color: #b12704;
            font-weight: bold;
            margin-bottom: 5px; /* 日付表示のためにマージンを調整 */
        ">${product.price}</p>
        <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">執筆時点（${formattedDate}）の値段</p>
    </a>
    <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="buy-button" style="
        display: inline-block;
        padding: 12px 30px;
        background-color: #ff9900;
        color: white;
        text-decoration: none;
        border-radius: 25px;
        font-size: 1.1em;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    ">Amazonで購入</a>
</div>
        `.trim(); // 余分な空白行を削除

        htmlOutputTextarea.value = htmlCode;
    }

    function copyHtmlCode() {
        htmlOutputTextarea.select();
        document.execCommand('copy');
        alert('HTMLコードをクリップボードにコピーしました！');
    }
});
