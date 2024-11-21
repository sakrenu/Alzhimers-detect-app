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

# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from cognitive_test import GoNoGoTest
# from strooptest import StroopTest  # Import the StroopTest class

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

#     trial_info = test_sessions[session_id].start_trial()
#     if trial_info.get("signal") == "end":
#         return jsonify({"results": test_sessions[session_id].get_results()})

#     return jsonify({"word": trial_info["word"], "color": trial_info["color"]})

# @app.route('/submit-response', methods=['POST'])
# def submit_response():
#     session_id = request.json.get("session_id")
#     user_response = request.json.get("user_response")

#     if session_id not in test_sessions:
#         return jsonify({"error": "Invalid session"}), 400

#     test = test_sessions[session_id]
#     test.evaluate_response(user_response)

#     if test.current_trial >= test.total_trials:
#         results = test.get_results()
#         del test_sessions[session_id]
#         return jsonify({"results": results})

#     trial_info = test.start_trial()
#     if trial_info.get("signal") == "end":
#         return jsonify({"results": test.get_results()})

#     return jsonify({"word": trial_info["word"], "color": trial_info["color"]})

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
from cognitive_test import GoNoGoTest
from strooptest import StroopTest  # Import the StroopTest class

app = Flask(__name__)
CORS(app)

test_sessions = {}

@app.route('/start-test', methods=['POST'])
def start_test():
    session_id = request.json.get("session_id")
    test_type = request.json.get("test_type")  # e.g., "GoNoGo", "Stroop"
    language_code = request.json.get("language_code", "en")  # Default to English

    if test_type == "GoNoGo":
        test_sessions[session_id] = GoNoGoTest()
    elif test_type == "Stroop":
        test_sessions[session_id] = StroopTest(language_code)
    else:
        return jsonify({"error": "Invalid test type"}), 400

    trial_info = test_sessions[session_id].start_trial()
    if trial_info.get("signal") == "end":
        return jsonify({"results": test_sessions[session_id].get_results()})

    return jsonify(trial_info)

@app.route('/submit-response', methods=['POST'])
def submit_response():
    session_id = request.json.get("session_id")
    user_response = request.json.get("user_response")

    if session_id not in test_sessions:
        return jsonify({"error": "Invalid session"}), 400

    test = test_sessions[session_id]
    test.evaluate_response(user_response)

    if test.current_trial >= test.total_trials:
        results = test.get_results()
        del test_sessions[session_id]
        return jsonify({"results": results})

    trial_info = test.start_trial()
    if trial_info.get("signal") == "end":
        return jsonify({"results": test.get_results()})

    return jsonify(trial_info)

@app.route('/end-stroop-test', methods=['POST'])
def end_stroop_test():
    session_id = request.json.get("session_id")
    correct_responses = request.json.get("correct_responses")
    total_trials = request.json.get("total_trials")

    if session_id not in test_sessions:
        return jsonify({"error": "Invalid session"}), 400

    test = test_sessions[session_id]
    test.correct_responses = correct_responses
    test.total_trials = total_trials
    results = test.get_results()
    del test_sessions[session_id]
    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(debug=True)
