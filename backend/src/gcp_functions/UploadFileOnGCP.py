from flask.helpers import send_from_directory
from google.cloud import storage
import os
from flask import send_from_directory, abort
from zipfile import is_zipfile, ZipFile

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def UploadFileOnGCP(file, bucketname):
    client = storage.Client()
    bucket = client.get_bucket(bucketname)
    blob = bucket.blob(file.filename)
    folder = os.path.dirname(file.filename)
    allowed_formats = ["jpg", "jpeg", "png"]
    if file.filename[-4:] == ".zip":
        with ZipFile(file, "r") as myzip:
            for contentfilename in myzip.namelist():
                if contentfilename.split(".")[1] in allowed_formats:
                    contentfile = myzip.read(contentfilename)
                    blob = bucket.blob(os.path.join(folder, contentfilename))
                    blob.upload_from_string(contentfile)
                else:
                    print("No images found in zip")
    else:
        blob.upload_from_string(file.read(), content_type=file.content_type)
