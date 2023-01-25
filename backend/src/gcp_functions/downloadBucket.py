import mimetypes
from flask.helpers import send_from_directory, send_file
from google.cloud import storage
import os
from flask import send_from_directory, abort
import shutil

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def downloadBucket(bucketname, prefix):
    """download the content of a google cloud storage bucket knowing its bucket name"""
    # Download the content on server

    client = storage.Client()
    bucket = client.get_bucket(bucketname)
    prefix = prefix
    parents_blobs = bucket.list_blobs(prefix=prefix)

    src_folder = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    tmp_folder = os.path.join(src_folder, bucketname[:16])

    if not os.path.exists(tmp_folder):
        os.makedirs(tmp_folder)

    if prefix == "withlabel":
        i = 1
        for blob in parents_blobs:
            if i == 1:
                i = i + 1
                continue
            prefix = "withlabel/data_" + str(i + 1)
            blobs = bucket.list_blobs(prefix=prefix)
            if i % 2 == 0:
                tmp_data_folder = os.path.join(
                    src_folder, bucketname[:16] + "/data_" + str(i + 1)
                )
                if not os.path.exists(tmp_data_folder):
                    os.makedirs(tmp_data_folder)
            blob.download_to_filename(
                os.path.join(tmp_data_folder, blob.name.split("/")[-1])
            )
            i = i + 1
        shutil.make_archive(
            os.path.join(src_folder, f"{bucketname[:16]}"), "zip", tmp_folder
        )

        # Download on client side
        try:
            d_name = bucketname.replace("_dsn_175882445073278234578", "") + ".zip"
            return send_file(
                os.path.join(src_folder, f"{bucketname[:16]}.zip"),
                as_attachment=True,
                download_name=d_name,
            )
        except FileNotFoundError:
            abort(404)

    elif prefix == "withoutlabel":
        tmp_folder_withoutlabel = os.path.join(
            src_folder, bucketname[:16] + "withoutlabel"
        )

        if not os.path.exists(tmp_folder_withoutlabel):
            os.makedirs(tmp_folder_withoutlabel)

        i = 1
        for blob in parents_blobs:
            print(f"blob.name : {blob.name}")
            if i == 1:
                i = i + 1
                continue
            blob.download_to_filename(
                os.path.join(tmp_folder_withoutlabel, blob.name.split("/")[-1])
            )

            i = i + 1
        shutil.make_archive(
            os.path.join(src_folder, f"{bucketname[:16]}_withoutlabel"),
            "zip",
            tmp_folder_withoutlabel,
        )

        # Download on client side
        try:
            d_name = bucketname.replace("_dsn_175882445073278234578", "") + ".zip"
            return send_file(
                os.path.join(src_folder, f"{bucketname[:16]}_withoutlabel.zip"),
                as_attachment=True,
                download_name=d_name,
            )
        except FileNotFoundError:
            abort(404)
