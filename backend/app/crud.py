from sqlalchemy.orm import Session
from .models import BookModel, BookCreate


def get_book(db: Session, book_id: int):
    return db.query(BookModel).filter(BookModel.id == book_id).first()


def get_books(db: Session, skip: int = 0, limit: int = 10):
    return db.query(BookModel).offset(skip).limit(limit).all()


def create_book(db: Session, book: BookCreate):
    db_book = BookModel(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def update_book(db: Session, book_id: int, book: BookCreate):
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if db_book:
        for key, value in book.dict().items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: int):
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book
