document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ

    // ユーザーが入力したユーザー名とパスワードを取得
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 指定されたユーザー名とパスワードを確認
    if (username === 'asdfghjk' && password === '12345!') {
        // 成功時、次のページにリダイレクト（仮に次のページを 'dashboard.html' とします）
        window.location.href = 'dashboard.html';
    } else {
        // 失敗時、エラーメッセージを表示
        document.getElementById('errorMessage').style.display = 'block';
    }
});
