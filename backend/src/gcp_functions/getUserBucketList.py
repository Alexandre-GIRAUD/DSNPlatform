from concurrent.futures.process import _ResultItem
from google.cloud import bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)


def getuserbucketlist(id_author):

    client = bigquery.Client()
    # Perform a query.
    QUERY = f"SELECT name,date_creation FROM `dsn-dev-01.meta_data_dataset.list_datasets` WHERE id_author = '{id_author}'"
    query_job = client.query(QUERY)  # API request
    rows = query_job.result()  # Waits for query to finish
    result = []
    for row in rows:
        result.append({"name": row.name.split("_dsn_175882445073278234578")[0], "time_created": row.date_creation})
    
    return {"data":result}
