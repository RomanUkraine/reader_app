class BooksController < ApplicationController

  def index
    # https://www.simplify.ba/articles/2016/06/18/creating-rails5-api-only-application-following-jsonapi-specification/
    # TODO Follow json api specification
    books = Book.all
    render json: books
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book
    else
      render json: { error: book.errors.full_messages }
    end
  end

  private

    def book_params
      params.require(:book).permit(:title, :description, :author)
    end
end
