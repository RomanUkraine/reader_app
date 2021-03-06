class AssignedBooksController < ApplicationController
  def index
    assigned_books = current_user.books
    render json: assigned_books
  end

  def create
    assigned_book = current_user.assigned_books.build(assigned_book_params)

    if assigned_book.save
      head :no_content
    else
      render json: { error: assigned_book.errors.full_messages }, status: 422
    end
  end

  private

  def assigned_book_params
    params.require(:assigned_book).permit(:user_id, :book_id)
  end
end
