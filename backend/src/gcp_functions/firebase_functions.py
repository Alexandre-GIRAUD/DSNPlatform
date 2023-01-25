from firebase_admin import auth
import firebase_admin
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def get_users_information(uid):
    try:
        default_app = firebase_admin.get_app()
    except ValueError as e:
        default_app = firebase_admin.initialize_app()
    user = auth.get_user("2UYGjA7h2FQueN9r13fxlRm04BS2")
    print("Successfully fetched user data: {0}".format(user.email))
    return str(user.email).split("@")[0]
