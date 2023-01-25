from google.cloud import bigquery, storage
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def getNonLabelizedImages(dataset_name):

    client = storage.Client()
    bucket = client.get_bucket(dataset_name)
    blobs = bucket.list_blobs(prefix="withoutlabel")
    name_images = []
    print(blobs)
    for blob in blobs:
        print(str(blob).split(", ")[1].split("/")[1])
        name_images.append(str(blob).split(", ")[1].split("/")[1])
    return str(name_images[1:])
