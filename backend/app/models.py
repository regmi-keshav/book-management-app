from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

Base = declarative_base()

# SQLAlchemy Model


class BookModel(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    published_date = Column(String, index=True)
    description = Column(String, index=True)

# Pydantic Schema


class BookBase(BaseModel):
    title: str
    author: str
    published_date: str
    description: str


class BookCreate(BookBase):
    pass


class Book(BookBase):
    id: int

    class Config:
        orm_mode = True
