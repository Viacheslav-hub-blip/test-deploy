import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

my_Session = sessionmaker(bind=engine)
session = my_Session()
print(session)
