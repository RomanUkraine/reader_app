class Book < ApplicationRecord
  has_many :users, through: :assigned_books

  validates :title, :author, :description, presence: true
end
