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

from flask import Flask, request, jsonify
from flask_cors import CORS
from cognitive_test import GoNoGoTest
from stroop_test import StroopTest
from memory_test import MemoryTest  # Import the MemoryTest class

app = Flask(__name__)
CORS(app)

test_sessions = {}

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

if __name__ == '__main__':
    app.run(debug=True)







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

# API_KEY = "d1ef0a648ef04ecd92f130cba780bc4d"
# KEYWORD = "Alzheimers"

# def _get_news():
#     response = requests.get(f'https://newsapi.org/v2/everything?q={KEYWORD}&apiKey={API_KEY}&language=en&searchIn=title')
#     return response.json()['articles']

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/api/news')
# def news_api():
#     articles = _get_news()
#     return jsonify({'articles': articles})

# @app.route('/start-test', methods=['POST'])
# def start_test():
#     session_id = request.json.get("session_id")
#     test_type = request.json.get("test_type")
#     language_code = request.json.get("language_code", "en")

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
#     app.run(debug=True)
