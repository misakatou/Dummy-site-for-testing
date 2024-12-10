// カートに商品を追加する関数
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 既にカートにある商品か確認
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " をカートに追加しました。");
    updateTopPageTotal(); // 合計金額を更新
}

// カートページを表示する関数
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = ''; // 一度テーブルをクリア

    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        let row = cartTableBody.insertRow();
        
        let nameCell = row.insertCell(0);
        let priceCell = row.insertCell(1);
        let quantityCell = row.insertCell(2);
        let totalCell = row.insertCell(3);
        let actionCell = row.insertCell(4);

        nameCell.textContent = item.name;
        priceCell.textContent = "¥" + item.price;
        quantityCell.textContent = item.quantity;
        totalCell.textContent = "¥" + (item.price * item.quantity);
        
        // 削除ボタン
        let removeButton = document.createElement('button');
        removeButton.textContent = '削除';
        removeButton.onclick = () => {
            cart.splice(index, 1); // カートから商品を削除
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart(); // カートを再表示
            updateTopPageTotal(); // 合計金額を更新
        };
        actionCell.appendChild(removeButton);

        totalPrice += item.price * item.quantity;
    });
    
    document.getElementById('totalPrice').textContent = totalPrice;
}

// トップページの合計金額を更新する関数
function updateTopPageTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    let priceElement = document.getElementById('price');
    if (priceElement) {
        priceElement.textContent = "合計金額: ¥" + totalPrice;
    }
}

// ページが読み込まれたときにカートを表示する
if (document.getElementById('cartTable')) {
    document.addEventListener('DOMContentLoaded', displayCart);
}

// 注文確認ページのカート内容表示
if (document.getElementById('checkoutCartTable')) {
    document.addEventListener('DOMContentLoaded', displayCheckoutCart);
}

function displayCheckoutCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#checkoutCartTable tbody');
    cartTableBody.innerHTML = ''; // テーブルをクリア

    let totalPrice = 0;

    cart.forEach((item) => {
        let row = cartTableBody.insertRow();

        let nameCell = row.insertCell(0);
        let priceCell = row.insertCell(1);
        let quantityCell = row.insertCell(2);
        let totalCell = row.insertCell(3);

        nameCell.textContent = item.name;
        priceCell.textContent = "¥" + item.price;
        quantityCell.textContent = item.quantity;
        totalCell.textContent = "¥" + (item.price * item.quantity);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('checkoutTotalPrice').textContent = totalPrice;
}

// 支払い情報のフォーム送信処理
if (document.getElementById('paymentForm')) {
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // 支払い情報を取得（ここでは簡単に保存せず進行）
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const creditCard = document.getElementById('creditCard').value;

        if (name && address && creditCard) {
            alert("支払いが完了しました。");

            // カートをクリア
            localStorage.removeItem('cart');

            // 注文完了ページにリダイレクト
            window.location.href = 'order-complete.html';
        } else {
            alert("すべてのフィールドに入力してください。");
        }
    });
}

// トップページの合計金額を表示
document.addEventListener('DOMContentLoaded', updateTopPageTotal);
