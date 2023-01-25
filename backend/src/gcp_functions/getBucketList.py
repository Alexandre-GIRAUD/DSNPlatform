from google.cloud import storage
import os
from datetime import date, timedelta


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def nb_new_dataset(buckets):
    """
    Compute the number of bucket created since yesterday
    """
    yesterday = date.today() - timedelta(days=1)
    new = 0
    for b in buckets:
        if b.time_created.date() > yesterday:
            new += 1
    return new


def getBucketList():
    storage_client = storage.Client()
    buckets = list(storage_client.list_buckets())

    # à changer ça; voir si les buckets utiles ne devraient pas être sur un autre gcp
    buckets = [b for b in buckets if b.name.endswith("_dsn_175882445073278234578")]
    return {
        "data": [
            {
                "name": b.name.split("_dsn_175882445073278234578")[0],
                "time_created": b.time_created,
                "access": b.labels,
            }
            for b in buckets
        ],
        "nb_bucket": len(buckets),
        "nb_new_bucket": nb_new_dataset(buckets),
    }


def researchBucketList(research_word):
    storage_client = storage.Client()
    buckets = list(storage_client.list_buckets())

    # à changer ça; voir si les buckets utiles ne devraient pas être sur un autre gcp
    buckets = [
        b
        for b in buckets
        if b.name.endswith("_dsn_175882445073278234578") and b.labels == "public"
    ]

    results = [b for b in buckets if research_word in b.name[:-26]]

    return {
        "data": [
            {
                "name": b.name.split("_dsn_175882445073278234578")[0],
                "time_created": b.time_created,
            }
            for b in results
        ]
    }
