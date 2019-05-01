class BooksController < ApplicationController
  def index
    if params[:my]
      books = current_user.books
      render json: BookSerializer.new(books)
    else
      books = Book.publicly_visible(current_user.id)
      render json: BookSerializer.new(books), status: 200
    end
  end

  def create
    book = Book.new(book_params.merge(user_id: current_user.id))
    if book.save
      head :no_content
      # no_content because after create user is redirected to all-books
      # page where they all are requested in a separate request
    else
      render json: { error: book.errors.full_messages }, status: 422
    end
  end

  private

    def book_params
      params.require(:book).permit(:title, :description, :author, :public, :user_id)
    end
end
