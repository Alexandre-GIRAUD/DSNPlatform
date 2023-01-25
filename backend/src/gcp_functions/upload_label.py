from google.cloud import storage
import os
from datetime import date, timedelta


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def uploadLabelizedData(bucketname, filename, label, chosen_label, file_content):

    client = storage.Client()
    bucket = client.get_bucket(bucketname)
    nb_elements = 0
    for blob in client.list_blobs(bucketname, prefix="withlabel/"):
        nb_elements = nb_elements + 1

    file_label_name = (
        "withlabel/data_" + str(nb_elements) + "/" + filename.split(".")[0] + ".txt"
    )
    blob = bucket.blob(file_label_name)
    label_string = f"{chosen_label} : {label}"
    blob.upload_from_string(label_string)
    file_img_name = "withlabel/data_" + str(nb_elements) + "/" + filename
    blob = bucket.blob(file_img_name)
    blob.upload_from_string(file_content.read(), content_type=file_content.content_type)

    return "Cc"
