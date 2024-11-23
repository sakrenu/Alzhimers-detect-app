# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# # from memory_test import MemoryTest  # Add similar test logic for other tests

# app = Flask(__name__)
# CORS(app)

# test_sessions = {}

# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Memory"

#     if test_type == "GoNoGo":
#         test_sessions[session_id] = GoNoGoTest()
#     # elif test_type == "Memory":
#     #     test_sessions[session_id] = MemoryTest()
#     else:
#         return jsonify({"error": "Invalid test type"}), 400

#     test_sessions[session_id].start_trial()
#     return jsonify({"signal": test_sessions[session_id].current_signal})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     is_go_response = request.json.get("is_go_response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(is_go_response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     return jsonify({"signal": test.current_signal})

# # if __name__ == '__main__':
#     app.run(debug=True)

# ----------------------perfect till nogotest------------------------------------

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# from stroop_test import StroopTest  # Import the StroopTest class

# app = Flask(__name__)
# CORS(app)

# test_sessions = {}

# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop"
#     language_code = request.json.get("language_code", "en")  # Default to English

#     if test_type == "GoNoGo":
#         test_sessions[session_id] = GoNoGoTest()
#     elif test_type == "Stroop":
#         test_sessions[session_id] = StroopTest(language_code)
#     else:
#         return jsonify({"error": "Invalid test type"}), 400

#     test_sessions[session_id].start_trial()
#     return jsonify({"signal": test_sessions[session_id].current_signal})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     response = request.json.get("response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     return jsonify({"signal": test.current_signal})

# if __name__ == '__main__':
#     app.run(debug=True)


# abouve ovne is completely perfecg ============



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# from stroop_test import StroopTest  # Import the StroopTest class

# app = Flask(__name__)
# CORS(app)

# test_sessions = {}

# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop"
#     language_code = request.json.get("language_code", "en")  # Default to English

#     if test_type == "GoNoGo":
#         test_sessions[session_id] = GoNoGoTest()
#     elif test_type == "Stroop":
#         test_sessions[session_id] = StroopTest(language_code)
#     else:
#         return jsonify({"error": "Invalid test type"}), 400

#     test_sessions[session_id].start_trial()
#     return jsonify({"signal": test_sessions[session_id].current_signal})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     response = request.json.get("response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     return jsonify({"signal": test.current_signal})

# if __name__ == '__main__':
#     app.run(debug=True)

# ----------------for memeory test integration - -------------------------------------
# app.py
from flask import Flask, request, jsonify,render_template, session
from flask_cors import CORS
from cognitive_test import GoNoGoTest
from stroop_test import StroopTest
from memory_test import MemoryTest
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from models import db, User, Doctor, init_db
import os
import requests # Import the MemoryTest class
from hugchat import hugchat
from hugchat.login import Login




API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
KEYWORD = "Alzheimers"


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.secret_key = "your_secret_key" 


if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


test_sessions = {}

HF_GMAIL = "simhadrisevitha.211ai036@nitk.edu.in"
HF_PASS = "Daddy5544*"
HF_TOKEN = "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"
BASE_PROMPT = "Please provide detailed information about your symptoms so I can assist you."
cookie_path_dir = "./cookies/"  # NOTE: trailing slash (/) is required to avoid errors


# Initialize HuggingFace login and chatbot
sign = Login(HF_GMAIL, HF_PASS)
cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)
chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
# Function to get news from the API
def _get_news():
    response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
    return response.json()['articles']

# News API route
@app.route('/get-news', methods=['GET'])
def get_news():
    try:
        articles = _get_news()  # Fetch news articles
        return jsonify({"articles": articles})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_response(prompt_input):
    """
    Function to generate LLM response from the provided input.
    """
    prompt_input = BASE_PROMPT + prompt_input
    message_result = chatbot.chat(prompt_input)
    
    # Non-stream response (waiting for the result)
    response = message_result.wait_until_done()  # blocking call
    return str(response).strip('`')


@app.route('/start-test', methods=['POST'])
def start_test():
    session_id = request.json.get("session_id")
    test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop", "Memory"
    language_code = request.json.get("language_code", "en")  # Default to English

    if test_type == "GoNoGo":
        test_sessions[session_id] = GoNoGoTest()
    elif test_type == "Stroop":
        test_sessions[session_id] = StroopTest(language_code)
    elif test_type == "Memory":
        test_sessions[session_id] = MemoryTest(language_code)
    else:
        return jsonify({"error": "Invalid test type"}), 400

    test_sessions[session_id].start_trial()
    return jsonify({"signal": test_sessions[session_id].current_signal})

