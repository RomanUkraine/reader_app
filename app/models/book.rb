class Book < ApplicationRecord
  has_many :users, through: :read_entries

  validates :title, :author, :description, presence: true
end
