from google.cloud import storage, bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def createbuckets(bucketname, location, status, format, description, labels, id_author):

    create_metadata_dataset(
        bucketname, location, status, format, description, labels, id_author
    )

    client = storage.Client()
    bucketname = bucketname + "_dsn_175882445073278234578"
    bucket = client.bucket(bucketname)
    bucket.location = location
    # bucket.labels["access"] = status
    bucket.create()
    blob1 = bucket.blob("withlabel/")
    blob2 = bucket.blob("withoutlabel/")
    blob1.upload_from_string("")
    blob2.upload_from_string("")

    members = ["allUsers"]
    policy = bucket.get_iam_policy(requested_policy_version=3)
    policy.bindings.append({"role": "roles/storage.objectViewer", "members": members})

    bucket.set_iam_policy(policy)

    if status == "Public":
        print("entered here")
        labels = bucket.labels
        labels["access"] = "public"
        bucket.labels = labels
        bucket.patch()
    else:
        print("entered")
        labels = bucket.labels
        labels["access"] = "private"
        bucket.labels = labels
        bucket.patch()

    print(bucket.labels)

    return "Bucket created"


def create_metadata_dataset(
    dataset_name, location, status, format, description, labels, id_author
):

    client = bigquery.Client()
    QUERY = (
        f"SELECT COUNT(*) as nb_rows FROM `dsn-dev-01.meta_data_dataset.list_datasets`"
    )
    query_job = client.query(QUERY)  # API request
    rows = query_job.result()  # Waits for query to finish
    nb_dataset = 0
    for elem in rows:
        nb_dataset = elem.get("nb_rows")

    # Perform a query.
    QUERY = f"""INSERT `dsn-dev-01.meta_data_dataset.list_datasets` 
                (name, id, description, id_author, nb_collaborators, nb_branches, rating, size, nb_data, Status, location, format, labels, date_creation)
                VALUES('{dataset_name}_dsn_175882445073278234578', {nb_dataset+1}, '{description}', '{id_author}', 9, "0","No Ratings",0,0,'{status}', '{location}', '{format}', '{labels}', CURRENT_DATE())"""
    query_job = client.query(QUERY)  # API request
    query_job.result()  # Waits for query to finish
