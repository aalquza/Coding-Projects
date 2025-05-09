import pandas as pd

def load_csv(file_path):
<<<<<<< HEAD
    return pd.read_csv(file_path)
=======
    return pd.read_csv(file_path)

def convert_df_to_string(df, limit_rows=20):
    return df.head(limit_rows).to_csv(index=False)
>>>>>>> origin/main
