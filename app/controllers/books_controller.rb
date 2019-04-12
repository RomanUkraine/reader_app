class BooksController < ApplicationController
  def index
    books = Book.all
    respond_with books
  end

  # allow user to add a book and make it public for everyone
end
