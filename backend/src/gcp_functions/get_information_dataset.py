from google.cloud import bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def get_information_dataset(dataset_name):

    client = bigquery.Client()
    # Perform a query.
    QUERY = f"SELECT * FROM `dsn-dev-01.meta_data_dataset.list_datasets` WHERE name = '{dataset_name}'"
    query_job = client.query(QUERY)  # API request
    rows = query_job.result()  # Waits for query to finish
    for row in rows:
        result = dict(row)
        break
    return result


def get_size_dataset(dataset_name):

    stream = os.popen(f"gsutil du -s gs://{dataset_name}")
    output = stream.read()

    print(f"output : {output.split(' ')[0]}")
    return output.split(" ")[0]


def get_nb_elements_dataset(dataset_name, label_or_not):

    print(f"gsutil ls -l gs://{dataset_name}/{label_or_not}")
    stream = os.popen(f"gsutil ls -l gs://{dataset_name}/{label_or_not} | wc -l")
    output = stream.read()

    if int(output) > 2:
        return str(int(output) - 2)
    else:
        return 0
