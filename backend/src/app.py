import flask
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, redirect, flash, url_for
from google.cloud import storage
import os
from gcp_functions.createBucket import createbuckets
from gcp_functions.downloadBucket import downloadBucket
from gcp_functions.get_information_dataset import (
    get_information_dataset,
    get_size_dataset,
    get_nb_elements_dataset,
)
from gcp_functions.getBucketList import getBucketList, researchBucketList
from gcp_functions.getUserBucketList import getuserbucketlist
from gcp_functions.upload_label import uploadLabelizedData
from gcp_functions.UploadFileOnGCP import UploadFileOnGCP
from gcp_functions.getNonLabelizedImages import getNonLabelizedImages
from gcp_functions.addToFav import addToFav
from gcp_functions.unFav import unFav
from gcp_functions.getuserfavbucketlist import getuserfavbucketlist
from werkzeug.utils import secure_filename
from gcp_functions.firebase_functions import get_users_information

app = Flask(__name__)
os.environ["FLASK_ENV"] = "development"

CORS(app, origins=["*"], support_credentials=True)
app.config["SECRET_KEY"] = "alexisthebest"


@app.route("/")
def hello():
    return "HelloWorld !"


# Example : http://127.0.0.1:5000/v2/createBuckets/bucketalex/eu
@app.route(
    "/v2/createBuckets/<bucketname>/<location>/<status>/<format>/<description>/<labels>/<id_author>"
)
def createBucketsAPI(
    bucketname, location, status, format, description, labels, id_author
):
    return createbuckets(
        bucketname, location, status, format, description, labels, id_author
    )


# Example : http://127.0.0.1:5000/v2/createBuckets/bucketalex/eu
@app.route("/v2/downloadBucket/<bucketname>/<prefix>")
def downloadBucketsAPI(bucketname, prefix):
    return downloadBucket(bucketname, prefix)


# Get Request
# Example : http://127.0.0.1:5000/v2/createBuckets/bucketalex/eu
@app.route("/v2/get_information_dataset/<dataset_name>")
def getInformationAPI(dataset_name):
    response = get_information_dataset(dataset_name)
    return response


# Get Request
# Example : http://127.0.0.1:5000/v2/createBuckets/bucketalex/eu
@app.route("/v2/getNonLabelizedImages/<dataset_name>")
def getNonLabelizedImagesAPI(dataset_name):
    response = getNonLabelizedImages(dataset_name)
    return response


@app.route("/v2/getBucketList")
@cross_origin(supports_credentials=True)
def getBucketListAPI():
    return getBucketList()


@app.route("/v2/getUserBucketList/<id_author>")
@cross_origin(supports_credentials=True)
def getUserBucketListAPI(id_author):
    return getuserbucketlist(id_author)


@app.route("/v2/researchBucket/<research_word>")
@cross_origin(supports_credentials=True)
def researchBucketListAPI(research_word):
    return researchBucketList(research_word)


@app.route("/v2/getSizeDataset/<dataset_name>")
@cross_origin(supports_credentials=True)
def getSizeDatasetAPI(dataset_name):
    return get_size_dataset(dataset_name)


@app.route("/v2/getUsersInformation/<uid>")
@cross_origin(supports_credentials=True)
def getUsersInformationAPI(uid):
    print("cc entered")
    return get_users_information(uid)


@app.route("/v2/getNbElementsDataset/<dataset_name>/<label_or_not>")
@cross_origin(supports_credentials=True)
def getNbElementsDatasetAPI(dataset_name, label_or_not):
    return get_nb_elements_dataset(dataset_name, label_or_not)


@app.route("/v2/addToFav/<id_user>/<dataset_name>")
@cross_origin(supports_credentials=True)
def addToFavAPI(id_user, dataset_name):
    return addToFav(id_user, dataset_name)


@app.route("/v2/unFav/<id_user>/<dataset_name>")
@cross_origin(supports_credentials=True)
def unFavAPI(id_user, dataset_name):
    return unFav(id_user, dataset_name)


@app.route("/v2/getUserFavBucketList/<user_id>")
@cross_origin(supports_credentials=True)
def getUserFavBucketListAPI(user_id):
    return getuserfavbucketlist(user_id)


@app.route(
    "/v2/uploadLabelizedData/<bucketname>/<filename>/<label>/<chosen_label>",
    methods=["GET", "POST"],
)
@cross_origin(supports_credentials=True)
def uploadLabelizedDataAPI(bucketname, filename, label, chosen_label):
    """
    Args:
    - label : coordinates of the label in the image
    - chosen_label : label that the user chose when he labelized the image
    """
    file = request.files["file"]
    return uploadLabelizedData(bucketname, filename, label, chosen_label, file)


@app.route("/v2/uploadImage", methods=["GET", "POST"])
@cross_origin()
def uploadImage():
    if request.method == "POST":
        if "image" not in request.files:
            flash("No file part")
            return redirect(request.url)

        file = request.files["image"]
        if file.filename == "":
            flash("No selected file or bad extensions")
            return redirect(request.url)
        UploadFileOnGCP(file, "dataset_page_images")
    return ""


@app.route("/v2/uploadFile/<bucketname>", methods=["GET", "POST"])
@cross_origin()
def uploadFile(bucketname):
    if request.method == "POST":
        if "file" not in request.files:
            flash("No file part")
            return redirect(request.url)

        file = request.files["file"]
        if file.filename == "":
            flash("No selected file or bad extensions")
            return redirect(request.url)
        UploadFileOnGCP(file, bucketname)
    return ""


if __name__ == "__main__":
    app.run()
