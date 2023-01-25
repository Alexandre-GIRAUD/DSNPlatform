"""
The function below are not run directly but in the cloud function get_users_metrics. If you want to add or change some metrics
Change them here first, then copy/paste it this file into the "source" tab of the cloud function
To check the dashboard associated to the metrics, check this link :
https://datastudio.google.com/u/2/explorer?config=%7B%22projectId%22:%22dsn-dev-01%22,%22tableId%22:%22user_metrics%22,%22datasetId%22:%22user_metrics_dataset%22,%22billingProjectId%22:%22dsn-dev-01%22,%22connectorType%22:%22BIG_QUERY%22,%22sqlType%22:%22STANDARD_SQL%22%7D
"""

from firebase_admin import auth, credentials, initialize_app
from google.cloud import bigquery
from datetime import date


def get_nb_users():
    # cred = credentials.Certificate("./dsn-dev-01-266aa4495492.json")
    initialize_app()
    # Start listing users from the beginning, 1000 at a time.
    page = auth.list_users()
    count = 0
    while page:
        for user in page.users:
            count += 1
        # Get next batch of users.
        page = page.get_next_page()
    print(count)
    return count


def get_nb_ds():

    client = bigquery.Client()
    QUERY = f"SELECT COUNT(*) FROM `dsn-dev-01.meta_data_dataset.list_datasets`"
    query_job = client.query(QUERY)  # API request
    rows = query_job.result()  # Waits for query to finish
    for row in rows:
        result = dict(row)

    return result["f0_"]


def get_new_data():
    QUERY = f"SELECT SUM(ds.nb_data) FROM `dsn-dev-01.meta_data_dataset.list_datasets` as ds "
    client = bigquery.Client()
    query_job = client.query(QUERY)  # API request
    rows = query_job.result()  # Waits for query to finish
    for row in rows:
        result = dict(row)

    print(result["f0_"])

    return result["f0_"]


def getUsersMetrics(request):

    count = get_nb_users()
    nb_ds = get_nb_ds()
    new_data = get_new_data()
    today = date.today()
    print(today)

    client = bigquery.Client()
    # Perform a query.
    QUERY = f"""INSERT `dsn-dev-01.user_metrics_dataset.user_metrics` 
                    (nb_signups, nb_datasets_created, volume_data_added, date)
                    VALUES({count}, {int(nb_ds)}, {int(new_data)}, PARSE_DATE('%Y-%m-%d',  '{str(today)}'))"""
    query_job = client.query(QUERY)  # API request
    query_job.result()  # Waits for query to finish

    return f"Hello World!"
