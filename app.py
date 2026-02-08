from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Простейшее хранилище постов
posts = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_post', methods=['POST'])
def add_post():
    data = request.json
    text = data.get('text')
    user = data.get('user')
    if text and user:
        post = {"text": text, "user": user}
        posts.append(post)
        return jsonify({"status": "ok", "post": post})
    return jsonify({"status": "error"}), 400

@app.route('/get_posts', methods=['GET'])
def get_posts():
    return jsonify(posts[::-1])  # показываем новые посты сверху

if __name__ == "__main__":
    app.run(debug=True)