@app.route('/submit-response', methods=['POST'])
def submit_response():
    session_id = request.json.get("session_id")
    response = request.json.get("response")

    if session_id not in test_sessions:
        return jsonify({"error": "Invalid session"}), 400

    test = test_sessions[session_id]
    test.evaluate_response(response)

    if test.current_trial >= test.total_trials:
        results = test.get_results()
        del test_sessions[session_id]
        return jsonify({"results": results})

    return jsonify({"signal": test.current_signal})


@app.route("/chat", methods=["POST"])
def chat_bot():
    """
    API endpoint to interact with the chatbot.
    """
    # Initialize the messages if not already in session state
    if "messages" not in session:
        session["messages"] = [{"role": "assistant", "content": "Hi! How may I help you?"}]

    data = request.json
    prompt = data.get("user_input", "")
    session["messages"].append({"role": "user", "content": prompt})

    # Generate a response if the last message is from the user
    response = generate_response(prompt)
    session["messages"].append({"role": "assistant", "content": response})

    return jsonify({"response": response, "messages": session["messages"]})

if __name__ == '__main__':
    app.run(debug=True)


# app.py






































# from flask import Flask, request, jsonify, render_template
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# from stroop_test import StroopTest
# from memory_test import MemoryTest  # Import the MemoryTest class
# import requests

# app = Flask(__name__)
# CORS(app)

# test_sessions = {}

# API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# KEYWORD = "Alzheimers"

# # Function to get news from the API
# def _get_news():
#     response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
#     return response.json()['articles']

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/api/news')
# def news_api():
#     articles = _get_news()  # Get news articles
#     return jsonify({'articles': articles})

# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop", "Memory"
#     language_code = request.json.get("language_code", "en")  # Default to English

#     if test_type == "GoNoGo":
#         test_sessions[session_id] = GoNoGoTest()
#     elif test_type == "Stroop":
#         test_sessions[session_id] = StroopTest(language_code)
#     elif test_type == "Memory":
#         test_sessions[session_id] = MemoryTest(language_code)
#     else:
#         return jsonify({"error": "Invalid test type"}), 400

#     test_sessions[session_id].start_trial()
#     return jsonify({"signal": test_sessions[session_id].current_signal})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     response = request.json.get("response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     return jsonify({"signal": test.current_signal})

# if __name__ == '__main__':
#     app.run(debug=True)

# --------------------------news related landing page-----------------------------------------------------------------------------------""
# from flask import Flask, render_template, send_from_directory, jsonify, request
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# from stroop_test import StroopTest
# from memory_test import MemoryTest
# import requests
# import os

# app = Flask(__name__, static_folder='../client/build', template_folder='templates')
# CORS(app)

# test_sessions = {}

# # API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# # KEYWORD = "Alzheimers"

# # # Function to get news from the API
# # def _get_news():
# #     response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
# #     if response.status_code == 200:
# #         return response.json()['articles']
# #     else:
# #         return []

# # @app.route('/')
# # def index():
# #     return render_template('index.html')

# # @app.route('/api/news')
# # def news_api():
# #     articles = _get_news()  # Get news articles
# #     return jsonify({'articles': articles})

# API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# KEYWORD = "Alzheimers"
# DEFAULT_IMAGE = "assets/images/default.webp"

# # Function to get news from the API
# def _get_news():
#     response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
#     return response.json()['articles']

# @app.route('/get_news')
# def news_page():
#     articles = _get_news()  # Get news articles
#     return render_template('news.html', articles=articles, default_image=DEFAULT_IMAGE)

# # API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# # KEYWORD = "Alzheimers"
# # DEFAULT_IMAGE = "assets/images/default.webp"

# # # Function to get news from the API
# # def _get_news():
# #     response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
# #     return response.json()['articles']

# # @app.route('/get_news')
# # def news_page():
# #     articles = _get_news()  # Get news articles
# #     return render_template('news.html', articles=articles, default_image=DEFAULT_IMAGE)





# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop", "Memory"
#     language_code = request.json.get("language_code", "en")  # Default to English

#     if test_type == "GoNoGo":
#         test_sessions[session_id] = GoNoGoTest()
#     elif test_type == "Stroop":
#         test_sessions[session_id] = StroopTest(language_code)
#     elif test_type == "Memory":
#         test_sessions[session_id] = MemoryTest(language_code)
#     else:
#         return jsonify({"error": "Invalid test type"}), 400

#     test_sessions[session_id].start_trial()
#     return jsonify({"signal": test_sessions[session_id].current_signal})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     response = request.json.get("response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     return jsonify({"signal": test.current_signal})

# @app.route('/<path:path>')
# def serve_static(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')

# if __name__ == '__main__':
#     app.run(debug=True )


# ===============news with-----------------------------------------------------------------------------------
