class Book < ApplicationRecord
  has_many :users, through: :read_entries
end
