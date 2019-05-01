class AssignedBook < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :user_id, :book_id, presence: true
  validates :user_id, uniqueness: { scope: :book_id,
            message: 'This book is already assigned to you!' }
end
