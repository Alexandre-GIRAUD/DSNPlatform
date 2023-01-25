from google.cloud import storage, bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    "dsn-dev-01-266aa4495492.json",
)

def addToFav(user_id,dataset_name):
    client = bigquery.Client()
    # Perform a query.
    QUERY = f"""INSERT `dsn-dev-01.favoris_dataset.User_Fav` 
                (user_id,datasetname)
                VALUES('{user_id}','{dataset_name}')"""
    query_job = client.query(QUERY)  # API request
    query_job.result()  # Waits for query to finish
    return f"{dataset_name} added to {user_id} fav"